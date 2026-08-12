import React from 'react';
import { Metadata } from 'next';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { codeToHtml } from 'shiki';
import { FileIcon } from 'lucide-react';
import { CopyButton } from '@/components/ui/copy-button';

export const metadata: Metadata = {
  title: 'Referensi API | Dokumentasi Veil',
};

export default async function Page() {
  const jsonCode = `{
  "image_base64": "/9j/4AAQSkZJRgABAQEASABIAAD...",
  "regions": [
    {
      "type": "face",
      "value": "Face Detected (0.95)",
      "box": {
        "x": 120,
        "y": 45,
        "width": 200,
        "height": 150
      }
    }
  ]
}`;

  const highlightedJson = await codeToHtml(jsonCode, {
    lang: 'json',
    theme: 'github-dark-dimmed',
  });

  return (
    <div className="max-w-4xl space-y-10">
      <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-zinc-100">
        Referensi API
      </h1>
      
      <p className="text-lg leading-8 text-zinc-400">
        Endpoint REST API utama untuk memproses gambar dan mendeteksi data sensitif.
      </p>

      <div className="mt-16 space-y-10">
        <div>
          <div className="flex items-center gap-4 mb-10">
            <span className="text-xs font-bold text-[#09090b] bg-emerald-400 px-3 py-1 rounded-full uppercase tracking-widest">POST</span>
            <code className="text-lg md:text-xl text-zinc-100 font-mono tracking-tight">/api/extract</code>
          </div>
          
          <p className="text-lg text-zinc-400 mb-10">
            Menerima image payload dengan format form-data. Endpoint merespons dengan array koordinat area sensor.
          </p>

          <div className="rounded-xl overflow-hidden bg-[#161b22] border border-white/5 shadow-lg">
            <Tabs defaultValue="request" className="w-full">
              <div className="flex items-center justify-between flex-wrap gap-2 px-4 py-3 bg-[#0d1117] border-b border-white/5">
                <span className="flex items-center gap-2 text-sm text-zinc-400 font-medium">
                  <FileIcon className="w-4 h-4" />
                  Payload API
                </span>
                <div className="flex items-center gap-3">
                  <TabsList className="bg-transparent gap-2 h-auto p-0">
                    <TabsTrigger 
                      value="request" 
                      className="!rounded-full px-4 py-1 text-xs font-semibold data-[state=active]:!bg-zinc-100 data-[state=active]:!text-zinc-900 !text-zinc-500 border border-transparent data-[state=inactive]:hover:!text-zinc-300"
                    >
                      Request
                    </TabsTrigger>
                    <TabsTrigger 
                      value="response" 
                      className="!rounded-full px-4 py-1 text-xs font-semibold data-[state=active]:!bg-zinc-100 data-[state=active]:!text-zinc-900 !text-zinc-500 border border-transparent data-[state=inactive]:hover:!text-zinc-300"
                    >
                      Response
                    </TabsTrigger>
                  </TabsList>
                  <div className="w-[1px] h-4 bg-zinc-800" />
                  <CopyButton text={jsonCode} />
                </div>
              </div>

              <TabsContent value="request" className="p-0 m-0 border-none outline-none">
                <div className="p-5 sm:p-6 bg-[#161b22]">
                  <div className="flex items-center gap-3 mb-3">
                    <code className="text-base text-purple-400">file</code>
                    <span className="text-xs px-2.5 py-1 rounded-md border border-zinc-700 text-zinc-400 bg-zinc-800/50 font-medium">Diperlukan</span>
                  </div>
                  <p className="text-base text-zinc-400">File gambar yang akan diproses oleh AI.</p>
                </div>
              </TabsContent>

              <TabsContent value="response" className="p-0 m-0 border-none outline-none">
                <div 
                  className="p-5 sm:p-6 text-[13.5px] leading-relaxed font-mono [&>pre]:!bg-transparent [&>pre]:!m-0 overflow-x-auto bg-[#161b22]"
                  dangerouslySetInnerHTML={{ __html: highlightedJson }}
                />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
