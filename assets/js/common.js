import CONST from './CONST';

/**
 * カテゴリ名を取得する
 */
export const getCategoryName = (id) => {
  for (let i = 0; i < CONST.CATEGORY_CODE.length; i += 1) {
    const category = CONST.CATEGORY_CODE[i];
    if (id === category.code) {
      return category.name;
    }
  }
  return '';
};
