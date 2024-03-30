import React, { useContext, useEffect } from "react";
import { AppContext } from "../App";

function Letter({ letterPos, attemptVal }) {
    const { board, correctWordClean, currAttempt, setCurrAttempt, setDisabledLetters } = useContext(AppContext);
    const letter = board[attemptVal][letterPos]; // La letra de la celda actual

    // Obtenemos el estado de la letra: correcta, exista pero no en esa posición, no existe
    const correct = correctWordClean[letterPos] === letter
    const almost = !correct && letter !== "" && correctWordClean.includes(letter)
    const letterState = currAttempt.attempt > attemptVal &&
        (correct ? "correct" : almost ? "almost" : "error");

    // Para seleccionar la letra sobre el tablero
    const isCurrentCell = currAttempt.attempt === attemptVal && currAttempt.letterPos === letterPos;
    let cellClassName = "";
    if (isCurrentCell) {
        cellClassName = "current-cell";
    }
    if (letterPos === 4 && letter !== "" && currAttempt.attempt === attemptVal) {
        cellClassName = "current-cell";
    }

    useEffect(() => {
        // Deshabilitamos las letras del teclado que no sean correctas ni almost
        if (letter !== "" && !correct && !almost) {
            setDisabledLetters((prev) => [...prev, letter])
        }
    }, [currAttempt.attempt]) // Se ejecuta con cada intento (fila completa+enter)

    function handleCellClick() {
        if (attemptVal === currAttempt.attempt)
            setCurrAttempt({ attempt: attemptVal, letterPos: letterPos })
    }

    return (
        <div
            className={`col m-1 border custom-border rounded-circle d-flex justify-content-center align-items-center fw-bold fs-5 ${cellClassName}`}
            id={letterState}
            onClick={handleCellClick}
            style={{
                height: "50px",
                width: "50px",
            }}
        >
            {letter}
        </div>
    )
}

export default Letter;