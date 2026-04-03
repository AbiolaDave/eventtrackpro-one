'use client';

import QRCode from 'react-qr-code';
import { Button } from '@/components/ui/button';
import { Download, Copy } from 'lucide-react';
import { useRef } from 'react';

interface QRDisplayProps {
  value: string;
  title: string;
  description?: string;
}

export function QRDisplay({ value, title, description }: QRDisplayProps) {
  const qrRef = useRef<HTMLDivElement>(null);

  const downloadQR = () => {
    if (!qrRef.current) return;

    const svg = qrRef.current.querySelector('svg');
    if (!svg) return;

    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/png');
      link.download = `${title}-qr.png`;
      link.click();
    };

    img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(value);
    alert('QR code value copied to clipboard!');
  };

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="bg-white p-8 rounded-lg border border-slate-200 shadow-sm">
        <div ref={qrRef}>
          <QRCode
            value={value}
            size={256}
            level="H"
            includeMargin={true}
          />
        </div>
      </div>

      <div className="text-center">
        <h3 className="font-semibold text-slate-900 mb-1">{title}</h3>
        {description && <p className="text-sm text-slate-600">{description}</p>}
      </div>

      <div className="flex gap-3">
        <Button
          onClick={downloadQR}
          className="gap-2"
        >
          <Download className="w-4 h-4" />
          Download QR Code
        </Button>
        <Button
          onClick={copyToClipboard}
          variant="outline"
          className="gap-2"
        >
          <Copy className="w-4 h-4" />
          Copy
        </Button>
      </div>
    </div>
  );
}
