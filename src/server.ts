import bodyParser from 'body-parser';
import express from 'express';
import { RequestOptions } from 'https';
import { Region, configuration as regionConfiguraiton } from './Region';
import { configuration } from './routes/configuration';
import { checkout } from './routes/checkout';

const merchantId = process.env.AFTERPAY_MERCHANT_ID;
const secretKey = process.env.AFTERPAY_SECRET_KEY;

if (merchantId === undefined || secretKey === undefined) {
  console.error(
    'Please export both AFTERPAY_MERCHANT_ID and AFTERPAY_SECRET_KEY to your environment and restart the server'
  );

  process.exit(1);
}

const region = (process.env.AFTERPAY_REGION as Region) ?? Region.US;
const regionConfig = regionConfiguraiton(region);

const defaultOptions: RequestOptions = {
  auth: `${merchantId}:${secretKey}`,
  hostname: regionConfig.hostname
};

const port = 3000;

express()
  .use(bodyParser.json())
  .get('/configuration', configuration(defaultOptions))
  .post('/checkouts', checkout(regionConfig, defaultOptions))
  .listen(port, (err) => {
    if (err) {
      return console.error(err);
    }

    return console.log(`server is listening on ${port}`);
  });
