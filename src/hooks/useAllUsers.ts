// 全ユーザーの一覧を取得するカスタムフック
import { useState } from "react";
import axios from "axios";
import { UserProfile } from "../types/userProfile";
import { User } from "../types/api/user";

export const useAllUsers = () => {
  const sampleUser: UserProfile = {
    id: 0,
    name: "紫宮るな",
    email: "shinomiya@runa.com",
    address: "https://vspo.jp/member/runa-shinomiya"
  }

  // userProfilesには全ユーザーの一覧が入る
  const [userProfiles, setUserProfiles] = useState<Array<UserProfile>>([sampleUser]);
  // ローディング中であることをユーザーに伝える
  const [loading, setLoading] = useState<boolean>(false);
  // ローディングの成功・失敗をユーザーに伝える
  const [error, setError] = useState<boolean>(false);

  // 実際にデータを取得する関数
  const getUsers = () => {
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
  };

  // オブジェクトでreturnする
  return { getUsers, userProfiles, loading, error };
};
