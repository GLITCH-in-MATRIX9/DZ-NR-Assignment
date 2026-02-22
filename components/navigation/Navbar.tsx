"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Search,
  Flame,
  Bell,
  Settings,
  User,
  LogOut,
  Menu,
  X,
  Sparkles,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const { user, logout } = useAuth();
  const router = useRouter();

  const [openDropdown, setOpenDropdown] = useState(false);
  const [openNotifications, setOpenNotifications] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [notifications, setNotifications] = useState<any[]>([]);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const avatarSrc =
    user?.avatarUrl || `https://picsum.photos/200?random=${user?._id || 1}`;

  /* ---------------- Notifications ---------------- */
  const fetchNotifications = async () => {
    if (!user?.token) return;

    const res = await fetch("/api/notifications", {
      headers: { Authorization: `Bearer ${user.token}` },
    });

    const data = await res.json();
    setNotifications(data.notifications || []);
  };

  useEffect(() => {
    if (!user) return;

    fetchNotifications();
    const i = setInterval(fetchNotifications, 5000);
    return () => clearInterval(i);
  }, [user]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  /* ---------------- Close dropdown on outside click ---------------- */
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpenDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-[999] backdrop-blur-xl bg-black/70 border-b border-white/5">
      <div className="max-w-[1400px] mx-auto px-4">
        <div className="flex items-center justify-between h-14">

          {/* LOGO */}
          <div className="cursor-pointer flex flex-col items-center justify-center h-full" onClick={() => router.push("/")}>
            <img src="/YYmix.png" alt="YapYard logo" className="h-8 block" />
          </div>


          {/* DESKTOP SEARCH - COMING SOON */}
          <div className="hidden md:flex flex-1 justify-center">
            <div className="relative w-[520px] rounded-full p-[1px] bg-gradient-to-r from-orange-500/40 via-orange-400/20 to-transparent">
              <div className="flex items-center bg-[#111] rounded-full px-4 py-2">
                <Search className="w-4 h-4 text-gray-400/50 mr-3" />
                <input
                  placeholder="Search coming soon... "
                  disabled
                  className="flex-1 bg-transparent outline-none text-sm text-gray-400 placeholder-gray-600 cursor-not-allowed"
                />
                <div className="flex items-center gap-1.5 text-orange-400/70 text-xs bg-black/40 px-3 py-1 rounded-full border border-orange-500/20">
                  <Sparkles className="w-3 h-3" />
                  <span className="font-medium">Soon</span>
                </div>
              </div>
            </div>
          </div>

          {/* DESKTOP ACTIONS */}
          <div className="hidden md:flex items-center gap-3">
            {!user && (
              <>
                <button className="text-white px-4 py-2 rounded-full bg-[#1a1a1a] hover:bg-[#252525] transition-colors">
                  Get App
                </button>
                <button
                  onClick={() => router.push("/auth/login")}
                  className="bg-orange-500 px-4 py-2 rounded-full text-white font-semibold hover:bg-orange-600 transition-colors"
                >
                  Log In
                </button>
              </>
            )}

            {user && (
              <>
                {/* NOTIFICATIONS */}
                <button
                  onClick={() => setOpenNotifications((p) => !p)}
                  className="relative p-2 rounded-full hover:bg-white/10 transition-colors"
                >
                  <Bell className="w-5 h-5 text-white" />
                  {unreadCount > 0 && (
                    <span className="absolute top-1 right-1 w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
                  )}
                </button>

                {/* PROFILE DROPDOWN */}
                <div className="relative" ref={dropdownRef}>
                  <img
                    src={avatarSrc}
                    className="w-9 h-9 rounded-full cursor-pointer ring-2 ring-transparent hover:ring-orange-500/30 transition-all"
                    onClick={() => setOpenDropdown((p) => !p)}
                  />

                  {openDropdown && (
                    <div className="absolute right-0 mt-3 w-48 bg-[#111] border border-white/10 rounded-xl shadow-xl overflow-hidden z-50">
                      <button
                        onClick={() => {
                          setOpenDropdown(false);
                          router.push("/profile");
                        }}
                        className="w-full flex items-center gap-3 px-4 py-3 text-sm text-white hover:bg-white/10 transition-colors"
                      >
                        <User className="w-4 h-4" />
                        Profile
                      </button>

                      <button
                        onClick={() => {
                          setOpenDropdown(false);
                          router.push("/settings");
                        }}
                        className="w-full flex items-center gap-3 px-4 py-3 text-sm text-white hover:bg-white/10 transition-colors"
                      >
                        <Settings className="w-4 h-4" />
                        Settings
                      </button>

                      <button
                        onClick={() => {
                          setOpenDropdown(false);
                          logout();
                        }}
                        className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-400 hover:bg-white/10 transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>

          {/* MOBILE TOGGLE */}
          <button
            onClick={() => setMobileMenu((p) => !p)}
            className="md:hidden text-white"
          >
            {mobileMenu ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {mobileMenu && (
        <div className="md:hidden bg-black/95 border-t border-white/10 px-4 py-4 space-y-4">
          {/* MOBILE SEARCH - COMING SOON */}
          <div className="relative rounded-full p-[1px] bg-gradient-to-r from-orange-500/40 via-orange-400/20 to-transparent">
            <div className="flex items-center bg-[#111] rounded-full px-4 py-2">
              <Search className="w-4 h-4 text-gray-400/50 mr-3" />
              <input
                placeholder="Search (coming soon)"
                disabled
                className="flex-1 bg-transparent outline-none text-sm text-gray-400 placeholder-gray-600 cursor-not-allowed"
              />
              <Sparkles className="w-4 h-4 text-orange-400/70" />
            </div>
          </div>

          {!user && (
            <>
              <button className="w-full bg-[#1a1a1a] py-2 rounded-full text-white">
                Get App
              </button>
              <button
                onClick={() => router.push("/auth/login")}
                className="w-full bg-orange-500 py-2 rounded-full text-white font-semibold"
              >
                Log In
              </button>
            </>
          )}

          {user && (
            <>
              <button
                onClick={() => router.push("/profile")}
                className="flex items-center gap-3 text-white"
              >
                <User className="w-4 h-4" /> My Profile
              </button>

              <button
                onClick={() => router.push("/settings")}
                className="flex items-center gap-3 text-white"
              >
                <Settings className="w-4 h-4" /> Settings
              </button>

              <button
                onClick={logout}
                className="flex items-center gap-3 text-red-400"
              >
                <LogOut className="w-4 h-4" /> Logout
              </button>
            </>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;