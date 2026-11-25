import { Suspense } from "react";
import { LandingPage } from "@/components/pustakakucomponent/landing-page";
import { prisma } from "@/lib/prisma";

async function LandingWithBookCount() {
  const totalBooks = await prisma.buku.count();
  return <LandingPage totalBooks={totalBooks} />;
}

export default function Home() {
  return (
    <Suspense fallback={<LandingPage totalBooks={null} />}>
      <LandingWithBookCount />
    </Suspense>
  );
}
