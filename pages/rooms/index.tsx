import { useRouter } from "next/router";

export default function CreateRoomPage() {
  const router = useRouter();

  console.log(router.query);

  return <p>CreateRoomPage</p>;
}
