import { useState } from "react";
import { api } from "../services/api";
import { usePlayers } from "../services/usePlayers";

export type MatchProps = {
  name: string;
  room: string;
};

//TODO: must be a route

export default function Match({ name, room }: MatchProps) {
  const { data } = usePlayers(room as string);

  const [restarted, setRestarted] = useState(false);

  if (!data) {
    return <div>loading</div>;
  }

  const player = data.joiners.find((player) => player.name === name);
  const isOwner = player?.name === name && player.owner;

  async function onStart() {
    setRestarted(true);
    await api.post(`api/game/start?roomId=${room}`);
    setRestarted(false);
  }

  if (restarted) {
    return (
      <div className="flex flex-col justify-center items-center">
        Restarting!
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center">
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
