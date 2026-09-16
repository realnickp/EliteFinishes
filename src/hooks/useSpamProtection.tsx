"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Fetches a signed timing token on mount and provides a honeypot value.
 * Every form should:
 *  1. Render <HoneypotField /> somewhere inside the <form>
 *  2. Include spamFields() in the POST body
 */
export function useSpamProtection() {
  const [token, setToken] = useState("");
  const honeypotRef = useRef("");

  useEffect(() => {
    const load = () =>
      fetch("/api/form-token")
        .then((r) => r.json())
        .then((d) => { if (d.token) setToken(d.token); })
        .catch(() => {});
    load();
    // The server silently drops tokens older than 30 minutes, so refresh
    // before then for visitors who leave the page open a while.
    const interval = setInterval(load, 20 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  /** Returns the extra fields to merge into the POST JSON body */
  function spamFields() {
    return {
      _t: token,
      website_url: honeypotRef.current,
    };
  }

  /** Hidden honeypot input — bots fill it, humans don't see it */
  function HoneypotField() {
    return (
      <input
        type="text"
        name="website_url"
        autoComplete="off"
        tabIndex={-1}
        aria-hidden="true"
        style={{ position: "absolute", left: "-9999px", height: 0, overflow: "hidden" }}
        onChange={(e) => { honeypotRef.current = e.target.value; }}
      />
    );
  }

  return { spamFields, HoneypotField };
}
