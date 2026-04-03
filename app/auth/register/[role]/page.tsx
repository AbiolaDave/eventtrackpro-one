'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AlertCircle, BarChart3, ArrowRight } from 'lucide-react';
import { useParams } from 'next/navigation';

export default function RegisterPage() {
  const params = useParams();
  const role = params.role as string;
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const roleConfig = {
    admin: { name: 'Event Administrator', color: 'from-indigo-600 to-indigo-700' },
    coordinator: { name: 'Count Coordinator', color: 'from-purple-600 to-purple-700' },
    counter: { name: 'Counter', color: 'from-emerald-600 to-emerald-700' }
  };

  const config = roleConfig[role as keyof typeof roleConfig] || roleConfig.counter;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (!formData.fullName || !formData.email || !formData.password) {
        setError('Please fill in all fields');
        return;
      }

      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match');
        return;
      }

      if (formData.password.length < 8) {
        setError('Password must be at least 8 characters long');
        return;
      }

      // TODO: Integrate with actual registration API
      // Store role in session/local storage
      localStorage.setItem('userRole', role);
      localStorage.setItem('userEmail', formData.email);

      // Redirect to dashboard
      router.push(`/dashboard/${role}`);
    } catch (err) {
      setError('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <Link href="/" className="flex items-center justify-center gap-2 mb-8">
          <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
            <BarChart3 className="w-6 h-6 text-white" />
          </div>
          <span className="font-bold text-xl text-slate-900">EventTrackPro</span>
        </Link>

        {/* Card */}
        <Card>
          <CardHeader>
            <div className={`w-12 h-12 bg-gradient-to-br ${config.color} rounded-lg flex items-center justify-center mb-4`}>
              {role === 'admin' && <BarChart3 className="w-6 h-6 text-white" />}
              {role === 'coordinator' && <BarChart3 className="w-6 h-6 text-white" />}
              {role === 'counter' && <BarChart3 className="w-6 h-6 text-white" />}
            </div>
            <CardTitle>Create {config.name} Account</CardTitle>
            <CardDescription>
              Register your account to get started
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="flex items-center gap-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  name="fullName"
                  type="text"
                  placeholder="John Doe"
                  value={formData.fullName}
                  onChange={handleChange}
                  disabled={loading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={loading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  disabled={loading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  disabled={loading}
                />
              </div>

              <Button
                type="submit"
                className="w-full gap-2 group"
                disabled={loading}
              >
                {loading ? 'Creating account...' : 'Create Account'}
                {!loading && <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
              </Button>

              <div className="text-center text-sm">
                <span className="text-slate-600">Already have an account? </span>
                <Link
                  href={`/auth/login/${role}`}
                  className="text-indigo-600 hover:text-indigo-700 font-semibold"
                >
                  Sign in here
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="mt-6 text-center">
          <Link href="/select-role" className="text-sm text-slate-600 hover:text-slate-900">
            ← Back to role selection
          </Link>
        </div>
      </div>
    </main>
  );
}
