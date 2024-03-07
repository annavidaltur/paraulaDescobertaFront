import wordBank from './paraules.txt';

export const boardDefault = [
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
  ];

// Lee la batería de palabras y las carga en wordSet
export const generateWordSet = async () => {    
    let wordSet;
    let todaysWord;
    await fetch(wordBank)
      .then((response) => response.text())
      .then((result) => {
        const wordArr = result.split("\r\n")
        todaysWord = wordArr[Math.floor(Math.random() * wordArr.length)]
        wordSet = new Set(wordArr)
      })

      return {wordSet, todaysWord};
  }