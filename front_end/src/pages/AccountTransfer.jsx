import React, { useState } from 'react';
import axios from 'axios';
import {BASE_URL } from '../helpers/general';
const AccountTransfer = () => {
  const [fromAccountId, setFromAccountId] = useState('');
  const [toAccountId, setToAccountId] = useState('');
  const [transferAmount, setTransferAmount] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleTransfer = async () => {
    try {
      const response = await axios.post(`${BASE_URL.local}/transfer/`, {
        fromAccountId,
        toAccountId,
        amount: transferAmount
      });

      if (response.data.success) {
        setSuccessMessage('Transfer successful!');
        setErrorMessage('');
        setFromAccountId('');
        setToAccountId('');
        setTransferAmount(0);
      } else {
        setErrorMessage(response.data.message);
        setSuccessMessage('');
      }
    } catch (error) {
      setErrorMessage('An error occurred during the transfer.');
      setSuccessMessage('');
      console.error('Error transferring funds:', error);
    }
  };

  return (
    <div className='formData'>
      <h2>Account Transfer</h2>
      {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
      {successMessage && <div style={{ color: 'green' }}>{successMessage}</div>}
      <div>
        <h3>Transfer From</h3>
        <label htmlFor="fromAccountId">Account ID:</label>
        <input
        className='large-input'
          type="text"
          id="fromAccountId"
          value={fromAccountId}
          onChange={(e) => setFromAccountId(e.target.value)}
        />
        <label htmlFor="transferAmount">Amount:</label>
        <input
        className='large-input'
          type="number"
          id="transferAmount"
          value={transferAmount}
          onChange={(e) => setTransferAmount(e.target.value)}
        />
      </div>
      <div>
        <h3>Transfer To</h3>
        <label htmlFor="toAccountId">Account ID:</label>
        <input
        className='large-input'
          type="text"
          id="toAccountId"
          value={toAccountId}
          onChange={(e) => setToAccountId(e.target.value)}
        />
      </div>
      <button className='large-button' onClick={handleTransfer}>Transfer</button>
    </div>
  );
};

export default AccountTransfer;

