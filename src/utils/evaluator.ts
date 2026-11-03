/**
 * Normalizes and checks student numeric input against acceptable answer variations.
 * Handles Indonesian formatting, dots as thousand separators, comma as decimal,
 * optional unit suffixes (cm, cm2, derajat, rp), and whitespace.
 */
export function normalizeAnswer(input: string): string {
  if (!input) return '';

  let normalized = input.trim().toLowerCase();

  // Remove common currency prefixes
  normalized = normalized.replace(/^rp\.?\s*/i, '');

  // Remove degree symbol or word "derajat"
  normalized = normalized.replace(/°|derajat/gi, '');

  // Remove common unit suffixes like cm, cm², cm2, m, m², m2, buah, butir, orang, kali
  normalized = normalized.replace(/\s*(cm²|cm2|cm|m²|m2|m|km|buah|butir|orang|kali|satuan|derajat)$/i, '');

  // Clean trailing and leading spaces
  normalized = normalized.trim();

  // If formatted like 10.000 or 100.000 (Indonesian thousand dots), remove thousand separators if there is no decimal
  if (/^\d{1,3}(\.\d{3})+$/.test(normalized)) {
    normalized = normalized.replace(/\./g, '');
  }

  // Replace comma decimal with dot decimal if applicable (e.g. "3,5" -> "3.5")
  if (/^\d+,\d+$/.test(normalized)) {
    normalized = normalized.replace(',', '.');
  }

  // Normalize fraction spacing e.g. " 1 / 2 " -> "1/2"
  normalized = normalized.replace(/\s*\/\s*/g, '/');

  return normalized.trim();
}

/**
 * Checks if the student's answer matches any of the acceptable answers.
 */
export function checkFillInAnswer(userAnswer: string, acceptableAnswers: string[]): boolean {
  if (!userAnswer || userAnswer.trim() === '') {
    return false;
  }

  const normalizedUser = normalizeAnswer(userAnswer);

  for (const expected of acceptableAnswers) {
    const normalizedExpected = normalizeAnswer(expected);
    if (normalizedUser === normalizedExpected) {
      return true;
    }

    // Also check direct numeric equality if both are valid numbers
    const numUser = Number(normalizedUser);
    const numExp = Number(normalizedExpected);
    if (!isNaN(numUser) && !isNaN(numExp) && numUser === numExp) {
      return true;
    }
  }

  return false;
}
