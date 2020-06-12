import bodyParser from 'body-parser';
import express from 'express';
import https from 'https';

const merchantId = process.env.AFTERPAY_MERCHANT_ID;
const secretKey = process.env.AFTERPAY_SECRET_KEY;

if (merchantId === undefined || secretKey === undefined) {
  console.error(
    'Please export both AFTERPAY_MERCHANT_ID and AFTERPAY_SECRET_KEY to your environment and restart the server'
  );

  process.exit(1);
}

// Accepts US, AU or NZ with US as the default if unspecified
const region = process.env.AFTERPAY_REGION;
let hostname = '';
let currency = '';

switch (region) {
  case 'AU':
    hostname = 'api-sandbox.afterpay.com';
    currency = 'AUD';
    break;
  case 'NZ':
    hostname = 'api-sandbox.afterpay.com';
    currency = 'NZD';
    break;
  case 'US':
  default:
    hostname = 'api.us-sandbox.afterpay.com';
    currency = 'USD';
}

const sharedOptions: https.RequestOptions = {
  auth: [merchantId, secretKey].join(':'),
  hostname: hostname
};

const app = express();

app.use(bodyParser.json());

app.get('/configuration', (req, res) => {
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

app.post('/checkouts', (req, res) => {
  const body = {
    amount: {
      amount: '63.00',
      currency: currency
    },
    consumer: {
      givenNames: 'Joe',
      surname: 'Consumer',
      email: 'test@afterpay.com'
    },
    merchant: {
      redirectConfirmUrl: 'https://www.afterpay-merchant.com/confirm',
      redirectCancelUrl: 'https://www.afterpay-merchant.com/cancel'
    }
  };

  const bodyData = JSON.stringify(body);

  const options = sharedOptions;
  options.path = '/v2/checkouts';
  options.method = 'POST';
  options.headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(bodyData)
  };

  const checkoutsReq = https.request(options, (configRes) => {
    configRes.on('data', (d) => {
      const responseObject = JSON.parse(d);
      res.json({
        url: responseObject.redirectCheckoutUrl
      });
    });
  });

  checkoutsReq.on('error', (e) => {
    console.log(e);
  });

  checkoutsReq.write(bodyData);

  checkoutsReq.end();
});

const port = 3000;

app.listen(port, (err) => {
  if (err) {
    return console.error(err);
  }

  return console.log(`server is listening on ${port}`);
});
