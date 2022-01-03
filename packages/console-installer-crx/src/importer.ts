import { cdnJs, inject } from './download';

const isHttp = (url: string) => /^https?:\/\//.test(url);

/**
 * download entry
 * @param {string} pkgName
 */
function importer(pkgName: any) {
  if (typeof pkgName !== 'string') {
    throw new TypeError('Argument should be a string, please check it.');
  }

  const name = pkgName.trim();

  if (isHttp(pkgName)) {
    return inject(pkgName);
  }

  return cdnJs(name);
}

if (window) {}
window.$i = importer;
