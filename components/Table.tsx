import React, { useState } from 'react';
import { Eye, Download, Check, Minus, ArrowUpDown, ChevronUp, ChevronDown } from 'lucide-react';
import { Participant, InspectionResult } from '../types';

interface TableProps {
  data: Participant[];
  selectedIds: string[];
  onToggleSelect: (id: string) => void;
  onToggleSelectAll: () => void;
  showCompany?: boolean;
  sortKey: keyof Participant | null;
  sortOrder: 'asc' | 'desc';
  onSort: (key: keyof Participant) => void;
}

export const Table: React.FC<TableProps> = ({ 
  data, 
  selectedIds, 
  onToggleSelect, 
  onToggleSelectAll, 
  showCompany,
  sortKey,
  sortOrder,
  onSort
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.max(1, Math.ceil(data.length / itemsPerPage));
  const paginatedData = data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const isAllSelected = paginatedData.length > 0 && paginatedData.every(item => selectedIds.includes(item.id));
  const isIndeterminate = paginatedData.some(item => selectedIds.includes(item.id)) && !isAllSelected;

  const SortIcon = ({ columnKey }: { columnKey: keyof Participant }) => {
    if (sortKey !== columnKey) return <ArrowUpDown size={14} className="text-gray-300 group-hover:text-gray-400 transition-colors" />;
    return sortOrder === 'asc' 
      ? <ChevronUp size={14} className="text-blue-600" /> 
      : <ChevronDown size={14} className="text-blue-600" />;
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm mb-24 flex flex-col">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-separate border-spacing-0 table-auto min-w-max">
          <thead>
            <tr className="bg-gray-50 text-[10px] font-bold text-gray-400 uppercase tracking-[0.15em]">
              <th className="px-4 py-5 w-14 border-b border-gray-200 text-center">
                <div className="flex justify-center">
                  <CustomCheckbox 
                    checked={isAllSelected}
                    indeterminate={isIndeterminate}
                    onChange={onToggleSelectAll}
                  />
                </div>
              </th>
              <th 
                className="px-4 py-5 border-b border-gray-200 cursor-pointer group transition-colors hover:bg-gray-100/50"
                onClick={() => onSort('date')}
              >
                <div className="flex items-center gap-1.5">
                  Tgl. Periksa <SortIcon columnKey="date" />
                </div>
              </th>
              <th 
                className="px-4 py-5 border-b border-gray-200 cursor-pointer group transition-colors hover:bg-gray-100/50"
                onClick={() => onSort('name')}
              >
                <div className="flex items-center gap-1.5">
                  Nama <SortIcon columnKey="name" />
                </div>
              </th>
              {showCompany && (
                <th 
                  className="px-4 py-5 border-b border-gray-200 cursor-pointer group transition-colors hover:bg-gray-100/50"
                  onClick={() => onSort('company')}
                >
                  <div className="flex items-center gap-1.5">
                    Perusahaan <SortIcon columnKey="company" />
                  </div>
                </th>
              )}
              <th 
                className="px-4 py-5 border-b border-gray-200 cursor-pointer group transition-colors hover:bg-gray-100/50"
                onClick={() => onSort('mcuNo')}
              >
                <div className="flex items-center gap-1.5">
                  No MCU <SortIcon columnKey="mcuNo" />
                </div>
              </th>
              <th className="px-4 py-5 border-b border-gray-200">Tgl. Lahir</th>
              <th className="px-4 py-5 border-b border-gray-200">Gender</th>
              <th 
                className="px-4 py-5 border-b border-gray-200 w-40 text-left cursor-pointer group transition-colors hover:bg-gray-100/50"
                onClick={() => onSort('result')}
              >
                <div className="flex items-center justify-start gap-1.5">
                  Hasil <SortIcon columnKey="result" />
                </div>
              </th>
              <th className="px-4 py-5 text-right pr-8 border-b border-gray-200">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {paginatedData.map((item) => {
               const isSelected = selectedIds.includes(item.id);
               return (
                <tr key={item.id} className={`hover:bg-gray-50/50 ${isSelected ? 'bg-blue-50/40' : ''}`}>
                  <td className="px-4 py-4 text-center">
                    <div className="flex justify-center">
                      <CustomCheckbox 
                        checked={isSelected} 
                        onChange={() => onToggleSelect(item.id)} 
                      />
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div className="font-bold">{item.date}</div>
                    <div className="text-[11px] text-gray-500">{item.time}</div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="text-sm font-bold text-gray-900 uppercase">{item.name}</div>
                    <div className="text-[11px] text-gray-500">{item.subText}</div>
                  </td>
                  {showCompany && (
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700 font-bold uppercase">
                      {item.company}
                    </td>
                  )}
                  <td className="px-4 py-4 text-sm text-gray-600 font-medium whitespace-nowrap">{item.mcuNo}</td>
                  <td className="px-4 py-4 text-sm text-gray-600 font-medium whitespace-nowrap">{item.dob}</td>
                  <td className="px-4 py-4 text-center">
                      <span className={`inline-flex items-center justify-center w-7 h-7 rounded-md text-[10px] font-bold ${item.gender === 'P' ? 'bg-lime-100 text-lime-700' : 'bg-blue-100 text-blue-700'}`}>
                          {item.gender}
                      </span>
                  </td>
                  <td className="px-4 py-4 text-left">
                    <StatusBadge status={item.result} />
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-right pr-8">
                    <div className="flex items-center justify-end gap-2">
                      <ActionWithTooltip icon={<Eye size={18} />} label="Lihat Detail" />
                      <ActionWithTooltip icon={<Download size={18} />} label="Download PDF" />
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      
      <div className="px-4 py-5 border-t border-gray-100 flex items-center justify-between bg-white rounded-b-xl">
        <div className="text-sm text-gray-600 font-medium">Halaman {currentPage} dari {totalPages}</div>
        <div className="flex items-center gap-1.5">
            <button 
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 disabled:opacity-50 shadow-sm transition-colors"
            >
                Previous
            </button>
            
            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-9 h-9 flex items-center justify-center rounded-xl text-sm font-medium transition-all ${
                    currentPage === page 
                      ? 'bg-blue-600 text-white shadow-md' 
                      : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 shadow-sm'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>

            <button 
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 disabled:opacity-50 shadow-sm transition-colors"
            >
                Next
            </button>
        </div>
      </div>
    </div>
  );
};

const ActionWithTooltip: React.FC<{ icon: React.ReactNode; label: string }> = ({ icon, label }) => (
  <div className="group relative flex items-center justify-center">
    <button className="text-gray-400 hover:text-blue-600 transition-all p-2 rounded-lg hover:bg-blue-50/50 active:scale-90">
      {icon}
    </button>
    <div className="absolute bottom-full mb-2 hidden group-hover:flex flex-col items-center z-[100] pointer-events-none drop-shadow-lg left-1/2 -translate-x-1/2">
      <div className="bg-black text-white text-[10px] py-1.5 px-3 rounded-md whitespace-nowrap font-bold tracking-wide animate-in fade-in zoom-in-95 duration-100">
        {label}
      </div>
      <div className="w-2.5 h-2.5 bg-black rotate-45 -mt-1.5"></div>
    </div>
  </div>
);

const CustomCheckbox: React.FC<{ checked?: boolean; indeterminate?: boolean; onChange: () => void }> = ({ checked, indeterminate, onChange }) => (
  <div 
    onClick={(e) => { e.stopPropagation(); onChange(); }}
    className={`w-5 h-5 rounded-md border cursor-pointer flex items-center justify-center transition-all ${checked || indeterminate ? 'bg-blue-600 border-blue-600' : 'bg-white border-gray-300 hover:border-blue-400'}`}
  >
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
    <span className={`inline-flex items-center px-2 py-1 rounded-md text-[9px] font-bold border uppercase tracking-wider ${styles}`}>
      {status}
    </span>
  );
};