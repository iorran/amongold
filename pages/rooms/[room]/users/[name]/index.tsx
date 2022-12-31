import { useRouter } from "next/router";
import Match from "../../../../../components/match";
import UsersList from "../../../../../components/users-list";
import { api } from "../../../../../services/api";
import { usePlayers } from "../../../../../services/usePlayers";

export default function CreateRoomPage() {
  const { replace, query } = useRouter();

  const { name, room } = query;

  const { data } = usePlayers(room as string);

  if (!data) {
    return <div>loading</div>;
  }

  const isOwner = data.joiners.find((player) => player.owner)?.name === name;

  async function onStart() {
    await api.post(`api/game/start?roomId=${room}`);
  }

  if (data.status === "STARTED") {
    return <Match name={name as string} room={room as string} />;
  }

  return (
    <>
      <section className="flex justify-center mt-2">
        <kbd className="kbd mb-8">{room}</kbd>
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
