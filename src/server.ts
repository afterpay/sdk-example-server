import bodyParser from 'body-parser';
import express from 'express';
import fs from 'fs';
import http from 'http';
import https from 'https';
import path from 'path';
import { Region, locale, configuration as regionConfiguration } from './Region';
import { configuration } from './routes/configuration';
import { checkout } from './routes/checkout';
import * as dotenv from 'dotenv';

dotenv.config({ override: true });

const merchantId = process.env.AFTERPAY_MERCHANT_ID;
const secretKey = process.env.AFTERPAY_SECRET_KEY;

if (merchantId === undefined || secretKey === undefined) {
  console.error(
    'Please export both AFTERPAY_MERCHANT_ID and AFTERPAY_SECRET_KEY to your environment and restart the server'
  );

  process.exit(1);
}

const region = (process.env.AFTERPAY_REGION as Region) ?? Region.US;
const regionConfig = regionConfiguration(region);

const defaultOptions: https.RequestOptions = {
  auth: `${merchantId}:${secretKey}`,
  hostname: 'global-api-sandbox.afterpay.com'
};

const certificates = {
  key: fs.readFileSync(path.join('config', 'server.key')),
  cert: fs.readFileSync(path.join('config', 'server.crt'))
};

const app = express()
  .use(bodyParser.json())
  .get('/configuration', configuration(locale(region), defaultOptions))
  .post('/checkouts', checkout(regionConfig, defaultOptions));

const httpPort = 3000;
http.createServer(app).listen(httpPort, () => {
  console.log(`server is listening on http://localhost:${httpPort}`);
});

const httpsPort = 3001;
https.createServer(certificates, app).listen(httpsPort, () => {
  console.log(`server is listening on https://localhost:${httpsPort}`);
});
