"use client";

import { useEffect } from "react";

/** Плавно показывает элементы `.reveal` при прокрутке. */
export function RevealObserver() {
  useEffect(() => {
    const all = () => document.querySelectorAll(".reveal:not(.is-in)");
    if (!("IntersectionObserver" in window)) {
      all().forEach((el) => el.classList.add("is-in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -6% 0px", threshold: 0.05 },
    );
    const observeAll = () => all().forEach((el) => io.observe(el));
    observeAll();
    // При переходе по якорю всё, что выше цели, показываем сразу — без «пустых» мест
    const onHash = () => {
      const target = location.hash && document.getElementById(decodeURIComponent(location.hash.slice(1)));
      if (!target) return;
      const top = target.getBoundingClientRect().top;
      all().forEach((el) => {
        if (el.getBoundingClientRect().top < top + window.innerHeight) el.classList.add("is-in");
      });
    };
    onHash();
    const mo = new MutationObserver(observeAll);
    mo.observe(document.body, { childList: true, subtree: true });
    window.addEventListener("hashchange", onHash);
    return () => {
      io.disconnect();
      mo.disconnect();
      window.removeEventListener("hashchange", onHash);
    };
  }, []);

  return null;
}
