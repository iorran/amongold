import { useRouter } from "next/router";
import UsersList from "../../../../../components/users-list";
import { api } from "../../../../../services/api";

export default function CreateRoomPage() {
  const { push, query } = useRouter();

  const { name, room } = query;

  async function onStart() {
    await api.post(`api/game/start?roomId=${room}`);

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
