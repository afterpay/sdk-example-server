import { Handler } from 'express';
import { regionConfig } from '../config/Region';
import HttpClient from '../config/HttpClient';

export const post: Handler = async (req, res) => {
  const { email, amount, mode, isCashAppPay } = req.body;

  if (email === undefined) {
    throw new Error('Expected email in request body');
  }

  if (amount === undefined) {
    throw new Error('Expected amount in request body');
  }

  const body = {
    amount: {
      amount: amount,
      currency: regionConfig.currency
    },
    consumer: {
      email: email
    },
    merchant: {
      redirectConfirmUrl: 'https://example.com/some/path/confirm',
      redirectCancelUrl: 'https://example.com/some/path/cancel',
      popupOriginUrl: 'https://static.afterpay.com'
    },
    mode: mode,
    isCashAppPay: isCashAppPay || false
  };

  const bodyData = JSON.stringify(body);

  const checkoutOptions = {
    path: '/v2/checkouts',
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(bodyData),
      'User-Agent': 'Mobile SDK Example Server'
    }
  };

  const checkoutRequest = HttpClient.request(checkoutOptions, (configRes) => {
    configRes.on('data', (d) => {
      const responseObject = JSON.parse(d);

      if (responseObject.errorCode !== undefined) {
        console.log(responseObject);
        res.json({
          errorCode: responseObject.errorCode,
          message: responseObject.message
        });
      } else {
        res.json({
          token: responseObject.token,
          url: responseObject.redirectCheckoutUrl
        });
      }
    });
  });

  checkoutRequest.on('error', (e) => {
    console.log(e);
  });

  checkoutRequest.write(bodyData);

  checkoutRequest.end();
};
