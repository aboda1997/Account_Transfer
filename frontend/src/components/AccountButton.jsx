import React from 'react';
import { useNavigate } from 'react-router-dom';

const AccountButton = ({ name, id, balance }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/profile', { state: { name, id, balance } });
  };

  return (
    <button onClick={handleClick}>
      View Profile
    </button>
  );
};

export default AccountButton;