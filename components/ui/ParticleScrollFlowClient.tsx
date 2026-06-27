"use client";

import dynamic from "next/dynamic";

const ParticleScrollFlow = dynamic(() => import("./ParticleScrollFlow"), { ssr: false });

export default function ParticleScrollFlowClient() {
  return <ParticleScrollFlow />;
}
