import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import { useState } from "react";
import CharacterMenu from "~/components/characterMenu";
import HeadBar from "~/components/headBar";
import ProductsMenu from "~/components/productsMenu";
import TestGame from "~/components/testGame";
import TheoryMenu from "~/components/theoryMenu";

import { api } from "~/utils/api";

export default function Home() {
  const [router, setRouter] = useState("home");
  return (
    <>
      <Head>
        <title>Scite Learing</title>
        <meta name="description" content="Create by Scite investment" />
        <link rel="icon" href="/scite.ico" />
      </Head>
      <main className="min-w-screen flex min-h-screen flex-col">
        <HeadBar />

        {router === "home" ? (
          <div className="w-100% flex flex-row justify-center">
            <CharacterMenu />
            <TheoryMenu setRouter={setRouter} />
            <ProductsMenu />
          </div>
        ) : (
          <div className="w-100% flex flex-row justify-center">
            <TestGame setRouter={setRouter} />
          </div>
        )}
      </main>
    </>
  );
}

function AuthShowcase() {
  const { data: sessionData } = useSession();

  const { data: secretMessage } = api.post.getSecretMessage.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined },
  );

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center text-2xl text-white">
        {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
        {secretMessage && <span> - {secretMessage}</span>}
      </p>
      <button
        className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
}
