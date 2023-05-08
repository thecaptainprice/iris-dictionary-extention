var pageContent = document.documentElement.outerHTML;

chrome.runtime.onConnect.addListener(function (port) {
  port.onMessage.addListener(function (msg) {
    if (msg.function == 'html') {
      port.postMessage({ html: document.documentElement.outerHTML, description: document.querySelector("meta[name=\'description\']").getAttribute('content'), title: document.title });
    }
  });
});
