"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { registerUser } from "../lib/auth";
import {
  Rocket,
  Sparkles,
  Check,
  User,
  Mail,
  Phone,
  Award,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  RefreshCw,
  AlertCircle,
} from "lucide-react";

export default function RegistrationPage() {
  const router = useRouter();

  // Registration Form State
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    interest: "EM",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState("");

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
    setFormError("");
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !formState.name ||
      !formState.email ||
      !formState.phone ||
      !formState.password
    ) {
      setFormError("Mohon lengkapi seluruh kolom wajib dengan tanda (*).");
      return;
    }
    if (formState.password !== formState.confirmPassword) {
      setFormError("Kata sandi dan konfirmasi kata sandi tidak cocok.");
      return;
    }
    if (formState.password.length < 8) {
      setFormError("Kata sandi minimal harus terdiri dari 8 karakter.");
      return;
    }

    setIsSubmitting(true);
    setFormError("");

    try {
      // Simpan ke database menggunakan Server Action
      const generatedUsername = formState.email.split('@')[0];
      await registerUser(generatedUsername, formState.name, formState.email, formState.phone, formState.password);


      const newCandidateData = {
        name: formState.name,
        email: formState.email,
        phone: formState.phone,
        interest: formState.interest,
      };



      if (typeof window !== "undefined") {
        localStorage.setItem(
          "nexgen_candidate_session",
          JSON.stringify({
            isRegistered: true,
            candidateData: newCandidateData,
          }),
        );
      }

      setIsSubmitting(false); // <--- Tambahkan ini
      router.push("/");
    } catch (error) {
      console.error("Registration error:", error);
      setFormError("Gagal mendaftar. Email mungkin sudah terdaftar atau terjadi kesalahan server.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen w-full grid grid-cols-1 lg:grid-cols-12 text-slate-800 font-sans">
      {/* Left Column: Full Screen Editorial & Branding Wall (5 cols on large screen) */}
      <div className="lg:col-span-5 text-white p-8 sm:p-12 lg:p-16 flex flex-col justify-between relative overflow-hidden min-h-[350px] lg:min-h-screen">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-emerald-500/20 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-10 -right-32 w-96 h-96 bg-indigo-500/15 rounded-full blur-[100px] pointer-events-none" />

        {/* Top Navbar Logo */}
        <div className="relative z-10 flex items-center justify-between">
          <a
            href="/"
            className="flex items-center gap-2 group cursor-pointer text-white no-underline"
          >
            <Image
              src="/logotr.png"
              alt="NextGenID Logo"
              width={220}
              height={220}
            />
          </a>
        </div>

        {/* Center Value Props */}
        <div className="relative z-10 space-y-6 my-12 lg:my-auto max-w-lg">
          <h1 className="font-serif text-3xl sm:text-5xl font-bold leading-tight tracking-tight text-white">
            Mulai Langkah Karir Digital Anda
          </h1>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            Daftarkan akun calon member untuk mengakses dashboard seleksi
            eksklusif, mengunggah berkas persyaratan, dan memantau status
            verifikasi tim HR secara real-time.
          </p>

          <div className="pt-8 border-t border-white/15 space-y-4">
            <div className="flex items-center gap-3 text-sm text-slate-200">
              <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                <Check className="w-4 h-4" />
              </div>
              <span>Akses gratis ke Dashboard Portal Seleksi Explorer</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-slate-200">
              <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                <Check className="w-4 h-4" />
              </div>
              <span>
                Unggah berkas KTP &amp; Rekening dengan verifikasi cepat
              </span>
            </div>
            <div className="flex items-center gap-3 text-sm text-slate-200">
              <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                <Check className="w-4 h-4" />
              </div>
              <span>
                Bimbingan &amp; konsultasi 1-on-1 bersama Senior Explorer
              </span>
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

      {/* Right Column: Full Screen Form Panel (7 cols on large screen) */}
      <div className="lg:col-span-7 bg-white p-8 sm:p-12 lg:p-16 flex flex-col justify-center min-h-screen">
        <div className="max-w-xl w-full mx-auto space-y-8 my-auto py-8">
          <div className="flex items-center justify-between border-b border-slate-100 pb-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 block mb-1">
                Portal Registrasi &amp; Seleksi
              </span>
              <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
                Buat Akun Calon Member
              </h2>
              <p className="text-sm text-slate-500 mt-1">
                Lengkapi data diri di bawah ini untuk memulai proses verifikasi
              </p>
            </div>
          </div>

          {formError && (
            <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-sm flex items-center gap-3">
              <AlertCircle className="w-5 h-5 shrink-0 text-rose-500" />
              <span className="font-medium">{formError}</span>
            </div>
          )}

          <form onSubmit={handleRegisterSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Nama Lengkap Sesuai KTP *
              </label>
              <div className="relative">
                <User className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  name="name"
                  required
                  value={formState.name}
                  onChange={handleFormChange}
                  placeholder="Contoh: John Doe"
                  style={{ paddingLeft: "56px" }}
                  className="w-full bg-slate-50/80 border border-slate-200 rounded-2xl pl-14 pr-4 py-3.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-indigo-600 focus:bg-white transition-all shadow-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Alamat Email *
                </label>
                <div className="relative">
                  <Mail className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="email"
                    name="email"
                    required
                    value={formState.email}
                    onChange={handleFormChange}
                    placeholder="email@example.com"
                    style={{ paddingLeft: "56px" }}
                    className="w-full bg-slate-50/80 border border-slate-200 rounded-2xl pl-14 pr-4 py-3.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-indigo-600 focus:bg-white transition-all shadow-sm"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Nomor WhatsApp / HP *
                </label>
                <div className="relative">
                  <Phone className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formState.phone}
                    onChange={handleFormChange}
                    placeholder="0812-3456-7890"
                    style={{ paddingLeft: "56px" }}
                    className="w-full bg-slate-50/80 border border-slate-200 rounded-2xl pl-14 pr-4 py-3.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-indigo-600 focus:bg-white transition-all shadow-sm"
                  />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Kata Sandi *
                </label>
                <div className="relative">
                  <Lock className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    required
                    value={formState.password}
                    onChange={handleFormChange}
                    placeholder="Min. 8 karakter"
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
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Konfirmasi Kata Sandi *
                </label>
                <div className="relative">
                  <Lock className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    required
                    value={formState.confirmPassword}
                    onChange={handleFormChange}
                    placeholder="Ulangi kata sandi"
                    style={{ paddingLeft: "56px" }}
                    className="w-full bg-slate-50/80 border border-slate-200 rounded-2xl pl-14 pr-11 py-3.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-indigo-600 focus:bg-white transition-all shadow-sm"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>{" "}
                </div>
              </div>
            </div>

            <div className="pt-6">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-2xl  text-white font-extrabold text-base shadow-xl bg-blue-500 hover:bg-blue-700 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2.5 disabled:opacity-50 cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <RefreshCw className="w-5 h-5 animate-spin" />
                    <span>Memproses Pendaftaran...</span>
                  </>
                ) : (
                  <>
                    <span>Daftar &amp; Buka Dashboard Portal</span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </div>

            <div className="text-center pt-4 border-t border-slate-100">
              <p className="text-sm text-slate-500">
                Sudah memiliki akun calon member?{" "}
                <button
                  type="button"
                  onClick={() => router.push("/login")}
                  className="text-indigo-600 font-bold hover:underline cursor-pointer"
                >
                  Masuk ke Dashboard Sekarang
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
