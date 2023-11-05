import React from 'react';
import './App.css';
import { UserCard } from './components/UserCard';

const user = {
  id: 1,
  name: "紫宮るな",
  email:"aaa@aaa.com",
  address: "https://vspo.jp/"
};

function App() {
  return (
    <div className="App">
      <UserCard user={user} />
    </div>
  );
}

export default App;
