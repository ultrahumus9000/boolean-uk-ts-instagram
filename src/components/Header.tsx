import React, { useEffect } from "react";
import useStore from "../store";
import HeaderUser from "./HeaderUser";

export function Header() {
  const users = useStore((store) => store.users);
  const fetchUsers = useStore((store) => store.fetchUsers);
  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>
      <div className="wrapper">
        {users.map((user) => {
          return <HeaderUser key={user.id} user={user} />;
        })}
      </div>
    </>
  );
}
