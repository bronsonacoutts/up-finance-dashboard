const currencyFormatters = new Map<string, Intl.NumberFormat>();

/**
 * Formats a number as a currency string using a cached Intl.NumberFormat instance.
 * @param amount The amount to format.
 * @param currency The currency code (e.g., "AUD", "USD").
 * @param locale The locale to use (defaults to "en-AU").
 * @returns The formatted currency string.
 */
export function formatCurrency(amount: number, currency: string, locale = "en-AU"): string {
  const key = `${locale}-${currency}`;
  let formatter = currencyFormatters.get(key);

  if (!formatter) {
    formatter = new Intl.NumberFormat(locale, {
      style: "currency",
      currency: currency
    });
    currencyFormatters.set(key, formatter);
  }

  return formatter.format(amount);
}
