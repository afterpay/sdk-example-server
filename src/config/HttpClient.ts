import { request as httpsRequest, RequestOptions as httpsRequestOptions } from 'https';
import { IncomingMessage } from 'http';

const merchantId = process.env.AFTERPAY_MERCHANT_ID;
const secretKey = process.env.AFTERPAY_SECRET_KEY;
const hostname = process.env.AFTERPAY_API_HOSTNAME || 'global-api-sandbox.afterpay.com';

const defaultOpts: httpsRequestOptions = {
  auth: `${merchantId}:${secretKey}`,
  hostname
}

export default class HttpClient {
  static request(options: httpsRequestOptions, callback: (res: IncomingMessage) => void) {
    const requestOptions: httpsRequestOptions = {
      ...defaultOpts,
      ...options
    };

    return httpsRequest(requestOptions, callback);
  }
}
