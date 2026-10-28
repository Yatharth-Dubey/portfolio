import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const GLYPHS = "01{}<>/=+*#";
const all = (sel: string) => gsap.utils.toArray<HTMLElement>(sel);

/** headings resolve from random code glyphs into the real text */
function decode(el: HTMLElement) {
  const final = el.dataset.final ?? "";
  el.style.minHeight = `${el.offsetHeight}px`;
  gsap.set(el, { autoAlpha: 1 });
  const s = { p: 0 };
  gsap.to(s, {
    p: 1,
    duration: 0.8 + Math.min(final.length, 40) * 0.012,
    ease: "power2.out",
    onUpdate: () => {
      const n = Math.floor(s.p * final.length);
      el.textContent = final
        .split("")
        .map((ch, i) => (i < n || ch === " " ? ch : GLYPHS[Math.floor(Math.random() * GLYPHS.length)]))
        .join("");
    },
    onComplete: () => {
      el.textContent = final;
      el.style.minHeight = "";
    },
  });
}

/**
 * One idea for the whole page: a packet travelling through it.
 * - page progress is exposed as --scroll (the navbar line uses it)
 * - sections unfold from rounded cards to full width as you arrive
 * - headings decode, numbers count, lists scan in, the timeline draws itself
 * Elements opt in with data-fx="decode | stagger | count".
 */
export function initScrollFx(): () => void {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const ctx = gsap.context(() => {
    ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => document.documentElement.style.setProperty("--scroll", self.progress.toFixed(4)),
    });
    if (reduce) return;

    // hero: entrance, then parallax as you leave
    gsap.from(".hero-title > span", { clipPath: "inset(0 0 100% 0)", yPercent: 40, stagger: 0.14, duration: 1, ease: "power4.out", clearProps: "clipPath,transform" });
    gsap.from(".hero-pill, .hero-role, .hero-description, .hero-buttons, .hero-social", { autoAlpha: 0, y: 24, stagger: 0.1, duration: 0.8, delay: 0.45, ease: "power3.out" });
    gsap.from(".hero-flow", { autoAlpha: 0, x: 48, duration: 1, delay: 0.6, ease: "power3.out" });
    const heroST = { trigger: ".hero", start: "top top", end: "bottom top", scrub: true };
    gsap.to(".hero-content", { yPercent: -10, ease: "none", scrollTrigger: heroST });
    gsap.to(".hero-flow", { yPercent: 8, ease: "none", scrollTrigger: heroST });
    gsap.to(".hero-bg-blob-1", { y: 140, ease: "none", scrollTrigger: heroST });
    gsap.to(".hero-bg-blob-2", { y: -140, ease: "none", scrollTrigger: heroST });

    // sections unfold from an inset card to full bleed
    all(".page-section").forEach((sec) => {
      gsap.fromTo(
        sec,
        { clipPath: "inset(6% 3% 0% 3% round 40px)" },
        { clipPath: "inset(0% 0% 0% 0% round 0px)", ease: "none", scrollTrigger: { trigger: sec, start: "top 95%", end: "top 35%", scrub: true } }
      );
    });

    // headings decode
    all("[data-fx='decode']").forEach((el) => {
      el.dataset.final = el.textContent ?? "";
      el.setAttribute("aria-label", el.dataset.final);
      gsap.set(el, { autoAlpha: 0 });
      ScrollTrigger.create({ trigger: el, start: "top 90%", once: true, onEnter: () => decode(el) });
    });

    // lists scan in left to right
    all("[data-fx='stagger']").forEach((c) => {
      gsap.from(c.children, {
        clipPath: "inset(0 100% 0 0)", autoAlpha: 0, x: -14, stagger: 0.08, duration: 0.7, ease: "power3.out",
        clearProps: "clipPath,opacity,visibility,transform",
        scrollTrigger: { trigger: c, start: "top 85%", once: true },
      });
    });

    // numbers count up
    all("[data-fx='count']").forEach((el) => {
      const m = (el.textContent ?? "").match(/^(\d+(?:\.\d+)?)(\+?)$/);
      if (!m) return;
      const dec = (m[1].split(".")[1] ?? "").length;
      const o = { v: 0 };
      el.textContent = `${(0).toFixed(dec)}${m[2]}`;
      gsap.to(o, { v: parseFloat(m[1]), duration: 1.4, ease: "power2.out", onUpdate: () => { el.textContent = `${o.v.toFixed(dec)}${m[2]}`; }, scrollTrigger: { trigger: el, start: "top 92%", once: true } });
    });

    // timeline spine draws as you read it
    if (document.querySelector(".ab-log")) {
      gsap.to(".ab-log", { "--p": 1, ease: "none", scrollTrigger: { trigger: ".ab-log", start: "top 75%", end: "bottom 60%", scrub: true } });
    }
    // project window stands up into view
    if (document.querySelector(".px-window")) {
      gsap.fromTo(".px-window", { rotateX: 16, scale: 0.94, transformOrigin: "50% 100%" }, { rotateX: 0, scale: 1, ease: "none", scrollTrigger: { trigger: ".px-layout", start: "top 90%", end: "top 35%", scrub: true } });
    }
  });

  const t = setTimeout(() => ScrollTrigger.refresh(), 600);
  return () => {
    clearTimeout(t);
    ctx.revert();
  };
}