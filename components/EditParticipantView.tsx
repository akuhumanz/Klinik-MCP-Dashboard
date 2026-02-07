
import React, { useState, useRef, useEffect } from 'react';
import { Participant } from '../types';
import { 
  ChevronLeft, 
  ChevronRight, 
  X, 
  ChevronDown, 
  ChevronUp, 
  Trash2, 
  RefreshCw, 
  Save, 
  Camera, 
  Calendar, 
  Mail, 
  Phone, 
  Lock, 
  Eye,
  RotateCcw,
  Image as ImageIcon,
  Plus
} from 'lucide-react';

interface EditParticipantViewProps {
  participant: Participant | null;
  onSave: () => void;
  onCancel: () => void;
}

const TABS = [
  'Informasi Peserta Dan Akun',
  'Rangkuman Hasil',
  'Pemeriksaan Fisik',
  'Laboratorium',
  'Radiologi',
  'ECG',
  'Kesehatan Jiwa',
  'Audiometri',
  'Spirometri',
  'Fitness Test'
];

export const EditParticipantView: React.FC<EditParticipantViewProps> = ({ participant, onSave, onCancel }) => {
  const [activeTab, setActiveTab] = useState('Informasi Peserta Dan Akun');
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);

  useEffect(() => {
    // Small timeout to ensure layout is finished before measuring
    const timer = setTimeout(checkScroll, 100);
    window.addEventListener('resize', checkScroll);
    return () => {
      window.removeEventListener('resize', checkScroll);
      clearTimeout(timer);
    };
  }, [participant]);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setShowLeftArrow(scrollLeft > 2);
      // Only show right arrow if content is wider than container and we haven't reached the end
      setShowRightArrow(scrollWidth > clientWidth && scrollLeft < scrollWidth - clientWidth - 5);
    }
  };

  const scroll = (dir: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = scrollRef.current.clientWidth * 0.7;
      scrollRef.current.scrollBy({ left: dir === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
      // Update arrows after animation starts
      setTimeout(checkScroll, 400);
    }
  };

  const mentalQuestions = [
    "Saat ini kita sedang berada dimana?",
    "Tahun berapa sekarang?",
    "Berapakah umur Anda?",
    "Tahun berapa Anda lahir?",
    "Jam brp sekarang? (boleh lihat jam)",
    "Dimana alamat rumah Anda? (RT,RW,Kelurahan)",
    "Mampukah Anda mengenali orang di sekitar?",
    "Tahun berapa Indonesia merdeka?",
    "Siapa nama presiden RI sekarang?",
    "Menghitung mundur dari 20 sampai 1?"
  ];

  const jiwaSederhanaQuestions = [
    "Apakah Anda sering menderita sakit kepala?",
    "Apakah Anda tidak nafsu makan?",
    "Apakah Anda sulit tidur?",
    "Apakah Anda mudah takut?",
    "Apakah Anda merasa tegang, cemas, atau kawatir?",
    "Apakah Anda tangan Anda gemetar?",
    "Apakah pernernaan Anda terganggu/buruk?",
    "Apakah Anda sulit untuk berpikir jernih?",
    "Apakah Anda merasa tidak bahagia?",
    "Apakah Anda lebih menangis lebih sering?",
    "Apakah Anda merasa sulit untuk menikmati kegiatan sehari-hari?",
    "Apakah Anda sulit untuk mengambil keputusan?",
    "Apakah pekerjaan Anda sehari-hari terganggu?",
    "Apakah Anda tidak mampu melakukan hal-hal yang bermanfaat dalam hidup?",
    "Apakah Anda kehilangan minat pada berbagai hal?",
    "Apakah Anda merasa tidak berharga?",
    "Apakah Anda mempunyai pikiran untuk mengakhiri hidup?",
    "Apakah Anda merasa lelah sepanjang waktu?",
    "Apakah Anda mengalami rasa tidak enak di perut?",
    "Apakah Anda mudah lelah?",
    "Apakah pernah berobat ke dokter Spesialis Jiwa?",
    "Apakah minum obat Psikiatri?"
  ];

  return (
    <div className="h-full flex flex-col bg-[#F9FAFB] overflow-hidden animate-in fade-in duration-500">
      {/* Header Section */}
      <div className="bg-white border-b border-gray-200 shrink-0">
        <div className="p-8 pb-0">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-6 font-medium">
            <span>Dashboard</span>
            <span className="text-gray-300 font-normal">/</span>
            <span className="text-gray-400">...</span>
            <span className="text-gray-300 font-normal">/</span>
            <span>Verifikasi Data</span>
            <span className="text-gray-300 font-normal">/</span>
            <span className="px-3 py-1.5 bg-gray-100 rounded-lg font-bold text-gray-700">Edit Data</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
            <div>
              <h1 className="text-[32px] font-bold text-gray-900 leading-tight tracking-tight">
                {participant?.name || 'KHODIJAH NAFIS, S.HI'}
              </h1>
              <div className="flex items-center gap-2 text-gray-500 font-semibold mt-1">
                <span>{participant?.date || '21 Jan 2026'}</span>
                <span className="text-gray-300">•</span>
                <span>{participant?.mcuNo || '000299301'}</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button 
                onClick={onCancel}
                className="px-6 py-3 bg-white border border-gray-200 rounded-xl text-gray-700 text-sm font-bold shadow-sm hover:bg-gray-50 transition-all active:scale-95"
              >
                Batalkan
              </button>
              <button 
                onClick={onSave}
                className="px-6 py-3 bg-[#2563EB] text-white rounded-xl text-sm font-bold shadow-md hover:bg-blue-700 transition-all flex items-center gap-2 active:scale-95"
              >
                <Save size={18} />
                Simpan Perubahan
              </button>
            </div>
          </div>

          {/* Navigation Tabs Container */}
          <div className="relative mb-0">
            <div 
              ref={scrollRef}
              onScroll={checkScroll}
              className="flex gap-10 overflow-x-auto scroll-smooth no-scrollbar pr-32"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {TABS.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-4 text-sm transition-all whitespace-nowrap shrink-0 relative border-b-2 transition-all ${
                    activeTab === tab 
                      ? 'text-blue-600 font-bold border-blue-600' 
                      : 'text-gray-500 font-medium hover:text-gray-700 border-transparent'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            
            {/* Scroll Navigation Buttons */}
            <div className="absolute right-0 top-[-12px] bottom-0 flex items-center gap-2 bg-gradient-to-l from-white via-white/95 to-transparent pl-16 pointer-events-none">
              <button 
                onClick={() => scroll('left')}
                className={`w-10 h-10 flex items-center justify-center rounded-xl bg-white border border-gray-200 text-slate-400 hover:text-blue-600 hover:border-blue-100 transition-all pointer-events-auto shadow-sm active:scale-90 ${!showLeftArrow ? 'opacity-0 scale-90 translate-x-2' : 'opacity-100'}`}
                style={{ visibility: showLeftArrow ? 'visible' : 'hidden' }}
              >
                <ChevronLeft size={20} />
              </button>
              <button 
                onClick={() => scroll('right')}
                className={`w-10 h-10 flex items-center justify-center rounded-xl bg-white border border-gray-200 text-slate-400 hover:text-blue-600 hover:border-blue-100 transition-all pointer-events-auto shadow-sm active:scale-90 ${!showRightArrow ? 'opacity-0 scale-90 -translate-x-2' : 'opacity-100'}`}
                style={{ visibility: showRightArrow ? 'visible' : 'hidden' }}
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto p-8 space-y-6">
        {activeTab === 'Informasi Peserta Dan Akun' ? (
          <div className="max-w-5xl mx-auto space-y-6 pb-12">
            <CollapsibleCard title="Informasi Peserta">
              <div className="flex flex-col lg:flex-row gap-12 items-start">
                <div className="flex flex-col items-center gap-4 shrink-0">
                  <div className="relative">
                    <img 
                      src="https://picsum.photos/200/200?random=khodijah" 
                      alt="Profile" 
                      className="w-36 h-36 rounded-full object-cover border-4 border-white shadow-lg"
                    />
                    <button className="absolute bottom-1 right-1 p-2 bg-blue-600 text-white rounded-full border-2 border-white shadow-md hover:bg-blue-700 transition-all">
                      <Camera size={20} />
                    </button>
                  </div>
                  <button className="text-[11px] font-bold text-gray-400 uppercase tracking-widest hover:text-blue-600 transition-colors">
                    Ubah Foto
                  </button>
                </div>

                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Nama Lengkap</label>
                    <input 
                      type="text" 
                      defaultValue={participant?.name || "KHODIJAH NAFIS, S.HI"}
                      className="w-full p-3.5 border border-gray-200 rounded-xl bg-white text-sm font-semibold text-gray-700 focus:ring-2 focus:ring-blue-100 transition-all outline-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Tgl. Lahir</label>
                    <div className="relative">
                      <input 
                        type="text" 
                        defaultValue={participant?.dob || "23 Juni 1981"}
                        className="w-full p-3.5 pr-10 border border-gray-200 rounded-xl bg-white text-sm font-semibold text-gray-700 focus:ring-2 focus:ring-blue-100 transition-all outline-none"
                      />
                      <Calendar className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Jenis Kelamin</label>
                    <div className="relative">
                      <select className="w-full p-3.5 pr-10 border border-gray-200 rounded-xl bg-white text-sm font-semibold text-gray-700 appearance-none focus:ring-2 focus:ring-blue-100 transition-all cursor-pointer outline-none">
                        <option value="P" selected={participant?.gender === 'P'}>Perempuan</option>
                        <option value="L" selected={participant?.gender === 'L'}>Laki-laki</option>
                      </select>
                      <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Nomor MCU</label>
                    <input 
                      type="text" 
                      defaultValue={participant?.mcuNo || "000299301"}
                      className="w-full p-3.5 border border-gray-200 rounded-xl bg-white text-sm font-semibold text-gray-700 focus:ring-2 focus:ring-blue-100 transition-all outline-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Nomor KTP/ID</label>
                    <input 
                      type="text" 
                      defaultValue="3572883990003"
                      className="w-full p-3.5 border border-gray-200 rounded-xl bg-white text-sm font-semibold text-gray-700 focus:ring-2 focus:ring-blue-100 transition-all outline-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Tanggal Periksa</label>
                    <div className="relative">
                      <input 
                        type="text" 
                        defaultValue={participant?.date || "21 Januari 2026"}
                        className="w-full p-3.5 pr-10 border border-gray-200 rounded-xl bg-white text-sm font-semibold text-gray-700 focus:ring-2 focus:ring-blue-100 transition-all outline-none"
                      />
                      <Calendar className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    </div>
                  </div>
                </div>
              </div>
            </CollapsibleCard>

            <CollapsibleCard title="Informasi Akun">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                    <Mail size={14} className="text-gray-400" />
                    <span>Email</span>
                  </div>
                  <input 
                    type="email" 
                    defaultValue="khodijah@example.com"
                    className="w-full p-3.5 border border-gray-200 rounded-xl bg-white text-sm font-semibold text-gray-700 focus:ring-2 focus:ring-blue-100 transition-all outline-none"
                  />
                  <p className="text-[11px] text-blue-600 font-medium leading-relaxed mt-1">
                    Pastikan email benar and sesuai. Karena hasil MCU pasien akan dikirimkan ke email tersebut.
                  </p>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                    <Phone size={14} className="text-gray-400" />
                    <span>Nomor Handphone</span>
                  </div>
                  <input 
                    type="text" 
                    defaultValue="081234567890"
                    className="w-full p-3.5 border border-gray-200 rounded-xl bg-white text-sm font-semibold text-gray-700 focus:ring-2 focus:ring-blue-100 transition-all outline-none"
                  />
                </div>
              </div>
            </CollapsibleCard>
          </div>
        ) : activeTab === 'Rangkuman Hasil' ? (
          <div className="max-w-5xl space-y-6 pb-24 mx-auto">
            <CollapsibleCard title="1. Pemeriksaan Fisik">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
                <p className="text-sm text-gray-600 font-bold leading-relaxed">Pada saat pemeriksaan didapatkan hasil berupa :</p>
                <div className="md:col-span-2">
                  <textarea 
                    className="w-full min-h-[120px] p-5 border border-gray-200 rounded-xl bg-white text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all"
                    defaultValue="Caries +, Gigi Lubang +, Gigi Hilang +, Prehipertensi, obesitas and lingkar perut berlebih, pemeriksaan mental and jiwa dalam batas normal"
                  />
                </div>
              </div>
            </CollapsibleCard>

            <CollapsibleCard title="2. Laboratorium">
              <div className="space-y-4">
                <InputRow label="Hematologi lengkap" />
                <InputRow label="Fungsi liver" />
                <InputRow label="Metabolisme karbohidrat" defaultValue="HBA1C meningkat 6.3 (karena tidak puasa)" isInput />
                <InputRow label="Profil lemak" defaultValue="Kolesterol meningkat (273 mg/dL), Trigliserida meningkat (271 mg/dL)" isInput />
                <InputRow label="Fungsi ginjal" />
                <InputRow label="Toksikologi (Kolinesterase)" defaultValue="Tidak dilakukan pemeriksaan" />
                <InputRow label="Imunoserologi (HBsAg)" />
                <InputRow label="Golongan darah" defaultValue="A rhesus + (positive)" />
                <InputRow label="Urine lengkap" />
                <InputRow label="Cek WUS (kehamilan)" defaultValue="Negatif" />
                <InputRow label="Feses lengkap" defaultValue="Negatif" />
              </div>
            </CollapsibleCard>

            <CollapsibleCard title="3. Non Laboratorium">
              <div className="space-y-4">
                <InputRow label="Thorax" />
                <InputRow label="ECG" />
                <InputRow label="Audiometri" />
              </div>
            </CollapsibleCard>

            <CollapsibleCard title="4. Kesimpulan, Rekomendasi & Saran">
              <div className="space-y-10">
                <div>
                  <h4 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-wider">Kesimpulan</h4>
                  <textarea 
                    className="w-full min-h-[100px] p-4 border border-gray-200 rounded-xl bg-white text-sm text-gray-700 focus:ring-2 focus:ring-blue-100 transition-all"
                    defaultValue="Berdasarkan jenis pemeriksaan yang dilakukan and kondisi saat ini : Caries +, Gigi Lubang +, Gigi Hilang +, Prehipertensi, obesitas and lingkar perut berlebih, HBA1C meningkat 6.3 (karena tidak puasa), Kolesterol meningkat (273 mg/dL), Trigliserida meningkat (271 mg/dL), pemeriksaan mental and jiwa dalam batas normal"
                  />
                </div>

                <div>
                  <h4 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-wider">Rekomendasi</h4>
                  <input 
                    type="text"
                    className="w-full p-4 border border-gray-200 rounded-xl bg-white text-sm text-gray-700 focus:ring-2 focus:ring-blue-100 transition-all"
                    defaultValue="Istithaah (Lulus)"
                  />
                </div>

                <div>
                  <h4 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-wider">Saran</h4>
                  <textarea 
                    className="w-full min-h-[150px] p-4 border border-gray-200 rounded-xl bg-white text-sm text-gray-700 focus:ring-2 focus:ring-blue-100 transition-all"
                    defaultValue={`1. Menjaga kesehatan gigi and mulut serta dapat menjadwalkan ke dokter gigi untuk perawatan gigi.\n2. Menjaga gaya hidup sehat, tidur cukup, mengonsumsi makanan rendah garam and tinggi serat, berolahraga teratur, and menjaga berat badan ideal, serta melakukan pemeriksaan tekanan darah secara berkala.\n3. IMT obesitas mengindikasikan penumpukan lemak berlebih di tubuh, yang menandakan kondisi obesitas sentral and obesitas umum...`}
                  />
                </div>
              </div>
            </CollapsibleCard>

            <CollapsibleCard title="5. Administrasi & Pengesahan">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                <div className="space-y-6">
                  <FormField label="Lokasi" defaultValue="Malang" />
                  <FormField label="Tanggal" defaultValue="21 Januari 2026" />
                  <FormField label="Dokter Penanggung Jawab MCU" defaultValue="dr. Cesro Maulana Sangka" />
                  <FormField label="SIP" defaultValue="503.2/96.1/KAB/DU/II/2022" />
                </div>
                
                <div className="space-y-10">
                   <ImageField label="Tanda Tangan Dokter" src="https://upload.wikimedia.org/wikipedia/commons/3/3a/Jon_Kirsch%27s_Signature.png" />
                   <ImageField label="Stempel Klinik/Perusahaan" src="https://img.freepik.com/premium-vector/original-stamp-red-circle-round-tag-rubber-sign-flat-style_662353-847.jpg" />
                </div>
              </div>
            </CollapsibleCard>
          </div>
        ) : activeTab === 'Pemeriksaan Fisik' ? (
          <div className="max-w-5xl space-y-6 pb-24 mx-auto">
             <CollapsibleCard title="1. Keluhan">
               <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
                  <p className="text-sm text-gray-600 font-bold leading-relaxed">Keluhan Utama :</p>
                  <div className="md:col-span-2">
                    <textarea 
                      className="w-full min-h-[80px] p-4 border border-gray-200 rounded-xl bg-white text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all"
                      defaultValue="Tidak ada"
                    />
                  </div>
                </div>
             </CollapsibleCard>

             <CollapsibleCard title="2. Riwayat Penyakit">
               <div className="space-y-6">
                 <InputRow label="Riwayat Dahulu" defaultValue="Hipertensi (Rutin amodipin 5mg)" isInput />
                 
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
                    <span className="text-sm text-gray-600 font-bold">Riwayat Keluarga</span>
                    <div className="md:col-span-2 space-y-3">
                      <div className="flex border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm focus-within:ring-2 focus-within:ring-blue-50 transition-all">
                        <div className="bg-gray-50/50 px-6 py-3.5 border-r border-gray-200 text-sm font-medium text-gray-500 min-w-[100px] flex items-center justify-center">Bapak</div>
                        <input className="flex-1 px-4 py-3.5 text-sm font-medium outline-none text-gray-700 bg-white" defaultValue="HT" />
                      </div>
                      <div className="flex border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm focus-within:ring-2 focus-within:ring-blue-50 transition-all">
                        <div className="bg-gray-50/50 px-6 py-3.5 border-r border-gray-200 text-sm font-medium text-gray-500 min-w-[100px] flex items-center justify-center">Ibu</div>
                        <input className="flex-1 px-4 py-3.5 text-sm font-medium outline-none text-gray-700 bg-white" defaultValue="Tidak ada" />
                      </div>
                    </div>
                 </div>

                 <InputRow label="Riwayat Phobia" defaultValue="Tidak ada" isInput />
               </div>
             </CollapsibleCard>

             <CollapsibleCard title="3. Kebiasaan">
               <div className="space-y-4">
                 <InputRow label="Merokok/tidak" defaultValue="Tidak" />
                 <InputRow label="Olahraga/tidak" defaultValue="Rutin 1x seminggu" isInput />
                 <InputRow label="Alkohol/tidak" defaultValue="Tidak" />
               </div>
             </CollapsibleCard>

             <CollapsibleCard title="4. Pemeriksaan Fisik">
                <div className="space-y-4">
                  <InputRow label="Kepala" />
                  <InputRow label="Mata" />
                  <InputRow label="Hidung" />
                  <InputRow label="Telinga" />
                  <InputRow label="Kesehatan gigi" defaultValue="Caries +, Gigi Lubang +, Gigi Hilang +" isInput />
                  <InputRow label="Tenggorokan" />
                  <InputRow label="Leher" />
                  <InputRow label="Dada" />
                  <InputRow label="Abdomen" />
                  <InputRow label="Punggung" />
                  <InputRow label="Ekstrimitas" />
                  <InputRow label="Rectal" />
                  <InputRow label="Urogenital" />
                </div>
             </CollapsibleCard>

             <CollapsibleCard title="5. Vital Sign">
                <div className="overflow-hidden border border-gray-200 rounded-2xl bg-white shadow-sm">
                  <table className="w-full text-sm text-left border-separate border-spacing-0">
                    <thead className="bg-gray-50 text-gray-400">
                      <tr>
                        <th className="px-6 py-5 border-b border-gray-200 font-bold uppercase tracking-[0.15em] text-[10px]">Vital Sign</th>
                        <th className="px-6 py-5 border-b border-gray-200 font-bold uppercase tracking-[0.15em] text-[10px]">Hasil</th>
                        <th className="px-6 py-5 border-b border-gray-200 font-bold uppercase tracking-[0.15em] text-[10px]">Satuan</th>
                        <th className="px-6 py-5 border-b border-gray-200 font-bold uppercase tracking-[0.15em] text-[10px]">Normal</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      <VitalSignRow label="Tekanan Darah" value="125/75" unit="mmHg" normal="120/80 mmHg" />
                      <VitalSignRow label="Nadi" value="85" unit="x/mt" normal="60-100 x/mt" />
                      <VitalSignRow label="BB/TB" value="82/153" unit="Kg/cm" normal="-" />
                      <VitalSignRow label="IMT" value="35.03" unit="-" normal="18,5 – 24,9" />
                      <VitalSignRow label="Suhu Tubuh" value="36.4" unit="OC" normal="36.3OC – 37.2 OC" />
                      <VitalSignRow label="Lingkar Perut" value="98" unit="cm" normal="Pria < 90, Wanita < 80" />
                      <VitalSignRow label="Saturasi" value="98" unit="%" normal="95-100" />
                    </tbody>
                  </table>
                </div>
             </CollapsibleCard>

             <CollapsibleCard title="6. Administrasi & Pengesahan">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                <div className="space-y-6">
                  <FormField label="Lokasi" defaultValue="Malang" />
                  <FormField label="Tanggal" defaultValue="21 Januari 2026" />
                  <FormField label="Dokter Penanggung Jawab MCU" defaultValue="dr. Cesro Maulana Sangka" />
                  <FormField label="SIP" defaultValue="503.2/96.1/KAB/DU/II/2022" />
                </div>
                
                <div className="space-y-10">
                   <ImageField label="Tanda Tangan Dokter" src="https://upload.wikimedia.org/wikipedia/commons/3/3a/Jon_Kirsch%27s_Signature.png" />
                   <ImageField label="Stempel Klinik/Perusahaan" src="https://img.freepik.com/premium-vector/original-stamp-red-circle-round-tag-rubber-sign-flat-style_662353-847.jpg" />
                </div>
              </div>
            </CollapsibleCard>
          </div>
        ) : activeTab === 'Laboratorium' ? (
          <div className="max-w-5xl space-y-6 pb-24 mx-auto">
             <CollapsibleCard title="1. Hematologi Lengkap">
                <div className="overflow-hidden border border-gray-200 rounded-2xl bg-white shadow-sm">
                  <table className="w-full text-sm text-left border-separate border-spacing-0">
                    <thead className="bg-gray-50 text-gray-400">
                      <tr>
                        <th className="px-6 py-5 border-b border-gray-200 font-bold uppercase tracking-[0.15em] text-[10px]">Pemeriksaan</th>
                        <th className="px-6 py-5 border-b border-gray-200 font-bold uppercase tracking-[0.15em] text-[10px]">Hasil</th>
                        <th className="px-6 py-5 border-b border-gray-200 font-bold uppercase tracking-[0.15em] text-[10px]">Satuan</th>
                        <th className="px-6 py-5 border-b border-gray-200 font-bold uppercase tracking-[0.15em] text-[10px]">Normal/Nilai Rujukan</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      <LabResultRow label="Hemoglobin (HGB)" value="14.4" unit="g/dL" normal="11,0 - 18,0" />
                      <LabResultRow label="Eritrosit (RBC)" value="5.4" unit="10⁶/µL" normal="4,20 - 6,00" />
                      <LabResultRow label="Leukosit (WBC)" value="8.9" unit="10³/µL" normal="3,6 - 10,6" />
                      <LabResultRow label="Hematokrit (HCT)" value="46.7" unit="%" normal="40 - 54" />
                      <LabResultRow label="Trombosit (PLT)" value="304" unit="10³/µL" normal="150 - 450" />
                      <LabResultRow label="MCV" value="88" unit="fL" normal="80 - 100" />
                      <LabResultRow label="MCH" value="26.4" unit="pg/cell" normal="26 - 34" />
                      <LabResultRow label="MCHC" value="30" unit="g/dL" normal="32 - 36" />
                      <LabResultRow label="RDW" value="13.3" unit="%" normal="11,5 - 14,5" />
                      <LabResultRow label="MPV" value="11.2" unit="fL" normal="7,2 - 11,1" />
                      <LabResultRow label="Limfosit %" value="24.8" unit="%" normal="18 - 42" />
                      <LabResultRow label="Mid Cel %" value="5.3" unit="%" normal="2 - 11" />
                      <LabResultRow label="Granulosit %" value="62" unit="%" normal="50 - 70" />
                      <LabResultRow label="Lymfosit Abs" value="2.2" unit="10³/µL" normal="0,8 - 4,0" />
                      <LabResultRow label="Mid Cel Abs" value="0.5" unit="10³/µL" normal="0,1 - 1,2" />
                      <LabResultRow label="Granulosit Abs" value="6.2" unit="10³/µL" normal="2,0 - 7,0" />
                      <LabResultRow label="LED" value="30" unit="mm/jam" normal="<50th: L:0-15 P:0-20 >50th: L:0-20 P:0-30\nAnak-anak : 0-10, Ibu Hamil: Tm Awal:18-48 Tm Akhir:30-70" />
                    </tbody>
                  </table>
                </div>
             </CollapsibleCard>

             <CollapsibleCard title="2. Kimia Klinik">
                <div className="overflow-hidden border border-gray-200 rounded-2xl bg-white shadow-sm">
                  <table className="w-full text-sm text-left border-separate border-spacing-0">
                    <thead className="bg-gray-50 text-gray-400">
                      <tr>
                        <th className="px-6 py-5 border-b border-gray-200 font-bold uppercase tracking-[0.15em] text-[10px]">Pemeriksaan</th>
                        <th className="px-6 py-5 border-b border-gray-200 font-bold uppercase tracking-[0.15em] text-[10px]">Hasil</th>
                        <th className="px-6 py-5 border-b border-gray-200 font-bold uppercase tracking-[0.15em] text-[10px]">Satuan</th>
                        <th className="px-6 py-5 border-b border-gray-200 font-bold uppercase tracking-[0.15em] text-[10px]">Normal/Nilai Rujukan</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      <LabResultRow label="Fungsi liver" value="" unit="" normal="" isSubHeader />
                      <LabResultRow label="SGOT" value="17" unit="U/L" normal="0 - 40" />
                      <LabResultRow label="SGPT" value="20" unit="U/L" normal="0 - 40" />
                      <LabResultRow label="Kolinesterase" value="-" unit="U/L" normal="4.620-11.500" />
                      <LabResultRow label="METABOLISME KARBOHIDRAT" value="" unit="" normal="" isSubHeader />
                      <LabResultRow label="Glukosa Puasa" value="-" unit="mg/dL" normal="70 - 130" />
                      <LabResultRow label="Glukosa Sesaat" value="156" unit="mg/dL" normal="<200" />
                      <LabResultRow label="HBA1C" value="6.3" unit="%" normal="3,8 - 5,8" />
                      <LabResultRow label="fungsi ginjal" value="" unit="" normal="" isSubHeader />
                      <LabResultRow label="Asam Urat" value="3.1" unit="mg/dL" normal="L=3,5-7,0; P=2,4-6,0" />
                      <LabResultRow label="Ureum" value="27" unit="mg/dL" normal="15 - 55" />
                      <LabResultRow label="Kreatinin" value="0.6" unit="mg/dL" normal="L=0,6-1,2; P=0,5-1,1" />
                      <LabResultRow label="PROFIL LEMAK" value="" unit="" normal="" isSubHeader />
                      <LabResultRow label="Kolesterol total" value="273" unit="mg/dL" normal="<200" />
                      <LabResultRow label="Trigliserida" value="271" unit="mg/dL" normal="<150" />
                      <LabResultRow label="LDL" value="-" unit="mg/dL" normal="<100" />
                      <LabResultRow label="HDL" value="-" unit="mg/dL" normal=">60" />
                    </tbody>
                  </table>
                </div>
             </CollapsibleCard>

             <CollapsibleCard title="3. Golongan Darah">
                <div className="overflow-hidden border border-gray-200 rounded-2xl bg-white shadow-sm">
                  <table className="w-full text-sm text-left border-separate border-spacing-0">
                    <thead className="bg-gray-50 text-gray-400">
                      <tr>
                        <th className="px-6 py-5 border-b border-gray-200 font-bold uppercase tracking-[0.15em] text-[10px]">Pemeriksaan</th>
                        <th className="px-6 py-5 border-b border-gray-200 font-bold uppercase tracking-[0.15em] text-[10px]">Hasil</th>
                        <th className="px-6 py-5 border-b border-gray-200 font-bold uppercase tracking-[0.15em] text-[10px]">Satuan</th>
                        <th className="px-6 py-5 border-b border-gray-200 font-bold uppercase tracking-[0.15em] text-[10px]">Normal</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      <LabResultRow label="Golongan darah" value="A rh +" unit="-" normal="-" />
                    </tbody>
                  </table>
                </div>
             </CollapsibleCard>

             <CollapsibleCard title="4. Urine Lengkap">
                <div className="overflow-hidden border border-gray-200 rounded-2xl bg-white shadow-sm">
                  <table className="w-full text-sm text-left border-separate border-spacing-0">
                    <thead className="bg-gray-50 text-gray-400">
                      <tr>
                        <th className="px-6 py-5 border-b border-gray-200 font-bold uppercase tracking-[0.15em] text-[10px]">Pemeriksaan</th>
                        <th className="px-6 py-5 border-b border-gray-200 font-bold uppercase tracking-[0.15em] text-[10px]">Hasil</th>
                        <th className="px-6 py-5 border-b border-gray-200 font-bold uppercase tracking-[0.15em] text-[10px]">Satuan</th>
                        <th className="px-6 py-5 border-b border-gray-200 font-bold uppercase tracking-[0.15em] text-[10px]">Normal</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      <LabResultRow label="Warna" value="Kuning" unit="(-)" normal="Kuning" />
                      <LabResultRow label="Kejernihan" value="Jernih" unit="(-)" normal="Jernih" />
                      <LabResultRow label="Berat Jenis" value="1.015" unit="(-)" normal="1.005 - 1.030" />
                      <LabResultRow label="pH" value="7" unit="(-)" normal="5.0 - 8.0" />
                      <LabResultRow label="Nitrit" value="Negatif" unit="(-)" normal="Negatif" />
                      <LabResultRow label="Albumin" value="Negatif" unit="(-)" normal="Negatif" />
                      <LabResultRow label="Glukosa" value="Negatif" unit="(-)" normal="Negatif" />
                      <LabResultRow label="Keton" value="Negatif" unit="(-)" normal="Negatif" />
                      <LabResultRow label="Urobilirubin" value="Negatif" unit="(-)" normal="Negatif" />
                      <LabResultRow label="Bilirubin" value="Negatif" unit="(-)" normal="Negatif" />
                      <LabResultRow label="Eritrosit" value="0-3" unit="plp" normal="0 - 4 plp" />
                      <LabResultRow label="Leukosit" value="1-2" unit="plp" normal="0 - 4 plp" />
                      <LabResultRow label="Epitel" value="1-4" unit="plp" normal="1 - 4 plp" />
                      <LabResultRow label="Kristal urine" value="Negatif" unit="(-)" normal="Negatif" />
                      <LabResultRow label="Silinder" value="Negatif" unit="(-)" normal="Negatif" />
                    </tbody>
                  </table>
                </div>
             </CollapsibleCard>

             <CollapsibleCard title="5. Cek Kehamilan">
                <div className="overflow-hidden border border-gray-200 rounded-2xl bg-white shadow-sm">
                  <table className="w-full text-sm text-left border-separate border-spacing-0">
                    <thead className="bg-gray-50 text-gray-400">
                      <tr>
                        <th className="px-6 py-5 border-b border-gray-200 font-bold uppercase tracking-[0.15em] text-[10px]">Pemeriksaan</th>
                        <th className="px-6 py-5 border-b border-gray-200 font-bold uppercase tracking-[0.15em] text-[10px]">Hasil</th>
                        <th className="px-6 py-5 border-b border-gray-200 font-bold uppercase tracking-[0.15em] text-[10px]">Satuan</th>
                        <th className="px-6 py-5 border-b border-gray-200 font-bold uppercase tracking-[0.15em] text-[10px]">Normal</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      <LabResultRow label="Cek kehamilan (WUS)" value="Negatif" unit="-" normal="-" />
                    </tbody>
                  </table>
                </div>
             </CollapsibleCard>

             <CollapsibleCard title="6. Feses Lengkap">
                <div className="overflow-hidden border border-gray-200 rounded-2xl bg-white shadow-sm">
                  <table className="w-full text-sm text-left border-separate border-spacing-0">
                    <thead className="bg-gray-50 text-gray-400">
                      <tr>
                        <th className="px-6 py-5 border-b border-gray-200 font-bold uppercase tracking-[0.15em] text-[10px]">Pemeriksaan</th>
                        <th className="px-6 py-5 border-b border-gray-200 font-bold uppercase tracking-[0.15em] text-[10px]">Hasil</th>
                        <th className="px-6 py-5 border-b border-gray-200 font-bold uppercase tracking-[0.15em] text-[10px]">Satuan</th>
                        <th className="px-6 py-5 border-b border-gray-200 font-bold uppercase tracking-[0.15em] text-[10px]">Normal/Nilai Rujukan</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      <LabResultRow label="Warna" value="Coklat" unit="-" normal="Coklat" />
                      <LabResultRow label="Konsistensi" value="Lembek" unit="-" normal="Lembek" />
                      <LabResultRow label="Lendir" value="Negatif" unit="-" normal="Negatif" />
                      <LabResultRow label="Darah Feses" value="Negatif" unit="-" normal="Negatif" />
                      <LabResultRow label="Eritrosit" value="0 - 1" unit="/lp" normal="0 - 1" />
                      <LabResultRow label="Leukosit" value="2 - 3" unit="/lp" normal="1 - 3" />
                      <LabResultRow label="Amoeba" value="Negatif" unit="-" normal="Negatif" />
                      <LabResultRow label="Telur Cacing" value="Negatif" unit="-" normal="Negatif" />
                      <LabResultRow label="Sisa makanan" value="Positif" unit="-" normal="-" />
                    </tbody>
                  </table>
                </div>
             </CollapsibleCard>

             <CollapsibleCard title="7. Administrasi & Pengesahan">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                <div className="space-y-6">
                  <FormField label="Lokasi" defaultValue="Malang" />
                  <FormField label="Tanggal" defaultValue="21 Januari 2026" />
                  <FormField label="Dokter Penanggung Jawab MCU" defaultValue="dr. Cesro Maulana Sangka" />
                  <FormField label="SIP" defaultValue="503.2/96.1/KAB/DU/II/2022" />
                </div>
                
                <div className="space-y-10">
                   <ImageField label="Tanda Tangan Dokter" src="https://upload.wikimedia.org/wikipedia/commons/3/3a/Jon_Kirsch%27s_Signature.png" />
                   <ImageField label="Stempel Klinik/Perusahaan" src="https://img.freepik.com/premium-vector/original-stamp-red-circle-round-tag-rubber-sign-flat-style_662353-847.jpg" />
                </div>
              </div>
            </CollapsibleCard>
          </div>
        ) : activeTab === 'Radiologi' ? (
          <div className="max-w-5xl space-y-6 pb-24 mx-auto">
             <CollapsibleCard title="1. Jenis Pemeriksaan">
                <InputRow label="FOTO RO" defaultValue="FOTO THORAX PA" isInput />
             </CollapsibleCard>

             <CollapsibleCard title="2. Hasil Rontgen">
               <div className="space-y-6">
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
                    <span className="text-sm text-gray-600 font-bold">Cor</span>
                    <div className="md:col-span-2">
                      <input 
                        type="text" 
                        defaultValue="Bentuk, posisi, and ukuran normal"
                        className="w-full p-3.5 border border-gray-200 rounded-xl bg-white text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all shadow-sm"
                      />
                    </div>
                 </div>
                 
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start pt-6 border-t border-gray-50">
                    <span className="text-sm text-gray-600 font-bold">Pulmo</span>
                    <div className="md:col-span-2">
                      <textarea 
                        className="w-full min-h-[180px] p-4 border border-gray-200 rounded-xl bg-white text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all shadow-sm leading-relaxed"
                        defaultValue={"- Tidak tampak nodul, infiltrate, massa\n- Sinus phrenicocostalis kanan and kiri tajam\n- Trakea di tengah\n- Sinus costofrenicus and diafragma normal\n- Tulang-tulang normal"}
                      />
                    </div>
                 </div>
               </div>
             </CollapsibleCard>

             <CollapsibleCard title="3. Kesimpulan">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                  <span className="text-sm text-gray-600 font-bold">Kesimpulan</span>
                  <div className="md:col-span-2">
                    <input 
                      type="text" 
                      defaultValue="Saat ini cor and pulmo tak tampak kelainan"
                      className="w-full p-3.5 border border-gray-200 rounded-xl bg-white text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all shadow-sm"
                    />
                  </div>
                </div>
             </CollapsibleCard>

             <CollapsibleCard title="4. Administrasi & Pengesahan">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                <div className="space-y-6">
                  <FormField label="Lokasi" defaultValue="Malang" />
                  <FormField label="Tanggal" defaultValue="21 Januari 2026" />
                  <FormField label="Dokter Penanggung Jawab MCU" defaultValue="dr. Cesro Maulana Sangka" />
                  <FormField label="SIP" defaultValue="503.2/96.1/KAB/DU/II/2022" />
                </div>
                
                <div className="space-y-10">
                   <ImageField label="Tanda Tangan Dokter" src="https://upload.wikimedia.org/wikipedia/commons/3/3a/Jon_Kirsch%27s_Signature.png" />
                   <ImageField label="Stempel Klinik/Perusahaan" src="https://img.freepik.com/premium-vector/original-stamp-red-circle-round-tag-rubber-sign-flat-style_662353-847.jpg" />
                </div>
              </div>
            </CollapsibleCard>
          </div>
        ) : activeTab === 'ECG' ? (
          <div className="max-w-5xl space-y-6 pb-24 mx-auto">
             <CollapsibleCard title="1. Hasil Grafik ECG">
                <div className="space-y-6">
                   <p className="text-sm text-gray-500 font-medium">Unggah hasil grafik ECG pasien dalam format gambar (JPG/PNG).</p>
                   <div className="grid grid-cols-1 gap-6">
                      <div className="relative group border-2 border-dashed border-gray-200 rounded-[24px] p-8 bg-white flex flex-col items-center justify-center min-h-[300px] hover:border-blue-300 hover:bg-blue-50/10 transition-all cursor-pointer">
                        <div className="w-full aspect-[2/1] relative overflow-hidden rounded-xl shadow-sm mb-6 bg-gray-50">
                             <img 
                              src="https://i.ibb.co/LhygM4V/ecg-ref.png" 
                              alt="ECG Graph" 
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.currentTarget.src = "https://img.freepik.com/free-vector/ekg-heartbeat-pulse-monitor-display-isolated-white-background_1284-41122.jpg";
                              }}
                             />
                        </div>
                        <div className="flex items-center gap-3">
                           <button className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-bold shadow-md hover:bg-blue-700 transition-all active:scale-95">
                             <RefreshCw size={18} /> Ganti Gambar
                           </button>
                           <button className="flex items-center gap-2 px-5 py-2.5 bg-white border border-red-200 text-red-600 rounded-xl text-sm font-bold shadow-sm hover:bg-red-50 transition-all active:scale-95">
                             <Trash2 size={18} /> Hapus
                           </button>
                        </div>
                        <div className="absolute inset-0 bg-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-[24px] pointer-events-none">
                          <Plus size={48} className="text-blue-600" />
                        </div>
                      </div>
                      <button className="w-full py-4 border-2 border-dashed border-gray-200 rounded-2xl flex items-center justify-center gap-3 text-gray-500 font-bold hover:bg-gray-50 hover:border-gray-300 transition-all">
                        <ImageIcon size={20} /> Tambah Gambar Grafik ECG Lainnya
                      </button>
                   </div>
                </div>
             </CollapsibleCard>

             <CollapsibleCard title="2. Detail Pemeriksaan">
                <div className="space-y-4">
                  <InputRow label="Irama Sinus" defaultValue="Sinus Rhythm" isInput />
                  <InputRow label="Denyut Jantung" defaultValue="97" isInput />
                  <InputRow label="Bacaan ECG" defaultValue="Normal ECG" isInput />
                </div>
             </CollapsibleCard>

             <CollapsibleCard title="3. Kesimpulan">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
                  <span className="text-sm text-gray-600 font-bold pt-4">Kesimpulan hasil pemeriksaan ECG (denyut jantung)</span>
                  <div className="md:col-span-2">
                    <textarea 
                      className="w-full min-h-[100px] p-4 border border-gray-200 rounded-xl bg-white text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all shadow-sm"
                      defaultValue="Dalam batas normal"
                    />
                  </div>
                </div>
             </CollapsibleCard>

             <CollapsibleCard title="4. Administrasi & Pengesahan">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                <div className="space-y-6">
                  <FormField label="Lokasi" defaultValue="Malang" />
                  <FormField label="Tanggal" defaultValue="21 Januari 2026" />
                  <FormField label="Dokter Penanggung Jawab MCU" defaultValue="dr. Cesro Maulana Sangka" />
                  <FormField label="SIP" defaultValue="503.2/96.1/KAB/DU/II/2022" />
                </div>
                <div className="space-y-10">
                   <ImageField label="Tanda Tangan Dokter" src="https://upload.wikimedia.org/wikipedia/commons/3/3a/Jon_Kirsch%27s_Signature.png" />
                   <ImageField label="Stempel Klinik/Perusahaan" src="https://img.freepik.com/premium-vector/original-stamp-red-circle-round-tag-rubber-sign-flat-style_662353-847.jpg" />
                </div>
              </div>
            </CollapsibleCard>
          </div>
        ) : activeTab === 'Kesehatan Jiwa' ? (
          <div className="max-w-5xl space-y-6 pb-24 mx-auto">
             <CollapsibleCard title="1. Pemeriksaan Mental">
                <div className="overflow-hidden border border-gray-200 rounded-2xl bg-white shadow-sm">
                  <table className="w-full text-sm text-left border-separate border-spacing-0">
                    <thead className="bg-gray-50 text-gray-400">
                      <tr>
                        <th className="px-6 py-5 border-b border-gray-200 font-bold uppercase tracking-[0.15em] text-[10px] w-16">No</th>
                        <th className="px-6 py-5 border-b border-gray-200 font-bold uppercase tracking-[0.15em] text-[10px]">Pertanyaan</th>
                        <th className="px-6 py-5 border-b border-gray-200 font-bold uppercase tracking-[0.15em] text-[10px] w-48">Jawaban</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {mentalQuestions.map((q, i) => (
                        <QuestionRow key={i} no={i + 1} question={q} defaultValue="Benar" options={["Benar", "Salah"]} />
                      ))}
                    </tbody>
                  </table>
                </div>
             </CollapsibleCard>

             <CollapsibleCard title="2. Pemeriksaan Kesehatan Jiwa Sederhana">
                <div className="overflow-hidden border border-gray-200 rounded-2xl bg-white shadow-sm">
                  <table className="w-full text-sm text-left border-separate border-spacing-0">
                    <thead className="bg-gray-50 text-gray-400">
                      <tr>
                        <th className="px-6 py-5 border-b border-gray-200 font-bold uppercase tracking-[0.15em] text-[10px] w-16">No</th>
                        <th className="px-6 py-5 border-b border-gray-200 font-bold uppercase tracking-[0.15em] text-[10px]">Pertanyaan</th>
                        <th className="px-6 py-5 border-b border-gray-200 font-bold uppercase tracking-[0.15em] text-[10px] w-48">Jawaban</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {jiwaSederhanaQuestions.map((q, i) => (
                        <QuestionRow key={i} no={i + 1} question={q} defaultValue="Tidak" options={["Ya", "Tidak"]} />
                      ))}
                    </tbody>
                  </table>
                </div>
             </CollapsibleCard>

             <CollapsibleCard title="3. Pemeriksaan Kognitif">
                <div className="space-y-8">
                   <div className="space-y-4">
                      <h4 className="text-sm font-bold text-gray-900 uppercase tracking-widest">a. Mini Cog</h4>
                      <InputRow label="Menyebutkan 3 kata" defaultValue="Dapat menyebutkan 3 kata" isInput />
                   </div>
                   <div className="space-y-4 pt-6 border-t border-gray-50">
                      <h4 className="text-sm font-bold text-gray-900 uppercase tracking-widest">b. Clock drawing test</h4>
                      <div className="space-y-4">
                        <p className="text-sm text-gray-500 font-medium italic">Unggah hasil Clock Drawing Test pasien dalam format gambar (2:1 aspect ratio).</p>
                        <div className="relative group border-2 border-dashed border-gray-200 rounded-[24px] p-6 bg-white flex flex-col items-center justify-center min-h-[250px] hover:border-blue-300 hover:bg-blue-50/10 transition-all cursor-pointer">
                           <div className="w-full aspect-[2/1] relative overflow-hidden rounded-xl shadow-sm bg-gray-50 border border-gray-100">
                             <img 
                               src="https://i.ibb.co/LhygM4V/ecg-ref.png" 
                               alt="Clock Drawing" 
                               className="w-full h-full object-cover mix-blend-multiply opacity-80"
                               onError={(e) => { e.currentTarget.src = "https://img.freepik.com/free-vector/hand-drawn-clock-collection_23-2148168285.jpg"; }}
                             />
                           </div>
                           <div className="flex gap-2 mt-4">
                             <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-xs font-bold hover:bg-blue-700 transition-all flex items-center gap-2">
                               <RefreshCw size={14} /> Ganti Gambar
                             </button>
                             <button className="px-4 py-2 bg-white border border-red-200 text-red-600 rounded-lg text-xs font-bold hover:bg-red-50 transition-all">Hapus</button>
                           </div>
                        </div>
                      </div>
                   </div>
                   <div className="space-y-4 pt-6 border-t border-gray-50">
                      <h4 className="text-sm font-bold text-gray-900 uppercase tracking-widest">c. Menyebutkan Kembali 3 kata</h4>
                      <InputRow label="Recall 3 kata" defaultValue="Dapat menyebutkan 3 kata" isInput />
                   </div>
                </div>
             </CollapsibleCard>

             <CollapsibleCard title="4. Administrasi & Pengesahan">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                <div className="space-y-6">
                  <FormField label="Lokasi" defaultValue="Malang" />
                  <FormField label="Tanggal" defaultValue="21 Januari 2026" />
                  <FormField label="Dokter Penanggung Jawab MCU" defaultValue="dr. Cesro Maulana Sangka" />
                  <FormField label="SIP" defaultValue="503.2/96.1/KAB/DU/II/2022" />
                </div>
                <div className="space-y-10">
                   <ImageField label="Tanda Tangan Dokter" src="https://upload.wikimedia.org/wikipedia/commons/3/3a/Jon_Kirsch%27s_Signature.png" />
                   <ImageField label="Stempel Klinik/Perusahaan" src="https://img.freepik.com/premium-vector/original-stamp-red-circle-round-tag-rubber-sign-flat-style_662353-847.jpg" />
                </div>
              </div>
            </CollapsibleCard>
          </div>
        ) : activeTab === 'Audiometri' ? (
          <div className="max-w-5xl space-y-6 pb-24 mx-auto">
             <CollapsibleCard title="1. Grafik Audiometri">
                <div className="space-y-6">
                   <p className="text-sm text-gray-500 font-medium italic">Unggah hasil grafik Pure Tone Audiometry pasien (2:1 aspect ratio).</p>
                   <div className="grid grid-cols-1 gap-6">
                      <div className="relative group border-2 border-dashed border-gray-200 rounded-[24px] p-6 bg-white flex flex-col items-center justify-center min-h-[300px] hover:border-blue-300 hover:bg-blue-50/10 transition-all cursor-pointer">
                        <div className="w-full aspect-[2/1] relative overflow-hidden rounded-xl shadow-sm bg-gray-50 border border-gray-100">
                           <img 
                             src="https://i.ibb.co/LhygM4V/ecg-ref.png" 
                             alt="Audiometry Graph" 
                             className="w-full h-full object-cover mix-blend-multiply opacity-80"
                             onError={(e) => { e.currentTarget.src = "https://img.freepik.com/premium-vector/vector-pure-tone-audiogram-illustration_490813-1070.jpg"; }}
                           />
                        </div>
                        <div className="flex gap-2 mt-4">
                           <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-xs font-bold hover:bg-blue-700 transition-all flex items-center gap-2">
                             <RefreshCw size={14} /> Ganti Gambar
                           </button>
                           <button className="px-4 py-2 bg-white border border-red-200 text-red-600 rounded-lg text-xs font-bold hover:bg-red-50 transition-all">Hapus</button>
                        </div>
                      </div>
                   </div>
                </div>
             </CollapsibleCard>

             <CollapsibleCard title="2. Kesimpulan Audiometri">
                <div className="space-y-6">
                   <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                      <span className="text-sm text-gray-600 font-bold">Telinga Kanan</span>
                      <div className="md:col-span-2">
                        <input 
                          type="text" 
                          className="w-full p-3.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all shadow-sm" 
                          defaultValue="Normal 11.7 dB" 
                        />
                      </div>
                   </div>
                   <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                      <span className="text-sm text-gray-600 font-bold">Telinga Kiri</span>
                      <div className="md:col-span-2">
                        <input 
                          type="text" 
                          className="w-full p-3.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all shadow-sm" 
                          defaultValue="Normal 10 dB" 
                        />
                      </div>
                   </div>
                   <div className="pt-6 border-t border-gray-50">
                      <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-4">HASIL AKHIR BACAAN AUDIOMETRI</h4>
                      <textarea 
                        className="w-full min-h-[100px] p-4 border border-gray-200 rounded-xl text-sm font-bold text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all shadow-sm"
                        defaultValue="Telinga kanan: Normal 11.7 dB, Telinga kiri: Normal 10 dB"
                      />
                   </div>
                </div>
             </CollapsibleCard>

             <CollapsibleCard title="3. Administrasi & Pengesahan">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                <div className="space-y-6">
                  <FormField label="Lokasi" defaultValue="Malang" />
                  <FormField label="Tanggal" defaultValue="21 Januari 2026" />
                  <FormField label="Dokter Penanggung Jawab MCU" defaultValue="dr. Cesro Maulana Sangka" />
                  <FormField label="SIP" defaultValue="503.2/96.1/KAB/DU/II/2022" />
                </div>
                <div className="space-y-10">
                   <ImageField label="Tanda Tangan Dokter" src="https://upload.wikimedia.org/wikipedia/commons/3/3a/Jon_Kirsch%27s_Signature.png" />
                   <ImageField label="Stempel Klinik/Perusahaan" src="https://img.freepik.com/premium-vector/original-stamp-red-circle-round-tag-rubber-sign-flat-style_662353-847.jpg" />
                </div>
              </div>
            </CollapsibleCard>
          </div>
        ) : activeTab === 'Spirometri' ? (
          <div className="max-w-5xl space-y-6 pb-24 mx-auto">
             <CollapsibleCard title="1. Hasil Grafik Spirometri">
                <div className="space-y-6">
                   <p className="text-sm text-gray-500 font-medium italic">Unggah hasil grafik Spirometri pasien dalam format gambar (2:1 aspect ratio).</p>
                   <div className="grid grid-cols-1 gap-8">
                      <div className="relative group border-2 border-dashed border-gray-200 rounded-[24px] p-6 bg-white flex flex-col items-center justify-center min-h-[350px] hover:border-blue-300 hover:bg-blue-50/5 transition-all">
                        <div className="w-full max-w-2xl">
                          <div className="w-full aspect-[2/1] relative overflow-hidden rounded-xl shadow-sm border border-gray-100 bg-white">
                             <img 
                              src="https://i.ibb.co/LhygM4V/ecg-ref.png" 
                              alt="Spirometri Strip" 
                              className="w-full h-full object-cover mix-blend-multiply opacity-90"
                              onError={(e) => { e.currentTarget.src = "https://img.freepik.com/premium-vector/medical-illustration-electrocardiogram-result_1284-46903.jpg"; }}
                             />
                          </div>
                        </div>
                        
                        <div className="flex gap-3 mt-8">
                           <button className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-bold shadow-md hover:bg-blue-700 transition-all active:scale-95">
                             <RefreshCw size={18} /> Ganti Gambar
                           </button>
                           <button className="flex items-center gap-2 px-5 py-2.5 bg-white border border-red-200 text-red-600 rounded-xl text-sm font-bold shadow-sm hover:bg-red-50 transition-all active:scale-95">
                             <Trash2 size={18} /> Hapus
                           </button>
                        </div>
                      </div>

                      <button className="w-full py-5 border-2 border-dashed border-gray-200 rounded-2xl flex items-center justify-center gap-3 text-gray-500 font-bold hover:bg-gray-50 hover:border-blue-300 hover:text-blue-600 transition-all group">
                        <Plus size={20} className="group-hover:scale-110 transition-transform" /> Tambah Gambar Grafik Spirometri Lainnya
                      </button>
                   </div>
                </div>
             </CollapsibleCard>

             <CollapsibleCard title="2. Kesimpulan">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
                  <span className="text-sm text-gray-600 font-bold pt-4 leading-relaxed">Kesimpulan hasil pemeriksaan spirometri</span>
                  <div className="md:col-span-2">
                    <textarea 
                      className="w-full min-h-[120px] p-5 border border-gray-200 rounded-xl bg-white text-sm font-bold text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all shadow-sm leading-relaxed"
                      defaultValue="gangguan restriksi ringan"
                    />
                  </div>
                </div>
             </CollapsibleCard>

             <CollapsibleCard title="3. Administrasi & Pengesahan">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                <div className="space-y-6">
                  <FormField label="Lokasi" defaultValue="Malang" />
                  <FormField label="Tanggal" defaultValue="21 Januari 2026" />
                  <FormField label="Dokter Penanggung Jawab MCU" defaultValue="dr. Cesro Maulana Sangka" />
                  <FormField label="SIP" defaultValue="503.2/96.1/KAB/DU/II/2022" />
                </div>
                <div className="space-y-10">
                   <ImageField label="Tanda Tangan Dokter" src="https://upload.wikimedia.org/wikipedia/commons/3/3a/Jon_Kirsch%27s_Signature.png" />
                   <ImageField label="Stempel Klinik/Perusahaan" src="https://img.freepik.com/premium-vector/original-stamp-red-circle-round-tag-rubber-sign-flat-style_662353-847.jpg" />
                </div>
              </div>
            </CollapsibleCard>
          </div>
        ) : activeTab === 'Fitness Test' ? (
          <div className="max-w-5xl space-y-6 pb-24 mx-auto">
             <CollapsibleCard title="1. Hasil Pemeriksaan Fitness Test">
                <div className="overflow-hidden border border-gray-200 rounded-2xl bg-white shadow-sm">
                  <table className="w-full text-sm text-left border-separate border-spacing-0">
                    <thead className="bg-gray-50 text-gray-400">
                      <tr>
                        <th className="px-6 py-4 border-b border-gray-200 font-bold uppercase tracking-[0.15em] text-[10px] w-16">No</th>
                        <th className="px-6 py-4 border-b border-gray-200 font-bold uppercase tracking-[0.15em] text-[10px]">Item Pemeriksaan</th>
                        <th className="px-6 py-4 border-b border-gray-200 font-bold uppercase tracking-[0.15em] text-[10px]">Hasil</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      <FitnessRow no={1} label="Denyut jantung" defaultValue="140x / menit" />
                      <FitnessRow no={2} label="Kalori" defaultValue="40" />
                      <FitnessRow no={3} label="Speed" defaultValue="40" />
                      <FitnessRow no={4} label="Durasi" defaultValue="5 menit" />
                      <FitnessRow no={5} label="Kunci" defaultValue="5" />
                      <FitnessRow no={6} label="Jarak" defaultValue="2 km" />
                    </tbody>
                  </table>
                </div>
             </CollapsibleCard>

             <CollapsibleCard title="2. Kesimpulan">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
                  <span className="text-sm text-gray-600 font-bold pt-4 leading-relaxed">Kesimpulan Fitness Test</span>
                  <div className="md:col-span-2">
                    <textarea 
                      className="w-full min-h-[100px] p-5 border border-gray-200 rounded-xl bg-white text-sm font-bold text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all shadow-sm leading-relaxed"
                      defaultValue="Kesimpulan hasil pemeriksaan ECG (denyut jantung): Dalam batas normal"
                    />
                  </div>
                </div>
             </CollapsibleCard>

             <CollapsibleCard title="3. Administrasi & Pengesahan">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                <div className="space-y-6">
                  <FormField label="Lokasi" defaultValue="Malang" />
                  <FormField label="Tanggal" defaultValue="21 Januari 2026" />
                  <FormField label="Dokter Penanggung Jawab MCU" defaultValue="dr. Cesro Maulana Sangka" />
                  <FormField label="SIP" defaultValue="503.2/96.1/KAB/DU/II/2022" />
                </div>
                <div className="space-y-10">
                   <ImageField label="Tanda Tangan Dokter" src="https://upload.wikimedia.org/wikipedia/commons/3/3a/Jon_Kirsch%27s_Signature.png" />
                   <ImageField label="Stempel Klinik/Perusahaan" src="https://img.freepik.com/premium-vector/original-stamp-red-circle-round-tag-rubber-sign-flat-style_662353-847.jpg" />
                </div>
              </div>
            </CollapsibleCard>
          </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-gray-400 py-32 bg-white border border-dashed border-gray-200 rounded-[24px] mx-auto max-w-5xl">
            <RotateCcw className="mb-4 text-gray-300" size={48} />
            <p className="font-medium italic">Konten untuk tab "{activeTab}" sedang dalam pengembangan.</p>
          </div>
        )}
      </div>
    </div>
  );
};

// --- Helper Components for EditParticipantView ---

// CollapsibleCard handles sections that can be expanded or collapsed
const CollapsibleCard: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="bg-white border border-gray-200 rounded-[24px] overflow-hidden shadow-sm transition-all duration-300">
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className="px-8 py-5 flex items-center justify-between cursor-pointer hover:bg-gray-50/50 transition-colors"
      >
        <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest">{title}</h3>
        <div className={`p-1.5 rounded-lg bg-gray-50 text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
          <ChevronDown size={18} />
        </div>
      </div>
      <div className={`transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[2500px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
        <div className="px-8 pb-8 pt-2">
          {children}
        </div>
      </div>
    </div>
  );
};

// InputRow for single line label-value presentation or editing
const InputRow: React.FC<{ label: string; defaultValue?: string; isInput?: boolean }> = ({ label, defaultValue = "Normal", isInput }) => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center py-4 border-b border-gray-50 last:border-0">
    <span className="text-sm text-gray-600 font-bold">{label}</span>
    <div className="md:col-span-2">
      {isInput ? (
        <input 
          type="text" 
          defaultValue={defaultValue}
          className="w-full p-3 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 bg-white focus:ring-2 focus:ring-blue-100 outline-none transition-all shadow-sm"
        />
      ) : (
        <div className="text-sm font-bold text-gray-900 flex items-center gap-2">
           <span className={defaultValue === 'Normal' ? 'text-green-600' : 'text-gray-900'}>{defaultValue}</span>
        </div>
      )}
    </div>
  </div>
);

// FormField for administrative inputs
const FormField: React.FC<{ label: string; defaultValue: string }> = ({ label, defaultValue }) => (
  <div className="space-y-2">
    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{label}</label>
    <input 
      type="text" 
      defaultValue={defaultValue}
      className="w-full p-3.5 border border-gray-200 rounded-xl bg-white text-sm font-semibold text-gray-700 focus:ring-2 focus:ring-blue-100 transition-all outline-none"
    />
  </div>
);

// ImageField for displaying doctor signature or stamps
const ImageField: React.FC<{ label: string; src: string }> = ({ label, src }) => (
  <div className="space-y-4">
    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">{label}</label>
    <div className="p-6 bg-gray-50/50 border border-gray-100 rounded-2xl flex items-center justify-center min-h-[120px]">
      <img src={src} alt={label} className="max-h-24 object-contain mix-blend-multiply" />
    </div>
    <button className="text-[11px] font-bold text-blue-600 uppercase tracking-widest hover:text-blue-700 transition-colors flex items-center gap-2">
       <RefreshCw size={14} /> Ganti Gambar
    </button>
  </div>
);

// VitalSignRow for rows in the vital signs table
const VitalSignRow: React.FC<{ label: string; value: string; unit: string; normal: string }> = ({ label, value, unit, normal }) => (
  <tr className="hover:bg-gray-50/50 transition-colors">
    <td className="px-6 py-4 text-sm font-bold text-gray-900">{label}</td>
    <td className="px-6 py-4">
      <input type="text" defaultValue={value} className="w-24 p-2 border border-gray-200 rounded-lg text-sm font-bold text-center bg-white focus:ring-2 focus:ring-blue-100 outline-none" />
    </td>
    <td className="px-6 py-4 text-sm text-gray-500 font-medium">{unit}</td>
    <td className="px-6 py-4 text-xs text-gray-400 font-medium whitespace-pre-line">{normal}</td>
  </tr>
);

// LabResultRow for rows in the laboratory results tables
const LabResultRow: React.FC<{ label: string; value: string; unit: string; normal: string; isSubHeader?: boolean }> = ({ label, value, unit, normal, isSubHeader }) => (
  <tr className={`${isSubHeader ? 'bg-gray-50/80' : 'hover:bg-gray-50/50'} transition-colors`}>
    <td className={`px-6 py-4 text-sm ${isSubHeader ? 'font-bold text-blue-700 uppercase tracking-wider' : 'font-bold text-gray-900'}`}>{label}</td>
    <td className="px-6 py-4">
      {!isSubHeader && (
        <input 
          type="text" 
          defaultValue={value} 
          className="w-32 p-2 border border-gray-200 rounded-lg text-sm font-bold text-center bg-white focus:ring-2 focus:ring-blue-100 outline-none" 
        />
      )}
    </td>
    <td className="px-6 py-4 text-sm text-gray-500 font-medium">{!isSubHeader && unit}</td>
    <td className="px-6 py-4 text-xs text-gray-400 font-medium whitespace-pre-line">{!isSubHeader && normal}</td>
  </tr>
);

// QuestionRow for rows in the mental health questionnaire tables
const QuestionRow: React.FC<{ no: number; question: string; defaultValue: string; options: string[] }> = ({ no, question, defaultValue, options }) => (
  <tr className="hover:bg-gray-50/50 transition-colors">
    <td className="px-6 py-4 text-sm font-bold text-gray-400 text-center">{no}</td>
    <td className="px-6 py-4 text-sm font-bold text-gray-900 leading-relaxed">{question}</td>
    <td className="px-6 py-4">
      <select className="w-full p-2.5 border border-gray-200 rounded-xl text-sm font-bold text-gray-700 bg-white focus:ring-2 focus:ring-blue-100 outline-none cursor-pointer">
        {options.map(opt => (
          <option key={opt} value={opt} selected={opt === defaultValue}>{opt}</option>
        ))}
      </select>
    </td>
  </tr>
);

// Helper for Fitness Test Rows
const FitnessRow: React.FC<{ no: number; label: string; defaultValue: string }> = ({ no, label, defaultValue }) => (
  <tr className="hover:bg-gray-50/50 transition-colors">
    <td className="px-6 py-4 text-sm font-bold text-gray-400 text-center">{no}</td>
    <td className="px-6 py-4 text-sm font-bold text-gray-900">{label}</td>
    <td className="px-6 py-4">
      <div className="flex items-center gap-4">
        <span className="text-gray-400 font-bold">:</span>
        <input 
          type="text" 
          defaultValue={defaultValue} 
          className="flex-1 p-2 border border-gray-200 rounded-lg text-sm font-bold text-gray-700 bg-white focus:ring-2 focus:ring-blue-100 outline-none" 
        />
      </div>
    </td>
  </tr>
);
