export function calculatePaginationData(count, perPage, page) {
  const totalPage = Math.ceil(count / perPage);
  const hasNextPage = Boolean(totalPage - page);
  const hasPrevPage = page !== 1;

  return {
    page,
    perPage,
    totalItems: count,
    totalPage,
    hasNextPage,
    hasPrevPage,
  };
}
