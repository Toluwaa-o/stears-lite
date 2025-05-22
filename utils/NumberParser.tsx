const parseFinancialString = (value: string): number | null => {
    if (!value || typeof value !== "string") return null;
    if (value === 'N/A') return 0
    const cleaned = value.trim().replace(/[\$,]/g, "").replace(/\.$/, "");

    const match = cleaned.match(/^([\d.]+)([KMB]?)$/i);
    if (!match) return null;

    const number = parseFloat(match[1]);
    const unit = match[2].toUpperCase();

    const multipliers: Record<string, number> = {
        "": 1,
        "K": 1_000,
        "M": 1_000_000,
        "B": 1_000_000_000
    };

    return number * (multipliers[unit] || 1);
}


export default parseFinancialString;