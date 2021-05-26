export function round(num: number, roundUpTo: number) {
    const divisor = Math.pow(10, roundUpTo);
    return Math.round((num + Number.EPSILON) * divisor) / divisor;
}
