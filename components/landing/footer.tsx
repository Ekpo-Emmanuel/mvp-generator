"use client";

import { useEffect, useState } from "react";
import { GH_URL } from "./config";
import { Icon, LogoMark } from "./icons";

export function ThemeSwitch() {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    const root = document.documentElement;
    const media = matchMedia("(prefers-color-scheme: dark)");
    const sync = () => setDark(root.dataset.theme === "dark");
    const onSystem = (event: MediaQueryListEvent) => {
      let saved: string | null = null;
      try {
        saved = localStorage.getItem("mvp-theme");
      } catch {}
      if (!saved) {
        root.dataset.theme = event.matches ? "dark" : "light";
        sync();
      }
    };
    sync();
    media.addEventListener("change", onSystem);
    return () => media.removeEventListener("change", onSystem);
  }, []);
  const toggle = () => {
    const root = document.documentElement;
    const theme = root.dataset.theme === "dark" ? "light" : "dark";
    root.classList.add("theme-anim");
    root.dataset.theme = theme;
    setDark(theme === "dark");
    document
      .querySelector<HTMLMetaElement>('meta[name="theme-color"]')
      ?.setAttribute("content", theme === "dark" ? "#0D0F09" : "#FFFFFF");
    try {
      localStorage.setItem("mvp-theme", theme);
    } catch {}
    window.setTimeout(() => root.classList.remove("theme-anim"), 350);
  };
  return (
    <button
      className="f-ic theme"
      type="button"
      aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
      aria-pressed={dark}
      onClick={toggle}
    >
      <Icon className="ic sun" name="sun" />
      <Icon className="ic moon" name="moon" />
    </button>
  );
}

export function Footer() {
  return (
    <footer>
      <div className="wrap f-row">
        <a className="logo" href="#top" aria-label="mvp home">
          <LogoMark />
          mvp
        </a>
        <p className="f-note">
          Open source, MIT. Built by{" "}
          <a
            className="by"
            href="https://github.com/Ekpo-Emmanuel/"
            target="_blank"
            rel="noopener"
          >
            @Ekpo-Emmanuel
          </a>
        </p>
        <div className="f-end">
          <ThemeSwitch />
          <a
            className="f-ic"
            href={GH_URL}
            target="_blank"
            rel="noopener"
            aria-label="mvp on GitHub"
          >
            <Icon name="github" />
          </a>
        </div>
      </div>
    </footer>
  );
}
