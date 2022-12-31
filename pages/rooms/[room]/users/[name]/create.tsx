import { useRouter } from "next/router";
import UsersList from "../../../../../components/users-list";

export default function CreateRoomPage() {
  const { push, query } = useRouter();
  console.log(query);

  const { name, room = 90 } = query;

  function onStart() {
    push(`rooms/${room}/users/${name}/match`);
  }

  return (
    <>
      <section>
        <label>
          Room: <span>{room}</span>
        </label>
      </section>
      <UsersList />
      <button onClick={onStart}>Start</button>
    </>
  );
}
