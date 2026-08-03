"use client";

import React, { useState, useEffect } from "react";
import {
  UserCheck,
  CheckCircle2,
  Clock,
  HelpCircle,
  AlertCircle,
  XCircle,
} from "lucide-react";
import { getRegistrationStatus } from "@/app/lib/registrationLog";

export default function DashboardStatus() {
  const [statusData, setStatusData] = useState({ document: false, status: 'pending', remark: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStatus() {
      const saved = localStorage.getItem("nexgen_candidate_session");
      if (saved) {
        try {
          const session = JSON.parse(saved);
          if (session?.candidateData?.account_id) {
            const res = await getRegistrationStatus(session.candidateData.account_id);
            if (res.success && res.data) {
              setStatusData(res.data);
            }
          }
        } catch (error) {
          console.error("Error parsing session:", error);
        }
      }
      setLoading(false);
    }
    loadStatus();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 rounded-full border-4 border-indigo-200 border-t-indigo-600 animate-spin"></div>
          <p className="text-slate-500 font-medium">Memuat status...</p>
        </div>
      </div>
    );
  }

  const isDocumentSent = statusData.document === true;
  const isProcessing = statusData.status === 'processing';
  const isAccepted = statusData.status === 'accepted';
  const isRejected = statusData.status === 'rejected';

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

      {isRejected && statusData.remark && (
        <div className="bg-rose-50 border border-rose-200 rounded-2xl p-5 mb-6 flex gap-4 items-start">
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-5 border-b border-slate-100 bg-slate-50/50">
              <h3 className="font-bold text-slate-800 flex items-center gap-2">
                <UserCheck className="w-5 h-5 text-indigo-600" />
                Status Penerimaan
              </h3>
            </div>
            <div className="p-5 ">
              <div className="relative pl-6 space-y-8 py-2">
                
                {/* Step 1: Pendaftaran Akun */}
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

                {/* Step 2: Kelengkapan Berkas */}
                <div className="relative flex items-start gap-4">
                  <div className={`absolute left-0 -ml-6 w-6 h-6 rounded-full border-2 flex items-center justify-center z-10 ${
                    isDocumentSent 
                      ? "bg-emerald-100 border-emerald-500" 
                      : "bg-indigo-100 border-indigo-600"
                  }`}>
                    {isDocumentSent ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    ) : (
                      <span className="w-2 h-2 bg-indigo-600 rounded-full animate-pulse"></span>
                    )}
                  </div>
                  <div className="ml-4">
                    <h4 className={`font-bold text-sm ${isDocumentSent ? "text-slate-800" : "text-indigo-700"}`}>
                      Kelengkapan Berkas
                    </h4>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {isDocumentSent ? "Berkas telah dikirim" : "Menunggu unggahan PDF"}
                    </p>
                  </div>
                </div>

                {/* Step 3: Review Tim HR */}
                <div className={`relative flex items-start gap-4 ${!isDocumentSent ? "opacity-50" : ""}`}>
                  <div className={`absolute left-0 -ml-6 w-6 h-6 rounded-full border-2 flex items-center justify-center z-10 ${
                    isAccepted
                      ? "bg-emerald-100 border-emerald-500"
                      : isRejected
                        ? "bg-rose-100 border-rose-500"
                        : isProcessing
                          ? "bg-indigo-100 border-indigo-600"
                          : "bg-slate-100 border-slate-300"
                  }`}>
                    {isAccepted ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    ) : isRejected ? (
                      <XCircle className="w-3.5 h-3.5 text-rose-600" />
                    ) : isProcessing ? (
                      <span className="w-2 h-2 bg-indigo-600 rounded-full animate-pulse"></span>
                    ) : (
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                    )}
                  </div>
                  <div className="ml-4">
                    <h4 className={`font-bold text-sm ${
                      isAccepted || isRejected ? "text-slate-800" : isProcessing ? "text-indigo-700" : "text-slate-800"
                    }`}>
                      Review Tim HR
                    </h4>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {isAccepted 
                        ? "Lolos verifikasi HR" 
                        : isRejected 
                          ? "Berkas ditolak (Lihat detail)" 
                          : isProcessing 
                            ? "Sedang direview oleh HR" 
                            : "Menunggu pengiriman berkas"}
                    </p>
                  </div>
                </div>

                {/* Step 4: Hasil Seleksi */}
                <div className={`relative flex items-start gap-4 ${!isAccepted ? "opacity-50" : ""}`}>
                  <div className={`absolute left-0 -ml-6 w-6 h-6 rounded-full border-2 flex items-center justify-center z-10 ${
                    isAccepted
                      ? "bg-indigo-100 border-indigo-600"
                      : "bg-slate-100 border-slate-300"
                  }`}>
                    {isAccepted ? (
                      <span className="w-2 h-2 bg-indigo-600 rounded-full animate-pulse"></span>
                    ) : (
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                    )}
                  </div>
                  <div className="ml-4">
                    <h4 className={`font-bold text-sm ${isAccepted ? "text-indigo-700" : "text-slate-800"}`}>
                      Hasil Seleksi
                    </h4>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {isAccepted ? "Menunggu pengumuman akhir" : "Pengumuman akhir"}
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
