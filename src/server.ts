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

enum Region {
  AU = 'AU',
  NZ = 'NZ',
  US = 'US'
}

type RegionConfiguration = {
  hostname: string;
  currency: string;
};

const regionConfig = ((): RegionConfiguration => {
  const region = (process.env.AFTERPAY_REGION as Region) ?? Region.US;

  switch (region) {
    case Region.AU:
      return { hostname: 'api-sandbox.afterpay.com', currency: 'AUD' };
    case Region.NZ:
      return { hostname: 'api-sandbox.afterpay.com', currency: 'NZD' };
    case Region.US:
      return { hostname: 'api.us-sandbox.afterpay.com', currency: 'USD' };
  }
})();

const sharedOptions: https.RequestOptions = {
  auth: [merchantId, secretKey].join(':'),
  hostname: regionConfig.hostname
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
  const email = req.body.email;

  if (email === undefined) {
    throw new Error('Expected email in request body');
  }

  const body = {
    amount: {
      amount: '100.00',
      currency: regionConfig.currency
    },
    consumer: {
      email: email
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
