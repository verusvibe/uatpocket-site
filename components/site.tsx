import { sitePath } from "@/lib/urls";
import { ArrowUpRight, Check } from "lucide-react";
export const shots = [
  "capture-the-issue",
  "say-what-happened",
  "review-a-clearer-draft",
  "keep-uat-work-in-view",
  "follow-the-fix",
  "verify-then-close",
];
const descriptions = [
  "Capture a UAT issue with project context, photo evidence and a quick note.",
  "Record an observation and review its editable voice transcript.",
  "Review and edit an AI-assisted draft before choosing Submit Issue.",
  "View project status, ownership and issue counts.",
  "Follow vendor investigation and recorded fix information.",
  "Verify a fix with retest evidence before closing or reopening.",
];
export function Screenshot({
  number,
  hero = false,
}: {
  number: number;
  hero?: boolean;
}) {
  const stem = sitePath(`/images/0${number}-${shots[number - 1]}`);
  return (
    <picture>
      <source
        type="image/webp"
        srcSet={`${stem}-384.webp 384w, ${stem}-640.webp 640w, ${stem}-960.webp 960w`}
        sizes="(max-width: 600px) 80vw, (max-width: 1000px) 40vw, 360px"
      />
      <img
        src={`${stem}.png`}
        alt={descriptions[number - 1]}
        width={1284}
        height={2778}
        loading={hero ? "eager" : "lazy"}
        fetchPriority={hero ? "high" : "auto"}
        className="screenshot"
      />
    </picture>
  );
}
export function Logo() {
  return (
    <a className="logo" href={sitePath("/")} aria-label="UAT Pocket home">
      <img src={sitePath("/icon.png")} alt="" width="36" height="36" />
      UAT Pocket<span className="logo-dot">.</span>
    </a>
  );
}
export function Button({
  href,
  children,
  secondary = false,
}: {
  href: string;
  children: React.ReactNode;
  secondary?: boolean;
}) {
  return (
    <a
      className={`button ${secondary ? "secondary" : ""}`}
      href={sitePath(href)}
    >
      {children}
      <ArrowUpRight size={17} aria-hidden="true" />
    </a>
  );
}
export function Checks({ items }: { items: string[] }) {
  return (
    <ul className="checks">
      {items.map((item) => (
        <li key={item}>
          <Check size={18} aria-hidden="true" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
export function Footer() {
  return (
    <footer className="container footer">
      <div>
        <Logo />
        <p>
          Capture clearly. Fix confidently.
          <br />
          Verify before closing.
        </p>
      </div>
      <nav aria-label="Footer navigation">
        <a href={sitePath("/#product")}>Product</a>
        <a href={sitePath("/#workflow")}>How It Works</a>
        <a href={sitePath("/#teams")}>For Teams</a>
        <a href={sitePath("/product")}>Product One-Pager</a>
        <a href={sitePath("/support")}>Support</a>
        <a href={sitePath("/privacy")}>Privacy Policy</a>
        <a href={sitePath("/#early-access")}>Request Early Access</a>
      </nav>
      <div className="copyright">
        © {process.env.NEXT_PUBLIC_COPYRIGHT_YEAR || new Date().getFullYear()}{" "}
        {process.env.NEXT_PUBLIC_COPYRIGHT_OWNER || "[COPYRIGHT OWNER]"}. All
        rights reserved.
      </div>
    </footer>
  );
}
