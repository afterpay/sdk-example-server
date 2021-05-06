function postToApp(message) {
  let app;

  try {
    app = window.webkit.messageHandlers.iOS;
  } catch { }

  if (typeof app === 'undefined' && typeof Android !== 'undefined') {
    app = Android;
  }

  if (typeof app !== 'undefined') {
    app.postMessage(message);
  }
}

/// Load the widget, and place it in the #afterpay-widget-container div.
///
/// One of `token` or `amount` must be provided. Use the `token` for tokened-mode, use `amount` for tokenless.
///
/// - token: checkout token. Use `null` for tokenless mode.
/// - amount: the total payment as a money object. eg: { "amount": "20.00", "currency": "USD" }. Only provide for tokenless mode, otherwise, use `null`.
/// - locale: locale to use in the widget.
/// - style: style options for the widget, eg: { "logo": true, "heading": false }.
function createAfterpayWidget(token, amount, locale, style) {

  new MutationObserver(() => {
      const height = document.getElementById("afterpay-widget-container").offsetHeight;
      if (height > 0) {
        postToApp(JSON.stringify({ "type": "resize", "size": height + 36 })); // plus extra px for margins
      }
    })
    .observe(
      document.getElementById('afterpay-widget-container'),
      { attributes: true, childList: true, subtree: true }
    );

  window.afterpayWidget = new AfterPay.Widgets.PaymentSchedule({
    token: token,
    target: "#afterpay-widget-container",
    locale: locale.replace("_", "-"),
    amount: amount,
    onReady: function (event) {
      sendToApp(event);
    },
    onChange: function (event) {
      sendToApp(event);
    },
    onError: function (event) {
      sendToApp(event);
    },
    style: {
      border: false,
      logo: style.logo,
      heading: style.heading,
    }
  });
}

function sendToApp(event) {
  const data = event.data;
  let completeData = {
    ...data,
    "type": event.type
  };

  if (typeof data.amountDueToday !== 'undefined') {
    completeData.amountDueToday = {
      "amount": data.amountDueToday.amount,
      "currency": data.amountDueToday.currency
    }
  }

  postToApp(JSON.stringify(completeData));
}

function updateAmount(amount) {
  window.afterpayWidget.update({
    amount: amount
  });
}

/// Returns the complete status update of the widget.
///
/// Rather than the SDK having to ask about each property individually in turn, this collects it into one.
function getWidgetStatus() {
  const widget = window.afterpayWidget;

  let data = {
    "isValid": widget.isValid,
    "paymentScheduleChecksum": widget.paymentScheduleChecksum,
    "error": widget.error
  }

  if (typeof widget.amountDueToday !== 'undefined') {
    data.amountDueToday = {
      "amount": widget.amountDueToday.amount,
      "currency": widget.amountDueToday.currency
    }
  }

  return JSON.stringify(data);
}