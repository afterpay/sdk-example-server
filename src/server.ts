import bodyParser from 'body-parser';
import express from 'express';
import fs from 'fs';
import https from 'https';
import path from 'path';
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

const defaultOptions: https.RequestOptions = {
  auth: `${merchantId}:${secretKey}`,
  hostname: regionConfig.hostname
};

const port = 3000;

const certificates = {
  key: fs.readFileSync(path.join('config', 'server.key')),
  cert: fs.readFileSync(path.join('config', 'server.crt'))
};

const app = express()
  .use(bodyParser.json())
  .get('/configuration', configuration(defaultOptions))
  .post('/checkouts', checkout(regionConfig, defaultOptions));

https.createServer(certificates, app).listen(port, () => {
  return console.log(`server is listening on ${port}`);
});
