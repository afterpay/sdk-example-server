export enum Region {
  EN_AU = 'en-AU',
  EN_CA = 'en-CA',
  FR_CA = 'fr-CA',
  EN_NZ = 'en-NZ',
  EN_US = 'en-US',
  EN_UK = 'en-UK',
  FR_FR = 'fr-FR',
  IT_IT = 'it-IT',
  ES_ES = 'es-ES'
}

export type RegionConfiguration = {
  currency: string;
};

export function configuration(region: Region): RegionConfiguration {
  switch (region) {
    case Region.EN_AU:
      return { currency: 'AUD' };
    case Region.EN_CA:
    case Region.FR_CA:
      return { currency: 'CAD' };
    case Region.EN_NZ:
      return { currency: 'NZD' };
    case Region.EN_US:
      return { currency: 'USD' };
    case Region.EN_UK:
      return { currency: 'GBP' };
    case Region.FR_FR:
    case Region.IT_IT:
    case Region.ES_ES:
      return { currency: 'EUR' };
  }
}

export type Locale = {
  identifier: string;
  language: string;
  country: string;
};

export function locale(region: Region): Locale {
  switch (region) {
    case Region.EN_AU:
      return { identifier: 'en_AU', language: 'en', country: 'AU' };
    case Region.EN_CA:
      return { identifier: 'en_CA', language: 'en', country: 'CA' };
    case Region.FR_CA:
      return { identifier: 'fr_CA', language: 'fr', country: 'CA' };
    case Region.EN_NZ:
      return { identifier: 'en_NZ', language: 'en', country: 'NZ' };
    case Region.EN_US:
      return { identifier: 'en_US', language: 'en', country: 'US' };
    case Region.EN_UK:
      return { identifier: 'en_GB', language: 'en', country: 'GB' };
    case Region.FR_FR:
      return { identifier: 'fr_FR', language: 'fr', country: 'FR' };
    case Region.IT_IT:
      return { identifier: 'it_IT', language: 'it', country: 'IT' };
    case Region.ES_ES:
      return { identifier: 'es_ES', language: 'es', country: 'ES' };
  }
}
