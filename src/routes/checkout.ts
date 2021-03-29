import { Handler } from 'express';
import { RegionConfiguration } from '../Region';
import { request, RequestOptions } from 'https';

export function checkout(configuration: RegionConfiguration, options: RequestOptions): Handler {
  return (req, res) => {
    const { email, amount, mode } = req.body;

    if (email === undefined) {
      throw new Error('Expected email in request body');
    }

    if (amount === undefined) {
      throw new Error('Expected amount in request body');
    }

    const body = {
      amount: {
        amount: amount,
        currency: configuration.currency
      },
      consumer: {
        email: email
      },
      merchant: {
        redirectConfirmUrl: 'https://example.com/some/path/confirm',
        redirectCancelUrl: 'https://example.com/some/path/cancel',
        popupOriginUrl: 'https://static.afterpay.com'
      },
      mode: mode
    };

    const bodyData = JSON.stringify(body);

    const checkoutOptions = {
      ...options,
      path: '/v2/checkouts',
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(bodyData)
      }
    };

    const checkoutRequest = request(checkoutOptions, (configRes) => {
      configRes.on('data', (d) => {
        const responseObject = JSON.parse(d);
        res.json({
          token: responseObject.token,
          url: responseObject.redirectCheckoutUrl
        });
      });
    });

    checkoutRequest.on('error', (e) => {
      console.log(e);
    });

    checkoutRequest.write(bodyData);

    checkoutRequest.end();
  };
}
