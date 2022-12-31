import { useRouter } from "next/router";

export default function UsersList() {
  const router = useRouter();

  console.log(router.query);

  return <p>JoinRoomPage</p>;
}
