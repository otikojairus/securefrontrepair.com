"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { PHONE_DISPLAY, PHONE_E164, SERVICE_PILLARS, SITE_NAME, serviceShortLabel, toPath } from "@/lib/site-data";

export function SiteNavbar() {
  const [open, setOpen] = useState(false);
  const [showCall, setShowCall] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowCall(window.matchMedia("(max-width: 860px)").matches && window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header className="sfr-header">
        <div className="sfr-wrap sfr-nav">
          <Link href="/" className="sfr-brand" aria-label={SITE_NAME} onClick={() => setOpen(false)}>
            <Image src="/logo.svg" alt="SecureFront Repair logo" width={40} height={40} priority />
            <span>{SITE_NAME}</span>
          </Link>
          <nav className="sfr-links" aria-label="Primary navigation">
            <Link href="/">Home</Link>
            <Link href="/services">Services</Link>
            {SERVICE_PILLARS.slice(0, 4).map((page) => (
              <Link key={page.pageSlug} href={toPath(page.pageSlug)}>
                {serviceShortLabel(page)}
              </Link>
            ))}
          </nav>
          <a className="sfr-call sfr-call-desktop" href={`tel:${PHONE_E164}`}>
            Call {PHONE_DISPLAY}
          </a>
          <button
            type="button"
            className="sfr-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
          >
            <span aria-hidden="true" />
          </button>
        </div>
      </header>

      <div className={`sfr-drawer ${open ? "sfr-drawer-open" : ""}`} aria-hidden={!open}>
        <button className="sfr-drawer-shade" type="button" aria-label="Close menu" onClick={() => setOpen(false)} />
        <aside className="sfr-drawer-panel">
          <nav className="sfr-drawer-links" aria-label="Mobile navigation">
            <Link href="/" onClick={() => setOpen(false)}>
              Home
            </Link>
            <Link href="/services" onClick={() => setOpen(false)}>
              Services
            </Link>
            {SERVICE_PILLARS.map((page) => (
              <Link key={page.pageSlug} href={toPath(page.pageSlug)} onClick={() => setOpen(false)}>
                {serviceShortLabel(page)}
              </Link>
            ))}
          </nav>
        </aside>
      </div>

      <div className={`sfr-mobile-call ${showCall && !open ? "sfr-mobile-call-show" : ""}`}>
        <a className="sfr-call" href={`tel:${PHONE_E164}`}>
          Call {PHONE_DISPLAY} — 24/7 Emergency Response
        </a>
      </div>
    </>
  );
}
