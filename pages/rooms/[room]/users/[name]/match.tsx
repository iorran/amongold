import { useRouter } from "next/router";

export default function PlayPage() {
  const router = useRouter();

  return (
    <>
      <section>
        <label>Don&rsquo;t show it, you are....</label>
      </section>
      <section>{JSON.stringify(router.query)}</section>
    </>
  );
}
