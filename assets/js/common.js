/**
 * Dateオブジェクトから年月(YYYYMM)を取得する
 * @param {*} date
 */
export const getYYYYMM = (date) => {
  const year = date.getFullYear(),
    month =
      date.getMonth() + 1 < 10
        ? `0${date.getMonth() + 1}`
        : `${date.getMonth() + 1}`;
  return `${year}${month}`;
};
