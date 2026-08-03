"use client";

import React, { useState, useEffect } from "react";
import {
  CheckCircle2,
  AlertCircle,
  FileCheck2,
  UploadCloud,
  Trash2,
  Eye,
} from "lucide-react";
import { supabase } from "@/app/lib/supabase";
import { updateDocumentStatus, getRegistrationStatus } from "@/app/lib/registrationLog";
import { useRouter } from "next/navigation";

type UploadedFile = {
  fileName: string;
  fileUrl: string;
  filePath: string;
};

export default function DashboardBerkas() {
  const [uploading, setUploading] = useState<Record<string, boolean>>({});
  const [uploadedFiles, setUploadedFiles] = useState<Record<string, UploadedFile>>({});
  const [userData, setUserData] = useState<any>(null);
  const [loadingInitial, setLoadingInitial] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusData, setStatusData] = useState({ document: false, status: 'pending', remark: '' });
  const router = useRouter();

  // Load userData and fetch existing files from Supabase
  useEffect(() => {
    async function initData() {
      let sessionUser: any = null;
      const saved = localStorage.getItem("nexgen_candidate_session");
      if (saved) {
        try {
          const session = JSON.parse(saved);
          if (session?.candidateData) {
            sessionUser = session.candidateData;
            setUserData(sessionUser);
            if (sessionUser.account_id) {
              const res = await getRegistrationStatus(sessionUser.account_id);
              if (res.success && res.data) {
                setStatusData(res.data);
              }
            }
          }
        } catch (error) {
          console.error("Error parsing session:", error);
        }
      }

      if (sessionUser?.username) {
        fetchUserFiles(sessionUser.username);
      } else {
        setLoadingInitial(false);
      }
    }
    initData();
  }, []);

  const fetchUserFiles = async (username: string) => {
    try {
      const { data, error } = await supabase.storage
        .from("document")
        .list(username);

      if (error) {
        console.error("Gagal mengambil daftar file:", error);
        return;
      }

      if (data && data.length > 0) {
        const paths = data.map(file => `${username}/${file.name}`);
        // Buat Signed URL berdurasi 1 jam karena bucket Private
        const { data: signedUrls, error: signedError } = await supabase.storage
          .from("document")
          .createSignedUrls(paths, 60 * 60);

        if (!signedError && signedUrls) {
          const fileMap: Record<string, UploadedFile> = {};
          data.forEach((file, index) => {
            const docId = file.name.split('.')[0]; 
            const filePath = `${username}/${file.name}`;
            fileMap[docId] = {
              fileName: file.name,
              filePath: filePath,
              fileUrl: signedUrls[index].signedUrl || "",
            };
          });
          setUploadedFiles(fileMap);
        }
      }
    } catch (error) {
      console.error("Error fetching files:", error);
    } finally {
      setLoadingInitial(false);
    }
  };

  const handleFileUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    docId: string,
    docTitle: string,
  ) => {
    if (!userData?.username) {
      alert("Sesi tidak valid, mohon login ulang.");
      return;
    }

    const file = e.target.files?.[0];
    if (file) {
      if (file.type !== "application/pdf") {
        alert("Mohon unggah file dalam format PDF.");
        e.target.value = "";
        return;
      }
      
      setUploading((prev) => ({ ...prev, [docId]: true }));
      
      try {
        const fileExt = file.name.split(".").pop();
        // Paksa nama file menjadi docId.pdf agar konsisten (misal: username/ktp.pdf)
        const fileName = `${docId}.${fileExt}`;
        const filePath = `${userData.username}/${fileName}`;
        
        const { error } = await supabase.storage
          .from("document")
          .upload(filePath, file, { upsert: true });

        if (error) throw error;

        const { data: signedData } = await supabase.storage
          .from("document")
          .createSignedUrl(filePath, 60 * 60);

        setUploadedFiles((prev) => ({
          ...prev,
          [docId]: {
            fileName: fileName,
            filePath: filePath,
            fileUrl: signedData?.signedUrl || ""
          }
        }));
        
        alert(`File ${fileName} untuk ${docTitle} berhasil diunggah ke Storage!`);
      } catch (error: any) {
        alert(`Gagal mengunggah file: ${error.message}`);
      } finally {
        setUploading((prev) => ({ ...prev, [docId]: false }));
        e.target.value = "";
      }
    }
  };

  const handleRemoveFile = async (docId: string, filePath: string) => {
    if (!confirm("Apakah Anda yakin ingin menghapus berkas ini?")) return;
    
    setUploading((prev) => ({ ...prev, [docId]: true }));
    try {
      const { error } = await supabase.storage.from("document").remove([filePath]);
      if (error) throw error;
      
      setUploadedFiles((prev) => {
        const next = { ...prev };
        delete next[docId];
        return next;
      });
    } catch (error: any) {
      alert(`Gagal menghapus file: ${error.message}`);
    } finally {
      setUploading((prev) => ({ ...prev, [docId]: false }));
    }
  };

  const handleSubmitAll = async () => {
    if (!userData?.account_id) {
      alert("Sesi tidak valid, mohon login ulang.");
      return;
    }

    if (!window.confirm("Apakah Anda yakin berkas sudah benar dan lengkap? Berkas akan dikirimkan untuk direview oleh Tim HR.")) {
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await updateDocumentStatus(userData.account_id);
      if (res.success) {
        alert("Berhasil! Seluruh dokumen Anda telah terkirim dan siap di-review oleh Tim HR.");
        router.push("/dashboard/status");
      } else {
        alert(`Gagal mengirim status berkas: ${res.error}`);
      }
    } catch (error: any) {
      alert(`Terjadi kesalahan: ${error.message}`);
    } finally {
      setIsSubmitting(false);
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

  const allUploaded = documents.every((doc) => uploadedFiles[doc.id]);

  if (loadingInitial) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 rounded-full border-4 border-indigo-200 border-t-indigo-600 animate-spin"></div>
          <p className="text-slate-500 font-medium">Memuat status berkas...</p>
        </div>
      </div>
    );
  }

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
                  tidak sesuai format tidak akan diproses oleh tim HR. Status unggahan disinkronisasi langsung dari server kami.
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
              <span className={`px-3 py-1 text-xs font-bold rounded-full ${allUploaded ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
                {allUploaded ? 'Lengkap' : 'Belum Lengkap'}
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
                    {uploadedFiles[doc.id] && (
                      <div className="mt-2 flex items-center gap-1.5 text-emerald-600 text-xs font-bold bg-emerald-50 w-fit px-2.5 py-1.5 rounded-md border border-emerald-100">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        {uploadedFiles[doc.id].fileName}
                      </div>
                    )}
                  </div>
                  <div className="shrink-0 flex items-center gap-2">
                    <div className="relative">
                      <input
                        type="file"
                        accept=".pdf"
                        id={`upload-${doc.id}`}
                        className="hidden"
                        onChange={(e) => handleFileUpload(e, doc.id, doc.title)}
                        disabled={uploading[doc.id] || !!uploadedFiles[doc.id]}
                      />
                      <label
                        htmlFor={`upload-${doc.id}`}
                        className={`inline-flex items-center gap-2 px-4 py-2.5 border text-sm font-semibold rounded-xl transition-all shadow-sm ${
                          uploading[doc.id] || uploadedFiles[doc.id] 
                            ? "bg-slate-50 border-slate-200 text-slate-400 cursor-not-allowed" 
                            : "bg-white border-slate-300 hover:border-indigo-500 hover:text-indigo-600 text-slate-700 cursor-pointer"
                        }`}
                      >
                        {uploading[doc.id] ? (
                          <span className="w-4 h-4 rounded-full border-2 border-slate-400 border-t-transparent animate-spin"></span>
                        ) : (
                          <UploadCloud className="w-4 h-4" />
                        )}
                        {uploading[doc.id] ? "Mengunggah..." : "Pilih File PDF"}
                      </label>
                    </div>

                    {uploadedFiles[doc.id] && (
                      <>
                        <a
                          href={uploadedFiles[doc.id].fileUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-2 px-3 py-2.5 bg-indigo-50 text-indigo-600 hover:bg-indigo-100 font-semibold text-sm rounded-xl transition-colors"
                          title="Lihat Berkas"
                        >
                          <Eye className="w-4 h-4" />
                        </a>
                        <button
                          onClick={() => handleRemoveFile(doc.id, uploadedFiles[doc.id].filePath)}
                          disabled={uploading[doc.id]}
                          className="flex items-center gap-2 px-3 py-2.5 bg-rose-50 text-rose-600 hover:bg-rose-100 font-semibold text-sm rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                          title="Hapus Berkas"
                        >
                          {uploading[doc.id] ? (
                            <span className="w-4 h-4 rounded-full border-2 border-rose-600 border-t-transparent animate-spin"></span>
                          ) : (
                            <Trash2 className="w-4 h-4" />
                          )}
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="p-5 sm:p-6 bg-slate-50/50 border-t border-slate-100 flex justify-end">
              <button 
                onClick={handleSubmitAll}
                disabled={!allUploaded || isSubmitting || statusData.status === 'Processing'}
                className={`px-6 py-3 font-bold rounded-xl shadow-lg transition-all flex items-center gap-2 ${
                  allUploaded && !isSubmitting && statusData.status !== 'Processing' && statusData.status !== 'Accepted' && statusData.status !== 'Rejected'
                  ? "bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-600/25 hover:-translate-y-0.5" 
                  : "bg-slate-200 text-slate-400 cursor-not-allowed shadow-none"
                }`}
              >
                {isSubmitting ? (
                  <>
                    <span className="w-5 h-5 rounded-full border-2 border-white/50 border-t-white animate-spin"></span>
                    Mengirim...
                  </>
                ) : statusData.status === 'Processing' ? (
                  "Sedang Direview HR"
                ) : statusData.status === 'Accepted' ? (
                  "Sudah Diterima"
                ) : statusData.status === 'Rejected' ? (
                  "Ditolak HR"
                ) : (
                  "Kirim & Simpan Berkas"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
