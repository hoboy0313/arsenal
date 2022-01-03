import {
  strong, info, error, success,
} from './logger';

interface CDNResultResponse {
  available: number;
  total: number;
  results: Array<{
    name: string,
    latest: string;
  }>
}

const createBeforeLoad = (name: string) => () => {
  info(strong(name), ' is loading, please be patient...');
};

const createAfterLoad = (name: string) => () => {
  success(strong(name), ' is loaded.');
};

const createLoadError = (name: string) => () => {
  error(strong(name), ' There appears to be some trouble with your network. ');
};

// Insert script tag
function injectScript(url: string, onload: GlobalEventHandlers['onload'], onerror: GlobalEventHandlers['onerror']) {
  const script = document.createElement('script');
  script.src = url;
  script.onload = onload;
  script.onerror = onerror;
  document.body.appendChild(script);
  document.body.removeChild(script);
}

export const inject = (
  url: string,
  beforeLoad = createBeforeLoad(url),
  afterLoad = createAfterLoad(url),
  loadError = createLoadError(url),
) => {
  beforeLoad();

  return injectScript(url, afterLoad, loadError);
};

export const cdnJs = (name: string) => {
  info('Searching for ', strong(name), ' wait...');
  fetch(`https://api.cdnjs.com/libraries?search=${name}`, {
    referrerPolicy: 'no-referrer',
  }).then(res => res.json())
    .then(({ results }: CDNResultResponse) => {
      if (results.length === 0) {
        error('The ', strong(name), ' not found, please try another keyword.');
        return;
      }
      const { latest: url } = results[0];
      inject(url);
    }).catch(() => {
      error('There appears to be some trouble with your network. ');
    });
};
