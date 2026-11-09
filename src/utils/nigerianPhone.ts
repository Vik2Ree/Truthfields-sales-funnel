/**
 * Nigerian Phone Number Validation and Formatting Utilities
 * Standard NCC (Nigerian Communications Commission) allocation:
 * 11 digits starting with 0: 070, 071, 080, 081, 090, 091
 * International format: +234 followed by 10 digits (without leading 0)
 */

export interface NigerianPhoneValidationResult {
  isValid: boolean;
  error?: string;
  normalized11: string; // e.g. "08102268521"
  formattedDisplay: string; // e.g. "0810 226 8521"
  intlFormat: string; // e.g. "+2348102268521"
  network?: 'MTN' | 'Airtel' | 'Glo' | '9mobile' | 'Nigerian Network';
}

// Common Nigerian MNO prefix map (4-digit prefix)
const MNO_PREFIXES: Record<string, 'MTN' | 'Airtel' | 'Glo' | '9mobile'> = {
  // MTN
  '0803': 'MTN',
  '0806': 'MTN',
  '0703': 'MTN',
  '0706': 'MTN',
  '0813': 'MTN',
  '0816': 'MTN',
  '0810': 'MTN',
  '0814': 'MTN',
  '0903': 'MTN',
  '0906': 'MTN',
  '0913': 'MTN',
  '0916': 'MTN',
  '0702': 'MTN',
  '0704': 'MTN',

  // Airtel
  '0802': 'Airtel',
  '0808': 'Airtel',
  '0708': 'Airtel',
  '0812': 'Airtel',
  '0701': 'Airtel',
  '0902': 'Airtel',
  '0901': 'Airtel',
  '0904': 'Airtel',
  '0907': 'Airtel',
  '0912': 'Airtel',
  '0911': 'Airtel',

  // Glo (Globacom)
  '0805': 'Glo',
  '0807': 'Glo',
  '0705': 'Glo',
  '0815': 'Glo',
  '0811': 'Glo',
  '0905': 'Glo',
  '0915': 'Glo',

  // 9mobile (formerly Etisalat)
  '0809': '9mobile',
  '0817': '9mobile',
  '0818': '9mobile',
  '0909': '9mobile',
  '0908': '9mobile',
};

// General valid 3-digit prefixes in Nigeria
const VALID_3DIGIT_PREFIXES = ['070', '071', '080', '081', '090', '091'];

/**
 * Validates and formats a Nigerian phone number.
 */
export function validateNigerianPhone(
  input: string,
  fieldLabel = 'Phone number'
): NigerianPhoneValidationResult {
  const trimmed = (input || '').trim();

  if (!trimmed) {
    return {
      isValid: false,
      error: `${fieldLabel} is required for dispatch courier verification`,
      normalized11: '',
      formattedDisplay: '',
      intlFormat: '',
    };
  }

  // Strip all non-digit characters except leading +
  let cleaned = trimmed.replace(/[\s\-\(\)\.]/g, '');

  // Handle +234 or 234 international country code
  if (cleaned.startsWith('+234')) {
    cleaned = '0' + cleaned.slice(4);
  } else if (cleaned.startsWith('234') && cleaned.length >= 13) {
    cleaned = '0' + cleaned.slice(3);
  } else if (cleaned.length === 10 && /^[789]/.test(cleaned)) {
    // User typed 8102268521 (omitted leading 0)
    cleaned = '0' + cleaned;
  }

  // Remove any remaining non-digit characters
  cleaned = cleaned.replace(/\D/g, '');

  if (cleaned.length < 11) {
    return {
      isValid: false,
      error: `${fieldLabel} is too short (${cleaned.length}/11 digits). Enter an 11-digit Nigerian number (e.g. 0803 123 4567)`,
      normalized11: cleaned,
      formattedDisplay: cleaned,
      intlFormat: '',
    };
  }

  if (cleaned.length > 11) {
    return {
      isValid: false,
      error: `${fieldLabel} has too many digits (${cleaned.length}/11). Nigerian mobile numbers have exactly 11 digits`,
      normalized11: cleaned,
      formattedDisplay: cleaned,
      intlFormat: '',
    };
  }

  // Check prefix
  const prefix3 = cleaned.slice(0, 3);
  if (!VALID_3DIGIT_PREFIXES.includes(prefix3)) {
    return {
      isValid: false,
      error: `Invalid Nigerian mobile prefix "${prefix3}". Valid numbers start with 080, 081, 090, 070, or 091`,
      normalized11: cleaned,
      formattedDisplay: cleaned,
      intlFormat: '',
    };
  }

  // Format as 0810 226 8521
  const formattedDisplay = `${cleaned.slice(0, 4)} ${cleaned.slice(4, 7)} ${cleaned.slice(7)}`;
  const intlFormat = `+234${cleaned.slice(1)}`;

  // Detect network if possible
  const prefix4 = cleaned.slice(0, 4);
  const network = MNO_PREFIXES[prefix4] || 'Nigerian Network';

  return {
    isValid: true,
    normalized11: cleaned,
    formattedDisplay,
    intlFormat,
    network,
  };
}

/**
 * Formats a valid or partial Nigerian phone number for input display
 */
export function formatAsNigerianPhone(value: string): string {
  // Clean input
  const digits = value.replace(/\D/g, '');
  if (digits.length <= 4) return digits;
  if (digits.length <= 7) return `${digits.slice(0, 4)} ${digits.slice(4)}`;
  return `${digits.slice(0, 4)} ${digits.slice(4, 7)} ${digits.slice(7, 11)}`;
}
