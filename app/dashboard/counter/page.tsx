'use client';

import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BarChart3, CheckCircle, Clock, AlertCircle, QrCode } from 'lucide-react';
import { useState } from 'react';

// Sample events
const sampleEvents = [
  {
    id: 1,
    name: 'Tech Conference 2024',
    date: 'March 15, 2024',
    status: 'active',
  },
  {
    id: 2,
    name: 'Annual Gala Dinner',
    date: 'March 20, 2024',
    status: 'active',
  },
];

// Sample submissions
const sampleSubmissions = [
  {
    id: 1,
    event: 'Tech Conference 2024',
    count: 125,
    status: 'approved',
    submittedAt: '2 hours ago',
  },
  {
    id: 2,
    event: 'Annual Gala Dinner',
    count: 85,
    status: 'pending',
    submittedAt: '30 minutes ago',
  },
];

export default function CounterDashboard() {
  const [events] = useState(sampleEvents);
  const [submissions] = useState(sampleSubmissions);

  const stats = [
    {
      label: 'Submissions Approved',
      value: submissions.filter(s => s.status === 'approved').length,
      icon: CheckCircle,
      color: 'text-emerald-600'
    },
    {
      label: 'Pending Review',
      value: submissions.filter(s => s.status === 'pending').length,
      icon: Clock,
      color: 'text-amber-600'
    },
    {
      label: 'Total Submitted',
      value: submissions.length,
      icon: BarChart3,
      color: 'text-indigo-600'
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Counter Dashboard</h1>
              <p className="text-slate-600 mt-1">Submit and track your counts</p>
            </div>
            <Button variant="outline" onClick={() => {
              localStorage.removeItem('userRole');
              localStorage.removeItem('userEmail');
              window.location.href = '/';
            }}>
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-8 py-8">
        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.label}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0">
                  <CardTitle className="text-sm font-medium text-slate-600">
                    {stat.label}
                  </CardTitle>
                  <Icon className={`w-5 h-5 ${stat.color}`} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-slate-900">{stat.value}</div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <Link href="/dashboard/counter/my-qr">
            <Card className="bg-gradient-to-br from-purple-50 to-indigo-50 border-purple-200 hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-slate-900">Your Counter QR Code</h3>
                    <p className="text-sm text-slate-600">View and download your unique QR code</p>
                  </div>
                  <QrCode className="w-8 h-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Available Events */}
        <div className="mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Active Events</CardTitle>
              <CardDescription>Available events for submission</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {events.map((event) => (
                  <Link key={event.id} href={`/dashboard/counter/submit/${event.id}`}>
                    <div className="p-4 border border-slate-200 rounded-lg hover:bg-slate-50 hover:border-indigo-300 transition-colors cursor-pointer">
                      <h3 className="font-semibold text-slate-900">{event.name}</h3>
                      <p className="text-sm text-slate-600 mb-3">{event.date}</p>
                      <Button size="sm" variant="outline" className="w-full">
                        Submit Count
                      </Button>
                    </div>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Submissions History */}
        <Card>
          <CardHeader>
            <CardTitle>Submission History</CardTitle>
            <CardDescription>Your submitted counts and their status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {submissions.length === 0 ? (
                <p className="text-slate-600 text-center py-8">No submissions yet</p>
              ) : (
                <div className="space-y-3">
                  {submissions.map((submission) => (
                    <div key={submission.id} className="flex items-center justify-between p-4 border border-slate-200 rounded-lg">
                      <div className="flex-1">
                        <h3 className="font-semibold text-slate-900">{submission.event}</h3>
                        <p className="text-sm text-slate-600">{submission.submittedAt}</p>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="text-right">
                          <p className="text-sm font-bold text-slate-900">{submission.count}</p>
                          <p className="text-xs text-slate-600">Count</p>
                        </div>
                        <Badge
                          variant={submission.status === 'approved' ? 'default' : 'outline'}
                        >
                          {submission.status === 'pending' ? (
                            <div className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              Pending
                            </div>
                          ) : (
                            <div className="flex items-center gap-1">
                              <CheckCircle className="w-3 h-3" />
                              Approved
                            </div>
                          )}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
