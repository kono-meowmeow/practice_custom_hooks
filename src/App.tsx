import axios from 'axios';
import React, { useState } from 'react';
import './App.css';
import { UserCard } from './components/UserCard';
import { User } from './types/api/user';
import { UserProfile } from './types/userProfile';

function App() {
  const sampleUser: UserProfile = {
    id: 0,
    name: "紫宮るな",
    email: "shinomiya@runa.com",
    address: "https://vspo.jp/member/runa-shinomiya"
  }

  const [userProfiles, setUserProfiles] = useState<Array<UserProfile>>([sampleUser]);
  // ローディング中であることをユーザーに伝える
  const [loading, setLoading] = useState<boolean>(false);
  // ローディングの成功・失敗をユーザーに伝える
  const [error, setError] = useState<boolean>(false);

  const onClickFetchUser = () => {
    // ローディング中にする
    setLoading(true);
    // エラーがない状態にする
    setError(false);

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
      })
      .catch(() => {
        // エラーがあれば、エラーフラグをtrueにする
        setError(true);
      })
      // thenでもcatchでもfinallyは最後に実行される
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <div className="App">
      <button onClick={onClickFetchUser}>データ取得</button>
      <br />
      {error ? (
        <p style={{ color: "red" }}>データの取得に失敗しました</p>
      ) : loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {userProfiles.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </>
      )}
    </div>
  );
}

export default App;
