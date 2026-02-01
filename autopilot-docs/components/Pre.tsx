'use client';

import { useState, useRef } from 'react';
import { Check, Copy } from 'lucide-react';

export function Pre({ children, ...props }: any) {
  const [copied, setCopied] = useState(false);
  const preRef = useRef<HTMLPreElement>(null);

  const onCopy = () => {
    if (preRef.current) {
      const text = preRef.current.textContent || '';
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="relative group not-prose mb-4">
      <pre
        ref={preRef}
        {...props}
        className="overflow-x-auto rounded-lg bg-gray-900 p-4 text-sm text-gray-50"
      >
        {children}
      </pre>
      <button
        onClick={onCopy}
        className="absolute top-2 right-2 p-2 rounded-md bg-gray-800 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gray-700 hover:text-white"
        aria-label="Copy code"
      >
        {copied ? <Check className="h-4 w-4 text-green-400" /> : <Copy className="h-4 w-4" />}
      </button>
    </div>
  );
}
