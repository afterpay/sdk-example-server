export enum Region {
  AU = 'AU',
  CA = 'CA',
  NZ = 'NZ',
  US = 'US',
  UK = 'UK'
}

export type RegionConfiguration = {
  currency: string;
};

export function configuration(region: Region): RegionConfiguration {
  switch (region) {
    case Region.AU:
      return { currency: 'AUD' };
    case Region.CA:
      return { currency: 'CAD' };
    case Region.NZ:
      return { currency: 'NZD' };
    case Region.US:
      return { currency: 'USD' };
    case Region.UK:
      return { currency: 'GBP' };
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
      return { identifier: 'en_GB', language: 'en', country: 'GB' };
  }
}
