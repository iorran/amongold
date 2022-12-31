import { useRooms } from "../services/useRooms";

export default function RoomsList() {
  const { data } = useRooms();

  if (!data) {
    return <div>loading</div>;
  }

  return (
    <>
      <section>
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th></th>
                <th>Rooms</th>
              </tr>
            </thead>
            <tbody>
              {data.map((room, index) => {
                return (
                  <tr key={room}>
                    <th>{index}</th>
                    <td>{room}</td>
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
