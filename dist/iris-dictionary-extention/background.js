chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
  var port = chrome.tabs.connect(tabs[0].id);
  port.postMessage({ function: 'html' });
  port.onMessage.addListener(function (response) {
    var html = response.html;
    var title = response.title;
    var description = response.description;
  });
});


chrome.runtime.onInstalled.addListener(function () {
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [new chrome.declarativeContent.PageStateMatcher({
        pageUrl: {
          schemes: ['http', 'https']
        },
      })],
      actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
  });
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.message === 'closeExtension') {
    chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
      console.log("---------------")
      chrome.tabs.remove(tabs[0].id);
    });
  }
});


chrome.idle.onStateChanged.addListener(
  (browserActivityState) => {
    console.log('browserActivityState changed')
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0].url.match('https:\/\/.*.reddit.com\/.*')) {
        chrome.tabs.sendMessage(tabs[0].id, { browserActivityState: browserActivityState });
      }
    });
  }
)

function test(params) {
  console.log("MRM")
}

test()