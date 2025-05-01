import React, { useContext, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { AppContext } from '../../../App';
import { formatDate } from "../../../utils/utils";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import axios from 'axios';
import CustomModal from '../CustomModal';

const urlBack = import.meta.env.VITE_URL_BACK;

const GameOverModal = ({ isOpen, onClose }) => {
  const { gameOver, currAttempt, elapsedTime, rowState } = useContext(AppContext);
  const [correctWord, setCorrectWord] = React.useState('');

  useEffect(() => {
    // Obtenemos la palabra diaria
    if (gameOver.gameOver) {
      axios.get(urlBack + '/GetParaulaDiaria')
        .then((response) => {
          setCorrectWord(response.data.correct)
          console.log(response.data.correct)
        })
    }

  }, [gameOver])

  if (!isOpen) return null;

  const formatted = formatDate(elapsedTime)
  const generateMiniBoard = () => {
    let miniBoardText = "";

    rowState.forEach(row => {
      let rowText = "";
      row.forEach(state => {
        if (state === "correct")
          rowText += '🟢';
        else if (state === "almost")
          rowText += '🟡';
        else
          rowText += '⚫';
      })
      miniBoardText = rowText + '\n' + miniBoardText;
    });
    return miniBoardText;
  };

  const shareOnTwitter = () => {
    let text = "";
    if (gameOver.guessedWord)
      text = `Acabe de resoldre la paraula secreta d'@encreuada en ${currAttempt.attempt} intents en ${formatted}! Prova'l tu també!\n${generateMiniBoard()}`;
    else text = `He fallat després de ${currAttempt.attempt} intents en ${formatted}. Intenta-ho tu també!\n${generateMiniBoard()}`;

    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  const shareOnFacebook = () => {
    let text = "";
    if (gameOver.guessedWord)
      text = `Acabe de resoldre la paraula secreta d'@encreuada en ${currAttempt.attempt} intents en ${formatted}! Prova'l tu també!\n${generateMiniBoard()}`;
    else text = `He fallat després de ${currAttempt.attempt} intents en ${formatted}. Intenta-ho tu també!\n${generateMiniBoard()}`;

    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}&quote=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  const shareOnWhatsApp = () => {
    let text = "";
    if (gameOver.guessedWord)
      text = `Acabe de resoldre la paraula secreta d'@encreuada en ${currAttempt.attempt} intents en ${formatted}! Prova'l tu també!\n${generateMiniBoard()}`;
    else text = `He fallat després de ${currAttempt.attempt} intents en ${formatted}. Intenta-ho tu també!\n${generateMiniBoard()}`;

    const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  const miniBoardLines = generateMiniBoard().split('\n').map((line, index) => (
    <div key={index}>{line}</div>
  ));

  const footer = (
    <div className='container'>
      <div className='row'>
        <p>Comparteix el teu resultat!</p>
      </div>
      <div className='row'>
        <div className='col'>
          <Button className='rounded-circle m-1' onClick={shareOnTwitter}><FontAwesomeIcon icon={faTwitter} /></Button>
          <Button className='rounded-circle m-1' onClick={shareOnFacebook}><FontAwesomeIcon icon={faFacebook} /></Button>
          <Button className='rounded-circle m-1' onClick={shareOnWhatsApp}><FontAwesomeIcon icon={faWhatsapp} /></Button>
        </div>
      </div>
    </div>
  );
  return (
    <CustomModal
      isOpen={isOpen}
      onClose={onClose}
      title={gameOver.guessedWord ? 'Enhorabona!' : 'Has fallat'}
      body={
        <>
          <h1>Paraula correcta: <a href={`https://avl.gva.es/lexicval/?paraula=${correctWord}`} target="_blank">{correctWord}</a></h1>
          {gameOver.guessedWord && (<h3>Ho has endevinat en {currAttempt.attempt} {currAttempt.attempt === 1 ? 'intent' : 'intents'} i {formatted}</h3>)}
          <div className="mini-board">{miniBoardLines}</div>
        </>
      }
      footer={footer}
    />
  );
};

export default GameOverModal;