
import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Sidebar } from './components/Sidebar';
import { Table } from './components/Table';
import { UploadModal } from './components/UploadModal';
import { VerificationView } from './components/VerificationView';
import { NewSubmissionsView } from './components/NewSubmissionsView';
import { EditParticipantView } from './components/EditParticipantView';
import { MOCK_PERORANGAN, MOCK_PERUSAHAAN } from './constants';
import { InspectionResult, ActiveTab, Participant } from './types';
import { 
  Download, 
  Plus, 
  ChevronDown, 
  Search, 
  Calendar, 
  Filter,
  Check,
  FileSpreadsheet,
  UserPlus,
  Trash2
} from 'lucide-react';

export default function App() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState<ActiveTab>('perorangan');
  const [view, setView] = useState<'list' | 'verification' | 'new_submissions' | 'edit_participant'>('list');
  const [returnView, setReturnView] = useState<'verification' | 'new_submissions'>('verification');
  const [selectedParticipant, setSelectedParticipant] = useState<Participant | null>(null);
  const [selectedResult, setSelectedResult] = useState<string>('Semua Hasil');
  const [isResultDropdownOpen, setIsResultDropdownOpen] = useState(false);
  const [isAddDropdownOpen, setIsAddDropdownOpen] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [pendingData, setPendingData] = useState<Participant[]>([]);
  
  const [newSubmissionsInd] = useState<Participant[]>(MOCK_PERORANGAN.slice(0, 10));
  const [newSubmissionsCorp] = useState<Participant[]>(MOCK_PERUSAHAAN.slice(0, 35));

  const [sortKey, setSortKey] = useState<keyof Participant | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const resultDropdownRef = useRef<HTMLDivElement>(null);
  const addDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (resultDropdownRef.current && !resultDropdownRef.current.contains(event.target as Node)) {
        setIsResultDropdownOpen(false);
      }
      if (addDropdownRef.current && !addDropdownRef.current.contains(event.target as Node)) {
        setIsAddDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setSelectedIds([]);
    setSortKey(null);
  }, [activeTab, view]);

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
    const sourceData = activeTab === 'perorangan' ? MOCK_PERORANGAN : MOCK_PERUSAHAAN;
    
    let result = sourceData.filter(item => {
      if (selectedResult === 'Semua Hasil') return true;
      return item.result === selectedResult;
    });

    if (sortKey) {
      result = [...result].sort((a, b) => {
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
  }, [activeTab, selectedResult, sortKey, sortOrder]);

  const handleToggleSelect = (id: string) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleToggleSelectAll = () => {
    const currentPaginatedIds = processedData.slice(0, 10).map(item => item.id);
    if (currentPaginatedIds.every(id => selectedIds.includes(id))) {
      setSelectedIds(prev => prev.filter(id => !currentPaginatedIds.includes(id)));
    } else {
      setSelectedIds(prev => Array.from(new Set([...prev, ...currentPaginatedIds])));
    }
  };

  const handleUploadExcel = (file: File, type: ActiveTab) => {
    const mockNames = [
      'BAMBANG SUDARMONO', 'SITI NURHALIZA', 'ANTO KUSUMA', 'EKO PRASETYO', 'DEWI SARTIKA'
    ];
    
    const mockData = Array.from({ length: 15 }, (_, i) => ({
      id: `new-${i + 1}`,
      date: `30 Jan 2026`,
      time: `10:00 WIB`,
      name: mockNames[i % mockNames.length],
      userId: `USR-${5000 + i}`,
      subText: type === 'perorangan' ? `User ID : 239910${i}` : 'PT Mitra Sejahtera',
      company: type === 'perusahaan' ? 'PT Mitra Sejahtera' : undefined,
      mcuNo: `000299${300 + i}`,
      dob: '12 May 1990',
      gender: (i % 2 === 0 ? 'P' : 'L') as 'P' | 'L',
      result: (['Normal', 'Abnormal', 'Atensi', 'Kritis'] as const)[i % 4],
    }));

    setPendingData(mockData);
    setIsUploadModalOpen(false);
    setActiveTab(type);
    setSelectedIds([]); 
    setView('verification');
  };

  const handleProcessData = () => {
    setView('list');
    setPendingData([]);
    alert('Data berhasil diproses!');
  };

  const handleCancelData = () => {
    setView('list');
    setPendingData([]);
  };

  const handleEditParticipant = (participant: Participant, source: 'verification' | 'new_submissions') => {
    setSelectedParticipant(participant);
    setReturnView(source);
    setView('edit_participant');
  };

  const handleSaveEdit = () => {
    setView(returnView);
    setSelectedParticipant(null);
    alert('Perubahan berhasil disimpan!');
  };

  const handleCancelEdit = () => {
    setView(returnView);
    setSelectedParticipant(null);
  };

  const resultOptions: string[] = ['Semua Hasil', 'Normal', 'Abnormal', 'Atensi', 'Kritis'];

  return (
    <div className="h-screen bg-gray-50 flex font-sans text-gray-900 overflow-hidden">
      <Sidebar 
        isCollapsed={isSidebarCollapsed} 
        toggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)} 
        activeView={view === 'edit_participant' ? returnView : view}
        onViewChange={(v) => setView(v)}
        pendingCount={newSubmissionsInd.length + newSubmissionsCorp.length}
      />
      
      <main className={`flex-1 transition-all duration-300 w-full min-w-0 flex flex-col h-screen overflow-hidden ${isSidebarCollapsed ? 'lg:ml-20' : 'lg:ml-72'}`}>
        {view === 'list' ? (
          <>
            <div className="bg-white border-b border-gray-200 z-20 shrink-0 shadow-sm">
              <div className="p-8 pb-0">
                <div className="flex items-center gap-2 text-sm text-gray-400 mb-6 font-medium">
                  <span>Dashboard</span>
                  <span className="text-gray-300 font-normal">/</span>
                  <span>Medical Checkup</span>
                  <span className="text-gray-300 font-normal">/</span>
                  <span className="font-medium text-gray-900">Daftar Peserta</span>
                </div>

                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-8">
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-1">Daftar Peserta MCU</h1>
                    <p className="text-gray-500 text-sm font-medium">Lihat dan kelola data hasil pemeriksaan kesehatan peserta.</p>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 text-sm font-bold hover:bg-gray-50 transition-all shadow-sm">
                      <Download size={16} />
                      Export
                    </button>
                    
                    <div className="relative" ref={addDropdownRef}>
                      <button 
                        onClick={() => setIsAddDropdownOpen(!isAddDropdownOpen)}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 border border-transparent rounded-lg text-white text-sm font-bold hover:bg-blue-700 transition-all shadow-md"
                      >
                        <Plus size={18} />
                        Tambah Baru
                        <ChevronDown size={16} className={`transition-transform duration-200 ${isAddDropdownOpen ? 'rotate-180' : ''}`} />
                      </button>
                      
                      {isAddDropdownOpen && (
                        <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-100 py-1 z-50 overflow-hidden">
                          <button className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2 font-semibold">
                            <UserPlus size={16} className="text-gray-500" />
                            Tambah Satuan
                          </button>
                          <button 
                            onClick={() => {
                              setIsAddDropdownOpen(false);
                              setIsUploadModalOpen(true);
                            }}
                            className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2 font-semibold"
                          >
                            <FileSpreadsheet size={16} className="text-gray-500" />
                            Upload Excel (Bulk)
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex gap-8">
                  <button onClick={() => setActiveTab('perorangan')} className={`pb-4 text-sm transition-all ${activeTab === 'perorangan' ? 'border-b-2 border-blue-600 text-blue-600 font-bold' : 'text-gray-500 font-medium hover:text-gray-700'}`}>Perorangan</button>
                  <button onClick={() => setActiveTab('perusahaan')} className={`pb-4 text-sm transition-all ${activeTab === 'perusahaan' ? 'border-b-2 border-blue-600 text-blue-600 font-bold' : 'text-gray-500 font-medium hover:text-gray-700'}`}>Perusahaan</button>
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto px-8 py-8 space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="relative w-full md:w-96">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input type="text" placeholder="Cari Nama Peserta, No MCU atau User ID" className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-300 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-100 shadow-sm" />
                </div>
                <div className="flex items-center gap-3">
                  <button className="flex items-center gap-2 px-3 py-2.5 bg-white border border-gray-300 rounded-lg text-gray-700 text-sm font-bold hover:bg-gray-50 whitespace-nowrap shadow-sm"><Calendar size={16} />Tanggal</button>
                  <div className="relative" ref={resultDropdownRef}>
                    <button onClick={() => setIsResultDropdownOpen(!isResultDropdownOpen)} className="flex items-center gap-2 px-3 py-2.5 bg-white border border-gray-300 rounded-lg text-gray-700 text-sm font-bold hover:bg-gray-50 whitespace-nowrap shadow-sm">
                      {selectedResult === 'Semua Hasil' ? 'Hasil Pemeriksaan' : `Hasil: ${selectedResult}`}
                      <ChevronDown size={16} className={`text-gray-400 transition-transform duration-200 ${isResultDropdownOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {isResultDropdownOpen && (
                      <div className="absolute left-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-100 py-1 z-[60] overflow-hidden">
                        {resultOptions.map((option) => (
                          <button key={option} onClick={() => { setSelectedResult(option); setIsResultDropdownOpen(false); }} className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 flex items-center justify-between font-semibold">
                            <span>{option}</span>
                            {selectedResult === option && <Check size={14} className="text-blue-600" />}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  <button className="flex items-center gap-2 px-3 py-2.5 bg-white border border-gray-300 rounded-lg text-gray-700 text-sm font-bold hover:bg-gray-50 whitespace-nowrap shadow-sm"><Filter size={16} />Filters</button>
                </div>
              </div>
              <Table data={processedData} selectedIds={selectedIds} onToggleSelect={handleToggleSelect} onToggleSelectAll={handleToggleSelectAll} showCompany={activeTab === 'perusahaan'} sortKey={sortKey} sortOrder={sortOrder} onSort={handleSort} />
            </div>
          </>
        ) : view === 'verification' ? (
          <VerificationView 
            data={pendingData}
            onConfirm={handleProcessData}
            onCancel={handleCancelData}
            onEdit={(p) => handleEditParticipant(p, 'verification')}
            showCompany={activeTab === 'perusahaan'}
          />
        ) : view === 'new_submissions' ? (
          <NewSubmissionsView 
            indData={newSubmissionsInd}
            corpData={newSubmissionsCorp}
            onProcessAll={() => { alert('Semua data diproses!'); setView('list'); }}
            onEdit={(p) => handleEditParticipant(p, 'new_submissions')}
          />
        ) : (
          <EditParticipantView 
            participant={selectedParticipant}
            onSave={handleSaveEdit}
            onCancel={handleCancelEdit}
          />
        )}

        <UploadModal isOpen={isUploadModalOpen} onClose={() => setIsUploadModalOpen(false)} onUpload={handleUploadExcel} />
      </main>
    </div>
  );
}
