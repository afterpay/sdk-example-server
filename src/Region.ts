export enum Region {
  AU = 'AU',
  NZ = 'NZ',
  US = 'US'
}

export type RegionConfiguration = {
  hostname: string;
  currency: string;
};

export function configuration(region: Region): RegionConfiguration {
  switch (region) {
    case Region.AU:
      return { hostname: 'api-sandbox.afterpay.com', currency: 'AUD' };
    case Region.NZ:
      return { hostname: 'api-sandbox.afterpay.com', currency: 'NZD' };
    case Region.US:
      return { hostname: 'api.us-sandbox.afterpay.com', currency: 'USD' };
  }
}
