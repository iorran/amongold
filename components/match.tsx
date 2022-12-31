import { api } from "../services/api";
import { usePlayers } from "../services/usePlayers";

export type MatchProps = {
  name: string;
  room: string;
};

//TODO: must be a route

export default function Match({ name, room }: MatchProps) {
  const { data } = usePlayers(room as string);

  if (!data) {
    return <div>loading</div>;
  }

  const player = data.joiners.find((player) => player.name === name);
  const isOwner = player?.name === name;

  async function onStart() {
    await api.post(`api/game/start?roomId=${room}`);
  }

  return (
    <div className="flex justify-center content-center">
      <div>
        {player?.name} voce e: <kbd className="kbd">{player?.role} </kbd>
      </div>
      <div className="mt-2">
        {isOwner ? (
          <button
            type="button"
            onClick={onStart}
            className="btn btn-primary w-40"
          >
            Restart
          </button>
        ) : null}
      </div>
    </div>
  );
}
