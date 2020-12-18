window.addEventListener("message", (event) => {
    let dataString = (typeof event.data) === 'string' ? event.data : JSON.stringify(event.data);
    window.webkit.messageHandlers.nativeApp.postMessage(dataString);
});

function postCheckoutMessage(message, targetOrigin) {
    window.checkoutWindow.postMessage(message, targetOrigin);
}

function openAfterpay(url) {
    window.checkoutWindow = window.open(url)
}
