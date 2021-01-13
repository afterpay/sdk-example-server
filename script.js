window.addEventListener("message", (event) => {
    let dataString = (typeof event.data) === 'string' ? event.data : JSON.stringify(event.data);
    var app

    try {
      app = window.webkit.messageHandlers.iOS;
    } catch {}

    if (typeof app === 'undefined' && typeof Android !== 'undefined') {
      app = Android;
    }

    if (typeof app !== 'undefined') {
      app.postMessage(dataString);
    }
});

function postCheckoutMessage(message, targetOrigin) {
    window.checkoutWindow.postMessage(message, targetOrigin);
}

function openAfterpay(url) {
    window.checkoutWindow = window.open(url)
}
