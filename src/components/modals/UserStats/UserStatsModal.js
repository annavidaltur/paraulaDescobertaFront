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

  if (!isOpen) return null;


  return (
    <CustomModal
      isOpen={isOpen}
      onClose={onClose}
      title='Estadístiques'
      body={
        <>
          <h1>guapa</h1>
          <AttemptsChart stats={stats}/>
        </>
      }
    />
  );
};

export default UserStatsModal;