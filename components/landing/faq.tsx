import { GH_URL } from "./config";

export function Faq() {
  return (
    <section className="wrap faq" id="faq">
      <h2 className="big rv">A few things you might be wondering.</h2>
      <div>
        <details name="faq">
          <summary>
            Is it really free?
            <span className="pm" aria-hidden="true" />
          </summary>
          <div className="a">
            Yes. mvp is open source under the MIT licence. No account, no
            subscription.
          </div>
        </details>
        <details name="faq">
          <summary>
            What’s inside the download?
            <span className="pm" aria-hidden="true" />
          </summary>
          <div className="a">
            A project folder for the framework you picked, with auth, database
            and styling connected, plus a <code>.env.example</code> listing the
            keys you’ll need.
          </div>
        </details>
        <details name="faq">
          <summary>
            What do I need to do after downloading?
            <span className="pm" aria-hidden="true" />
          </summary>
          <div className="a">
            Unzip, copy <code>.env.example</code> to <code>.env</code>, add your
            keys, then <code>npm install</code> and <code>npm run dev</code>.
          </div>
        </details>
        <details name="faq">
          <summary>
            Can I change the code later?
            <span className="pm" aria-hidden="true" />
          </summary>
          <div className="a">
            All of it. It’s plain code in your folder — nothing to eject from.
          </div>
        </details>
        <details name="faq">
          <summary>
            Who makes it?
            <span className="pm" aria-hidden="true" />
          </summary>
          <div className="a">
            mvp is open source and maintained by{" "}
            <a
              className="tl"
              href={GH_URL}
              target="_blank"
              rel="noopener"
            >
              @Ekpo-Emmanuel
            </a>
            . Read the code, open an issue, or send a pull request on GitHub.
          </div>
        </details>
        <details name="faq">
          <summary>
            Do I need an account?
            <span className="pm" aria-hidden="true" />
          </summary>
          <div className="a">No. The project is generated in your browser.</div>
        </details>
      </div>
    </section>
  );
}
