import './App.css';
import Board from './components/Board';
import Keyboard from './components/Keyboard';
import { useState, createContext, useEffect } from "react";
import { boardDefault } from "./assets/Words";
import GameOverModal from './components/modals/GameOver/GameOverModal';
import axios from 'axios';
import UserStatsModal from './components/modals/UserStats/UserStatsModal';
import { Container, Row, Col } from 'react-bootstrap';
import Header from './components/Header';
import LegendModal from './components/modals/Legend/LegenModal';

const urlBack = import.meta.env.VITE_URL_BACK;

// eslint-disable-next-line react-refresh/only-export-components
export const AppContext = createContext();

function App() {
  const [board, setBoard] = useState(boardDefault); // Tablero
  const [currAttempt, setCurrAttempt] = useState({ attempt: 0, letterPos: 0 }); // Puntero fila,col
  const [disabledLetters, setDisabledLetters] = useState([]); // Letras deshabilitadas del teclado
  const [correctLetters, setCorrectLetters] = useState([]); // Lletres correctes del teclat
  const [almostLetters, setAlmostLetters] = useState([]); // Letras casi correctas del teclado
  const [gameOver, setGameOver] = useState({ gameOver: false, guessedWord: false })
  const [elapsedTime, setElapsedTime] = useState(0);
  const [modalGameOverOpen, setModalGameOverOpen] = useState(false); // Modal fi de joc
  const [rowState, setRowState] = useState([]); // Indica estado de cada letra de la fila
  const [modalUserStatsOpen, setModalUserStatsOpen] = useState(false); // Modal estadístiques
  const [playedToday, setPlayedToday] = useState(false); 
  const [modalLegendOpen, setModalLegendOpen] = useState(false); // Modal llegenda

  useEffect(() => {
    const updateCookie = async () => {
      try {
        const response = await fetch(`${urlBack}/UpdateCookie`, {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error('Failed to update cookie');
        }

        const data = await response.json();
        if(data.playedToday)
          setPlayedToday(true);

        console.log('cookie',data);
      } catch (error) {
        console.error('Error updating cookie:', error);
      }
    };

    updateCookie();
  }, []);


  const onSelectLetter = (keyVal) => {
    if (!gameOver.gameOver && !playedToday) // Si ha acabado el juego no permitimos escribir
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
      setCurrAttempt({ ...currAttempt, letterPos: currAttempt.letterPos })
    }
    else if (currAttempt.letterPos < 5) {
      newBoard[currAttempt.attempt][currAttempt.letterPos] = "" // Borramos la letra
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

  const onEnter = async () => {
    // Obtenemos la palabra escrita en la fila actual
    let currWord = "";
    for (let i = 0; i < 5; i++) {
      if (board[currAttempt.attempt][i] === "") // Si no están las 5 letras no hacemos nada
        return;
      currWord += board[currAttempt.attempt][i];
    }


    try {
      // Realizamos una solicitud al backend para verificar si la palabra existe en la batería
      const response = await axios.post(urlBack + '/CheckWord', { word: currWord, attempt: currAttempt.attempt + 1 }, {withCredentials: true });
      const data = response.data;
      console.log('Respuesta del backend:', data);
      if (data.exists) {
        setCurrAttempt({ attempt: currAttempt.attempt + 1, letterPos: 0 }) // Pasamos a la siguiente fila y reseteamos la posición a 0

        // Establecemos el estado de cada letra de la fila enviada
        setRowState((prev) => [...prev, data.rowState]);

        // Comprobamos si la palabra es la correcta
        if (data.isCorrect) {
          setGameOver({ gameOver: true, guessedWord: true })
          openModalGameOver();
          return;
        }

        // Deshabilitamos las letras del teclado que no sean correctas ni almost
        setDisabledLetters((prev) => [...prev, ...data.disabledLetters])
        setCorrectLetters((prev) => [...prev, ...data.correctLetters])
        setAlmostLetters((prev) => [...prev, ...data.almostLetters])

        // La palabra no es correcta y ha hecho 6 intentos
        if (currAttempt.attempt === 5) {
          setGameOver({ gameOver: true, guessedWord: false })
          openModalGameOver();
        }
      } else {
        alert("No existeix la paraula");
      }


    } catch (error) {
      console.error('Error al verificar la palabra:', error);
    }
  }

  const onMoveLeft = () => {
    if (currAttempt.letterPos <= 5 && currAttempt.letterPos > 0) {
      setCurrAttempt({ ...currAttempt, letterPos: currAttempt.letterPos - 1 })
    }
  }

  const onMoveRight = () => {
    if (currAttempt.letterPos < 4) {
      setCurrAttempt({ ...currAttempt, letterPos: currAttempt.letterPos + 1 })
    }
  }

  const openModalGameOver = () => {
    setModalGameOverOpen(true);
  };

  const closeModalGameOver = () => {
    setModalGameOverOpen(false);
  };

  const openModalUserStats = () => {
    setModalUserStatsOpen(true);
  };

  const closeModalUserStats = () => {
    setModalUserStatsOpen(false);
  };

  const openModalLegend = () => {
    setModalLegendOpen(true);
  };

  const closeModalLegend = () => {
    setModalLegendOpen(false);
  };

  return (
    <div className="App">
      
      <Header openModalUserStats={openModalUserStats} openModalLegend={openModalLegend}/>
      
      <AppContext.Provider
        value={{
          board, setBoard,
          currAttempt, setCurrAttempt,
          onSelectLetter, onEnter, onDelete,
          onMoveRight, onMoveLeft,
          disabledLetters, setDisabledLetters,
          correctLetters, setCorrectLetters,
          almostLetters, setAlmostLetters,
          gameOver, setGameOver,
          elapsedTime, setElapsedTime,
          rowState,
          playedToday
        }}>
        <Container className="mt-5 p-1">
      <Row>
        <Col className="text-center">
          <Board />
          <Keyboard />
        </Col>
      </Row>
    </Container>

    <LegendModal isOpen={modalLegendOpen} onClose={closeModalLegend} />
    <GameOverModal isOpen={modalGameOverOpen} onClose={closeModalGameOver} />
    <UserStatsModal isOpen={modalUserStatsOpen} onClose={closeModalUserStats} />
        {/* <Timer /> */}
      </AppContext.Provider>
    </div>
  );
}

export default App;
