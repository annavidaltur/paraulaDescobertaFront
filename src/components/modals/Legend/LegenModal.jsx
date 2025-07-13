import CustomModal from "../CustomModal";
import LegendLetter from "./LegendLetter";

const LegendModal = ({isOpen, onClose}) => {

    return(<CustomModal
        isOpen={isOpen}
        onClose={onClose}
        title="Com es juga?"
        body={
            <div className="text-start">
                → L'objectiu del joc és descobrir la paraula amagada en 6 intents. 
                <br />→ La paraula té 5 lletres i és la mateixa per a tots els jugadors.
                <br />→ Cada matí es canvia la paraula.
                <br />→ Les paraules han d'existir en l'AVL.
                <br />→ El punt volat s'escriu com "LL". Accents i dièresi no cal escriure'ls.

                <h5 className="mt-4">Exemples</h5>
                → Imagina que la paraula amagada és NÚVOL. Comencem amb una paraula vàlida com OLIVA. En aquest cas, les lletres O, L i V estan en la paraula amagada però no en la posició correcta.
                <div className="d-flex justify-content-center align-items-center  mt-2 ">
                    <LegendLetter state="almost" letter="O" />
                    <LegendLetter state="almost" letter="L" />
                    <LegendLetter state="error" letter="I" />
                    <LegendLetter state="almost" letter="V" />
                    <LegendLetter state="error" letter="A" />
                </div>

                <div className="mt-3 mb-3">
                    → Ara provem amb una altra paraula vàlida com NERVI. En aquest cas, la lletra N està en la posició correcta, la lletra O està en la paraula però no en la posició correcta i les lletres E, R i I no estan en la paraula.
                    <div className="d-flex justify-content-center align-items-center  mt-2 ">
                        <LegendLetter state="correct" letter="N" />
                        <LegendLetter state="error" letter="E" />
                        <LegendLetter state="error" letter="R" />
                        <LegendLetter state="almost" letter="V" />
                        <LegendLetter state="error" letter="I" />
                    </div>
                </div>

                → Finalment provem amb la paraula NÚVOL, on totes les lletres són correctes.
                <div className="d-flex justify-content-center align-items-center  mt-2 ">
                    <LegendLetter state="correct" letter="N" />
                    <LegendLetter state="correct" letter="U" />
                    <LegendLetter state="correct" letter="V" />
                    <LegendLetter state="correct" letter="O" />
                    <LegendLetter state="correct" letter="L" />
                </div>
                

                <h5 className="mt-4">Lletres repetides</h5>
                → Si la paraula amagada té lletres repetides, com per exemple BOSSA i provem amb la paraula SESTA,
                es marca en verd la S que està en la posició correcta i l'altra S en groc perquè està en la paraula però no en la posició correcta.
                <div className="d-flex justify-content-center align-items-center  mt-2 ">
                    <LegendLetter state="almost" letter="S" />
                    <LegendLetter state="error" letter="E" />
                    <LegendLetter state="correct" letter="S" />
                    <LegendLetter state="error" letter="T" />
                    <LegendLetter state="correct" letter="A" />
                </div>

                → Si la paraula amagada té lletres repetides, com per exemple BOSSA i provem amb la paraula CASTA,
                es marca en verd la S que està en la posició correcta i no s'avisa si hi ha una lletra repetida.
                <div className="d-flex justify-content-center align-items-center  mt-2 ">
                    <LegendLetter state="error" letter="C" />
                    <LegendLetter state="almost" letter="A" />
                    <LegendLetter state="correct" letter="S" />
                    <LegendLetter state="error" letter="T" />
                    <LegendLetter state="correct" letter="A" />
                </div>
            </div>
        }
    />)
}

export default LegendModal;