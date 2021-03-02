import { Handler } from 'express';
import { request, RequestOptions } from 'https';
import { Region, locale as locale } from '../Region';

const region = (process.env.AFTERPAY_REGION as Region) ?? Region.US;
const regionLocale = locale(region);

export function configuration(options: RequestOptions): Handler {
  return (req, res) => {
    const configOptions = {
      ...options,
      path: '/v2/configuration'
    };

    const configRequest = request(configOptions, (configRes) => {
      configRes.on('data', (d) => {
        const responseObject = JSON.parse(d);
        res.json({
          minimumAmount: responseObject.minimumAmount,
          maximumAmount: responseObject.maximumAmount,
          locale: regionLocale
        });
      });
    });

    configRequest.on('error', (e) => {
      console.log(e);
    });

    configRequest.end();
  };
}
