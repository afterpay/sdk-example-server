import { Handler } from 'express';
import { RegionConfiguration } from '../Region';
import { request, RequestOptions } from 'https';

export function checkout(configuration: RegionConfiguration, options: RequestOptions): Handler {
  return (req, res) => {
    const email = req.body.email;

    if (email === undefined) {
      throw new Error('Expected email in request body');
    }

    const body = {
      amount: {
        amount: '100.00',
        currency: configuration.currency
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
