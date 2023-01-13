export const firstLetterUppercase = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// count the words in a string
export const countWords = (str: string) => {
  if(str.length === 0) return 0;
  return str.split(' ').length - 1;
}
// count the characters in a string
export const countCharacters = (str: string) => {
  if(str.length === 0) return 0;
  return str.length;
}
