"use client";

import React from "react";
import {
  UserCheck,
  CheckCircle2,
  Clock,
  AlertCircle,
  FileCheck2,
  UploadCloud,
} from "lucide-react";

export default function DashboardBerkas() {
  const handleFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    docType: string,
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type !== "application/pdf") {
        alert("Mohon unggah file dalam format PDF.");
        e.target.value = "";
        return;
      }
      alert(`File ${file.name} untuk ${docType} berhasil dipilih! (Simulasi)`);
    }
  };

  const documents = [
    {
      id: "ktp",
      title: "Kartu Tanda Penduduk (KTP)",
      desc: "Scan KTP asli yang masih berlaku",
    },
    {
      id: "ijazah",
      title: "Ijazah Terakhir",
      desc: "Scan Ijazah asli atau fotokopi legalisir",
    },
    {
      id: "lamaran",
      title: "Surat Lamaran Kerja",
      desc: "Surat lamaran resmi ditujukan ke HRD NexGen.id",
    },
    {
      id: "cv",
      title: "Curriculum Vitae (CV)",
      desc: "Daftar riwayat hidup terbaru",
    },
  ];

  return (
    <>
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
          Kelengkapan Berkas
        </h1>
        <p className="text-slate-500 mt-1">
          Unggah dokumen persyaratan wajib Anda dalam format PDF.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-3 space-y-6">
          <div className="bg-amber-50 rounded-2xl border border-amber-200 p-5">
            <div className="flex gap-3">
              <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
              <div className="ml-4">
                <h4 className="font-bold text-amber-800 text-sm">
                  Informasi Penting
                </h4>
                <p className="text-xs text-amber-700 mt-1 leading-relaxed">
                  Pastikan seluruh berkas diunggah dalam format PDF. Berkas yang
                  tidak sesuai format tidak akan diproses oleh tim HR.
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-5 sm:p-6 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                  <FileCheck2 className="w-5 h-5 text-indigo-600" />
                  Form Kelengkapan Berkas
                </h3>
              </div>
              <span className="px-3 py-1 bg-rose-100 text-rose-700 text-xs font-bold rounded-full">
                Belum Lengkap
              </span>
            </div>

            <div className="p-5 sm:p-6 divide-y divide-slate-100">
              {documents.map((doc) => (
                <div
                  key={doc.id}
                  className="py-5 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="flex-1">
                    <h4 className="font-bold text-slate-800">
                      {doc.title} <span className="text-rose-500">*</span>
                    </h4>
                    <p className="text-xs text-slate-500 mt-1">
                      {doc.desc} (Maks 5MB)
                    </p>
                  </div>
                  <div className="shrink-0">
                    <div className="relative">
                      <input
                        type="file"
                        accept=".pdf"
                        id={`upload-${doc.id}`}
                        className="hidden"
                        onChange={(e) => handleFileUpload(e, doc.title)}
                      />
                      <label
                        htmlFor={`upload-${doc.id}`}
                        className="inline-flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-300 hover:border-indigo-500 hover:text-indigo-600 text-slate-700 text-sm font-semibold rounded-xl cursor-pointer transition-all shadow-sm"
                      >
                        <UploadCloud className="w-4 h-4" />
                        Pilih File PDF
                      </label>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-5 sm:p-6 bg-slate-50/50 border-t border-slate-100 flex justify-end">
              <button className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-indigo-600/25 hover:-translate-y-0.5 transition-all">
                Kirim & Simpan Berkas
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
