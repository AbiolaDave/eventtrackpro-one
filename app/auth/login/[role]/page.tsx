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

export default function LoginPage() {
  const params = useParams();
  const role = params.role as string;
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const roleConfig = {
    admin: { name: 'Event Administrator', color: 'from-indigo-600 to-indigo-700' },
    coordinator: { name: 'Count Coordinator', color: 'from-purple-600 to-purple-700' },
    counter: { name: 'Counter', color: 'from-emerald-600 to-emerald-700' }
  };

  const config = roleConfig[role as keyof typeof roleConfig] || roleConfig.counter;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // TODO: Integrate with actual authentication API
      // For now, simulate successful login
      if (!email || !password) {
        setError('Please fill in all fields');
        return;
      }

      // Store role in session/local storage
      localStorage.setItem('userRole', role);
      localStorage.setItem('userEmail', email);

      // Redirect to dashboard
      router.push(`/dashboard/${role}`);
    } catch (err) {
      setError('Login failed. Please try again.');
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
            <CardTitle>Sign In as {config.name}</CardTitle>
            <CardDescription>
              Enter your credentials to access your {config.name} dashboard
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
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                />
              </div>

              <Button
                type="submit"
                className="w-full gap-2 group"
                disabled={loading}
              >
                {loading ? 'Signing in...' : 'Sign In'}
                {!loading && <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
              </Button>

              <div className="text-center text-sm">
                <span className="text-slate-600">Don&apos;t have an account? </span>
                <Link
                  href={`/auth/register/${role}`}
                  className="text-indigo-600 hover:text-indigo-700 font-semibold"
                >
                  Register here
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

        {/* Demo Credentials */}
        <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
          <p className="text-xs font-semibold text-amber-900 mb-2">Demo Credentials:</p>
          <p className="text-xs text-amber-800">
            Email: <code className="bg-amber-100 px-1.5 py-0.5 rounded">demo@example.com</code>
          </p>
          <p className="text-xs text-amber-800">
            Password: <code className="bg-amber-100 px-1.5 py-0.5 rounded">password123</code>
          </p>
        </div>
      </div>
    </main>
  );
}
