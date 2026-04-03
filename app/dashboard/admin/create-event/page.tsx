'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { AdminHeader } from '@/components/admin/header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AlertCircle, Plus, Trash2, ArrowLeft } from 'lucide-react';

export default function CreateEventPage() {
  const router = useRouter();
  const [eventName, setEventName] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [services, setServices] = useState([{ id: 1, name: '' }]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const addService = () => {
    const newId = Math.max(...services.map(s => s.id), 0) + 1;
    setServices([...services, { id: newId, name: '' }]);
  };

  const removeService = (id: number) => {
    setServices(services.filter(s => s.id !== id));
  };

  const updateService = (id: number, name: string) => {
    setServices(services.map(s => s.id === id ? { ...s, name } : s));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (!eventName || !eventDate) {
        setError('Please fill in all required fields');
        return;
      }

      if (services.some(s => !s.name)) {
        setError('Please fill in all service names');
        return;
      }

      // TODO: Submit to API
      router.push('/dashboard/admin');
    } catch (err) {
      setError('Failed to create event. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <AdminHeader 
        title="Create New Event"
        subtitle="Set up a new event and define counting services"
      />
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <Link href="/dashboard/admin" className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 mb-6">
            <ArrowLeft className="w-4 h-4" />
            Back to Events
          </Link>

          <Card className="max-w-2xl">
            <CardHeader>
              <CardTitle>Event Details</CardTitle>
              <CardDescription>Create a new event and define the services you want to count</CardDescription>
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
                  <Label htmlFor="eventName">Event Name *</Label>
                  <Input
                    id="eventName"
                    placeholder="e.g., Tech Conference 2024"
                    value={eventName}
                    onChange={(e) => setEventName(e.target.value)}
                    disabled={loading}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="eventDate">Event Date *</Label>
                  <Input
                    id="eventDate"
                    type="date"
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    disabled={loading}
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Counting Services</Label>
                      <p className="text-sm text-slate-600 mt-1">Define what you&apos;d like to count</p>
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="gap-2"
                      onClick={addService}
                      disabled={loading}
                    >
                      <Plus className="w-4 h-4" />
                      Add Service
                    </Button>
                  </div>

                  <div className="space-y-3">
                    {services.map((service) => (
                      <div key={service.id} className="flex gap-2">
                        <Input
                          placeholder="Service name (e.g., Attendance, Registration)"
                          value={service.name}
                          onChange={(e) => updateService(service.id, e.target.value)}
                          disabled={loading}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => removeService(service.id)}
                          disabled={services.length === 1 || loading}
                        >
                          <Trash2 className="w-4 h-4 text-red-600" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button
                    type="submit"
                    disabled={loading}
                    className="flex-1"
                  >
                    {loading ? 'Creating Event...' : 'Create Event'}
                  </Button>
                  <Link href="/dashboard/admin" className="flex-1">
                    <Button type="button" variant="outline" className="w-full">
                      Cancel
                    </Button>
                  </Link>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
