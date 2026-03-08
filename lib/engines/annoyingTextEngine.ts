export type AnnoyingStyle =
  | "zalgo"
  | "alternating"
  | "upsideDown"
  | "stickyCaps"
  | "spongebob"
  | "wide"
  | "tiny"
  | "bubble"
  | "doubleStruck"
  | "circled"
  | "fullwidth";

const ZALGO_UP = "\u030d\u030e\u0304\u0305\u033f\u0311\u0306\u0310\u0352\u0357\u0351\u0307\u0308\u030a\u0342\u0343\u0344\u034a\u034b\u034c\u0300\u0301\u0302\u0303\u0304\u0305\u0306\u0307\u0308\u0309\u030a\u030b\u030c\u030d\u030e\u030f\u0310\u0311\u0312\u0313\u0314\u0315\u0316\u0317\u0318\u0319\u031a\u031b\u031c\u031d\u031e\u031f\u0320\u0321\u0322\u0323\u0324\u0325\u0326\u0327\u0328\u0329\u032a\u032b\u032c\u032d\u032e\u032f\u0330\u0331\u0332\u0333\u0334\u0335\u0336\u0337\u0338\u0339\u033a\u033b\u033c\u033d\u033e\u033f\u0340\u0341\u0342\u0343\u0344\u0345\u0346\u0347\u0348\u0349\u034a\u034b\u034c\u034d\u034e\u034f\u0350\u0351\u0352\u0353\u0354\u0355\u0356\u0357\u0358\u0359\u035a\u035b\u035c\u035d\u035e\u035f\u0360\u0361\u0362\u0363\u0364\u0365\u0366\u0367\u0368\u0369\u036a\u036b\u036c\u036d\u036e\u036f";
const ZALGO_DOWN = "\u0316\u0317\u0318\u0319\u031c\u031d\u031e\u031f\u0320\u0321\u0322\u0323\u0324\u0325\u0326\u0327\u0328\u0329\u032a\u032b\u032c\u032d\u032e\u032f\u0330\u0331\u0332\u0333\u0334\u0335\u0336\u0337\u0338\u0339\u033a\u033b\u033c\u033d\u033e\u033f\u0340\u0341\u0342\u0343\u0344\u0345\u0346\u0347\u0348\u0349\u034a\u034b\u034c\u034d\u034e\u034f\u0350\u0351\u0352\u0353\u0354\u0355\u0356\u0357\u0358\u0359\u035a\u035b\u035c\u035d\u035e\u035f\u0360\u0361\u0362\u0363\u0364\u0365\u0366\u0367\u0368\u0369\u036a\u036b\u036c\u036d\u036e\u036f";
const ZALGO_MID = "\u0315\u031b\u0340\u0341\u0358\u0321\u0322\u0323\u0324\u0325\u0326\u0327\u0328\u0329\u032a\u032b\u032c\u032d\u032e\u032f\u0330\u0331\u0332\u0333\u0334\u0335\u0336\u0337\u0338\u0339\u033a\u033b\u033c\u033d\u033e\u033f\u0340\u0341\u0342\u0343\u0344\u0345\u0346\u0347\u0348\u0349\u034a\u034b\u034c\u034d\u034e\u034f\u0350\u0351\u0352\u0353\u0354\u0355\u0356\u0357\u0358\u0359\u035a\u035b\u035c\u035d\u035e\u035f\u0360\u0361\u0362\u0363\u0364\u0365\u0366\u0367\u0368\u0369\u036a\u036b\u036c\u036d\u036e\u036f";

const UPSIDE_DOWN_MAP: Record<string, string> = {
  a: "\u0250", b: "q", c: "\u0254", d: "p", e: "\u01dd", f: "\u025f", g: "\u0183", h: "\u0265", i: "\u0131", j: "\u027e", k: "\u029e", l: "\u006c", m: "\u026f", n: "u", o: "o", p: "d", q: "b", r: "\u0279", s: "\u0282", t: "\u0287", u: "n", v: "\u028c", w: "\u028d", x: "x", y: "\u028e", z: "z",
  A: "\u2200", B: "q", C: "\u0186", D: "p", E: "\u018e", F: "\u2132", G: "\u2141", H: "H", I: "I", J: "\u017f", K: "\u22ca", L: "\u02e5", M: "W", N: "N", O: "O", P: "D", Q: "b", R: "\u1d1a", S: "S", T: "\u22a5", U: "\u2229", V: "\u039b", W: "M", X: "X", Y: "\u2144", Z: "Z",
  "1": "\u21c2", "2": "\u1105", "3": "\u0190", "4": "\u3123", "5": "\u03db", "6": "9", "7": "\u3125", "8": "8", "9": "6", "0": "0",
  ".": "\u02d9", ",": "'", "!": "\u00a1", "?": "\u00bf", "'": ",", "\"": "\u201e\u201d", ";": "\u061b", ":": ":", "-": "-", " ": " ",
};

const BUBBLE_MAP: Record<string, string> = {
  a: "\u24d0", b: "\u24d1", c: "\u24d2", d: "\u24d3", e: "\u24d4", f: "\u24d5", g: "\u24d6", h: "\u24d7", i: "\u24d8", j: "\u24d9", k: "\u24da", l: "\u24db", m: "\u24dc", n: "\u24dd", o: "\u24de", p: "\u24df", q: "\u24e0", r: "\u24e1", s: "\u24e2", t: "\u24e3", u: "\u24e4", v: "\u24e5", w: "\u24e6", x: "\u24e7", y: "\u24e8", z: "\u24e9",
  A: "\u24b6", B: "\u24b7", C: "\u24b8", D: "\u24b9", E: "\u24ba", F: "\u24bb", G: "\u24bc", H: "\u24bd", I: "\u24be", J: "\u24bf", K: "\u24c0", L: "\u24c1", M: "\u24c2", N: "\u24c3", O: "\u24c4", P: "\u24c5", Q: "\u24c6", R: "\u24c7", S: "\u24c8", T: "\u24c9", U: "\u24ca", V: "\u24cb", W: "\u24cc", X: "\u24cd", Y: "\u24ce", Z: "\u24cf",
};

const DOUBLE_STRUCK: Record<string, string> = {
  a: "\u1d538", b: "\u1d539", c: "\u1d53a", d: "\u1d53b", e: "\u1d53c", f: "\u1d53d", g: "\u1d53e", h: "\u1d53f", i: "\u1d540", j: "\u1d541", k: "\u1d542", l: "\u1d543", m: "\u1d544", n: "\u1d545", o: "\u1d546", p: "\u1d547", q: "\u1d548", r: "\u1d549", s: "\u1d54a", t: "\u1d54b", u: "\u1d54c", v: "\u1d54d", w: "\u1d54e", x: "\u1d54f", y: "\u1d550", z: "\u1d551",
  A: "\u1d504", B: "\u1d505", C: "\u2102", D: "\u1d507", E: "\u1d508", F: "\u1d509", G: "\u1d50a", H: "\u210d", I: "\u1d50c", J: "\u1d50d", K: "\u1d50e", L: "\u1d50f", M: "\u1d510", N: "\u2115", O: "\u1d512", P: "\u2119", Q: "\u211a", R: "\u211d", S: "\u1d516", T: "\u1d517", U: "\u1d518", V: "\u1d519", W: "\u1d51a", X: "\u1d51b", Y: "\u1d51c", Z: "\u2124",
};

const CIRCLED: Record<string, string> = {
  a: "\u24b6", b: "\u24b7", c: "\u24b8", d: "\u24b9", e: "\u24ba", f: "\u24bb", g: "\u24bc", h: "\u24bd", i: "\u24be", j: "\u24bf", k: "\u24c0", l: "\u24c1", m: "\u24c2", n: "\u24c3", o: "\u24c4", p: "\u24c5", q: "\u24c6", r: "\u24c7", s: "\u24c8", t: "\u24c9", u: "\u24ca", v: "\u24cb", w: "\u24cc", x: "\u24cd", y: "\u24ce", z: "\u24cf",
  A: "\u24b6", B: "\u24b7", C: "\u24b8", D: "\u24b9", E: "\u24ba", F: "\u24bb", G: "\u24bc", H: "\u24bd", I: "\u24be", J: "\u24bf", K: "\u24c0", L: "\u24c1", M: "\u24c2", N: "\u24c3", O: "\u24c4", P: "\u24c5", Q: "\u24c6", R: "\u24c7", S: "\u24c8", T: "\u24c9", U: "\u24ca", V: "\u24cb", W: "\u24cc", X: "\u24cd", Y: "\u24ce", Z: "\u24cf",
};

// Fullwidth (FF01–FF5E for ASCII 21–7E)
function toFullwidth(str: string): string {
  return str
    .split("")
    .map((c) => {
      const code = c.charCodeAt(0);
      if (code >= 0x21 && code <= 0x7e) {
        return String.fromCharCode(code + 0xff01 - 0x21);
      }
      return c;
    })
    .join("");
}

// Small caps / tiny (subscript-like for numbers, small caps for letters - use Unicode small caps)
const TINY_MAP: Record<string, string> = {
  a: "\u1d00", b: "\u0299", c: "\u1d04", d: "\u1d05", e: "\u1d07", f: "\u0493", g: "\u0262", h: "\u029c", i: "\u026a", j: "\u1d0a", k: "\u1d0b", l: "\u029f", m: "\u1d0d", n: "\u0274", o: "\u1d0f", p: "\u1d18", q: "\u01eb", r: "\u0280", s: "\u1d0b", t: "\u1d1b", u: "\u1d1c", v: "\u1d20", w: "\u1d21", x: "\u0078", y: "\u028f", z: "\u1d22",
};

function mapChars(str: string, map: Record<string, string>): string {
  return str
    .split("")
    .map((c) => map[c] ?? c)
    .join("");
}

function zalgo(text: string, intensity = 3): string {
  return text
    .split("")
    .map((char) => {
      if (char.match(/\s/)) return char;
      let out = char;
      for (let i = 0; i < intensity; i++) {
        out += ZALGO_UP[Math.floor(Math.random() * ZALGO_UP.length)];
        out += ZALGO_DOWN[Math.floor(Math.random() * ZALGO_DOWN.length)];
        out += ZALGO_MID[Math.floor(Math.random() * ZALGO_MID.length)];
      }
      return out;
    })
    .join("");
}

function alternating(text: string): string {
  let upper = true;
  return text
    .split("")
    .map((c) => {
      if (!c.match(/[a-zA-Z]/)) return c;
      const out = upper ? c.toUpperCase() : c.toLowerCase();
      upper = !upper;
      return out;
    })
    .join("");
}

function upsideDown(text: string): string {
  return text
    .split("")
    .reverse()
    .map((c) => UPSIDE_DOWN_MAP[c] ?? UPSIDE_DOWN_MAP[c.toLowerCase()] ?? c)
    .join("");
}

function stickyCaps(text: string): string {
  return text
    .split("")
    .map((c) => (c === c.toUpperCase() ? c.toLowerCase() : c.toUpperCase()))
    .join("");
}

function spongebob(text: string): string {
  let upper = Math.random() > 0.5;
  return text
    .split("")
    .map((c) => {
      if (!c.match(/[a-zA-Z]/)) return c;
      const out = upper ? c.toUpperCase() : c.toLowerCase();
      if (c.match(/[a-zA-Z]/)) upper = !upper;
      return out;
    })
    .join("");
}

function wide(text: string): string {
  return text
    .split("")
    .map((c) => {
      if (c === " ") return " ";
      const code = c.charCodeAt(0);
      if (code >= 0x21 && code <= 0x7e) {
        return String.fromCharCode(code + 0xff01 - 0x21);
      }
      return c;
    })
    .join("");
}

export function transformAnnoying(text: string, style: AnnoyingStyle, zalgoIntensity = 3): string {
  if (!text) return "";
  switch (style) {
    case "zalgo":
      return zalgo(text, zalgoIntensity);
    case "alternating":
      return alternating(text);
    case "upsideDown":
      return upsideDown(text);
    case "stickyCaps":
      return stickyCaps(text);
    case "spongebob":
      return spongebob(text);
    case "wide":
      return wide(text);
    case "tiny":
      return mapChars(text, TINY_MAP);
    case "bubble":
      return mapChars(text, BUBBLE_MAP);
    case "doubleStruck":
      return mapChars(text, DOUBLE_STRUCK);
    case "circled":
      return mapChars(text, CIRCLED);
    case "fullwidth":
      return toFullwidth(text);
    default:
      return text;
  }
}

export const annoyingStyleLabels: Record<AnnoyingStyle, string> = {
  zalgo: "Z͏̺a͏l̾g͏o̾",
  alternating: "AlTeRnAtInG",
  upsideDown: "ɟlᴉsdɐʎ uʍop ǝpᴉsdn",
  stickyCaps: "sTICKY cAPS",
  spongebob: "sPoNgEbOb",
  wide: "Ｗｉｄｅ",
  tiny: "ᴛɪɴʏ",
  bubble: "Ⓑⓤⓑⓑⓛⓔ",
  doubleStruck: "𝔻𝕠𝕦𝕓𝕝𝕖 𝕊𝕥𝕣𝕦𝕔𝕜",
  circled: "Ⓒⓘⓡⓒⓛⓔⓓ",
  fullwidth: "Ｆｕｌｌｗｉｄｔｈ",
};
