import { useEffect } from "react";
import { socket } from "../hooks/useSocket";

import Hero from "../components/landing/Hero";
import Features from "../components/landing/Features";
import DemoSection from "../components/landing/DemoSection";
import SecuritySection from "../components/landing/SecuritySection";
import CTASection from "../components/landing/CTASection";

export default function Home() {
  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to server:", socket.id);
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from server");
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
    };
  }, []);

  return (
    <>
      <Hero />
      <Features />
      <DemoSection />
      <SecuritySection />
      <CTASection />
    </>
  );
}