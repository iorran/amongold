import { useRouter } from "next/router";

export default function JoinRoomPage() {
  const router = useRouter();

  console.log(router.query);

  return <p>JoinRoomPage</p>;
}
