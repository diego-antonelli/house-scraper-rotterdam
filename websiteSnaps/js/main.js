jQuery.validator.addMethod("defaultInvalid", function (value, element) {
    return !(element.value == element.defaultValue);
});

$(document).ready(function () {

// snowStorm.snowColor = '#e4e4e4';
// snowStorm.followMouse = false;
// snowStorm.zIndex = 99;
// snowStorm.vMaxX = 1;
// snowStorm.vMaxY = 1;
// snowStorm.snowStick = false;
// snowStorm.excludeMobile = false;
// snowStorm.snowCharacter = '&#10054;';
// snowStorm.flakeWidth = 16;
// snowStorm.flakeHeight = 16;

    $('#registrationForm').submit(function (e) {
        if (grecaptcha.getResponse() === "") {
            e.preventDefault();
            $('.recaptchaerror').show();
            $('#recaptcha').parent().addClass('recaptchaerror');
        }
    });

    // Home crossfade background images
    if ($('.background').length > 0) {
        $('.background').height($('.searchblock').height());
        var slides = $('.background').attr('data-slides').split(",");
        var halfSlide = Math.ceil(slides.length / 2);
        console.log('HALFSLIDE: ' + halfSlide);
        var imageSet1 = [];
        var currentImageSet1 = 0;
        var imageSet2 = [];
        var currentImageSet2 = 0;
        for (var i = 0; i < halfSlide; i++) {
            imageSet1.push(slides[i]);
        }
        for (var i = halfSlide; i < slides.length; i++) {
            imageSet2.push(slides[i]);
        }


        function changeBackgroundImages() {

            console.log('change');
            console.log('currentImageSet1: ' + currentImageSet1);
            console.log('currentImageSet2: ' + currentImageSet2);
            img1Fade();
            setTimeout(img2Fade, 4000);

        }

        function img1Fade() {
            console.log('img1Fade');

            $('.backgroundslide').fadeOut('600', function () {
                $('.backgroundslide').css({background: 'url(' + imageSet1[++currentImageSet1] + ')'})
            });
            $('.backgroundslide2').fadeIn('600');
            if (currentImageSet1 >= imageSet1.length - 1) {

                currentImageSet1 -= imageSet1.length;
            }
            ;

        }

        function img2Fade() {
            console.log('img2Fade');

            $('.backgroundslide2').fadeOut('600', function () {
                $('.backgroundslide2').css({background: 'url(' + imageSet2[++currentImageSet2] + ')'})
            });
            $('.backgroundslide').fadeIn('600');
            if (currentImageSet2 >= imageSet2.length - 1) {

                currentImageSet2 -= imageSet2.length;
            }
            ;

        }

        $('.backgroundslide').css({background: 'url(' + imageSet1[currentImageSet1] + ')'});
        $('.backgroundslide2').css({background: 'url(' + imageSet2[currentImageSet2] + ')'});
        setInterval(changeBackgroundImages, 8000);
    }


    function addHouse(object, type, newLabel, tourLabel, lang) {
        if (type == 'new') {
            var $container = $('.newhouses')
        } else {
            var $container = $('.servicedhouses')
        }

        var $html = '';
        $html += '<div class="col-lg-3 col-xs-6 col-md-4">';
        $html += '<div class="homeitem" data-id="' + object.idWoningen + '">';
        $html += '<div class="row">';
        $html += '<div class="col-lg-7 col-md-7 col-sm-6">';
        if (object.webStatusId_en == '2') {
            $html += '<a class=" label new" href="' + object.url + '">' + newLabel + '</a>';
        }
        if (object.threesixtyImage != '') {
            $html += '<a class=" label new" href="' + object.url + '">' + tourLabel + '</a>';
        }

        console.log('Object');
        console.log(object);
        console.log('Afbeelding url: ' + object.image_en);

        if (object.image_en != '') {
            $html += '<a class="houseimage" href="' + object.url + '"><img src="' + object.image_en + '" alt=""/></a>';
        } else {
            $html += '<a class="houseimage" href="' + object.url + '"><img style="height: 99px; padding: 0 10px;" src="images/noImage' + lang + '.png" alt=""/></a>';
        }

        $html += '</div>';
        $html += '<div class="col-lg-4 col-md-4">';
        $html += '<div class="price">';
        $html += '<a href="' + object.url + '">&euro; ' + object.price_en + '</a>';
        $html += '</div>';
        $html += '<div class="incl">';
        if (object.woningType != 2) {
            if (object.rentIncluded.substr(0, 3) == '111') {
                $html += '<a href="' + object.url + '">incl.</a>';
            } else {
                $html += '<a href="' + object.url + '">excl.</a>';
            }
        }
        $html += '</div>';
        $html += '<div class="space">';
        $html += '<a href="' + object.url + '"><img src="images/size.png" />' + object.space_en + 'm<sup>2</sup></a>';
        $html += '</div>';
        $html += '<div class="rooms">';
        $html += '<a href="' + object.url + '"><img src="images/bedroom.png" /> ' + object.bedrooms_en + '</a>';
        $html += '</div>';
        $html += '</div>';
        $html += '<div class="col-lg-12 col-md-12">';
        $html += '<div class="street">';
        $html += '<a href="' + object.url + '">' + object.street_en + '</a>';
        $html += '</div>';
        $html += '<div class="city">';
        $html += '<a href="' + object.url + '">' + object.city_en + '</a>';
        $html += '</div>';
        $html += '</div>';
        $html += '</div>';
        $html += '</div>';
        $html += '</div>';

        $container.append($html);
    }

    $(document).ready( function () {
        // $('.loadmorehouses').trigger('click');
    });


    $('.loadmorehouses').click(function (e) {
        e.preventDefault();
        var newLabel = $(this).attr('data-new');
        var tourLabel = $(this).attr('data-labeltour');
        var lang = $(this).attr('data-lang');

        var type = $(this).attr('data-type');
        var ids = [];
        if (type == 'new') {
            $('.newhouses').find('.homeitem').each(function () {
                ids.push($(this).attr('data-id'));
            });
        } else {
            $('.servicedhouses').find('.homeitem').each(function () {
                ids.push($(this).attr('data-id'));
            });
        }
        var $button = $(this);
        var $buttonText = $(this).text();
        $button.text('Loading..');
        $.ajax({
            url: "includes/getExtraHouses.php",
            method: "POST",
            data: {'ids': ids, 'type': type},
            success: function (data) {
                var obj = jQuery.parseJSON(data);
                if(obj != null){
                    if (type == 'new') {
                        $.each(obj.newestHouses, function (k, v) {
                            addHouse(v, type, newLabel, tourLabel, lang);
                        });
                    } else {
                        $.each(obj.servicedHouses, function (k, v) {
                            addHouse(v, type, newLabel, tourLabel, lang);
                        });
                    }
                    $button.text($buttonText);
                }else{
                    $('.loadmorebutton').hide();
                }
            }
        });
    });

    $('.loadmoresimilarhouses').click(function (e) {
        e.preventDefault();
        var newLabel = $(this).attr('data-new');
        var tourLabel = $(this).attr('data-labeltour');
        var lang = $(this).attr('data-lang');

        var type = $(this).attr('data-type');
        var city = $(this).attr('data-city');
        var priceLeft = $(this).attr('data-price-left');
        var priceRight = $(this).attr('data-price-right');
        var current = $(this).attr('data-current');


        var ids = [];
        $('.newhouses').find('.homeitem').each(function () {
            ids.push($(this).attr('data-id'));
        });
        ids.push(current);
        var $button = $(this);
        var $buttonText = $(this).text();
        $button.text('Loading..');
        console.log(ids);
        $.ajax({
            url: "includes/getExtraSimilarHouses.php",
            method: "POST",
            data: {'ids': ids, 'type': type, 'city': city, 'priceLeft': priceLeft, 'priceRight': priceRight},
            success: function (data) {
                var obj = jQuery.parseJSON(data);
                console.log(obj);
                if (obj) {
                    $.each(obj.similar, function (k, v) {
                        addHouse(v, 'new', newLabel, tourLabel, lang);
                    });
                    $button.text($buttonText);
                } else {
                    if (lang == 'nl') {
                        $button.text('Geen vergelijkbare appartementen gevonden');
                    } else {
                        $button.text('No similar properties found');
                    }
                }
            }
        });

    });

    $('.honeypot').each(function () {
        $(this).hide();
    });
    $('.hpas').each(function () {
        $(this).hide();
    });

    $('.searchoptions').click(function () {
        $('.searchfilter').slideToggle();
    });

    $('div.stars').raty({
        readOnly: true,
        noRatedMsg: "",
        starOff: 'images/offstar.png',
        starOn: 'images/fullstar.png',
        starHalf: 'images/halfstar.png',
        width: 133,
        half: true,
        score: function () {
            return $(this).attr('data-score').replace(",", ".");
        }
    });

    $('.allReviews').click(function (e) {
        $('.meer').css("display", "block");
        $('.lessReviews').css("display", "block");
        $('.allReviews').css("display", "none");
    });

    $('.lessReviews').click(function (e) {
        $('.meer').css("display", "none");
        $('.lessReviews').css("display", "none");
        $('.allReviews').css("display", "block");
    });

    $('.citysearch').change(function (e) {
        var city = $(this).val();
        var firstoption = $('.areasearch').find('option').first().html();
        $('.areasearch').find('option').remove();
        $('.areasearch').append($("<option></option>").attr("value", '').text(firstoption));
        $.get('includes/getArea.php?city=' + city, function (data) {
            if (data != '') {
                $.each(data, function (key, value) {
                    $('.areasearch').append($("<option></option>").attr("value", value).text(value));
                })
            }
        }, 'json').complete(function (data) {
            $('.loadgif').hide();
        });
    });

    $(".auto_submit_item").change(function () {
        if ($(this).hasClass('areasearch')) {
            $('.districtsearch').val('');
        }
        $(".searchform").submit();
    });

    var $selector = $('#toggleMobileMenu');
    if ($selector.length > 0) {
        $selector.on('click', function (e) {
            e.preventDefault();
            $('body').toggleClass('active');
            $('.logo').toggle('50');
        });
    }

    $(".changeorder").change(function () {
        $(".orderform").submit();
    });

    $('.serviced').click(function (e) {
        $(this).addClass('active');
        $('.recent').removeClass('active');
        $('.servicedhouses').show();
        $('.newhouses').hide();
    });

    $('.recent').click(function (e) {
        $(this).addClass('active');
        $('.serviced').removeClass('active');
        $('.newhouses').show();
        $('.servicedhouses').hide();
    });

    $('.fancybox').fancybox();

    $('.bxslider').bxSlider({
        pagerCustom: '#bx-pager',
        adaptiveHeight: true,
    });


    $(".validateForm").validate({
        errorPlacement: function (error, element) {
            error.prependTo(element.parent().next());
        },
        // set this class to error-labels to indicate valid fields
        success: function (label) {
            // set &nbsp; as text for IE
            label.html("&nbsp;").addClass("checked");
        }
    });


    $('.datepicker').datepicker({
        format: "dd-mm-yy",
        weekStart: 1,
        keyboardNavigation: false,
        forceParse: false,
        autoclose: true,
        todayHighlight: true
    });

    $("#type").on('change', function () {
        if ($(this).val() == "Anders") {
            $("#typeInputField").show();
        } else if ($("#typeInputField").is(":visible")) {
            $("#typeInputField").hide();
        }
    });

    if ($("#map_canvas").length > 0) {
        var map;
        var elevator;
        var myOptions = {
            zoom: 7,
            center: new google.maps.LatLng(0, 0)
        };
        map = new google.maps.Map($('#map_canvas')[0], myOptions);
        var addresses = new Array();
        var images = new Array();
        var status = new Array();
        var prices = new Array();
        var link = new Array();
        var readmore = new Array();
        var $i = 0;
        $('.mapobject').each(function () {
            addresses[$i] = $(this).children('.address').html();
            images[$i] = $(this).children('.houseimage').html();
            status[$i] = $(this).children('.housestatus').html();
            link[$i] = $(this).children('.link').html();
            prices[$i] = $(this).children('.price').html();
            readmore[$i] = $(this).children('.readmore').html();
            $i++;
        });
        var image = 'images/markerGoeth.png';
        var bounds = new google.maps.LatLngBounds();
        var $i = 0;
        var focus = $('#focus');
        for (var x = 0; x < addresses.length; x++) {
            (function (x) {
                focus.queue('apicalls', function (next) {
                    $.getJSON('http://maps.googleapis.com/maps/api/geocode/json?address=' + addresses[x] + '&sensor=false', function (data) {
                        console.log(x);
                        var contentString =
                            '<div id="content">' +
                            '<h2 id="firstHeading" class="firstHeading"><a style="color: #2ba66a;font-size: 15px;font-weight:bold;text-decoration:none;" href="' + link[x] + '">' + addresses[x] + '</a></h2>' +
                            '<div id="bodyContent" style="width:auto;">' +
                            '<div id="imageContent" style="width:155px;;float:left;margin-top:5px;">' +
                            '<a href="' + link[x] + '"><img style="max-width:100%; padding-right:15px;" src="' + images[x] + '"/></a>' +
                            '</div>' +
                            '<div id="textConent" style="width:100px;margin-top:5px;float:left;">' +
                            '<p style="color: #003661;font-size: 14px;margin:0;">' + prices[x] + '</p>' +
                            '<p style="font-size: 14px;margin:0;">' + status[x] + '</p>' +
                            '<p><a style="font-size: 14px;padding-top:5px;color:#003661;text-decoration: underline;" href="' + link[x] + '">' + readmore[x] + '</a></p>' +
                            '</div>' +
                            '</div>' +
                            '</div>';

                        var infowindow = new google.maps.InfoWindow({
                            content: contentString
                        });
                        console.log(data.results[0]);
                        if (data.results[0]) {
                            var p = data.results[0].geometry.location
                            var latlng = new google.maps.LatLng(p.lat, p.lng);
                            var marker = new google.maps.Marker({
                                position: latlng,
                                map: map
                            });
                            bounds.extend(marker.position);
                            google.maps.event.addListener(marker, 'click', function () {
                                infowindow.open(map, marker);
                            });

                            map.fitBounds(bounds);
                        }
                        next();
                    });
                });
            })(x);
        }
        focus.dequeue('apicalls');
    }

});


$('.daySelector').on('change', function () {
    if ($(this).is(":checked")) {
        $(this).parent().find('select').show();
        if ($(this).val().indexOf('Zaterdag') != -1) {
            $('#Zaterdag').show();
        }
    } else {
        $(this).parent().find('select').hide();
        if ($(this).val().indexOf('Zaterdag') != -1) {
            $('#Zaterdag').hide();
        }
    }
});

$('.daySelect').on('change', function () {
    var val = $(this).parent().find('input').val() + " " + $(this).val();
    $(this).parent().find('input').val(val);
    console.log(val);
});

$(window).load(function () {
    $('.middle').vAlign('middle', 'padding');
    $("#tabs").tabs();

    $("#tabs").on("tabsactivate", function (event, ui) {
        onLoadmap();
    });
});

$('a').each(function () {
    if ($(this).attr('href')) {
        if ($(this).attr('href').indexOf("#") == 0) {
            $(this).attr('href', window.location + $(this).attr('href'));
        }
    }
});

$("#city").on('change', function () {
    if ($(this).val() === 'Rotterdam') {
        $('#wijken').show();
        $('#wijkenTwo').show();
    } else {
        $('#wijken').hide();
        $('#wijkenTwo').hide();
    }
});

(function ($) {
    $.fn.vAlign = function ($align, $type) {
        return this.each(function (i) {
            var ah = $(this).height();
            var ph = $(this).parent().height();

            switch ($align) {
                case 'top':
                    var mh = 0;
                    break;
                case 'middle':
                    var mh = Math.ceil((ph - ah) / 2);
                    break;
                case 'bottom':
                    var mh = Math.ceil(ph - ah);
                    break;
            }
            switch ($type) {
                case 'padding':
                    $(this).css('padding-top', mh);
                    break;
                case 'margin':
                default:
                    $(this).css('margin-top', mh);
                    break;

            }
        });
    };
})(jQuery);
