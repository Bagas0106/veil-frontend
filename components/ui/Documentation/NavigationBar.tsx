"use client";

import React from 'react';

const menuGroups = [
  {
    title: "Memulai",
    items: [
      { id: "pengantar", label: "Pengantar" },
      { id: "penggunaan", label: "Cara Penggunaan" },
    ]
  },
  {
    title: "Fitur",
    items: [
      { id: "wajah", label: "Sensor Wajah" },
      { id: "dokumen", label: "Sensor Dokumen" },
      { id: "kendaraan", label: "Sensor Kendaraan" },
    ]
  },
  {
    title: "Lainnya",
    items: [
      { id: "privasi", label: "Privasi & Keamanan" },
      { id: "faq", label: "FAQ" },
    ]
  }
];

interface NavigationBarProps {
  activeTab: string;
  setActiveTab: (id: string) => void;
}

export default function NavigationBar({ activeTab, setActiveTab }: NavigationBarProps) {
  return (
    <aside className="w-64 border-r border-[#333] hidden md:block p-8">
      <nav className="space-y-8">
        {menuGroups.map((group, index) => (
          <div key={index}>
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">
              {group.title}
            </h3>
            <div className="space-y-4 text-sm pl-4">
              {group.items.map((item) => {
                const isActive = activeTab === item.id;
                return (
                  <div key={item.id}>
                    <button 
                      onClick={() => setActiveTab(item.id)}
                      className={`text-left w-full transition ${
                        isActive 
                          ? 'text-[#DE8AFF] font-medium text-base' 
                          : 'text-gray-400 hover:text-white text-base'
                      }`}
                    >
                      {item.label}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </nav>
    </aside>
  );
}
