const LegendLetter = ({ letter, state }) => {
    
    return(<div
            className={`col border custom-border rounded d-flex justify-content-center align-items-center fw-bold fs-4`}
            id={state}
            style={{
                aspectRatio: "1",
                maxWidth: "60px",
                minWidth: "30px",
                width: "100%",
                margin: "2px"
            }}
        >
            {letter}
        </div>)
}

export default LegendLetter;