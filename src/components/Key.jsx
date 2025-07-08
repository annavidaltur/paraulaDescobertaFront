import { useContext } from "react";
import React from "react";
import { AppContext } from "../App";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightToBracket, faBackspace } from '@fortawesome/free-solid-svg-icons';

function Key({ keyVal, disabled, bigKey = false }) {
    const { onSelectLetter, onEnter, onDelete, playedToday } = useContext(AppContext);

    const selectLetter = () => {
        if (keyVal === "ENTER") {
            onEnter();
        } else if (keyVal === "DELETE") {
            onDelete();
        } else {
            onSelectLetter(keyVal)
        }
    }

    return (
        <div 
            className={`key border rounded fw-bold text-center d-flex align-items-center justify-content-center text-uppercase ${playedToday ? '' : 'cursor-pointer'}`}            
            style={{
                padding: '0.75rem',
                width: bigKey ? '62px' : '40px',
                minWidth: bigKey ? '52px' : '30px',
                margin: "2px"}}
            id={disabled ? "disabled" : ""}             
            onClick={!playedToday ? selectLetter : undefined}            
            >                
                {keyVal === "ENTER" ? <FontAwesomeIcon icon={faArrowRightToBracket} /> 
                    : keyVal === "DELETE" ? <FontAwesomeIcon icon={faBackspace} /> 
                        : keyVal}
        </div>
    )
}

export default Key;