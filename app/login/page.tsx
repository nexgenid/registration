"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { loginUser } from "../lib/auth";
import {
  Rocket,
  Sparkles,
  Check,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  RefreshCw,
  AlertCircle,
  UserCheck,
} from "lucide-react";

export default function CandidateLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");



  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Mohon masukkan alamat email dan kata sandi Anda.");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      const user = await loginUser(email, password);

      if (typeof window !== "undefined") {
        localStorage.setItem(
          "nexgen_candidate_session",
          JSON.stringify({
            isRegistered: true,
            candidateData: user,
            status: "logged_in",
          }),
        );
      }

      setIsSubmitting(false);
      router.push("/dashboard");
    } catch (error: any) {
      console.error("Login Error:", error);
      setError(error.message || "Gagal masuk. Periksa kembali email dan kata sandi Anda.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen w-full grid grid-cols-1 lg:grid-cols-12 text-slate-800 font-sans">
      {/* Left Column: Full Screen Editorial & Branding Wall (5 cols on large screen) */}
      <div className="lg:col-span-5 bg-slate-900 text-white p-8 sm:p-12 lg:p-16 flex flex-col justify-between relative overflow-hidden min-h-[350px] lg:min-h-screen">
        <div className="absolute top-1/3 -left-32 w-96 h-96 bg-indigo-500/20 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-10 -right-32 w-96 h-96 bg-emerald-500/15 rounded-full blur-[100px] pointer-events-none" />

        {/* Top Navbar Logo */}
        <div className="relative z-10 flex items-center justify-between">
          <a
            href="/"
            className="flex items-center gap-2 group cursor-pointer text-white no-underline"
          >
            <Image
              src="/logotr.png"
              alt="NextGenID Logo"
              width={100}
              height={100}
            />
          </a>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-emerald-300 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" /> Candidate Login
          </span>
        </div>

        {/* Center Value Props */}
        <div className="relative z-10 space-y-6 my-12 lg:my-auto max-w-lg">
          <span className="inline-block px-3.5 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold tracking-widest uppercase border border-indigo-500/30">
            Selamat Datang Kembali
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold leading-tight tracking-tight text-white">
            Masuk ke Portal Seleksi Anda
          </h1>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            Pantau status verifikasi dokumen persyaratan Anda, komunikasi
            langsung bersama mentor, dan bersiaplah bergabung menjadi Explorer
            NextGenID.
          </p>

          <div className="pt-8 border-t border-white/15 space-y-4">
            <div className="flex items-center gap-3 text-sm text-slate-200">
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-emerald-400 shrink-0">
                <Check className="w-4 h-4" />
              </div>
              <span>Status pengecekan KTP &amp; Rekening secara real-time</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-slate-200">
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-emerald-400 shrink-0">
                <Check className="w-4 h-4" />
              </div>
              <span>Akses langsung ke konsultasi mentor 1-on-1</span>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="relative z-10 pt-6 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
          <span>© 2026 Nexgen ID. Sistem Seleksi Terintegrasi.</span>
          <a href="/" className="text-emerald-400 hover:underline font-medium">
            Kembali ke Beranda →
          </a>
        </div>
      </div>

      {/* Right Column: Full Screen Login Form (7 cols on large screen) */}
      <div className="lg:col-span-7 bg-white p-8 sm:p-12 lg:p-16 flex flex-col justify-center min-h-screen">
        <div className="max-w-xl w-full mx-auto space-y-8 my-auto py-8">
          <div className="flex items-center justify-between border-b border-slate-100 pb-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 block mb-1">
                Akses Calon Member
              </span>
              <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
                Masuk ke Dashboard Portal
              </h2>
              <p className="text-sm text-slate-500 mt-1">
                Masukkan email dan kata sandi akun terdaftar Anda
              </p>
            </div>

          </div>

          {error && (
            <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-sm flex items-center gap-3">
              <AlertCircle className="w-5 h-5 shrink-0 text-rose-500" />
              <span className="font-medium">{error}</span>
            </div>
          )}

          <form onSubmit={handleLoginSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Alamat Email *
              </label>
              <div className="relative">
                <Mail className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError("");
                  }}
                  placeholder="email@example.com"
                  style={{ paddingLeft: "56px" }}
                  className="w-full bg-slate-50/80 border border-slate-200 rounded-2xl pl-14 pr-4 py-3.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-indigo-600 focus:bg-white transition-all shadow-sm"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Kata Sandi *
                </label>
                <a
                  href="#lupa"
                  onClick={(e) => {
                    e.preventDefault();
                    alert(
                      "Silakan hubungi admin di WhatsApp untuk reset sandi.",
                    );
                  }}
                  className="text-xs font-semibold text-indigo-600 hover:underline"
                >
                  Lupa Kata Sandi?
                </a>
              </div>
              <div className="relative">
                <Lock className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError("");
                  }}
                  placeholder="Masukkan kata sandi"
                  style={{ paddingLeft: "56px" }}
                  className="w-full bg-slate-50/80 border border-slate-200 rounded-2xl pl-14 pr-11 py-3.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-indigo-600 focus:bg-white transition-all shadow-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-2xl bg-blue-500 hover:from-blue-700 hover:to-blue-700 text-white font-extrabold text-base shadow-xl shadow-blue-600/25 hover:shadow-blue-600/40 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2.5 disabled:opacity-50 cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <RefreshCw className="w-5 h-5 animate-spin" />
                    <span>Memverifikasi Akun...</span>
                  </>
                ) : (
                  <>
                    <span>Masuk ke Dashboard Portal</span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </div>

            <div className="text-center pt-6 border-t border-slate-100">
              <p className="text-sm text-slate-500">
                Belum memiliki akun calon member?{" "}
                <button
                  type="button"
                  onClick={() => router.push("/")}
                  className="text-indigo-600 font-bold hover:underline cursor-pointer"
                >
                  Daftar Akun Baru di Sini
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
