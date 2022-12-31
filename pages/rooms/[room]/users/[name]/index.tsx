import { useRouter } from "next/router";
import UsersList from "../../../../../components/users-list";
import { api } from "../../../../../services/api";
import { usePlayers } from "../../../../../services/usePlayers";

export default function CreateRoomPage() {
  const { push, query } = useRouter();

  const { name, room } = query;

  const { data } = usePlayers(room as string);

  if (!data) {
    return <div>loading</div>;
  }

  if (data.status === "STARTED") {
    push(`rooms/${room}/users/${name}/match`);
  }

  const isOwner = data.joiners.find((player) => player.owner)?.name === name;

  async function onStart() {
    await api.post(`api/game/start?roomId=${room}`);
  }

  return (
    <>
      <section>
        <label>
          Room: <span>{room}</span>
        </label>
      </section>
      <UsersList room={room as string} />
      {isOwner ? (
        <button
          type="button"
          onClick={onStart}
          className="btn btn-primary w-40"
        >
          Start
        </button>
      ) : null}
    </>
  );
}
