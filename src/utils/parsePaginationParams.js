const parseNumber = (number, defaultValue) => {
  const isString = typeof number === 'string';

  if (!isString) {
    return defaultValue;
  }
  const parsedNumber = parseInt(number);
  if (Number.isNaN(parsedNumber)) {
    return defaultValue;
  }
  return parsedNumber;
};

export const parsePaginationParems = (query) => {
  const { page, perPage } = query;

  const parsePage = parseNumber(page, 1);
  const parsePerPage = parseNumber(perPage, 12);

  return {
    page: parsePage,
    perPage: parsePerPage,
  };
};
