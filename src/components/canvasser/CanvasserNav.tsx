"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { ClipboardPlus, List, Trophy, LogOut, Menu, X, Phone, GraduationCap } from "lucide-react";
import { SITE } from "@/lib/constants";

const NAV = [
  { label: "New Lead", href: "/canvasser/new", icon: ClipboardPlus },
  { label: "Training", href: "/canvasser/training", icon: GraduationCap },
  { label: "My Leads", href: "/canvasser/leads", icon: List },
  { label: "Leaderboard", href: "/canvasser/leaderboard", icon: Trophy },
];

interface CanvasserNavProps {
  canvasserName: string | null;
}

export function CanvasserNav({ canvasserName }: CanvasserNavProps) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  function isActive(href: string) {
    return pathname.startsWith(href);
  }

  // Hide nav on the login page itself — user isn't authenticated yet.
  if (pathname === "/canvasser/login") return null;

  const navLinks = (
    <nav className="flex-1 p-3 space-y-1">
      {NAV.map((item) => {
        const active = isActive(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={() => setOpen(false)}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors min-h-[48px] ${
              active
                ? "bg-orange-500 text-white"
                : "text-gray-300 hover:text-white hover:bg-gray-800"
            }`}
          >
            <item.icon className="h-5 w-5 flex-shrink-0" />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );

  const bottomLinks = (
    <div className="p-3 border-t border-gray-800 space-y-1">
      <a
        href={SITE.phoneTel}
        className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-gray-400 hover:text-white hover:bg-gray-800 transition-colors min-h-[48px]"
      >
        <Phone className="h-5 w-5 flex-shrink-0" />
        {SITE.phone}
      </a>
      <form action="/api/canvasser/auth/logout" method="POST">
        <button
          type="submit"
          className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-sm text-gray-400 hover:text-red-400 hover:bg-gray-800 transition-colors min-h-[48px]"
        >
          <LogOut className="h-5 w-5 flex-shrink-0" />
          Sign Out
        </button>
      </form>
    </div>
  );

  const userBlock = canvasserName ? (
    <div className="px-4 py-3 border-b border-gray-800">
      <p className="text-xs text-gray-500 uppercase tracking-wide">Signed in as</p>
      <p className="text-sm font-semibold text-white mt-0.5 truncate">{canvasserName}</p>
    </div>
  ) : null;

  return (
    <>
      {/* Mobile top bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-40 bg-gray-900 text-white flex items-center justify-between px-4 h-14 shadow-lg">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setOpen(!open)}
            className="p-2 -ml-2 rounded-xl hover:bg-gray-800 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="Toggle menu"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
          <Image src="/images/logo.png" alt="Elite Finishes" width={100} height={37} className="h-7 w-auto brightness-110" />
        </div>
        <a
          href={SITE.phoneTel}
          className="p-2 rounded-xl hover:bg-gray-800 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center text-green-400"
          aria-label="Call"
        >
          <Phone className="h-5 w-5" />
        </a>
      </div>

      {open && (
        <div
          className="md:hidden fixed inset-0 z-30 bg-black/60 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Mobile sidebar */}
      <aside
        className={`md:hidden fixed top-14 left-0 bottom-0 z-40 w-64 bg-gray-900 text-white flex flex-col transition-transform duration-200 ease-out shadow-2xl ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {userBlock}
        {navLinks}
        {bottomLinks}
      </aside>

      {/* Desktop sidebar */}
      <aside className="hidden md:flex w-56 bg-gray-900 text-white flex-col flex-shrink-0 min-h-screen">
        <div className="p-4 border-b border-gray-800">
          <Image src="/images/logo.png" alt="Elite Finishes" width={140} height={52} className="h-10 w-auto brightness-110" />
          <p className="text-xs text-gray-400 mt-1.5">Canvasser Portal</p>
        </div>
        {userBlock}
        {navLinks}
        {bottomLinks}
      </aside>
    </>
  );
}
