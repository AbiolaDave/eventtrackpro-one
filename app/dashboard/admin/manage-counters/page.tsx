'use client';

import Link from 'next/link';
import { AdminHeader } from '@/components/admin/header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Plus, Trash2, QrCode } from 'lucide-react';
import { useState } from 'react';

// Sample counters data
const sampleCounters = [
  {
    id: 1,
    name: 'John Smith',
    email: 'john@example.com',
    assignedEvents: ['Tech Conference 2024'],
    status: 'active',
    registeredDate: '2024-01-15',
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    assignedEvents: ['Tech Conference 2024', 'Annual Gala Dinner'],
    status: 'active',
    registeredDate: '2024-01-10',
  },
  {
    id: 3,
    name: 'Mike Davis',
    email: 'mike@example.com',
    assignedEvents: ['Tech Conference 2024'],
    status: 'inactive',
    registeredDate: '2024-02-01',
  },
];

export default function ManageCountersPage() {
  const [counters] = useState(sampleCounters);

  return (
    <>
      <AdminHeader 
        title="Manage Counters"
        subtitle="View and manage all counters in your organization"
      />
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <Link href="/dashboard/admin" className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 mb-6">
            <ArrowLeft className="w-4 h-4" />
            Back to Events
          </Link>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>All Counters</CardTitle>
                <CardDescription>Total: {counters.length} counters</CardDescription>
              </div>
              <Button className="gap-2">
                <Plus className="w-4 h-4" />
                Add Counter
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {counters.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-slate-600 mb-4">No counters yet</p>
                    <Button className="gap-2">
                      <Plus className="w-4 h-4" />
                      Add Your First Counter
                    </Button>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-slate-200">
                          <th className="text-left py-4 px-4 font-semibold text-slate-600">Name</th>
                          <th className="text-left py-4 px-4 font-semibold text-slate-600">Email</th>
                          <th className="text-left py-4 px-4 font-semibold text-slate-600">Events</th>
                          <th className="text-left py-4 px-4 font-semibold text-slate-600">Status</th>
                          <th className="text-left py-4 px-4 font-semibold text-slate-600">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {counters.map((counter) => (
                          <tr key={counter.id} className="border-b border-slate-200 hover:bg-slate-50">
                            <td className="py-4 px-4">
                              <div>
                                <p className="font-semibold text-slate-900">{counter.name}</p>
                                <p className="text-xs text-slate-600">Registered: {new Date(counter.registeredDate).toLocaleDateString()}</p>
                              </div>
                            </td>
                            <td className="py-4 px-4 text-slate-600">{counter.email}</td>
                            <td className="py-4 px-4">
                              <div className="flex flex-wrap gap-1">
                                {counter.assignedEvents.map((event) => (
                                  <Badge key={event} variant="outline" className="text-xs">
                                    {event}
                                  </Badge>
                                ))}
                              </div>
                            </td>
                            <td className="py-4 px-4">
                              <Badge 
                                variant={counter.status === 'active' ? 'default' : 'outline'}
                                className="capitalize"
                              >
                                {counter.status}
                              </Badge>
                            </td>
                            <td className="py-4 px-4">
                              <div className="flex items-center gap-2">
                                <Button variant="ghost" size="sm" className="gap-1">
                                  <QrCode className="w-4 h-4" />
                                  QR
                                </Button>
                                <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
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
