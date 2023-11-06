import axios from 'axios';
import React from 'react';
import './App.css';
import { UserCard } from './components/UserCard';
import { User } from './types/api/user';

const user = {
  id: 1,
  name: "紫宮るな",
  email:"aaa@aaa.com",
  address: "https://vspo.jp/"
};

function App() {
  const onClickFetchUser = () => {
    axios.get<Array<User>>("https://jsonplaceholder.typicode.com/users")
  }

  return (
    <div className="App">
      <button onClick={onClickFetchUser}>データ取得</button>
      <UserCard user={user} />
    </div>
  );
}

export default App;
