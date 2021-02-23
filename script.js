window.addEventListener("message", (event) => {
  const dataString = (typeof event.data) === 'string' ? event.data : JSON.stringify(event.data);
  let app;

  try {
    app = window.webkit.messageHandlers.iOS;
  } catch { }

  if (typeof app === 'undefined' && typeof Android !== 'undefined') {
    app = Android;
  }

  if (typeof app !== 'undefined') {
    app.postMessage(dataString);
  }
});

let checkoutUrl;

function openCheckout(json) {
  const checkout = JSON.parse(json);
  const environment = checkout.environment;
  const version = checkout.version;
  let [language, region] = checkout.locale.split('_').map((string) => string.toLowerCase());
  region = region === 'gb' ? 'uk' : region;

  const baseUrl = makeBaseUrl(region, environment);
  const query = [
    '?isWindowed=true',
    `&token=${checkout.token}`,
    (typeof checkout.buyNow === 'boolean') ? `&buyNow=${checkout.buyNow}` : '',
    (typeof checkout.pickup === 'boolean') ? `&pickup=${checkout.pickup}` : '',
    (typeof checkout.shippingOptionRequired === 'boolean') ? `&shippingOptionRequired=${checkout.shippingOptionRequired}` : '',
    `&sdk=${version}`
  ].join('');

  checkoutUrl = baseUrl + query;

  window.checkoutWindow = window.open(checkoutUrl);
}

const afterpayRegions = ['au', 'nz', 'us', 'ca'];
const clearpayRegions = ['uk'];

function makeBaseUrl(region, environment) {
  const prefix = environment == 'sandbox' ? 'portal.sandbox.' : 'portal.';
  const endpoint = (() => {
    if (afterpayRegions.includes(region)) {
      return 'afterpay.com';
    } else if (clearpayRegions.includes(region)) {
      return 'clearpay.co.uk';
    } else {
      throw 'Region: ' + region + ' is unsupported';
    }
  })();

  return `https://${prefix}${endpoint}/${region}/checkout/`
}

function postMessageToCheckout(json) {
  let message = JSON.parse(json);
  window.checkoutWindow.postMessage(message, checkoutUrl);
}
