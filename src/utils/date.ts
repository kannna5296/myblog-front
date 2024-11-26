export function formatDateString(dateString: string): string {
  const date = new Date(dateString);

  // ISO文字列からタイムゾーンオフセット(+09:00など)を取得
  const match = dateString.match(/([+-]\d{2}):(\d{2})$/);
  if (!match) {
    throw new Error('Invalid date format with timezone offset');
  }

  const offsetHours = parseInt(match[1], 10); // +09や-05などを数値に
  const offsetMinutes = parseInt(match[2], 10);
  const offsetMilliseconds = (offsetHours * 60 + offsetMinutes) * 60 * 1000;

  // UTC基準の時間から指定タイムゾーンの時間を計算
  const localTime = new Date(date.getTime() + offsetMilliseconds);

  // 年月日、時間などを取得
  const year = localTime.getFullYear();
  const month = localTime.getMonth() + 1;
  const day = localTime.getDate();
  let hours = localTime.getHours();
  const minutes = localTime.getMinutes();

  // AM/PMの判定
  const period = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12 || 12; // 12時間制に変換

  // フォーマット整形
  return `${year}年${month}月${day}日 ${hours}:${minutes.toString().padStart(2, '0')} ${period}`;
}

export default formatDateString;
