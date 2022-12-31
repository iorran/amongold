import { useRouter } from "next/router";
import { usePlayers } from "../services/usePlayers";

interface UsersListProps {
  room: string;
}

export default function UsersList({ room }: UsersListProps) {
  const { data } = usePlayers(room);

  if (!data) {
    return <div>loading</div>;
  }

  return (
    <>
      <section>
        <h1 className="text-3xl font-bold">{data.status}</h1>
      </section>
      <section>
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Owner</th>
              </tr>
            </thead>
            <tbody>
              {data.joiners.map((player, index) => {
                return (
                  <tr key={player.name}>
                    <th>{index}</th>
                    <td>{player.name}</td>
                    <td>{player.owner}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
