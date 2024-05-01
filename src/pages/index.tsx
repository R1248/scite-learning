import { useSession } from "next-auth/react";
import Head from "next/head";
import { useState } from "react";
import AuthPage from "~/components/authPage";
import CharacterMenu from "~/components/characterMenu";
import HeadBar from "~/components/headBar";
import ProductsMenu from "~/components/products/productsMenu";
import TestGame from "~/components/theory/testGame";
import TheoryMenu from "~/components/theory/theoryMenu";
import { UserDataProvider } from "~/dataContexts";
import TermDeposits from "~/components/products/termDeposits";

export default function Home() {
  const [router, setRouter] = useState("home");
  const { data: sessionData } = useSession();
  return (
    <>
      <Head>
        <title>Scite Learning</title>
        <meta name="description" content="Create by Scite investment" />
        <link rel="icon" href="/scite.ico" />
      </Head>
      <main className="min-w-screen flex min-h-screen flex-col">
        {sessionData ? (
          <UserDataProvider>
            <HeadBar />
            {router === "home" && (
              <div className="w-100% flex flex-row justify-center">
                <CharacterMenu />
                <TheoryMenu setRouter={setRouter} />
                <ProductsMenu setRouter={setRouter} />
              </div>
            )}
            {router === "generalEconomy" && (
              <div className="w-100% flex flex-row justify-center">
                <TestGame setRouter={setRouter} />
              </div>
            )}
            {router === "termDeposits" && (
              <div className="w-100% flex flex-row justify-center">
                <TermDeposits setRouter={setRouter} />
              </div>
            )}
          </UserDataProvider>
        ) : (
          <AuthPage />
        )}
      </main>
    </>
  );
}
