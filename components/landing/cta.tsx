import { CTA_URL, GH_URL } from "./config";
import { Icon } from "./icons";

export function Cta() {
  return (
    <section className="cta" id="cta">
      <div className="wrap cta-grid">
        <div className="cta-copy">
          <h2>
            <span className="ln">Got an idea?</span>
            <span className="ln">
              Give it a <u>starting point.</u>
            </span>
          </h2>
          <div className="cta-act">
            <a className="btn btn-dark" href={CTA_URL}>
              Let’s build it <Icon className="ic ic-r" name="arrow-right" />
            </a>
            <a className="src" href={GH_URL} target="_blank" rel="noopener">
              <Icon name="github" />
              Read the source
            </a>
          </div>
        </div>
        <div className="zip" id="zip" aria-hidden="true">
          <div className="zip-h">
            <span className="zip-n">
              <Icon className="ic" name="download" />
              my-app.zip
            </span>
            <span className="zip-s">ready</span>
          </div>
          <ul className="zip-l" id="zipL" />
        </div>
      </div>
    </section>
  );
}
