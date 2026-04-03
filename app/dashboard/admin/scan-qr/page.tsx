'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { AdminHeader } from '@/components/admin/header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, CheckCircle, AlertCircle } from 'lucide-react';
import { useState as useManualState } from 'react';

export default function ScanQRPage() {
  const [scannedData, setScannedData] = useState<string>('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [manualInput, setManualInput] = useState('');
  const qrScannerRef = useRef<HTMLDivElement>(null);
  const [isScanning, setIsScanning] = useState(true);

  useEffect(() => {
    if (!isScanning || !qrScannerRef.current) return;

    const scanner = new Html5QrcodeScanner(
      'qr-scanner',
      {
        fps: 10,
        qiderbug: false,
        aspectRatio: 1,
      },
      false
    );

    const onScanSuccess = (decodedText: string) => {
      setScannedData(decodedText);
      setSuccess(`Counter detected: ${decodedText}`);
      setError('');
      scanner.clear();
      setIsScanning(false);
    };

    const onScanError = (error: any) => {
      // Ignore scanning errors
    };

    scanner.render(onScanSuccess, onScanError);

    return () => {
      scanner.clear();
    };
  }, [isScanning]);

  const handleManualInput = () => {
    if (!manualInput.trim()) {
      setError('Please enter a counter ID');
      return;
    }
    setScannedData(manualInput);
    setSuccess(`Counter ID entered: ${manualInput}`);
    setError('');
  };

  const resetScanner = () => {
    setScannedData('');
    setSuccess('');
    setManualInput('');
    setIsScanning(true);
  };

  return (
    <>
      <AdminHeader 
        title="Scan Counter QR Code"
        subtitle="Scan or manually enter a counter&apos;s QR code to register them"
      />
      <div className="flex-1 overflow-auto">
        <div className="p-8 max-w-2xl">
          <Link href="/dashboard/admin" className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 mb-6">
            <ArrowLeft className="w-4 h-4" />
            Back to Events
          </Link>

          {!scannedData ? (
            <Card>
              <CardHeader>
                <CardTitle>Scan Counter QR Code</CardTitle>
                <CardDescription>Use your device camera to scan the counter&apos;s QR code</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div id="qr-scanner" ref={qrScannerRef} className="w-full rounded-lg overflow-hidden" />

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-slate-300" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-slate-600">Or enter manually</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder="Enter counter ID (e.g., COUNTER:CTR-12345678:email@example.com)"
                    value={manualInput}
                    onChange={(e) => setManualInput(e.target.value)}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                  />
                  <Button onClick={handleManualInput} className="w-full">
                    Register Counter
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-6 h-6 text-emerald-600" />
                  <div>
                    <CardTitle>Counter Registered</CardTitle>
                    <CardDescription>{success}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
                  <p className="text-sm font-mono text-slate-700 break-all">{scannedData}</p>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h3 className="font-semibold text-blue-900 mb-2">Next Steps</h3>
                  <ol className="text-sm text-blue-800 space-y-2 list-decimal list-inside">
                    <li>Assign this counter to one or more events</li>
                    <li>Provide them with the event details</li>
                    <li>They can start submitting counts</li>
                  </ol>
                </div>

                <Button onClick={resetScanner} className="w-full" variant="outline">
                  Scan Another Counter
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </>
  );
}
