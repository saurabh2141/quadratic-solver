function Matrix(m, n, d) {
    return Array.from({ length: m }, () => Array(n).fill(d));
}
function split(v) {
    const x = v * 134217729;
    const y = v - x;
    const hi = y + x;
    const lo = v - hi;
    return [hi, lo];
}
function getDiscriminant(a, b, c) {
    let D = b * b - a * c;
    const E = b * b + a * c;
    if (Math.abs(D) * 3 < E) {
        const [ad0, ad1] = split(a);
        const [bd0, bd1] = split(b);
        const [cd0, cd1] = split(c);
        const p = b * b;
        const dp = (bd0 * bd0 - p + 2 * bd0 * bd1) + bd1 * bd1;
        const q = a * c;
        const dq = (ad0 * cd0 - q + ad0 * cd1 + ad1 * cd0) + ad1 * cd1;
        D = (p - q) + (dp - dq);
    }
    return D;
}
function getNormalizationFactor(a, b, c) {
    // Implementation for normalization factor (not provided in the original code)
    // This function should return a suitable scaling factor if needed
    // For example, you could return the maximum absolute value among a, b, c
    return Math.max(Math.abs(a), Math.abs(b), Math.abs(c));
}
function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
}
function solveQuadratic(a, b, c, roots, min, max) {
    let x1 = Infinity, x2 = Infinity;
    if (Math.abs(a) < 0.000001) {
        if (Math.abs(b) < 0.000001) {
            return Math.abs(c) < 0.000001 ? -1 : 0;
        }
        x1 = -c / b;
    } else {
        b *= -0.5;
        let D = getDiscriminant(a, b, c);
        if (D && Math.abs(D) < 0.000001) {
            const f = getNormalizationFactor(Math.abs(a), Math.abs(b), Math.abs(c));
            if (f) {
                a *= f;
                b *= f;
                c *= f;
                D = getDiscriminant(a, b, c);
            }
        }
        if (D >= -0.000001) {
            const Q = D < 0 ? 0 : Math.sqrt(D);
            const R = b + (b < 0 ? -Q : Q);
            if (R === 0) {
                x1 = c / a;
                x2 = -x1;
            } else {
                x1 = R / a;
                x2 = c / R;
            }
        }
    }
    const boundless = min === null;
    const minB = min - 0.000001;
    const maxB = max + 0.000001;
    let count = 0;
    if (Number.isFinite(x1) && (boundless || (x1 > minB && x1 < maxB))) {
        roots[count++] = boundless ? x1 : clamp(x1, min, max);
    }
    if (x2 !== x1 && Number.isFinite(x2) && (boundless || (x2 > minB && x2 < maxB))) {
        roots[count++] = boundless ? x2 : clamp(x2, min, max);
    }
    return count;
}
let roots = [];
console.log("quadratic: " + solveQuadratic(2, 5, 3, roots, null, null));
