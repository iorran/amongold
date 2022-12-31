import { useRouter } from "next/router";
import UsersList from "../../../../../components/users-list";

export default function JoinRoomPage() {
  const router = useRouter();

  const { room } = router.query;

  return (
    <>
      <section>
        <label>
          Room: <span>{room}</span>
        </label>
      </section>
      <UsersList />
    </>
  );
}
