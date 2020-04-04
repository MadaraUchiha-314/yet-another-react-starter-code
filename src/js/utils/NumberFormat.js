/* eslint-disable */
export function addCurrencyFormatting(locale, currency, cSymbol) {
  Number.prototype.formatCurrency = function (isDecimal, currencySymbolOverride) {
    /*
     * If Intl library is present then humanity is saved!
     */
    if (Intl) {
      const options = {
        style: 'currency',
        currency,
      };
      const currencyLocale = locale;
      /*
       * Fixing the decimals as the come
       */
      if (!isDecimal) {
        options.maximumFractionDigits = 0;
        options.minimumFractionDigits = 0;
      } else {
        options.maximumFractionDigits = 2;
        options.minimumFractionDigits = 2;
      }
      return Intl.NumberFormat(currencyLocale, options).format(this);
    }
    const negative = this < -0.001;
    const abs = this.abs();
    let currencySymbol = '$';
    if (currencySymbolOverride) {
      currencySymbol = currencySymbolOverride;
    } else {
      currencySymbol = cSymbol;
    }

    return (
      (negative ? '\u2013' : '') +
      abs.format(abs < 10 || isDecimal ? currencySymbol + '0,0.00' : currencySymbol + '0,0')
    );
  };

  Number.prototype.formatNumber = function (isDecimal) {
    /*
     * If Intl library is present then humanity is saved!
     */
    if (Intl) {
      const currencyLocale = locale;
      const options = {};
      /*
       * Fixing the decimals as the come
       */
      if (!isDecimal) {
        options.maximumFractionDigits = 0;
        options.minimumFractionDigits = 0;
      } else {
        options.maximumFractionDigits = 2;
        options.minimumFractionDigits = 2;
      }
      return Intl.NumberFormat(currencyLocale, options).format(this);
    }
    const negative = this < -0.001;
    const abs = this.abs();

    return (negative ? '\u2013' : '') + abs.format(abs < 10 || isDecimal ? '0,0.00' : '0,0');
  };
}

export function maskPIIData() {
  Number.prototype.formatCurrency = function () {
    return 'XXX';
  };

  Number.prototype.formatNumber = function () {
    return 'XXX';
  };
}
/* eslint-enable */
