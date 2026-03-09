export interface PasswordOptions {
  length: number;
  uppercase: boolean;
  lowercase: boolean;
  numbers: boolean;
  symbols: boolean;
}

export function generatePassword(options: PasswordOptions): string {
  const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lower = "abcdefghijklmnopqrstuvwxyz";
  const nums = "0123456789";
  const syms = "!@#$%^&*()_+~`|}{[]:;?><,./-=";

  let charset = "";
  if (options.uppercase) charset += upper;
  if (options.lowercase) charset += lower;
  if (options.numbers) charset += nums;
  if (options.symbols) charset += syms;

  // Fallback to lowercase if everything is unchecked
  if (!charset) {
    charset = lower;
    options.lowercase = true;
  }

  let password = "";

  // Ensure we get at least one of each required character if length permits
  const requiredChars: string[] = [];

  // Secure random char picker
  const getRandomChar = (str: string) => {
    const randomArray = new Uint32Array(1);
    crypto.getRandomValues(randomArray);
    return str[randomArray[0] % str.length];
  };

  if (options.uppercase) requiredChars.push(getRandomChar(upper));
  if (options.lowercase) requiredChars.push(getRandomChar(lower));
  if (options.numbers) requiredChars.push(getRandomChar(nums));
  if (options.symbols) requiredChars.push(getRandomChar(syms));

  for (const c of requiredChars) {
    if (password.length < options.length) password += c;
  }

  // Fill the rest
  while (password.length < options.length) {
    password += getRandomChar(charset);
  }

  // Shuffle securely
  const pwdArray = password.split("");
  for (let i = pwdArray.length - 1; i > 0; i--) {
    const randomArray = new Uint32Array(1);
    crypto.getRandomValues(randomArray);
    const j = randomArray[0] % (i + 1);
    [pwdArray[i], pwdArray[j]] = [pwdArray[j], pwdArray[i]];
  }

  return pwdArray.join("");
}
