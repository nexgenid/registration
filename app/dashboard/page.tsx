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
  Calendar,
  XCircle
} from "lucide-react";
import { getRegistrationStatus } from "@/app/lib/registrationLog";

export default function DashboardOverview() {
  const [userData, setUserData] = useState<any>(null);
  const [statusData, setStatusData] = useState({ document: false, status: 'pending', remark: '', meeting_link: '' });

  useEffect(() => {
    async function initData() {
      if (typeof window !== "undefined") {
        const saved = localStorage.getItem("nexgen_candidate_session");
        if (saved) {
          try {
            const session = JSON.parse(saved);
            if (session?.candidateData) {
              setUserData(session.candidateData);
              if (session.candidateData.account_id) {
                const res = await getRegistrationStatus(session.candidateData.account_id);
                if (res.success && res.data) {
                  setStatusData(res.data);
                }
              }
            }
          } catch (error) {
            console.error("Error parsing session:", error);
          }
        }
      }
    }
    initData();
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

      {statusData.status === 'Rejected' && statusData.remark && (
        <div className="bg-rose-50 border border-rose-200 rounded-2xl p-5 mb-2 mt-4 flex gap-4 items-start">
          <XCircle className="w-6 h-6 text-rose-600 shrink-0 mt-0.5" />
          <div>
            <h3 className="text-rose-800 font-bold">Berkas Ditolak</h3>
            <p className="text-sm text-rose-700 mt-1 leading-relaxed">
              Tim HR kami mendapati ada berkas yang kurang sesuai. Pesan dari HR: <br />
              <span className="font-semibold block mt-2 bg-rose-100/50 p-2 rounded-md">"{statusData.remark}"</span>
            </p>
            <p className="text-sm text-rose-700 mt-3 font-medium">
              Silakan perbaiki dan unggah kembali di menu Kelengkapan Berkas.
            </p>
          </div>
        </div>
      )}

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
          <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${statusData.document ? 'bg-emerald-50' : 'bg-rose-50'}`}>
            <FileCheck2 className={`w-6 h-6 ${statusData.document ? 'text-emerald-600' : 'text-rose-500'}`} />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Kelengkapan Berkas
            </p>
            <h4 className="text-lg font-bold text-slate-800 mt-0.5">
              {statusData.document ? "Sudah Lengkap" : "Belum Lengkap"}
            </h4>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex items-center gap-4">
          <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${
            statusData.status === 'Accepted' ? 'bg-emerald-50' : 
            statusData.status === 'Rejected' ? 'bg-rose-50' : 
            statusData.document ? 'bg-indigo-50' : 
            'bg-slate-100'
          }`}>
            <Clock className={`w-6 h-6 ${
              statusData.status === 'Accepted' ? 'text-emerald-600' : 
              statusData.status === 'Rejected' ? 'text-rose-500' : 
              statusData.document ? 'text-indigo-600' : 
              'text-slate-400'
            }`} />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Tahap Seleksi
            </p>
            <h4 className="text-lg font-bold text-slate-800 mt-0.5">
              {statusData.status === 'Accepted' ? "Lolos Seleksi Berkas" : 
               statusData.status === 'Rejected' ? "Ditolak HR" : 
               statusData.document ? "Menunggu Review HR" : 
               "Menunggu Upload"}
            </h4>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* <div className="lg:col-span-3 space-y-6">
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
        </div> */}

        <div className="lg:col-span-3 space-y-6">
          {statusData.status === 'Accepted' && statusData.meeting_link ? (
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="p-5 border-b border-slate-100 flex items-center justify-between">
                <h3 className="font-bold text-slate-800 flex items-center gap-2 text-sm">
                  <Video className="w-5 h-5 text-blue-600" />
                  Jadwal Wawancara Online
                </h3>
                <span className="px-2.5 py-1 bg-emerald-50 text-emerald-600 text-[10px] font-bold rounded-full uppercase tracking-wider border border-emerald-200">
                  Tersedia
                </span>
              </div>

              <div className="p-6 md:p-8 flex flex-col items-center justify-center text-center space-y-5 relative overflow-hidden">
                {/* Decorative Zoom-like background elements */}
                <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-blue-50 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-40 h-40 bg-indigo-50 rounded-full blur-3xl"></div>
                
                <div className="w-20 h-20 bg-blue-50 rounded-3xl flex items-center justify-center mb-2 shadow-sm border border-blue-100 relative z-10 rotate-3 transition-transform hover:rotate-6">
                  <div className="w-16 h-16 bg-[#0b5cff] rounded-2xl flex items-center justify-center -rotate-3">
                    <Video className="w-8 h-8 text-white" fill="currentColor" />
                  </div>
                </div>
                
                <div className="relative z-10">
                  <h4 className="text-xl md:text-2xl font-bold text-slate-900 mb-2">
                    Undangan Wawancara via Zoom
                  </h4>
                  <p className="text-slate-500 text-sm max-w-md mx-auto leading-relaxed">
                    Selamat! Anda telah lolos tahap seleksi awal. Silakan bergabung ke sesi wawancara online melalui tautan di bawah ini.
                  </p>
                </div>

                <div className="w-full max-w-md bg-slate-50 border border-slate-200 rounded-xl p-4 mt-2 relative z-10">
                  <div className="flex flex-col gap-3">
                    <div className="text-left">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Tautan Pertemuan</span>
                      <a 
                        href={statusData.meeting_link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="block mt-1 text-sm font-semibold text-[#0b5cff] hover:text-blue-800 truncate underline-offset-4 hover:underline"
                      >
                        {statusData.meeting_link}
                      </a>
                    </div>
                  </div>
                </div>

                <a 
                  href={statusData.meeting_link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="mt-4 px-8 py-3.5 bg-[#0b5cff] hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-600/20 transition-all flex items-center gap-3 relative z-10 hover:-translate-y-0.5"
                >
                  <Video className="w-5 h-5" />
                  Join Zoom Meeting
                </a>
              </div>
            </div>
          ) : (
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
                  {statusData.status === 'Accepted' ? "Menunggu Tautan Zoom" : "Jadwal Belum Ditentukan"}
                </h4>
                <p className="text-indigo-200 text-xs leading-relaxed max-w-[250px]">
                  {statusData.status === 'Accepted'
                    ? "Berkas lamaran Anda telah dinyatakan LOLOS. Tim HR kami sedang menyiapkan tautan Zoom untuk sesi wawancara Anda."
                    : "Link tautan pertemuan Zoom dan detail jadwal wawancara akan otomatis muncul di sini apabila berkas lamaran Anda dinyatakan LOLOS tahap awal."}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
