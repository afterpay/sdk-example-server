import { Handler } from 'express';
import { regionConfig } from '../config/Region';
import HttpClient from '../config/HttpClient';
import { LOGGER } from '../Logger';

export const post: Handler = async (req, res) => {
  const { email, amount, mode, isCashAppPay } = req.body;

  if (email === undefined) {
    LOGGER.error('Expected email in request body');
    throw new Error('Expected email in request body');
  }

  if (amount === undefined) {
    LOGGER.error('Expected amount in request body');
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

  LOGGER.debug('Checkout request body:', body);

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

  LOGGER.debug('Checkout request options', checkoutOptions);

  const checkoutRequest = HttpClient.request(checkoutOptions, (checkoutRes) => {
    const body: Buffer[] = [];

    checkoutRes.on('data', (chunk) => {
      LOGGER.debug('Checkout response chunk', chunk.toString());
      body.push(chunk);
    });

    checkoutRes.on('end', () => {
      const finalBody = Buffer.concat(body).toString();
      const responseObject = JSON.parse(finalBody);

      if (responseObject.errorCode !== undefined) {
        LOGGER.error('Checkout response error', responseObject);

        res.json({
          errorCode: responseObject.errorCode,
          message: responseObject.message
        });
      } else {
        LOGGER.info('Checkout response', responseObject);

        res.json({
          token: responseObject.token,
          url: responseObject.redirectCheckoutUrl
        });
      }
    });
  });

  checkoutRequest.on('error', (e) => {
    LOGGER.error('Checkout request error', e);
  });

  checkoutRequest.write(bodyData, (error) => {
    LOGGER.info('Writing checkout request');

    if (error) LOGGER.error('Error writing body data to checkout request', error);
  });

  checkoutRequest.end(() => LOGGER.info('Finished writing checkout request'));
};
