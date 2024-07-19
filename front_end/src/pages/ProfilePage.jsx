import { useLocation } from 'react-router-dom';

const ProfilePage = () => {
  const { state } = useLocation();
  const { name, id, balance } = state;

  return (
    <div>
      <h1>User Profile</h1>
      <p>Name: {name}</p>
      <p>ID: {id}</p>
      <p>Balance: ${balance.toFixed(2)}</p>
    </div>
  );
};

export default ProfilePage;