import { codeToHtml } from 'shiki';
import { CopyButton } from './copy-button';
import { FileIcon } from 'lucide-react';

interface CodeBlockProps {
  code: string;
  language: string;
  filename?: string;
}

export async function CodeBlock({ code, language, filename }: CodeBlockProps) {
  const html = await codeToHtml(code, {
    lang: language,
    theme: 'github-dark-dimmed',
  });

  return (
    <div className="rounded-xl overflow-hidden bg-[#161b22] border border-white/5 shadow-lg flex flex-col">
      {filename && (
        <>
          <div className="flex items-center justify-between gap-2 px-3 sm:px-4 py-3 bg-[#0d1117] border-b border-white/5">
            <span className="flex items-center gap-2 text-sm text-zinc-400 font-medium min-w-0 truncate">
              <FileIcon className="w-4 h-4 shrink-0" />
              <span className="truncate">{filename}</span>
            </span>
            <div className="shrink-0">
              <CopyButton text={code} />
            </div>
          </div>
        </>
      )}
      <div className="relative group">
        {!filename && (
          <div className="absolute top-3 right-3 flex items-center gap-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
            <span className="text-xs font-sans text-zinc-500 font-medium px-2 py-1 bg-white/5 rounded-md">{language}</span>
            <CopyButton text={code} />
          </div>
        )}
        <div 
          className="p-5 sm:p-6 text-[13.5px] leading-relaxed font-mono [&>pre]:!bg-transparent [&>pre]:!m-0 overflow-x-auto"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    </div>
  );
}
