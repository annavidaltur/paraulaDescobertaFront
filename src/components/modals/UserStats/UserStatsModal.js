import React, { useEffect, useState } from 'react';
import CustomModal from '../CustomModal';
import axios from 'axios';
import AttemptsChart from './AttemptsChart';

const urlBack = process.env.REACT_APP_URL_BACK;

const UserStatsModal = ({ isOpen, onClose }) => {
  const [stats, setStats] = useState();
  const userId = 1;
  
  useEffect(() => {
    axios.get(`${urlBack}/GetUserStats?userId=${userId}`)
      .then((response) => {
        setStats(response.data)
        console.log(response.data)
      })
  }, [])

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
              {(stats.nGuessed*100/stats.nPlayed).toFixed(2)}%
            </div>
          </div>
          <div className="row">
            <div className='col-4'>
              Ratxa actual
            </div>
            <div className='col-4'>
              Millor ratxa
            </div>
            <div className='col-4'>
              Millor intent
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