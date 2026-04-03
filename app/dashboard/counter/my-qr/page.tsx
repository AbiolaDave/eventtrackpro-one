'use client';

import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { QRDisplay } from '@/components/qr/qr-display';
import { ArrowLeft, Info } from 'lucide-react';

export default function MyQRPage() {
  const userEmail = typeof window !== 'undefined' ? localStorage.getItem('userEmail') || 'counter@example.com' : 'counter@example.com';
  const counterId = typeof window !== 'undefined' ? localStorage.getItem('counterId') || 'CTR-' + Math.random().toString(36).substr(2, 9).toUpperCase() : 'CTR-12345678';

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link href="/dashboard/counter" className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 mb-6">
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Link>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Your Counter QR Code</CardTitle>
            <CardDescription>Use this QR code to identify yourself at events</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center py-8">
              <QRDisplay
                value={`COUNTER:${counterId}:${userEmail}`}
                title={`Counter ID: ${counterId}`}
                description="Present this QR code to get registered at events"
              />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-blue-50 border-blue-200">
          <CardHeader>
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <CardTitle className="text-blue-900">How to Use Your QR Code</CardTitle>
              </div>
            </div>
          </CardHeader>
          <CardContent className="text-sm text-blue-800 space-y-3">
            <div>
              <p className="font-semibold mb-1">1. Save Your QR Code</p>
              <p>Download your QR code and save it to your phone or print it out.</p>
            </div>
            <div>
              <p className="font-semibold mb-1">2. Present at Event Check-in</p>
              <p>When you arrive at an event, present this QR code to the administrator or event staff.</p>
            </div>
            <div>
              <p className="font-semibold mb-1">3. Get Assigned to Event</p>
              <p>The administrator will scan your code and assign you as a counter for the event.</p>
            </div>
            <div>
              <p className="font-semibold mb-1">4. Start Counting</p>
              <p>Once assigned, you&apos;ll be able to submit counts through the dashboard.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
