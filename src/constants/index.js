import path from "node:path";

export const SORT_ORDER = ['asc', 'desc'];
export const SORT_BY_KEYS = {
  CATEGORY: '',
  INGRADIENT: '',
  RECIPES_NAME: ''
};

const FIFTEEN_MINUTES = 15 * 60 * 1000;
const THIRTY_DAY = 30 * 24 * 60 * 60 * 1000;

export const TIME_ACCESS_TOKEN = new Date(Date.now() + FIFTEEN_MINUTES);
export const TIME_REFRESH_TOKEN = new Date(Date.now() + THIRTY_DAY);

export const SWAGGER_PATH = path.join(process.cwd(), 'docs', 'swagger.json');