import React, { useContext } from "react";
import { AppContext } from "../App";

function Letter({ letterPos, attemptVal }) {
    const { board, currAttempt, setCurrAttempt, gameOver, rowState } = useContext(AppContext);
    const letter = board[attemptVal][letterPos]; // La letra de la celda actual

    // Obtenemos el estado de la letra
    const letterState = currAttempt.attempt > attemptVal && rowState.length > 0 ? rowState[attemptVal][letterPos] : null;
    
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
            className={`col border custom-border rounded d-flex justify-content-center align-items-center fw-bold fs-4 ${cellClassName}`}
            id={letterState}
            onClick={handleCellClick}
            style={{
                aspectRatio: "1",
                maxWidth: "60px",
                minWidth: "30px",
                width: "100%",
                margin: "2px"
            }}
        >
            {letter}
        </div>
    )
}

export default Letter;