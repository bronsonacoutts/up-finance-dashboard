// src/features/subscriptions/normalization.ts

/**
 * A lookup table for known merchant name variations.
 * The key is the standardized name, and the value is an array of variations.
 */
const MERCHANT_LOOKUP: Record<string, string[]> = {
  SPOTIFY: ["SPOTIFY AB", "SPOTIFY AUS"],
  NETFLIX: ["NETFLIX.COM"],
  APPLE: ["APPLE.COM/BILL", "APPLE SERVICES"],
  GOOGLE: ["GOOGLE PLAY", "YOUTUBE"],
  AMAZON: ["AMAZON PRIME", "AMZN"],
  ADOBE: ["ADOBE SYSTEMS"],
  AWS: ["AMAZON WEB SERVICES"],
  PATREON: ["PATREON.COM"],
  DISNEY: ["DISNEY PLUS", "DISNEY+"],
  BINGE: ["BINGE TV"],
  STAN: ["STAN ENTERTAINMENT"],
  AUDIBLE: ["AUDIBLE.COM"],
  "UBER EATS": ["UBER EATS TRIP"],
  "LINKEDIN": ["LI.COM"],
};

/**
 * Regex rules to clean up merchant names.
 * These are applied in order.
 */
const CLEANUP_REGEX: [RegExp, string][] = [
  [/^SQ \*/, ""], // Remove Square reader prefix
  [/^CRV\* /, ""], // Remove Curve prefix
  [/\*$/, ""], // Remove trailing asterisk
  [/\s+[A-Z0-9]{8,}$/, ""], // Remove long alphanumeric codes at the end
  [/\s+[\w\s]*\s(NSW|VIC|QLD|SA|WA|TAS|NT|ACT)$/, ""], // Remove state names
  [/\s+(AU|AUS|AUST)$/, ""], // Remove country codes
  [/\s+(?:SYDNEY|MELBOURNE|BRISBANE|PERTH|ADELAIDE|CANBERRA|HOBART|DARWIN)$/, ""], // Remove city names
];

/**
 * Normalizes a raw merchant string.
 *
 * @param rawText - The raw text from the transaction.
 * @param description - The description from the transaction.
 * @returns A normalized merchant name.
 */
export const normalizeMerchantV2 = (rawText: string | null, description: string): string => {
  let text = (rawText || description).toUpperCase().trim();

  // 1. Check against the lookup table
  for (const [standardName, variations] of Object.entries(MERCHANT_LOOKUP)) {
    for (const variation of variations) {
      if (text.includes(variation)) {
        return standardName;
      }
    }
  }

  // 2. Apply cleanup regex
  for (const [regex, replacement] of CLEANUP_REGEX) {
    text = text.replace(regex, replacement);
  }

  // 3. Basic cleanup (remove non-alphanumeric chars)
  text = text.replace(/[^A-Z0-9\s]/g, "").trim();

  // 4. Fallback to first 2-3 words if it's still long
  const parts = text.split(/\s+/);
  if (parts.length > 3) {
    return parts.slice(0, 3).join(" ");
  }

  return text;
};
