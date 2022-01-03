import tiza from 'tiza';

const prefixText = 'HBoy';

const infoColor = '#42A5F5';
const successColor = '#43A047';
const warnColor = '#F57C00';
const errorColor = '#f5222d';

export const base = (bgColor: string) => tiza.color(bgColor).text;
export const strong = tiza.color(infoColor).bold().text;

const log = function log(bgColor: string, type: string) {
  return function _log(...data: any[]) {
    tiza.log(base(bgColor)(`[${prefixText} ${type}]: `), ...data);
  };
};

export const info = log(infoColor, 'info');

export const success = log(successColor, 'success');

export const warn = log(warnColor, 'warn');

export const error = log(errorColor, 'error');
