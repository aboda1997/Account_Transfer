import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import FileUpload from './pages/FileUpload.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import AccountTransfer from './pages/AccountTransfer.jsx';
import AccountList from './pages/AccountList.jsx';

const App = () => {
  return (
    <BrowserRouter>
      <Sidebar>
        <Routes>
          <Route path="/" element={<FileUpload />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/accountList" element={<AccountList />} />
          <Route path="/accountTransfer" element={<AccountTransfer />} />
        </Routes>
      </Sidebar>
    </BrowserRouter>
  );
};

export default App;