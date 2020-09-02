export const getRequest = url => {
  return fetch(url)
    .then(response => response.json())
    .then(responseJSON => {
      return responseJSON;
    });
};
export const sort = (a, b, isNullLast, isAscending) => {
  if (a === b) {
    return 0;
  } else if (a === null) {
    return isNullLast ? 1 : -1;
  } else if (b === null) {
    return isNullLast ? -1 : 1;
  } else if (isAscending) {
    return a < b ? -1 : 1;
  } else {
    return a < b ? 1 : -1;
  }
};
export const formatCurrency = (value, locale, currency) => {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency
  }).format(value);
};
