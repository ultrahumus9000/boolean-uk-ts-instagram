import React, { SyntheticEvent } from "react";
import useStore, { SingleUser } from "../store";

type UserProps = {
  user: SingleUser;
};
export default function HeaderUser({ user }: UserProps) {
  const activerUser = useStore((store) => store.activerUser);
  const setActiveUser = useStore((store) => store.setActiveUser);
  return (
    <div
      className={`chip ${activerUser !== user.username ? null : "active"}`}
      onClick={(e: SyntheticEvent) => {
        let targetEvent = e.target as HTMLDivElement;
        if (targetEvent.innerText === activerUser) {
          setActiveUser("");
        } else {
          setActiveUser(targetEvent.innerText);
        }
      }}
    >
      <div className="avatar-small">
        <img src={user.avatar} alt={user.username} />
      </div>
      <span>{user.username}</span>
    </div>
  );
}
