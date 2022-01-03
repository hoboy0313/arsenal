(() => {
  const script = document.createElement('script');
  script.src = chrome.runtime.getURL('libs/importer.js');
  script.type = 'module';
  document.body.appendChild(script);
  document.body.removeChild(script);
})();
