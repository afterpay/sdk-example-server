import express from 'express';
import https from 'https';
import { RequestOptions } from 'https';

const merchantId = process.env.AFTERPAY_MERCHANT_ID;
const secretKey = process.env.AFTERPAY_SECRET_KEY;

if (merchantId === undefined || secretKey === undefined) {
  console.error(
    'Please export both AFTERPAY_MERCHANT_ID and AFTERPAY_SECRET_KEY to your environment and restart the server'
  );

  process.exit(1);
}

const sharedOptions: RequestOptions = {
  auth: [merchantId, secretKey].join(':'),
  hostname: 'api.us-sandbox.afterpay.com'
};

const app = express();

app.get('/', (req, res) => {
  const options = sharedOptions;
  options.path = '/v2/configuration';

  const configReq = https.request(options, (configRes) => {
    configRes.on('data', (d) => {
      res.json(JSON.parse(d));
    });
  });

  configReq.on('error', (e) => {
    console.log(e);
  });

  configReq.end();
});

const port = 3000;

app.listen(port, (err) => {
  if (err) {
    return console.error(err);
  }

  return console.log(`server is listening on ${port}`);
});
