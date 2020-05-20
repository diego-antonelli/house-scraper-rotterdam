### House Scraper Rotterdam ###
This project uses typescript and node to scrap houses/apartments in the city of Rotterdam ruling a budget limit (Just apartments that fits your pocket will be notified).
It scraps in around 20 websites of agencies in Rotterdam area (Netherlands).

The "system" uses Node, Typescript, Express and MongoDB to perform the scrap.

#### How to configure ####
1 - Setup your environment creating a .env file or defining the following environment variables:
```bash
MONGO_URI=YOUR_MONGO_URI
DATABASE=YOUR_DATABASE_NAME
NODE_ENV=production
SMTP_ADDRESS=YOUR_SMTP_SERVER
SMTP_PORT=YOUR_SMTP_PORT
SMTP_EMAIL=YOUR_SMTP_EMAIL
SMTP_PASSWORD=YOUR_SMTP_PASSWORD
```

2 - Create the following collections inside your MongoDB
- apartments
- recipients

3 - Add recipients manually to the DB (we didn't expose any endpoint for it yet, feel free for open PRs) following the example below:
```json
{
  "email": "myemail@mydomain.com",
  "maxPrice": 2000
}
```


4 - Define your own cron configs inside `src/server.ts`. Nowadays we only scraps Mon-Fri from 06AM till 10PM every 2 hours.

### How to run ###
We use PM2 to run the server (Express) in multiple cores and use full capacity of the machines. To run, just execute `npm start` in your terminal. To kill pm2 process just execute `npm run stop`. To see logs related to the server use `npm run logs`. If you are running locally execute `npm run dev`.

### How to contribute ###
Few free to open PRs to improve this repo.