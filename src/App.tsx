import axios from 'axios';
import React, { useState } from 'react';
import './App.css';
import { UserCard } from './components/UserCard';
import { User } from './types/api/user';
import { UserProfile } from './types/userProfile';

const user = {
  id: 1,
  name: "紫宮るな",
  email:"aaa@aaa.com",
  address: "https://vspo.jp/"
};

function App() {
  const [userProfiles, setUserProfiles] = useState<Array<UserProfile>>([]);

  const onClickFetchUser = () => {
    axios
      .get<Array<User>>("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        // mapで処理して必要なデータのみを取得する
        // テンプレート文字列を使って、使いたい形にする
        const data = res.data.map((user) => ({
          id: user.id,
          name: `${user.name}(${user.username})`,
          email: user.email,
          address: `${user.address.city}${user.address.suite}${user.address.street}`,
        }));
        setUserProfiles(data)
      });
  }

  return (
    <div className="App">
      <button onClick={onClickFetchUser}>データ取得</button>
      {userProfiles.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
      <UserCard user={user} />
    </div>
  );
}

export default App;
