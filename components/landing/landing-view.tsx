import { Cta } from "./cta";
import { Faq } from "./faq";
import { Features } from "./features";
import { Footer } from "./footer";
import { Header } from "./header";
import { Hero } from "./hero";
import { LandingEffects } from "./landing-effects";

export default function LandingView() {
  return (
    <>
      <a className="skip" href="#what">
        Skip to content
      </a>
      <Header />
      <main id="top">
        <Hero />
        <Features />
        <Faq />
        <Cta />
      </main>
      <Footer />
      <LandingEffects />
    </>
  );
}
