export function compareDate(date) {
  return new Date(date).getTime() < Date.now();
}