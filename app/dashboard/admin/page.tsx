'use client';

import Link from 'next/link';
import { AdminHeader } from '@/components/admin/header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, Calendar, Users, TrendingUp } from 'lucide-react';
import { useState } from 'react';

// Sample event data
const sampleEvents = [
  {
    id: 1,
    name: 'Tech Conference 2024',
    date: 'March 15, 2024',
    status: 'active',
    counters: 8,
    submissions: 45,
  },
  {
    id: 2,
    name: 'Annual Gala Dinner',
    date: 'March 20, 2024',
    status: 'active',
    counters: 5,
    submissions: 32,
  },
  {
    id: 3,
    name: 'Community Workshop',
    date: 'March 10, 2024',
    status: 'completed',
    counters: 3,
    submissions: 28,
  },
];

export default function AdminDashboard() {
  const [events] = useState(sampleEvents);

  const stats = [
    {
      label: 'Total Events',
      value: events.length,
      icon: Calendar,
      color: 'text-indigo-600'
    },
    {
      label: 'Active Counters',
      value: events.reduce((sum, e) => sum + e.counters, 0),
      icon: Users,
      color: 'text-purple-600'
    },
    {
      label: 'Submissions',
      value: events.reduce((sum, e) => sum + e.submissions, 0),
      icon: TrendingUp,
      color: 'text-emerald-600'
    },
  ];

  return (
    <>
      <AdminHeader 
        title="Events Dashboard"
        subtitle="Manage and monitor all events"
      />
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          {/* Stats Grid */}
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

          {/* Events List */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Your Events</CardTitle>
                <CardDescription>Manage your events and view submissions</CardDescription>
              </div>
              <Link href="/dashboard/admin/create-event">
                <Button className="gap-2">
                  <Plus className="w-4 h-4" />
                  Create Event
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {events.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-slate-600 mb-4">No events yet</p>
                    <Link href="/dashboard/admin/create-event">
                      <Button>Create Your First Event</Button>
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {events.map((event) => (
                      <Link key={event.id} href={`/dashboard/admin/event/${event.id}`}>
                        <div className="flex items-center justify-between p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
                          <div className="flex-1">
                            <h3 className="font-semibold text-slate-900">{event.name}</h3>
                            <p className="text-sm text-slate-600">{event.date}</p>
                          </div>
                          <div className="flex items-center gap-6">
                            <div className="text-right">
                              <p className="text-sm font-medium text-slate-900">{event.counters}</p>
                              <p className="text-xs text-slate-600">Counters</p>
                            </div>
                            <div className="text-right">
                              <p className="text-sm font-medium text-slate-900">{event.submissions}</p>
                              <p className="text-xs text-slate-600">Submissions</p>
                            </div>
                            <Badge 
                              variant={event.status === 'active' ? 'default' : 'outline'}
                              className="capitalize"
                            >
                              {event.status}
                            </Badge>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
