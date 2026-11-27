import { CTA_URL, GH_URL } from "./config";
import { Icon, LogoMark } from "./icons";

export function Header() {
  return (
    <header className="top" id="topbar">
      <div className="wrap nav">
        <a className="logo" href="#top" aria-label="mvp home">
          <LogoMark />
          mvp
        </a>
        <nav aria-label="Primary">
          <a href="#what">What you get</a>
          <a href="#faq">Questions</a>
        </nav>
        <div className="right">
          <a
            className="gh"
            href={GH_URL}
            target="_blank"
            rel="noopener"
            aria-label="mvp on GitHub"
          >
            <Icon name="github" />
            <span>GitHub</span>
          </a>
          <a className="btn btn-dark sm" href={CTA_URL}>
            Create a project
          </a>
        </div>
      </div>
    </header>
  );
}
