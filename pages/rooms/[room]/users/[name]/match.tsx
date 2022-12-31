import { useRouter } from "next/router";
import { usePlayers } from "../../../../../services/usePlayers";

export default function PlayPage() {
  const { query } = useRouter();

  const { name, room } = query;

  const { data } = usePlayers(room as string);

  if (!data) {
    return <div>loading</div>;
  }

  const player = data.joiners.find((player) => player.name === name);

  return (
    <section>
      <label>
        {player?.name} voce e: {player?.role}
      </label>
    </section>
  );
}
