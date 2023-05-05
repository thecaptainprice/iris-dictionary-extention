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

chrome.alarms.onAlarm.addListener((...args) => {
  console.warn('Found chrome alarm! >>> ', args);

});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.message === 'closeExtension') {
    chrome.tabs.getCurrent(function (tab) {
      chrome.tabs.remove(tab.id);
    });
  }
});