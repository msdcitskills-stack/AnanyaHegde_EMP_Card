import { FlippingCard } from "@/components/flippingCard";
import { Logo } from "@/components/logo";


export default function Home() {
  return (
    <main className="relative flex min-h-screen w-full flex-col items-center justify-between overflow-hidden bg-transparent text-black">
      <Logo className="mt-1 text-text-primary opacity-60" />
      <FlippingCard />
      <footer className="mb-1 font-mono text-sm text-text-primary-one">Made with 💛 by Ananya</footer>
    </main>
  );
}
