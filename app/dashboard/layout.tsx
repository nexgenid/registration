"use client";

import React, { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard,
  FileText,
  UserCheck,
  LogOut,
  Bell,
  ChevronRight,
  Menu,
  X,
} from "lucide-react";
import Image from "next/image";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [userName, setUserName] = useState("Calon Member");
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Close mobile sidebar when route changes
  useEffect(() => {
    setIsMobileSidebarOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("nexgen_candidate_session");
      if (saved) {
        try {
          const session = JSON.parse(saved);
          if (session?.candidateData?.name) {
            setUserName(session.candidateData.name);
          }
        } catch (error) {
          console.error("Error parsing session:", error);
        }
      }
    }
  }, []);

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("nexgen_candidate_session");
    }
    router.push("/login");
  };

  const getPageTitle = () => {
    if (pathname === "/dashboard") return "Dashboard Overview";
    if (pathname === "/dashboard/berkas") return "Kelengkapan Berkas";
    if (pathname === "/dashboard/status") return "Status Penerimaan";
    return "Dashboard Calon Member";
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden text-slate-800 font-sans">
      {/* Mobile Sidebar Overlay */}
      {isMobileSidebarOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm transition-opacity"
            onClick={() => setIsMobileSidebarOpen(false)}
          />
          
          {/* Sidebar */}
          <aside className="relative w-64 bg-white border-r border-slate-200 flex flex-col justify-between shrink-0 shadow-2xl animate-in slide-in-from-left-4 duration-300">
            <button 
              className="absolute top-4 right-4 p-2 text-slate-500 hover:bg-slate-100 rounded-lg z-10"
              onClick={() => setIsMobileSidebarOpen(false)}
            >
              <X className="w-5 h-5" />
            </button>
            <div>
              <div className="h-16 flex items-center px-6 border-b border-slate-200">
                <div className="flex items-center gap-2 font-bold text-xl text-slate-800">
                  <Image
                    src={"/logo-bg.png"}
                    alt="Logo NextGenID"
                    width={180}
                    height={180}
                    unoptimized
                  />
                </div>
              </div>

              <nav className="p-4 space-y-1.5">
                <p className="px-3 text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 mt-4">
                  Main Menu
                </p>

                <Link
                  href="/dashboard"
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium text-sm transition-all ${pathname === "/dashboard" ? "bg-indigo-900 text-white shadow-sm shadow-indigo-900/20" : "text-slate-600 hover:text-indigo-600 hover:bg-indigo-50"}`}
                >
                  <LayoutDashboard className="w-5 h-5" />
                  Overview
                </Link>

                <Link
                  href="/dashboard/berkas"
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium text-sm transition-all ${pathname === "/dashboard/berkas" ? "bg-indigo-900 text-white shadow-sm shadow-indigo-900/20" : "text-slate-600 hover:text-indigo-600 hover:bg-indigo-50"}`}
                >
                  <FileText className="w-5 h-5" />
                  Kelengkapan Berkas
                </Link>

                <Link
                  href="/dashboard/status"
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium text-sm transition-all ${pathname === "/dashboard/status" ? "bg-indigo-900 text-white shadow-sm shadow-indigo-900/20" : "text-slate-600 hover:text-indigo-600 hover:bg-indigo-50"}`}
                >
                  <UserCheck className="w-5 h-5" />
                  Status Penerimaan
                </Link>
              </nav>
            </div>

            <div className="p-4 border-t border-slate-100">
              <button
                onClick={handleLogout}
                className="flex w-full items-center gap-3 px-3 py-2.5 text-rose-600 hover:bg-rose-50 rounded-xl font-bold text-sm transition-all"
              >
                <LogOut className="w-5 h-5" />
                Logout
              </button>
            </div>
          </aside>
        </div>
      )}

      {/* Sidebar - Desktop */}
      <aside className="w-64 bg-white border-r border-slate-200 hidden md:flex flex-col justify-between shrink-0">
        <div>
          <div className="h-16 flex items-center px-6 border-b border-slate-200">
            <div className="flex items-center gap-2 font-bold text-xl text-slate-800">
              <Image
                src={"/logo-bg.png"}
                alt="Logo NextGenID"
                width={180}
                height={180}
                unoptimized
              />
            </div>
          </div>

          <nav className="p-4 space-y-1.5">
            <p className="px-3 text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 mt-4">
              Main Menu
            </p>

            <Link
              href="/dashboard"
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium text-sm transition-all ${pathname === "/dashboard" ? "bg-indigo-900 text-white shadow-sm shadow-indigo-900/20" : "text-slate-600 hover:text-indigo-600 hover:bg-indigo-50"}`}
            >
              <LayoutDashboard className="w-5 h-5" />
              Overview
            </Link>

            <Link
              href="/dashboard/berkas"
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium text-sm transition-all ${pathname === "/dashboard/berkas" ? "bg-indigo-900 text-white shadow-sm shadow-indigo-900/20" : "text-slate-600 hover:text-indigo-600 hover:bg-indigo-50"}`}
            >
              <FileText className="w-5 h-5" />
              Kelengkapan Berkas
            </Link>

            <Link
              href="/dashboard/status"
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium text-sm transition-all ${pathname === "/dashboard/status" ? "bg-indigo-900 text-white shadow-sm shadow-indigo-900/20" : "text-slate-600 hover:text-indigo-600 hover:bg-indigo-50"}`}
            >
              <UserCheck className="w-5 h-5" />
              Status Penerimaan
            </Link>
          </nav>
        </div>

        <div className="p-4 border-t border-slate-100">
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 px-3 py-2.5 text-rose-600 hover:bg-rose-50 rounded-xl font-bold text-sm transition-all"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content Wrapper */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 sm:px-6 shrink-0 z-10">
          <div className="flex items-center gap-3">
            <button 
              className="md:hidden p-2 text-slate-500 hover:bg-slate-100 rounded-lg"
              onClick={() => setIsMobileSidebarOpen(true)}
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="hidden sm:flex items-center gap-2 text-sm font-medium">
              <span className="px-2 py-0.5 bg-indigo-100 text-indigo-700 rounded-md text-xs font-bold uppercase tracking-wider">
                Portal
              </span>
              <span className="text-slate-400">
                <ChevronRight className="w-4 h-4" />
              </span>
              <span className="text-slate-800 font-bold">{getPageTitle()}</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="relative p-2 text-slate-400 hover:text-indigo-600 transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
            </button>

            <div className="h-8 w-px bg-slate-200 mx-1"></div>

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold text-sm">
                {userName.charAt(0).toUpperCase()}
              </div>
              <div className="hidden sm:block text-sm">
                <p className="font-bold text-slate-800 leading-none">
                  {userName}
                </p>
                <p className="text-xs text-slate-500 mt-0.5">Calon Explorer</p>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 overflow-auto p-4 sm:p-6 lg:p-8">
          <div className="max-w-6xl mx-auto space-y-8">{children}</div>
        </main>
      </div>
    </div>
  );
}
