"use client";

import React from "react";
import {
  UserCheck,
  CheckCircle2,
  Clock,
  HelpCircle,
  AlertCircle,
} from "lucide-react";

export default function DashboardStatus() {
  return (
    <>
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
          Status Penerimaan
        </h1>
        <p className="text-slate-500 mt-1">
          Lacak progres tahapan seleksi pendaftaran Anda.
        </p>
      </div>

      <div className="grid grid-cols-3 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-5 border-b border-slate-100 bg-slate-50/50">
              <h3 className="font-bold text-slate-800 flex items-center gap-2">
                <UserCheck className="w-5 h-5 text-indigo-600" />
                Status Penerimaan
              </h3>
            </div>
            <div className="p-5 ">
              <div className="relative pl-6 space-y-6 ">
                <div className="relative flex items-start gap-4">
                  <div className="absolute left-0 -ml-6 w-6 h-6 rounded-full bg-emerald-100 border-2 border-emerald-500 flex items-center justify-center z-10">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  </div>
                  <div className="ml-4">
                    <h4 className="font-bold text-slate-800 text-sm">
                      Pendaftaran Akun
                    </h4>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Berhasil didaftarkan
                    </p>
                  </div>
                </div>

                <div className="relative flex items-start gap-4">
                  <div className="absolute left-0 -ml-6 w-6 h-6 rounded-full bg-indigo-100 border-2 border-indigo-600 flex items-center justify-center z-10">
                    <span className="w-2 h-2 bg-indigo-600 rounded-full animate-pulse"></span>
                  </div>
                  <div className="ml-4">
                    <h4 className="font-bold text-indigo-700 text-sm">
                      Kelengkapan Berkas
                    </h4>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Menunggu unggahan PDF
                    </p>
                  </div>
                </div>

                <div className="relative flex items-start gap-4 opacity-50">
                  <div className="absolute left-0 -ml-6 w-6 h-6 rounded-full bg-slate-100 border-2 border-slate-300 flex items-center justify-center z-10">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                  </div>
                  <div className="ml-4">
                    <h4 className="font-bold text-slate-800 text-sm">
                      Review Tim HR
                    </h4>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Verifikasi dokumen
                    </p>
                  </div>
                </div>

                <div className="relative flex items-start gap-4 opacity-50">
                  <div className="absolute left-0 -ml-6 w-6 h-6 rounded-full bg-slate-100 border-2 border-slate-300 flex items-center justify-center z-10">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                  </div>
                  <div className="ml-4">
                    <h4 className="font-bold text-slate-800 text-sm">
                      Hasil Seleksi
                    </h4>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Pengumuman akhir
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>


        </div>

        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 text-center space-y-4">
            <div className="w-16 h-16 bg-slate-100 rounded-full mx-auto flex items-center justify-center">
              <HelpCircle className="w-8 h-8 text-slate-400" />
            </div>
            <div>
              <h4 className="font-bold text-slate-800">Butuh Bantuan?</h4>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                Jika status Anda tidak berubah dalam waktu 3x24 jam setelah
                berkas dikirimkan, silakan hubungi tim Support kami.
              </p>
            </div>
            <button className="px-5 py-2 border border-slate-200 hover:border-indigo-500 text-slate-600 hover:text-indigo-600 text-sm font-bold rounded-xl transition-all">
              Hubungi Bantuan
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
