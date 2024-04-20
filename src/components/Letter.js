import React, { useContext, useEffect } from "react";
import { AppContext } from "../App";

function Letter({ letterPos, attemptVal }) {
    const { board, currAttempt, setCurrAttempt, gameOver } = useContext(AppContext);
    const letter = board[attemptVal][letterPos]; // La letra de la celda actual

    // Obtenemos el estado de la letra: correcta, exista pero no en esa posición, no existe
    // const correct = correctWordClean[letterPos] === letter
    // const almost = !correct && letter !== "" && correctWordClean.includes(letter)
    // const letterState = currAttempt.attempt > attemptVal &&
    //     (correct ? "correct" : almost ? "almost" : "error");
    const correct = false;
    const almost = false;
    const letterState = "error";
    
    // Para seleccionar la letra sobre el tablero
    const isCurrentCell = !gameOver.gameOver && currAttempt.attempt === attemptVal && currAttempt.letterPos === letterPos;
    let cellClassName = "";
    if (isCurrentCell) {
        cellClassName = "current-cell";
    }

    function handleCellClick() {
        if (attemptVal === currAttempt.attempt)
            setCurrAttempt({ attempt: attemptVal, letterPos: letterPos })
    }

    return (
        <div
            className={`col border custom-border rounded-circle d-flex justify-content-center align-items-center fw-bold fs-5 ${cellClassName}`}
            id={letterState}
            onClick={handleCellClick}
            style={{
                height: "40px",
                width: "40px",
                margin: "1px",
            }}
        >
            {letter}
        </div>
    )
}

export default Letter;