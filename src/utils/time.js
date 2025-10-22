export function formatTimeAgo(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  const diff = (now - date) / 1000; // 秒差

  if (diff < 60) {
    return '刚刚';
  } else if (diff < 3600) {
    const minutes = Math.floor(diff / 60);
    return `${minutes}分钟前`;
  } else if (diff < 86400) {
    const hours = Math.floor(diff / 3600);
    return `${hours}小时前`;
  } else if (diff < 86400 * 7) {
    const days = Math.floor(diff / 86400);
    return `${days}天前`;
  } else {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    // 如果同一年，就不显示年份
    if (year === now.getFullYear()) {
      return `${month}月${day}日`;
    } else {
      return `${year}年${month}月${day}日`;
    }
  }
}
