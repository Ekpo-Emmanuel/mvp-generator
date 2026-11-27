import { Icon } from "./icons";

export function Features() {
  return (
    <section className="wrap sec" id="what">
      <div className="sec-top rv">
        <div>
          <div className="eyebrow">The boring bits, taken care of.</div>
          <h2 className="big">Get straight to the good part.</h2>
        </div>
        <p>
          The providers, config and environment placeholders that normally eat
          your first afternoon are already in the folder.
        </p>
      </div>
      <div className="cards">
        <article className="card rv">
          <div
            className="art wire"
            id="wireArt"
            role="group"
            aria-label="Animation: four separate tool setups becoming one connected project"
          >
            <div className="wc">
              <span className="wc-a">4 separate setups</span>
              <span className="wc-b">
                <i aria-hidden="true" />1 project, already wired
              </span>
            </div>
            <div className="wf" id="wf">
              <svg className="wl" id="wl" aria-hidden="true" />
              <div className="wchip hub" id="wHub" />
              <div className="wcol" id="wCol" />
            </div>
          </div>
          <div className="body">
            <h3>Your tools belong together.</h3>
            <p>
              Pick the services you already know. Get the dependencies,
              providers, and environment placeholders in one project.
            </p>
          </div>
        </article>
        <article className="card rv">
          <div
            className="art tw"
            id="termArt"
            role="group"
            aria-label="Animation: unzip, add your keys, install, run, then edit a file and see it update"
          >
            <div className="tr">
              <span className="tr-l" id="trL">
                1 Unzip
              </span>
              <span className="tr-s" id="trS" aria-hidden="true">
                <i />
                <i />
                <i />
                <i />
                <i />
              </span>
            </div>
            <div className="tw-win" id="twWin">
              <div className="tw-bar">
                <span className="tw-tabs">
                  <b className="on" id="tabZ">
                    zsh
                  </b>
                  <b id="tabE">.env</b>
                </span>
                <span className="tw-cwd" id="twCwd">
                  ~/Downloads
                </span>
                <button
                  className="copy"
                  id="copy"
                  type="button"
                  aria-label="Copy commands"
                >
                  <Icon className="ic" name="copy" />
                  <span>Copy</span>
                </button>
              </div>
              <div className="tw-body">
                <div className="tw-term" id="twTerm" />
                <div className="tw-env" id="twEnv" />
              </div>
            </div>
            <div className="tw-br" id="twBr" aria-hidden="true">
              <div className="br-bar">
                <i />
                <i />
                <i />
                <span id="brUrl">localhost:3000</span>
              </div>
              <div className="br-body">
                <div className="br-nav">
                  <span className="br-logo">my-app</span>
                  <span className="br-btn">Sign in</span>
                </div>
                <h4 id="brH">Welcome to my-app</h4>
                <p>
                  Edit <code id="brF">app/page.tsx</code> to get started.
                </p>
              </div>
              <div className="hmr" id="hmr">
                <i />
                <span id="hmrF">app/page.tsx</span> saved
              </div>
            </div>
          </div>
          <div className="body">
            <h3>A folder full of possibility.</h3>
            <p>
              Unzip, add your service keys, and run locally. Every file is yours
              to read, change, and build on.
            </p>
          </div>
        </article>
      </div>
    </section>
  );
}
