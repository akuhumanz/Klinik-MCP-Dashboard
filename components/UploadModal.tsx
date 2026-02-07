import React, { useState, useRef } from 'react';
import { X, Upload, FileSpreadsheet, Trash2 } from 'lucide-react';

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpload: (file: File, type: 'perorangan' | 'perusahaan') => void;
}

export const UploadModal: React.FC<UploadModalProps> = ({ isOpen, onClose, onUpload }) => {
  const [participantType, setParticipantType] = useState<'perorangan' | 'perusahaan' | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.name.match(/\.(xls|xlsx)$/i)) {
        setFile(selectedFile);
        simulateUpload();
      } else {
        alert('Mohon pilih file format Excel (.xls atau .xlsx)');
      }
    }
  };

  const simulateUpload = () => {
    setIsUploading(true);
    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          return 100;
        }
        return prev + 10;
      });
    }, 150);
  };

  const handleRemoveFile = () => {
    setFile(null);
    setUploadProgress(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const isFormValid = file && participantType && uploadProgress === 100;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative bg-white w-full max-w-xl rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 fade-in duration-300">
        {/* Header Section */}
        <div className="p-8 pb-6 border-b border-gray-100">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-1">Unggah Data Peserta</h2>
              <p className="text-gray-500 text-sm">Unggah file data peserta (Excel) ke dalam sistem.</p>
            </div>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400 hover:text-gray-600"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-8 pt-6 space-y-6">
          <div>
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] block mb-4">JENIS PESERTA</label>
            <div className="flex items-center gap-8">
              <label className="flex items-center gap-3 cursor-pointer group">
                <div className="relative flex items-center justify-center">
                  <input 
                    type="radio" 
                    name="participantType" 
                    className="peer hidden"
                    checked={participantType === 'perorangan'}
                    onChange={() => setParticipantType('perorangan')}
                  />
                  <div className="w-5 h-5 border-2 border-gray-300 rounded-full transition-all peer-checked:border-blue-600 peer-checked:border-[6px] group-hover:border-blue-400" />
                </div>
                <span className={`text-sm font-semibold transition-colors ${participantType === 'perorangan' ? 'text-gray-900' : 'text-gray-500'}`}>Perorangan</span>
              </label>

              <label className="flex items-center gap-3 cursor-pointer group">
                <div className="relative flex items-center justify-center">
                  <input 
                    type="radio" 
                    name="participantType" 
                    className="peer hidden"
                    checked={participantType === 'perusahaan'}
                    onChange={() => setParticipantType('perusahaan')}
                  />
                  <div className="w-5 h-5 border-2 border-gray-300 rounded-full transition-all peer-checked:border-blue-600 peer-checked:border-[6px] group-hover:border-blue-400" />
                </div>
                <span className={`text-sm font-semibold transition-colors ${participantType === 'perusahaan' ? 'text-gray-900' : 'text-gray-500'}`}>Perusahaan</span>
              </label>
            </div>
          </div>

          {!file ? (
            <div 
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-blue-100 bg-blue-50/5 rounded-2xl p-12 flex flex-col items-center justify-center cursor-pointer hover:border-blue-200 hover:bg-blue-50/10 transition-all group"
            >
              <div className="w-14 h-14 bg-blue-50 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Upload size={24} className="text-blue-600 group-hover:text-blue-700 transition-colors" />
              </div>
              <div className="text-base text-gray-900 mb-1">
                <span className="text-blue-600 font-bold">Pilih file</span> <span className="font-semibold text-gray-900">atau seret ke sini</span>
              </div>
              <div className="text-[12px] text-gray-400 font-medium">Format XLS, XLSX (maks. 10MB)</div>
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileChange} 
                accept=".xls,.xlsx" 
                className="hidden" 
              />
            </div>
          ) : (
            <div className="bg-gray-50/80 rounded-2xl p-5 border border-gray-100 flex gap-4 relative">
              <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center shrink-0 shadow-sm">
                <FileSpreadsheet size={24} className="text-white" />
              </div>
              <div className="flex-1 min-w-0 pr-10">
                <div className="flex items-center justify-between mb-1">
                  <div className="text-sm font-bold text-gray-900 truncate uppercase tracking-tight">{file.name}</div>
                  <div className="text-sm font-bold text-gray-900">{uploadProgress}%</div>
                </div>
                <div className="text-[11px] font-medium mb-3">
                  <span className="text-gray-400">{(file.size / 1024).toFixed(1)} KB — </span>
                  {uploadProgress === 100 ? (
                    <span className="text-green-600 italic font-bold">SELESAI</span>
                  ) : (
                    <span className="text-blue-600 italic font-bold">MENGUNGGAH</span>
                  )}
                </div>
                <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-300 ease-out ${uploadProgress === 100 ? 'bg-green-500' : 'bg-blue-600'}`}
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
              </div>
              <button 
                onClick={handleRemoveFile}
                className="absolute top-5 right-5 text-gray-400 hover:text-red-500 transition-colors"
              >
                <Trash2 size={18} />
              </button>
            </div>
          )}
        </div>

        {/* Footer Section */}
        <div className="p-8 pt-0 flex gap-3">
          <button 
            onClick={onClose}
            className="flex-1 py-3.5 border border-gray-200 rounded-xl text-sm font-bold text-gray-700 hover:bg-gray-50 transition-all active:scale-95"
          >
            Batal
          </button>
          <button 
            disabled={!isFormValid}
            onClick={() => participantType && file && onUpload(file, participantType)}
            className={`
              flex-1 py-3.5 rounded-xl text-sm font-bold transition-all active:scale-95
              ${isFormValid 
                ? 'bg-blue-600 text-white hover:bg-blue-700' 
                : 'bg-gray-200 text-white cursor-not-allowed'
              }
            `}
          >
            Tambahkan Data
          </button>
        </div>
      </div>
    </div>
  );
};