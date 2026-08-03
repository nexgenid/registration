"use client";

import React, { useState, useEffect } from "react";
import {
  User,
  FileCheck2,
  Clock,
  ShieldCheck,
  Lock,
  Camera,
  Video,
  Calendar
} from "lucide-react";

export default function DashboardOverview() {
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("nexgen_candidate_session");
      if (saved) {
        try {
          const session = JSON.parse(saved);
          if (session?.candidateData) {
            setUserData(session.candidateData);
          }
        } catch (error) {
          console.error("Error parsing session:", error);
        }
      }
    }
  }, []);

  return (
    <>
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
          Dashboard Overview
        </h1>
        <p className="text-slate-500 mt-1">
          Pantau status pendaftaran dan kelola profil akun Anda.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-indigo-50 flex items-center justify-center shrink-0">
            <User className="w-6 h-6 text-indigo-600" />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Status Akun
            </p>
            <h4 className="text-lg font-bold text-slate-800 mt-0.5">
              Terdaftar Aktif
            </h4>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-rose-50 flex items-center justify-center shrink-0">
            <FileCheck2 className="w-6 h-6 text-rose-500" />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Kelengkapan Berkas
            </p>
            <h4 className="text-lg font-bold text-slate-800 mt-0.5">
              Belum Lengkap
            </h4>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center shrink-0">
            <Clock className="w-6 h-6 text-emerald-600" />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Tahap Seleksi
            </p>
            <h4 className="text-lg font-bold text-slate-800 mt-0.5">
              Menunggu Upload
            </h4>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-3 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-5 sm:p-6 border-b border-slate-100 flex items-center gap-3">
              <User className="w-5 h-5 text-indigo-600" />
              <h3 className="text-lg font-bold text-slate-800">
                Profil Lengkap Member
              </h3>
            </div>

            <div className="p-5 sm:p-6">
              <div className="flex flex-col sm:flex-row gap-8">
                <div className="flex flex-col items-center gap-3 shrink-0">
                  <div className="w-24 h-24 rounded-full bg-slate-100 border-2 border-dashed border-slate-300 flex items-center justify-center relative overflow-hidden group cursor-pointer hover:border-indigo-500 hover:bg-indigo-50 transition-colors">
                    <Camera className="w-8 h-8 text-slate-400 group-hover:text-indigo-500" />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-white text-xs font-bold">
                        Ubah Foto
                      </span>
                    </div>
                  </div>
                  <span className="text-xs text-slate-500 font-medium">
                    JPG/PNG (Maks 2MB)
                  </span>
                </div>

                <div className="flex-1 space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                        Nama Lengkap
                      </label>
                      <input
                        type="text"
                        readOnly
                        value={userData?.name || ""}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                        Username
                      </label>
                      <input
                        type="text"
                        readOnly
                        value={userData?.username || ""}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        readOnly
                        value={userData?.email || ""}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                        No Handphone / WA
                      </label>
                      <input
                        type="tel"
                        readOnly
                        value={userData?.phone_number || ""}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="pt-4 flex justify-end">
                    <button className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold rounded-xl shadow-md transition-all">
                      Simpan Profil
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-3 space-y-6">
          <div className="bg-gradient-to-br from-blue-900 to-indigo-950 rounded-2xl shadow-xl overflow-hidden relative">
            <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl"></div>
            <div className="absolute bottom-0 left-0 -mb-4 -ml-4 w-24 h-24 bg-indigo-500/20 rounded-full blur-2xl"></div>

            <div className="p-5 border-b border-white/10 flex items-center justify-between relative z-10">
              <h3 className="font-bold text-white flex items-center gap-2 text-sm">
                <Video className="w-4 h-4 text-blue-400" />
                Jadwal Wawancara
              </h3>
              <span className="px-2 py-0.5 bg-slate-500/20 text-slate-300 text-[10px] font-bold rounded uppercase tracking-wider border border-slate-500/30">
                Menunggu
              </span>
            </div>

            <div className="p-6 relative z-10 flex flex-col items-center justify-center text-center space-y-3 min-h-[220px]">
              <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-2 border border-white/10">
                <Calendar className="w-7 h-7 text-blue-300" />
              </div>
              <h4 className="text-white font-bold">
                Jadwal Belum Ditentukan
              </h4>
              <p className="text-indigo-200 text-xs leading-relaxed max-w-[250px]">
                Link tautan pertemuan Zoom dan detail jadwal wawancara akan otomatis muncul di sini apabila berkas lamaran Anda dinyatakan <span className="font-bold text-blue-400">LOLOS</span> tahap awal.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
