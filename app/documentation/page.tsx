"use client";

import React, { useState } from 'react';
import NavigationBar from '@/components/ui/Documentation/NavigationBar';
import {
  Pengantar,
  CaraPenggunaan,
  SensorWajah,
  SensorDokumen,
  SensorKendaraan,
  PrivasiKeamanan,
  Faq
} from '@/components/ui/Documentation/DocumentationContents';

export default function DocumentationPage() {
  // State untuk menyimpan menu mana yang sedang aktif diklik
  const [activeTab, setActiveTab] = useState('pengantar');

  // Fungsi untuk me-render komponen berdasarkan tab yang aktif
  const renderContent = () => {
    switch (activeTab) {
      case 'pengantar': return <Pengantar />;
      case 'penggunaan': return <CaraPenggunaan />;
      case 'wajah': return <SensorWajah />;
      case 'dokumen': return <SensorDokumen />;
      case 'kendaraan': return <SensorKendaraan />;
      case 'privasi': return <PrivasiKeamanan />;
      case 'faq': return <Faq />;
      default: return <Pengantar />;
    }
  };

  return (
    <div className="min-h-screen bg-black text-[#EAE8F0] flex pt-16">
      {/* Sidebar Navigation */}
      <NavigationBar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-12 max-w-4xl mx-auto">
        {renderContent()}
      </main>
    </div>
  );
}
