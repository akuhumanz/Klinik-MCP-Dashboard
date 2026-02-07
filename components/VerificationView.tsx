import React, { useState, useMemo } from 'react';
import { Participant, InspectionResult } from '../types';
import { Check, Minus, Settings, Pencil, Trash2, ArrowUpDown, ChevronUp, ChevronDown, AlertTriangle, X } from 'lucide-react';

interface VerificationViewProps {
  data: Participant[];
  onConfirm: () => void;
  onCancel: () => void;
  onEdit: (participant: Participant) => void;
  showCompany?: boolean;
}

export const VerificationView: React.FC<VerificationViewProps> = ({ data, onConfirm, onCancel, onEdit, showCompany }) => {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const itemsPerPage = 10;
  
  const [sortKey, setSortKey] = useState<keyof Participant | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const handleSort = (key: keyof Participant) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortOrder('asc');
    }
  };

  const parseDate = (d: string) => {
    const parts = d.split(' ');
    const months: Record<string, number> = { Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5, Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11 };
    return new Date(parseInt(parts[2]), months[parts[1]], parseInt(parts[0])).getTime();
  };

  const processedData = useMemo(() => {
    let result = [...data];
    if (sortKey) {
      result.sort((a, b) => {
        let valA: any = a[sortKey];
        let valB: any = b[sortKey];
        if (sortKey === 'date') {
          valA = parseDate(a.date);
          valB = parseDate(b.date);
        }
        if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
        if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
        return 0;
      });
    }
    return result;
  }, [data, sortKey, sortOrder]);

  const totalPages = Math.max(1, Math.ceil(processedData.length / itemsPerPage));
  const paginatedData = processedData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const isAllSelected = paginatedData.length > 0 && paginatedData.every(item => selectedIds.includes(item.id));
  const isIndeterminate = paginatedData.some(item => selectedIds.includes(item.id)) && !isAllSelected;

  const onToggleSelect = (id: string) => {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const onToggleSelectAll = () => {
    const ids = paginatedData.map(d => d.id);
    if (isAllSelected) setSelectedIds(prev => prev.filter(id => !ids.includes(id)));
    else setSelectedIds(prev => Array.from(new Set([...prev, ...ids])));
  };

  const SortIcon = ({ columnKey }: { columnKey: keyof Participant }) => {
    if (sortKey !== columnKey) return <ArrowUpDown size={14} className="text-gray-300 group-hover:text-gray-400" />;
    return sortOrder === 'asc' 
      ? <ChevronUp size={14} className="text-blue-600" /> 
      : <ChevronDown size={14} className="text-blue-600" />;
  };

  return (
    <div className="h-full flex flex-col animate-in fade-in duration-500 overflow-hidden bg-gray-50">
      <div className="bg-white border-b border-gray-200 z-20 shrink-0 shadow-sm">
        <div className="p-8 pb-8">
          <div className="flex items-center gap-2 text-sm text-gray-400 mb-6 font-medium">
            <span>Dashboard</span>
            <span className="text-gray-300 font-normal">/</span>
            <span>Medical Checkup</span>
            <span className="text-gray-300 font-normal">/</span>
            <span className="font-medium text-gray-900">Verifikasi Data</span>
          </div>
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-1">Verifikasi Data</h1>
              <p className="text-gray-500 text-sm font-medium">Pastikan data yang anda upload sudah benar.</p>
            </div>
            <div className="flex items-center gap-3">
              <button onClick={() => setIsCancelModalOpen(true)} className="px-6 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 text-sm font-bold shadow-sm hover:bg-gray-50 transition-all active:scale-95">Batalkan Data</button>
              <button onClick={onConfirm} className="px-8 py-2 bg-blue-600 text-white rounded-lg text-sm font-bold shadow-md hover:bg-blue-700 transition-all active:scale-95">Proses Data</button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 px-8 py-8 overflow-y-auto">
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm flex flex-col overflow-hidden mb-24">
          <table className="w-full text-left border-separate border-spacing-0 table-auto min-w-max">
            <thead>
              <tr className="bg-gray-50 text-[10px] font-bold text-gray-400 uppercase tracking-[0.15em]">
                <th className="px-4 py-5 w-14 border-b border-gray-200 text-center"><div className="flex justify-center"><CustomCheckbox checked={isAllSelected} indeterminate={isIndeterminate} onChange={onToggleSelectAll} /></div></th>
                <th className="px-4 py-5 border-b border-gray-200 cursor-pointer group hover:bg-gray-100/50 transition-colors" onClick={() => handleSort('date')}><div className="flex items-center gap-1.5">Tgl. Periksa <SortIcon columnKey="date" /></div></th>
                <th className="px-4 py-5 border-b border-gray-200 cursor-pointer group hover:bg-gray-100/50 transition-colors" onClick={() => handleSort('name')}><div className="flex items-center gap-1.5">Nama <SortIcon columnKey="name" /></div></th>
                {showCompany && <th className="px-4 py-5 border-b border-gray-200 cursor-pointer group hover:bg-gray-100/50 transition-colors" onClick={() => handleSort('company')}><div className="flex items-center gap-1.5">Perusahaan <SortIcon columnKey="company" /></div></th>}
                <th className="px-4 py-5 border-b border-gray-200 cursor-pointer group hover:bg-gray-100/50 transition-colors" onClick={() => handleSort('mcuNo')}><div className="flex items-center gap-1.5">No MCU <SortIcon columnKey="mcuNo" /></div></th>
                <th className="px-4 py-5 border-b border-gray-200">Tgl. Lahir</th>
                <th className="px-4 py-5 border-b border-gray-200 text-center">Gender</th>
                <th className="px-4 py-5 border-b border-gray-200 cursor-pointer group hover:bg-gray-100/50 transition-colors" onClick={() => handleSort('result')}><div className="flex items-center justify-start gap-1.5">Hasil <SortIcon columnKey="result" /></div></th>
                <th className="px-4 py-5 text-right pr-8 border-b border-gray-200">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {paginatedData.map((item) => {
                const isSelected = selectedIds.includes(item.id);
                return (
                  <tr key={item.id} className={`${isSelected ? 'bg-blue-50/20' : 'hover:bg-gray-50/30'}`}>
                    <td className="px-4 py-4 text-center"><div className="flex justify-center"><CustomCheckbox checked={isSelected} onChange={() => onToggleSelect(item.id)} /></div></td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                      <div className="font-bold">{item.date}</div>
                      <div className="text-[11px] text-gray-500">{item.time}</div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="text-sm font-bold uppercase text-gray-900 leading-tight">{item.name}</div>
                      <div className="text-[11px] text-gray-500 font-medium">No. KTP : 357288399000{item.id.slice(-1)}</div>
                    </td>
                    {showCompany && <td className="px-4 py-4 text-sm font-bold uppercase text-gray-700">{item.company || 'Pribadi'}</td>}
                    <td className="px-4 py-4 text-sm font-bold text-gray-900">{item.mcuNo}</td>
                    <td className="px-4 py-4 text-sm text-gray-600 font-medium">{item.dob}</td>
                    <td className="px-4 py-4 text-center"><span className={`inline-flex items-center justify-center w-7 h-7 rounded-md text-[10px] font-bold ${item.gender === 'P' ? 'bg-lime-50 text-lime-600' : 'bg-blue-50 text-blue-600'}`}>{item.gender}</span></td>
                    <td className="px-4 py-4 text-left"><StatusBadge status={item.result} /></td>
                    <td className="px-4 py-4 text-right pr-8 whitespace-nowrap">
                      <div className="flex items-center justify-end gap-2">
                        <ActionWithTooltip icon={<Settings size={18} />} label="Proses Data" />
                        <ActionWithTooltip icon={<Pencil size={18} />} label="Edit Data" onClick={() => onEdit(item)} />
                        <ActionWithTooltip icon={<Trash2 size={18} />} label="Hapus" isDelete />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="px-4 py-5 border-t border-gray-100 flex items-center justify-between bg-white rounded-b-xl">
            <div className="text-sm text-gray-600 font-medium">Halaman {currentPage} dari {totalPages}</div>
            <div className="flex items-center gap-1.5">
                <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} className="px-4 py-2 border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 disabled:opacity-50 transition-colors shadow-sm">Previous</button>
                <div className="flex items-center gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button key={page} onClick={() => setCurrentPage(page)} className={`w-9 h-9 flex items-center justify-center rounded-xl text-sm font-medium transition-all ${currentPage === page ? 'bg-blue-600 text-white shadow-md' : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 shadow-sm'}`}>{page}</button>
                  ))}
                </div>
                <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="px-4 py-2 border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 disabled:opacity-50 transition-colors shadow-sm">Next</button>
            </div>
          </div>
        </div>
      </div>

      {isCancelModalOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300" onClick={() => setIsCancelModalOpen(false)} />
          <div className="relative bg-white w-full max-w-md rounded-3xl shadow-2xl p-8 animate-in zoom-in-95 duration-300">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mb-6"><AlertTriangle className="text-red-600" size={32} /></div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">Batalkan Unggah Data?</h2>
              <p className="text-gray-500 text-sm mb-8">Data yang sudah anda unggah akan dihapus dan tidak akan diproses ke dalam sistem.</p>
              <div className="flex flex-col w-full gap-3">
                <button onClick={() => { setIsCancelModalOpen(false); onCancel(); }} className="w-full py-3.5 bg-red-600 text-white rounded-xl text-sm font-bold shadow-md hover:bg-red-700 transition-all active:scale-95">Ya, Batalkan Data</button>
                <button onClick={() => setIsCancelModalOpen(false)} className="w-full py-3.5 bg-white border border-gray-200 text-gray-700 rounded-xl text-sm font-bold hover:bg-gray-50 transition-all active:scale-95">Kembali</button>
              </div>
            </div>
            <button onClick={() => setIsCancelModalOpen(false)} className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors"><X size={20} /></button>
          </div>
        </div>
      )}
    </div>
  );
};

const ActionWithTooltip: React.FC<{ icon: React.ReactNode; label: string; isDelete?: boolean; onClick?: () => void }> = ({ icon, label, isDelete, onClick }) => (
  <div className="group relative flex items-center justify-center">
    <button onClick={onClick} className={`transition-all p-2 rounded-lg active:scale-90 ${isDelete ? 'text-gray-400 hover:text-red-600 hover:bg-red-50/50' : 'text-gray-400 hover:text-blue-600 hover:bg-blue-50/50'}`}>
      {icon}
    </button>
    <div className="absolute bottom-full mb-2 hidden group-hover:flex flex-col items-center z-[100] pointer-events-none drop-shadow-lg left-1/2 -translate-x-1/2">
      <div className="bg-black text-white text-[10px] py-1.5 px-3 rounded-md whitespace-nowrap font-bold tracking-wide animate-in fade-in zoom-in-95 duration-100">{label}</div>
      <div className="w-2.5 h-2.5 bg-black rotate-45 -mt-1.5"></div>
    </div>
  </div>
);

const CustomCheckbox: React.FC<{ checked?: boolean; indeterminate?: boolean; onChange: () => void }> = ({ checked, indeterminate, onChange }) => (
  <div onClick={(e) => { e.stopPropagation(); onChange(); }} className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all cursor-pointer ${checked || indeterminate ? 'bg-blue-600 border-blue-600' : 'bg-white border-gray-300 hover:border-blue-400'}`}>
    {checked && <Check size={14} className="text-white" strokeWidth={4} />}
    {indeterminate && !checked && <Minus size={14} className="text-white" strokeWidth={4} />}
  </div>
);

const StatusBadge: React.FC<{ status: InspectionResult }> = ({ status }) => {
  const styles = {
    'Normal': 'bg-green-50 text-green-600 border-green-100',
    'Abnormal': 'bg-orange-50 text-orange-600 border-orange-100',
    'Atensi': 'bg-pink-50 text-pink-600 border-pink-100',
    'Kritis': 'bg-red-50 text-red-600 border-red-100'
  }[status];
  return (
    <span className={`inline-flex items-center px-2 py-1 rounded-md text-[9px] font-bold border uppercase tracking-wider ${styles}`}>{status}</span>
  );
};