import React, { useCallback, useEffect, useContext } from "react";
import Key from "./Key";
import { AppContext } from "../App";

function Keyboard() {
    const { onSelectLetter, onEnter, onDelete, disabledLetters, onMoveRight, onMoveLeft, playedToday } = useContext(AppContext);
    
    const keys1 = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
    const keys2 = ["A", "S", "D", "F", "G", "H", "J", "K", "L", "Ç"];
    const keys3 = ["Z", "X", "C", "V", "B", "N", "M"]

    const handleKeyboard = useCallback((event) => {
        if (event.key === "Enter")
            onEnter();
        else if (event.key === "Backspace") {
            onDelete();
        }
        else if (event.key === "ArrowLeft") {
            onMoveLeft();
        }
        else if (event.key === "ArrowRight") {
            onMoveRight();
        } else {
            keys1.forEach((key) => {
                if (event.key.toLowerCase() === key.toLowerCase())
                    onSelectLetter(key)
            })
            keys2.forEach((key) => {
                if (event.key.toLowerCase() === key.toLowerCase())
                    onSelectLetter(key)
            })
            keys3.forEach((key) => {
                if (event.key.toLowerCase() === key.toLowerCase())
                    onSelectLetter(key)
            })
        }
    })

    useEffect(() => {
        document.addEventListener("keydown", handleKeyboard)

        return () => {
            document.removeEventListener("keydown", handleKeyboard)
        };
    }, [handleKeyboard])

    console.log('playedToday', playedToday)
    return (
        <div className="container mt-5" onKeyDown={handleKeyboard} style={{maxWidth: '600px'}}>
            <div className="row justify-content-center">
                {keys1.map((key) => (
                    <Key key={key} keyVal={key} disabled={disabledLetters.includes(key) || playedToday} />
                ))}
            </div>
            <div className="row justify-content-center">
                {keys2.map((key) => {
                    return <Key key={key} keyVal={key} disabled={disabledLetters.includes(key) || playedToday} />;
                })}
            </div>
            <div className="row justify-content-center">
                <Key key="ENTER" keyVal={"ENTER"} bigKey disabled={playedToday} />
                {keys3.map((key) => {
                    return <Key key={key} keyVal={key} disabled={disabledLetters.includes(key) || playedToday} />;
                })}
                <Key key="DELETE" keyVal={"DELETE"} bigKey disabled={playedToday}/>
            </div>
        </div>
    )    
}

export default Keyboard;