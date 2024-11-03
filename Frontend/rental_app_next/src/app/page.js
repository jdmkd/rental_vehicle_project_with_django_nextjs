import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Vehicles } from "@/components/Vehicles";
import Image from "next/image";

export default function Home() {
  return (
    <>
    <Header/>
      <Hero />

      <Vehicles />
      <Contact />
      <Footer />
    </>
  );
}
