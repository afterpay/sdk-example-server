import { Region, locale as localeFromRegion, configuration as regionConfiguration } from '../Region';

export const region = (process.env.AFTERPAY_REGION as Region) ?? Region.EN_US;
export const regionConfig = regionConfiguration(region);
export const locale = localeFromRegion(region)
