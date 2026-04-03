'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { AdminHeader } from '@/components/admin/header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Download, QrCode, Users } from 'lucide-react';
import { useState } from 'react';

// Sample event and counters data
const eventData = {
  1: {
    name: 'Tech Conference 2024',
    date: '2024-03-15',
    status: 'active',
    description: 'Annual technology conference with multiple counting services',
    services: ['Registration', 'Attendance', 'Booth Visits'],
  },
  2: {
    name: 'Annual Gala Dinner',
    date: '2024-03-20',
    status: 'active',
    description: 'Evening gala event',
    services: ['Attendance', 'VIP Count'],
  },
};

const countersData = {
  1: [
    { id: 1, name: 'John Smith', qrCode: 'https://via.placeholder.com/150?text=QR1', status: 'active' },
    { id: 2, name: 'Sarah Johnson', qrCode: 'https://via.placeholder.com/150?text=QR2', status: 'active' },
    { id: 3, name: 'Mike Davis', qrCode: 'https://via.placeholder.com/150?text=QR3', status: 'inactive' },
  ],
};

const submissionsData = {
  1: [
    { id: 1, counter: 'John Smith', service: 'Registration', count: 125, status: 'approved' },
    { id: 2, counter: 'Sarah Johnson', service: 'Attendance', count: 98, status: 'approved' },
    { id: 3, counter: 'Mike Davis', service: 'Booth Visits', count: 45, status: 'pending' },
  ],
};

export default function EventDetailPage() {
  const params = useParams();
  const eventId = params.id as string;
  const event = (eventData as any)[eventId];
  const counters = (countersData as any)[eventId] || [];
  const submissions = (submissionsData as any)[eventId] || [];

  if (!event) {
    return (
      <>
        <AdminHeader title="Event Not Found" />
        <div className="flex-1 flex items-center justify-center">
          <Card className="max-w-md">
            <CardHeader>
              <CardTitle>Event Not Found</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600 mb-4">The event you&apos;re looking for doesn&apos;t exist.</p>
              <Link href="/dashboard/admin">
                <Button variant="outline" className="w-full">Back to Events</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </>
    );
  }

  return (
    <>
      <AdminHeader 
        title={event.name}
        subtitle={event.description}
      />
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <Link href="/dashboard/admin" className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 mb-6">
            <ArrowLeft className="w-4 h-4" />
            Back to Events
          </Link>

          {/* Event Overview */}
          <Card className="mb-8">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Event Details</CardTitle>
                <CardDescription>View and manage event information</CardDescription>
              </div>
              <Badge variant={event.status === 'active' ? 'default' : 'outline'} className="capitalize">
                {event.status}
              </Badge>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-sm font-semibold text-slate-600 mb-2">Date</h3>
                  <p className="text-lg text-slate-900">{new Date(event.date).toLocaleDateString()}</p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-slate-600 mb-2">Services</h3>
                  <div className="flex flex-wrap gap-2">
                    {event.services.map((service: string) => (
                      <Badge key={service} variant="outline">{service}</Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Counters */}
          <Card className="mb-8">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Assigned Counters</CardTitle>
                <CardDescription>Manage counters and view QR codes</CardDescription>
              </div>
              <Button className="gap-2">
                <Users className="w-4 h-4" />
                Add Counter
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {counters.length === 0 ? (
                  <p className="text-slate-600 text-center py-8">No counters assigned yet</p>
                ) : (
                  <div className="space-y-3">
                    {counters.map((counter: any) => (
                      <div key={counter.id} className="flex items-center justify-between p-4 border border-slate-200 rounded-lg">
                        <div>
                          <h3 className="font-semibold text-slate-900">{counter.name}</h3>
                          <p className="text-sm text-slate-600">Counter ID: {counter.id}</p>
                        </div>
                        <div className="flex items-center gap-4">
                          <Badge variant={counter.status === 'active' ? 'default' : 'outline'} className="capitalize">
                            {counter.status}
                          </Badge>
                          <Button variant="outline" size="sm" className="gap-2">
                            <QrCode className="w-4 h-4" />
                            QR Code
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Submissions */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Submissions</CardTitle>
                <CardDescription>Review count submissions from counters</CardDescription>
              </div>
              <Button variant="outline" className="gap-2">
                <Download className="w-4 h-4" />
                Export Report
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {submissions.length === 0 ? (
                  <p className="text-slate-600 text-center py-8">No submissions yet</p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-slate-200">
                          <th className="text-left py-3 px-4 font-semibold text-slate-600">Counter</th>
                          <th className="text-left py-3 px-4 font-semibold text-slate-600">Service</th>
                          <th className="text-left py-3 px-4 font-semibold text-slate-600">Count</th>
                          <th className="text-left py-3 px-4 font-semibold text-slate-600">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {submissions.map((submission: any) => (
                          <tr key={submission.id} className="border-b border-slate-200 hover:bg-slate-50">
                            <td className="py-3 px-4 text-slate-900">{submission.counter}</td>
                            <td className="py-3 px-4 text-slate-900">{submission.service}</td>
                            <td className="py-3 px-4 font-bold text-slate-900">{submission.count}</td>
                            <td className="py-3 px-4">
                              <Badge variant={submission.status === 'approved' ? 'default' : 'outline'} className="capitalize">
                                {submission.status}
                              </Badge>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
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
