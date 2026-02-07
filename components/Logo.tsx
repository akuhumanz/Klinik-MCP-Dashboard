import React from 'react';

export const Logo: React.FC = () => {
  return (
    <div className="flex items-center gap-2 mb-8 px-2 overflow-hidden shrink-0">
      <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
        <span className="text-white font-bold text-lg">M</span>
      </div>
      <span className="text-xl font-bold text-gray-900 tracking-tight">Mitra Prima Care</span>
    </div>
  );
};