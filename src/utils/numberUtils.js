/**
 * 将数字格式化为缩略形式
 * 例如：1200 -> 1.2k, 1500000 -> 1.5M
 * @param {number} num - 要格式化的数字
 * @param {number} decimals - 小数位数，默认1位
 * @returns {string}
 */
function formatNumber(num, decimals = 1) {
    if (num === null || num === undefined) return '0';
    if (num < 1000) return num.toString();

    const units = [
        { value: 1e9, symbol: 'B' },
        { value: 1e6, symbol: 'M' },
        { value: 1e3, symbol: 'k' }
    ];

    for (let i = 0; i < units.length; i++) {
        if (num >= units[i].value) {
            return (num / units[i].value).toFixed(decimals).replace(/\.0+$/, '') + units[i].symbol;
        }
    }

    return num.toString();
}

/**
 * 格式化百分比
 * 例如：0.123 -> 12.3%
 * @param {number} num 
 * @param {number} decimals - 小数位数
 * @returns {string}
 */
function formatPercent(num, decimals = 1) {
    if (num === null || num === undefined) return '0%';
    return (num * 100).toFixed(decimals).replace(/\.0+$/, '') + '%';
}

/**
 * 千分位格式化
 * 例如：1234567 -> "1,234,567"
 * @param {number} num 
 * @returns {string}
 */
function formatThousand(num) {
    if (num === null || num === undefined) return '0';
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

// 导出
export default {
    formatNumber,
    formatPercent,
    formatThousand
};