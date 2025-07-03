import path from "node:path";

export const SORT_ORDER = ['asc', 'desc'];
export const SORT_BY_KEYS = {
  CATEGORY: '',
  INGRADIENT: '',
  RECIPES_NAME: ''
};

export const FIFTEEN_MINUTES = 15 * 60 * 1000;
export const THIRTY_DAY = 30 * 24 * 60 * 60 * 1000;


export const SWAGGER_PATH = path.join(process.cwd(), 'docs', 'swagger.json');