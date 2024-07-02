import { request as httpsRequest, RequestOptions as httpsRequestOptions } from 'https';
import { IncomingMessage, ClientRequest } from 'http';
import { LOGGER } from '../Logger';

const merchantId = process.env.AFTERPAY_MERCHANT_ID;
const secretKey = process.env.AFTERPAY_SECRET_KEY;
const hostname = process.env.AFTERPAY_API_HOSTNAME || 'global-api-sandbox.afterpay.com';

if (merchantId === undefined || secretKey === undefined) {
  LOGGER.error(
    'Please export both AFTERPAY_MERCHANT_ID and AFTERPAY_SECRET_KEY to your environment and restart the server'
  );

  process.exit(1);
}

const defaultOpts: httpsRequestOptions = {
  auth: `${merchantId}:${secretKey}`,
  hostname
};

export default class HttpClient {
  static request(
    options: httpsRequestOptions,
    callback: (res: IncomingMessage) => void
  ): ClientRequest {
    const requestOptions: httpsRequestOptions = {
      ...defaultOpts,
      ...options
    };

    return httpsRequest(requestOptions, callback);
  }
}
