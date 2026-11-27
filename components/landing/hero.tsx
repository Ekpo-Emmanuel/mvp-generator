import { CTA_URL, GH_URL } from "./config";
import { Icon } from "./icons";

export function HeroDemo() {
  return (
    <div
      className="hero-art"
      id="ha"
      role="group"
      aria-label="Animated preview: choosing a stack, generating the project, running it"
    >
      <div className="ha-top">
        <div
          className="ha-tabs"
          id="haTabs"
          role="group"
          aria-label="Preview a different framework"
        />
      </div>
      <div className="ha-stack" id="haStack" aria-hidden="true" />
      <div className="ha-panel" aria-hidden="true">
        <div className="ha-ph">
          <span className="ha-folder" id="haFolder">
            my-app/
          </span>
          <span className="ha-count" id="haCount" />
        </div>
        <ol className="ha-files" id="haFiles" />
        <div className="ha-bar" id="haBar" />
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section className="wrap hero">
      <div className="hero-copy">
        <a className="tag" href={GH_URL} target="_blank" rel="noopener">
          <Icon name="github" />
          <b>Open source</b>
        </a>
        <h1>
          <span className="ln">Less setting up.</span>
          <span className="ln">
            More <u>getting somewhere.</u>
          </span>
        </h1>
        <p className="lede">
          Your framework, auth, database, and styling. Connected in one starter
          project, so you can get to the part you actually want to build.
        </p>
        <div className="ctas">
          <a className="btn btn-accent" href={CTA_URL}>
            Build your starter <Icon className="ic ic-r" name="arrow-right" />
          </a>
          <a className="btn btn-line" href="#what">
            Take a look inside <Icon className="ic ic-d" name="arrow-down" />
          </a>
        </div>
        <p className="fine">No account. No subscription. Just your code.</p>
      </div>
      <HeroDemo />
    </section>
  );
}
