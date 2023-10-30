import { ReactNode } from "react";

import Head from "next/head";
import Navbar from "./navbar";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Head>
        <title>Chores | Munch Mansion</title>
      </Head>
      <Navbar />
      <main>{children}</main>
      {/* <Footer /> */}
    </>
  );
}
