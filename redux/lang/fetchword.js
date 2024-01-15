import { en, getWordEn } from './en';
import { es, getWordEs } from './es';
export function fetchWord(key, local) {
  if (local === 'es') {
    let word = getWordEs(key);
    if (word) return word;
    else return getWordEn(key);
  } else if (local === 'en') return getWordEn(key);
}
function checkFallBack(key) {
  return getWordEn(key);
}