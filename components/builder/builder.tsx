"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { generateProjectFiles } from "@/utils/projectGenerator";
import { downloadFile } from "@/utils/downloadFile";
import ClerkSvg from "@/components/v2/svgs/clerk";
import FirebaseSvg from "@/components/v2/svgs/firebase";
import MongoDBSvg from "@/components/v2/svgs/mongodb";
import TailwindSvg from "@/components/v2/svgs/tailwind";

type Category = "framework" | "authentication" | "database" | "styling";
type Selections = Record<Category, string>;
type Option = { value: string; label: string; description: string; icon: string };

const PATHS: Record<string, string> = {
  nextjs: "M18.665 21.978C16.758 23.255 14.465 24 12 24 5.377 24 0 18.623 0 12S5.377 0 12 0s12 5.377 12 12c0 3.583-1.574 6.801-4.067 9.001L9.219 7.2H7.2v9.596h1.615V9.251l9.85 12.727Zm-3.332-8.533 1.6 2.061V7.2h-1.6v6.245Z",
  vite: "M13.056 23.238a.57.57 0 0 1-1.02-.355v-5.202c0-.63-.512-1.143-1.144-1.143H5.148a.57.57 0 0 1-.464-.903l3.777-5.29c.54-.753 0-1.804-.93-1.804H.57a.574.574 0 0 1-.543-.746.6.6 0 0 1 .08-.157L5.008.78a.57.57 0 0 1 .467-.24h14.589a.57.57 0 0 1 .466.903l-3.778 5.29c-.54.755 0 1.806.93 1.806h5.745c.238 0 .424.138.513.322a.56.56 0 0 1-.063.603z",
  remix: "M21.511 18.508c.216 2.773.216 4.073.216 5.492H15.31c0-.309.006-.592.011-.878.018-.892.036-1.821-.109-3.698-.19-2.747-1.374-3.358-3.55-3.358H1.574v-5h10.396c2.748 0 4.122-.835 4.122-3.049 0-1.946-1.374-3.125-4.122-3.125H1.573V0h11.541c6.221 0 9.313 2.938 9.313 7.632 0 3.511-2.176 5.8-5.114 6.182 2.48.497 3.93 1.909 4.198 4.694ZM1.573 24v-3.727h6.784c1.133 0 1.379.84 1.379 1.342V24Z",
  manual: "M14.23 12.004a2.236 2.236 0 1 1-4.471 0 2.236 2.236 0 0 1 4.471 0zm9.77 0c0-2.104-2.638-4.1-6.684-5.34C18.25 2.54 17.61 0 15.947 0c-1.31 0-2.814 1.14-3.947 2.2C10.867 1.14 9.363 0 8.053 0 6.39 0 5.75 2.54 6.684 6.664 2.638 7.904 0 9.9 0 12.004s2.638 4.1 6.684 5.34C5.75 21.46 6.39 24 8.053 24c1.31 0 2.814-1.14 3.947-2.2 1.133 1.06 2.637 2.2 3.947 2.2 1.663 0 2.303-2.54 1.369-6.656C21.362 16.104 24 14.108 24 12.004z",
  none: "M5 5l14 14M19 5 5 19",
  auth0: "M21.98 7.448 19.62 0H4.347L2.02 7.448c-1.352 4.312.03 9.206 3.815 12.015L12.007 24l6.157-4.552c3.755-2.81 5.182-7.688 3.815-12.015l-6.16 4.58 2.343 7.45-6.157-4.597-6.158 4.58 2.358-7.433-6.188-4.55 7.63-.045L12.008 0l2.356 7.404 7.615.044z",
  supabase: "M11.9 1.036c-.015-.986-1.26-1.41-1.874-.637L.764 12.05C-.33 13.427.65 15.455 2.409 15.455h9.579l.113 7.51c.014.985 1.259 1.408 1.873.636l9.262-11.653c1.093-1.375.113-3.403-1.645-3.403h-9.642z",
  bootstrap: "M4.984 2C3.617 2 2.602 3.2 2.648 4.5c.043 1.246-.015 2.863-.421 4.184-.407 1.324-1.098 2.16-2.227 2.27v1.214c1.129.105 1.82.945 2.227 2.266.406 1.32.464 2.937.421 4.187-.046 1.297.97 2.496 2.336 2.496h14.032c1.37 0 2.382-1.195 2.34-2.496-.044-1.25.011-2.867.417-4.187.41-1.32 1.098-2.16 2.227-2.266v-1.215c-1.129-.11-1.816-.945-2.227-2.27-.406-1.32-.46-2.937-.418-4.183.043-1.3-.968-2.5-2.34-2.5Z",
  css: "m22.645.023-1.997 21.625L12 23.977l-8.648-2.329L1.355.023ZM18.62 4.422H5.242l.324 2.61h6.786l-.36.152-6.191 2.578.207 2.55 5.984.02 3.207.012-.203 3.402-3.004.844-2.926-.726-.175-2.114H6.184l.351 4.078 5.457 1.613 5.438-1.582.703-8.097h-6.156l6.383-2.732Z",
};

const options: Record<Category, Option[]> = {
  framework: [
    { value: "nextjs", label: "Next.js", description: "React Framework for Production", icon: "nextjs" },
    { value: "vite", label: "Vite", description: "Next Generation Frontend Tooling", icon: "vite" },
    { value: "remix", label: "Remix", description: "Full stack web framework", icon: "remix" },
    { value: "manual", label: "React.js", description: "A JavaScript library for building user interfaces", icon: "manual" },
  ],
  authentication: [
    { value: "none", label: "No auth", description: "Skip authentication", icon: "none" },
    { value: "clerk", label: "Clerk", description: "Complete user management", icon: "clerk" },
    { value: "auth0", label: "Auth0", description: "Enterprise-ready auth platform", icon: "auth0" },
    { value: "firebase", label: "Firebase", description: "Authentication by Google", icon: "firebase" },
    { value: "supabase", label: "Supabase", description: "Open source auth provider", icon: "supabase" },
  ],
  database: [
    { value: "none", label: "No database", description: "Skip database setup", icon: "none" },
    { value: "supabase", label: "Supabase", description: "Open source Firebase alternative", icon: "supabase" },
    { value: "firebase", label: "Firebase", description: "Database by Google", icon: "firebase" },
    { value: "xata", label: "Xata", description: "Serverless database platform", icon: "xata" },
    { value: "mongodb", label: "MongoDB", description: "Document-based database", icon: "mongodb" },
  ],
  styling: [
    { value: "tailwind", label: "Tailwind CSS", description: "A utility-first CSS styling", icon: "tailwind" },
    { value: "bootstrap", label: "Bootstrap", description: "The world's most popular CSS styling", icon: "bootstrap" },
    { value: "css", label: "Plain CSS", description: "Write your own custom CSS styles", icon: "css" },
  ],
};

const steps = [
  { key: "framework" as const, label: "Framework", title: "Pick a framework", sub: "What your app is built on. You can change anything later." },
  { key: "authentication" as const, label: "Auth", title: "How do people sign in?", sub: "Choose a provider, or skip it and add one later." },
  { key: "database" as const, label: "Database", title: "Where does your data live?", sub: "Pick a database, or skip it for now." },
  { key: "styling" as const, label: "Styling", title: "How should it look?", sub: "The CSS setup your components start with." },
] as const;

function Logo({ kind }: { kind: string }) {
  if (kind === "clerk") return <ClerkSvg/>;
  if (kind === "firebase") return <FirebaseSvg/>;
  if (kind === "mongodb") return <MongoDBSvg/>;
  if (kind === "tailwind") return <TailwindSvg/>;
  if (kind === "xata") return <span className="mono">X</span>;
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d={PATHS[kind]} fill="currentColor"/></svg>;
}

export function ThemeButton() {
  const toggle = () => { const root = document.documentElement; const next = root.dataset.theme === "dark" ? "light" : "dark"; root.dataset.theme = next; try { localStorage.setItem("mvp-theme", next); } catch {} };
  return <button className="theme" type="button" aria-label="Switch colour theme" onClick={toggle}><svg className="ic moon" viewBox="0 0 24 24"><path d="M20 14.5A8.5 8.5 0 019.5 4 8.5 8.5 0 1020 14.5z"/></svg><svg className="ic sun" viewBox="0 0 24 24"><circle cx="12" cy="12" r="4"/><path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M5.3 18.7l1.4-1.4M17.3 6.7l1.4-1.4"/></svg></button>;
}

export function StepRail({ current, reached, go }: { current: number; reached: number; go: (step: number) => void }) {
  return <div className="rail-wrap"><ol className="rail" aria-label="Progress">{[...steps.map(s => s.label), "Review"].map((label, index) => <li className={index < current ? "done" : index === current ? "now" : ""} key={label}><button type="button" disabled={index > reached} aria-current={index === current ? "step" : undefined} onClick={() => go(index)}><span className="bar"/><span className="lab"><i>0{index + 1}</i><span>{label}</span></span></button></li>)}</ol></div>;
}

export function OptionCard({ option, category, checked, select }: { option: Option; category: Category; checked: boolean; select: (value: string) => void }) {
  return <label className="opt"><input className="sr" type="radio" name={category} value={option.value} checked={checked} onChange={() => select(option.value)}/><span className="tile"><Logo kind={option.icon}/></span><span><b>{option.label}</b><small>{option.description}</small></span><span className="tick"><svg className="ic" viewBox="0 0 24 24"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg></span></label>;
}

export function OptionGrid({ category, selected, select }: { category: Category; selected: string; select: (value: string) => void }) {
  const skip = category === "authentication" || category === "database";
  return <div className={`opts${skip ? " skip-first" : ""}`} role="radiogroup" aria-label={steps.find(step => step.key === category)?.label}>{options[category].map(option => <OptionCard key={option.value} option={option} category={category} checked={selected === option.value} select={select}/>)}</div>;
}

function previewFiles(selected: Selections) {
  const next = selected.framework === "nextjs"; const remix = selected.framework === "remix"; const files = ["package.json"];
  if (selected.framework) files.push(next ? "next.config.ts" : selected.framework === "manual" ? "index.html" : "vite.config.ts");
  if (selected.authentication && selected.authentication !== "none") files.push(`${next ? "lib" : "src/lib"}/auth.ts`);
  if (selected.database && selected.database !== "none") files.push(`${next ? "lib" : "src/lib"}/db.ts`);
  if (next) files.push("app/layout.tsx", "app/page.tsx"); else if (remix) files.push("app/root.tsx", "app/routes/_index.tsx"); else if (selected.framework) files.push("src/main.tsx", "src/App.tsx");
  if (selected.styling === "tailwind") files.push("tailwind.config.ts", "postcss.config.js"); else if (selected.styling === "bootstrap") files.push("src/bootstrap.scss"); else if (selected.styling === "css") files.push("src/globals.css");
  if ((selected.authentication && selected.authentication !== "none") || (selected.database && selected.database !== "none")) files.push(".env.example");
  files.push("README.md"); return files;
}

export function PreviewTerminal({ selected, name }: { selected: Selections; name: string }) {
  const files = previewFiles(selected); const port = selected.framework === "vite" ? 5173 : 3000;
  return <aside className="preview" aria-label="Preview of your project"><div className="pv-cap"><span>Preview</span></div><div className="term"><div className="h"><b>{name}/</b><span>{files.length} files</span></div><ol>{files.map(file => <li key={file}><span>{file}</span></li>)}</ol><div className="s"><span className="dot"/><span>ready on&nbsp;<b>http://localhost:{port}</b></span><span className="caret"/></div></div><p className="pv-note">File names are a sketch. Your zip has the real thing.</p></aside>;
}

export function ReviewStep({ selected, change, name }: { selected: Selections; change: (step: number) => void; name: string }) {
  return <><h1>Ready when you are</h1><p className="sub">Check your choices and download the zip.</p><div className="body"><div className="rev">{steps.map((step, index) => { const option = options[step.key].find(item => item.value === selected[step.key]); return <div className="rev-row" key={step.key}><span className="k">{step.label}</span><span className="v"><span className="tile"><Logo kind={option?.icon ?? "none"}/></span><span>{option?.label}</span></span><button className="link" type="button" onClick={() => change(index)}>Change</button></div>; })}</div><div className="field"><label htmlFor="pname">Project name</label><div className="in"><input id="pname" value={name} readOnly aria-describedby="pn-h"/><em>.zip</em></div><p id="pn-h">The existing generator derives this from the framework.</p></div></div></>;
}

export function BottomNav({ current, canProceed, busy, name, back, next }: { current: number; canProceed: boolean; busy: boolean; name: string; back: () => void; next: () => void }) {
  const review = current === steps.length;
  return <footer className="nav"><div className="nav-in"><button className="btn btn-line" style={{ visibility: current === 0 ? "hidden" : "visible" }} type="button" onClick={back}><svg className="ic" viewBox="0 0 24 24"><path d="M19 12H5M11 6l-6 6 6 6"/></svg>Back</button><button className={`btn btn-accent${busy ? " work" : ""}`} type="button" disabled={!canProceed || busy} onClick={next}><span>{busy ? "Building…" : review ? `Download ${name}.zip` : "Next"}</span><svg className="ic" viewBox="0 0 24 24"><path d={review ? "M12 4v11M7 11l5 5 5-5M5 20h14" : "M5 12h14M13 6l6 6-6 6"}/></svg>{busy && <span className="prog"/>}</button></div></footer>;
}

export function BuilderShell() {
  const [current, setCurrent] = useState(0); const [reached, setReached] = useState(0); const [direction, setDirection] = useState<"f" | "b">("f");
  const [selected, setSelected] = useState<Selections>({ framework: "", authentication: "", database: "", styling: "" }); const [busy, setBusy] = useState(false); const [status, setStatus] = useState("");
  const name = `${selected.framework || "project"}-project`; const files = useMemo(() => previewFiles(selected), [selected]); void files;
  const go = (index: number) => { if (index > reached || busy) return; setDirection(index >= current ? "f" : "b"); setCurrent(index); window.scrollTo(0, 0); };
  const canProceed = current === steps.length ? Object.values(selected).every(Boolean) : Boolean(selected[steps[current].key]);
  const next = async () => { if (!canProceed) return; if (current < steps.length) { const target = current + 1; setReached(value => Math.max(value, target)); setDirection("f"); setCurrent(target); window.scrollTo(0, 0); return; } setBusy(true); setStatus(""); try { const blob = await generateProjectFiles({ framework: selected.framework, auth: selected.authentication, database: selected.database, styling: selected.styling }); downloadFile(blob, `${selected.framework}-project.zip`); setStatus(`Done. ${selected.framework}-project.zip is on its way.`); } catch (error) { console.error("Error generating your project:", error); setStatus("Something went wrong. Try again."); } finally { setBusy(false); } };
  return <div className="builder-page"><header className="top"><Link className="logo" href="/" aria-label="mvp home"><svg viewBox="0 0 24 24"><path d="M2 21 6.5 7h3.6L5.6 21zM9.5 21l3.2-10h3.6L13.1 21zM17 21l2.2-7H23l-2.2 7z" fill="currentColor"/></svg>mvp</Link><div className="top-r"><Link className="exit" href="/">Back to site</Link><ThemeButton/></div></header><StepRail current={current} reached={reached} go={go}/><main><section className="stage" aria-live="polite"><div key={current} className={direction === "f" ? "enter-f" : "enter-b"}>{current < steps.length ? <><h1>{steps[current].title}</h1><p className="sub">{steps[current].sub}</p><div className="body"><OptionGrid category={steps[current].key} selected={selected[steps[current].key]} select={value => setSelected(previous => ({ ...previous, [steps[current].key]: value }))}/></div></> : <ReviewStep selected={selected} change={go} name={name}/>}</div></section><PreviewTerminal selected={selected} name={name}/></main><BottomNav current={current} canProceed={canProceed} busy={busy} name={name} back={() => { setDirection("b"); setCurrent(value => Math.max(0, value - 1)); }} next={next}/><div className={`status${status ? " on" : ""}`} role="status">{status}</div></div>;
}
