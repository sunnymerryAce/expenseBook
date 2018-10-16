/**
 * 日付と設定開始日から当月(YYYYMM)を取得する
 * ex. 25日が設定開始日の場合
 *     2018/8/25-2018/9/24は'201809'を返す
 * @param {*} date
 */
export const getYYYYMM = (today, startMonthDate) => {
  let dummy = new Date();
  if (today.getDate() >= startMonthDate) {
    // 設定開始日以降のとき、翌月を設定
    dummy.setMonth(today.getMonth() + 1);
  } else {
    // 設定開始日以前は当月を設定
    dummy.setMonth(today.getMonth());
  }
  const month =
    dummy.getMonth() + 1 < 10
      ? `0${dummy.getMonth() + 1}`
      : `${dummy.getMonth() + 1}`;
  return `${today.getFullYear()}${month}`;
};

/**
 * 現在日時を取得し、年月日のみのDateオブジェクトを取得する
 */
export const getDateOfThisMonth = () => {
  const now = new Date();
  now.setHours(0);
  now.setMinutes(0);
  now.setSeconds(0);
  now.setMilliseconds(0);
  return now;
};
