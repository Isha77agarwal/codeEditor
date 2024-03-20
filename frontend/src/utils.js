// replace the multiple white spaces with single white space from the string e.g '2  3  5 6' -> '2 3 5 6'
export const trimExtraSpaces = (text) => text.replace(/ {2,}/g, " ");

// replace the multiple lines or lines with spaces at the end with single line e.g '2\n\n 3' -> '2\n3' ,'2\n 3' -> '2\n3'
export const trimExtraLines = (text) => text.replace(/\n{1,} {0,}/g, "\n");

export const trimExtraLinesAndSpaces = (text) =>
  trimExtraSpaces(trimExtraLines(text));

export const languageIdMapping = {
  54: "C++",
  91: "JAVA",
  93: "Javascript",
  92: "Python",
};
