export enum Region {
  AU = 'AU',
  CA = 'CA',
  NZ = 'NZ',
  US = 'US',
  UK = 'UK'
}

export type RegionConfiguration = {
  hostname: string;
  currency: string;
};

export function configuration(region: Region): RegionConfiguration {
  switch (region) {
    case Region.AU:
      return { hostname: 'api-sandbox.afterpay.com', currency: 'AUD' };
    case Region.CA:
      return { hostname: 'api.us-sandbox.afterpay.com', currency: 'CAD' };
    case Region.NZ:
      return { hostname: 'api-sandbox.afterpay.com', currency: 'NZD' };
    case Region.US:
      return { hostname: 'api.us-sandbox.afterpay.com', currency: 'USD' };
    case Region.UK:
      return { hostname: 'api.eu-sandbox.afterpay.com', currency: 'GBP' };
  }
}

export type Locale = {
  identifier: string;
  language: string;
  country: string;
};

export function locale(region: Region): Locale {
  switch (region) {
    case Region.AU:
      return { identifier: 'en_AU', language: 'en', country: 'AU' };
    case Region.CA:
      return { identifier: 'en_CA', language: 'en', country: 'CA' };
    case Region.NZ:
      return { identifier: 'en_NZ', language: 'en', country: 'NZ' };
    case Region.US:
      return { identifier: 'en_US', language: 'en', country: 'US' };
    case Region.UK:
      return { identifier: 'en_UK', language: 'en', country: 'UK' };
  }
}
