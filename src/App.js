import './App.css';
import Board from './components/Board';
import Keyboard from './components/Keyboard';
import React, { useState, createContext, useEffect } from "react";
import { boardDefault, generateWordSet } from "./Words";
import Timer from './components/Timer';
import 'bootstrap/dist/css/bootstrap.min.css';
import GameOverModal from './components/Modal';

export const AppContext = createContext();

function App() {
  const [board, setBoard] = useState(boardDefault); // Tablero
  const [currAttempt, setCurrAttempt] = useState({ attempt: 0, letterPos: 0 }); // Puntero fila,col
  const [wordSet, setWordSet] = useState(undefined); // Batería de palabras
  const [disabledLetters, setDisabledLetters] = useState([]); // Letras deshabilitadas del teclado
  const [gameOver, setGameOver] = useState({ gameOver: false, guessedWord: false })
  const [correctWord, setCorrectWord] = useState("");
  const [correctWordClean, setCorrectWordClean] = useState("");
  const [elapsedTime, setElapsedTime] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    // Cargamos la batería de palabras al iniciar la app
    generateWordSet().then((result) => {
      setWordSet(result.wordSet);
      setCorrectWord(result.todaysWord);
      setCorrectWordClean(result.todaysWordClean);
      console.log('paraula: ', result.todaysWord);
      console.log('paraula sense accents: ', result.todaysWordClean);
    });
  }, [])

  const onSelectLetter = (keyVal) => {
    if (!gameOver.gameOver) // Si ha acabado el juego no permitimos escribir
    {
      if (currAttempt.letterPos > 4) // Si ha escrito las 5 letras de la fila no hacemos nada
        return;
      const newBoard = [...board] // Copiamos el tablero (board)

      newBoard[currAttempt.attempt][currAttempt.letterPos] = keyVal // Asignamos la letra clickeada a la fila y pos
      setBoard(newBoard) // ACctualizamos el tablero
      setCurrAttempt({ ...currAttempt, letterPos: currAttempt.letterPos + 1 }) // Actualizamos el puntero para que la próxima letra se escriba en la posición siguiente. La fila se mantiene
    }
  }

  const onDelete = () => {
    const newBoard = [...board] // Copiamos el tablero (board)

    if (currAttempt.letterPos === 0) // Si estamos en la pos=0 no hacemos nada
    {
      newBoard[currAttempt.attempt][currAttempt.letterPos] = ""
      setBoard(newBoard)
      setCurrAttempt({ ...currAttempt, letterPos: currAttempt.letterPos})    
    }
    else if (currAttempt.letterPos < 5)
    {
      newBoard[currAttempt.attempt][currAttempt.letterPos ] = "" // Borramos la letra
      console.log('letterPos>0 newBoard', newBoard);
      setBoard(newBoard) // Actualizamos el tablero
      setCurrAttempt({ ...currAttempt, letterPos: currAttempt.letterPos - 1 }) // Actualizamos el puntero para quitar una posición. La fila se mantiene      
    }
    else // currAttemps.letterPos === 5
    {
      newBoard[currAttempt.attempt][currAttempt.letterPos - 1] = "" // Borramos la letra
      setBoard(newBoard) // Actualizamos el tablero
      setCurrAttempt({ ...currAttempt, letterPos: currAttempt.letterPos - 1 }) // Actualizamos el puntero para quitar una posición. La fila se mantiene
    } 
    
  }

  const onEnter = () => {
    if (currAttempt.letterPos !== 5) // Solo validamos la palabra si ha escrito las 5 letras
      return;

    // Obtenemos la palabra escrita en la fila actual
    let currWord = "";
    for (let i = 0; i < 5; i++) {
      currWord += board[currAttempt.attempt][i];
    }

    // Comprobamos si la palabra introducida es una palabra real (que exista en la batería)
    if (wordSet.some(item => item.withoutAccent === currWord.toLowerCase())) {
      setCurrAttempt({ attempt: currAttempt.attempt + 1, letterPos: 0 }) // Pasamos a la siguiente fila y reseteamos la posición a 0  
    } else {
      alert("No existeix la paraula")
    }

    // Comprobamos si la palabra es la correcta
    if (currWord === correctWordClean) {
      setGameOver({ gameOver: true, guessedWord: true })
      openModal();
      return;
    }

    // La palabra no es correcta y ha hcho 6 intentos
    if (currAttempt.attempt === 5) {
      setGameOver({ gameOver: true, guessedWord: false })
      openModal();
    }
  }

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="App">
      <h1 className="text-center">PARAULA DESCOBERTA</h1>

      <AppContext.Provider
        value={{
          board, setBoard,
          currAttempt, setCurrAttempt,
          onSelectLetter, onEnter, onDelete,
          correctWord,
          correctWordClean,
          disabledLetters, setDisabledLetters,
          gameOver, setGameOver,
          elapsedTime, setElapsedTime
        }}>
        <div className="container mt-5">
          <div className="row">
            <div className='col-12 text-center'>
              <Board />            
              <Keyboard />
            </div>
          </div>
        </div>
        <GameOverModal isOpen={modalOpen} onClose={closeModal} />
        <Timer />
      </AppContext.Provider>
    </div>
  );
}

export default App;
