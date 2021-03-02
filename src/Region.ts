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

export function locale(region: Region): string {
  switch (region) {
    case Region.AU:
      return 'en_AU';
    case Region.CA:
      return 'en_CA';
    case Region.NZ:
      return 'en_NZ';
    case Region.US:
      return 'en_US';
    case Region.UK:
      return 'en_UK';
  }
}
