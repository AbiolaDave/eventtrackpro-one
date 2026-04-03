'use client';

import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BarChart3, Users, CheckCircle, Clock } from 'lucide-react';
import { useState } from 'react';

// Sample submission data
const sampleSubmissions = [
  {
    id: 1,
    counter: 'John Smith',
    event: 'Tech Conference 2024',
    count: 125,
    status: 'pending',
    timestamp: '2 hours ago',
  },
  {
    id: 2,
    counter: 'Sarah Johnson',
    event: 'Tech Conference 2024',
    count: 98,
    status: 'approved',
    timestamp: '1 hour ago',
  },
  {
    id: 3,
    counter: 'Mike Davis',
    event: 'Annual Gala Dinner',
    count: 85,
    status: 'pending',
    timestamp: '30 minutes ago',
  },
];

export default function CoordinatorDashboard() {
  const [submissions] = useState(sampleSubmissions);

  const stats = [
    {
      label: 'Pending Reviews',
      value: submissions.filter(s => s.status === 'pending').length,
      icon: Clock,
      color: 'text-amber-600'
    },
    {
      label: 'Approved',
      value: submissions.filter(s => s.status === 'approved').length,
      icon: CheckCircle,
      color: 'text-emerald-600'
    },
    {
      label: 'Total Submissions',
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
              <h1 className="text-3xl font-bold text-slate-900">Coordinator Dashboard</h1>
              <p className="text-slate-600 mt-1">Review and approve count submissions</p>
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

        {/* Submissions */}
        <Card>
          <CardHeader>
            <CardTitle>Pending Submissions</CardTitle>
            <CardDescription>Review and approve submissions from your counters</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {submissions.length === 0 ? (
                <p className="text-slate-600 text-center py-8">No submissions yet</p>
              ) : (
                <div className="space-y-3">
                  {submissions.map((submission) => (
                    <div key={submission.id} className="flex items-center justify-between p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
                      <div className="flex-1">
                        <h3 className="font-semibold text-slate-900">{submission.counter}</h3>
                        <p className="text-sm text-slate-600">{submission.event}</p>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="text-right">
                          <p className="text-sm font-bold text-slate-900">{submission.count}</p>
                          <p className="text-xs text-slate-600">Count</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-slate-600">{submission.timestamp}</p>
                        </div>
                        <Badge
                          variant={submission.status === 'approved' ? 'default' : 'outline'}
                        >
                          {submission.status === 'pending' ? 'Pending' : 'Approved'}
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
