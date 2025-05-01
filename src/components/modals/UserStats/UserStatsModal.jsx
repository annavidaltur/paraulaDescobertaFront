import React, { useEffect, useState, useContext } from 'react';
import CustomModal from '../CustomModal';
import axios from 'axios';
import AttemptsChart from './AttemptsChart';
import { AppContext } from '../../../App';

const urlBack = import.meta.env.VITE_URL_BACK;

const UserStatsModal = ({ isOpen, onClose }) => {
  const {gameOver} = useContext(AppContext);
  const [stats, setStats] = useState();
  
  useEffect(() => {
    axios.get(`${urlBack}/GetUserStats`, {withCredentials: true })
      .then((response) => {
        setStats(response.data) 
        console.log("stats", response.data)       
      })
  }, [isOpen])

  if (!isOpen || !stats ) return null;

  return (
    <CustomModal
      isOpen={isOpen}
      onClose={onClose}
      title='Estadístiques'
      body={
        <>
          <div className="container text-center">
          <div className="row">
            <div className='col-6'>
              Nº partides<br/>
              {stats.nPlayed}
            </div>
            <div className='col-6'>
              % victòries<br/>
              {stats.nGuessed > 0 ? (stats.nGuessed*100/stats.nPlayed).toFixed(2) : 0}%
            </div>
          </div>
          <div className="row">
            <div className='col-4'>
              Ratxa actual<br/>{stats.currentStreak}
            </div>
            <div className='col-4'>
              Millor ratxa<br/>{stats.bestStreak}
            </div>
            <div className='col-4'>
              Millor intent<br/>{stats.bestTry}
            </div>
          </div>
        </div>
          <AttemptsChart stats={stats}/>
        </>
      }
    />
  );
};

export default UserStatsModal;