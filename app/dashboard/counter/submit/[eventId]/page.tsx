'use client';

import { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AlertCircle, ArrowLeft, Check } from 'lucide-react';

export default function CountSubmissionPage() {
  const params = useParams();
  const eventId = params.eventId;
  const router = useRouter();
  const [count, setCount] = useState('');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (!count || parseInt(count) < 0) {
        setError('Please enter a valid count');
        return;
      }

      // TODO: Submit to API
      setSubmitted(true);
      
      // Redirect after 2 seconds
      setTimeout(() => {
        router.push('/dashboard/counter');
      }, 2000);
    } catch (err) {
      setError('Failed to submit count. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-emerald-600" />
            </div>
            <CardTitle>Count Submitted</CardTitle>
            <CardDescription>Your count has been submitted for review</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-sm text-slate-600 mb-6">
              Redirecting to dashboard...
            </p>
            <Link href="/dashboard/counter">
              <Button variant="outline" className="w-full">
                Back to Dashboard
              </Button>
            </Link>
          </CardContent>
        </Card>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <Link href="/dashboard/counter" className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 mb-6">
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Link>

        <Card>
          <CardHeader>
            <CardTitle>Submit Count</CardTitle>
            <CardDescription>Enter your attendance count for this event</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="flex items-center gap-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="count">Attendance Count</Label>
                <Input
                  id="count"
                  type="number"
                  inputMode="numeric"
                  placeholder="Enter total count"
                  value={count}
                  onChange={(e) => setCount(e.target.value)}
                  disabled={loading}
                  min="0"
                  step="1"
                />
                <p className="text-xs text-slate-600">Enter the total number of attendees</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Additional Notes (Optional)</Label>
                <textarea
                  id="notes"
                  className="flex h-24 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                  placeholder="Any additional details about your count..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  disabled={loading}
                />
              </div>

              <div className="flex gap-4">
                <Button
                  type="submit"
                  disabled={loading || !count}
                  className="flex-1"
                >
                  {loading ? 'Submitting...' : 'Submit Count'}
                </Button>
                <Link href="/dashboard/counter" className="flex-1">
                  <Button type="button" variant="outline" className="w-full">
                    Cancel
                  </Button>
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Info Box */}
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h3 className="font-semibold text-blue-900 mb-2">Before you submit:</h3>
          <ul className="text-sm text-blue-800 space-y-1 list-disc list-inside">
            <li>Make sure your count is accurate</li>
            <li>Double-check the number before submitting</li>
            <li>You can add notes if you&apos;d like to explain your count</li>
          </ul>
        </div>
      </div>
    </main>
  );
}
