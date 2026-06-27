"use client";

import dynamic from "next/dynamic";

const NightSky  = dynamic(() => import("./NightSky"),  { ssr: false });
const LightBulb = dynamic(() => import("./LightBulb"), { ssr: false });
const PageIntro = dynamic(() => import("./PageIntro"), { ssr: false });
const Cursor    = dynamic(() => import("./Cursor"),    { ssr: false });

export default function ClientShell() {
  return (
    <>
      <NightSky />
      <LightBulb />
      <PageIntro />
      <Cursor />
    </>
  );
}
