import { usePlayers } from "../services/usePlayers";

export type MatchProps = {
  name: string;
  room: string;
};

export default function Match({ name, room }: MatchProps) {
  const { data } = usePlayers(room as string);

  if (!data) {
    return <div>loading</div>;
  }

  const player = data.joiners.find((player) => player.name === name);

  return (
    <section>
      {player?.name} voce e: <kbd className="kbd">{player?.role} </kbd>
    </section>
  );
}
