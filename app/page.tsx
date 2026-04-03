import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, Users, CheckCircle, Zap } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Navigation */}
      <nav className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <span className="font-bold text-xl text-slate-900">EventTrackPro</span>
            </div>
            <Link href="/select-role">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h1 className="text-5xl sm:text-6xl font-bold text-slate-900 mb-6 text-balance">
            Track Every Event with{" "}
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Precision
            </span>
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-8 text-balance">
            Professional event tracking and counting platform designed for seamless collaboration between administrators, coordinators, and counters.
          </p>
          <Link href="/select-role">
            <Button size="lg" className="gap-2">
              Start Tracking Now
              <Zap className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <Card>
            <CardHeader>
              <BarChart3 className="w-8 h-8 text-indigo-600 mb-2" />
              <CardTitle>Event Management</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Create and manage events with ease using our intuitive admin dashboard.
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Users className="w-8 h-8 text-purple-600 mb-2" />
              <CardTitle>Role-Based Access</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Separate workflows for admins, coordinators, and counters with permission controls.
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CheckCircle className="w-8 h-8 text-emerald-600 mb-2" />
              <CardTitle>Count Approval</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Review and approve count submissions with built-in validation and tracking.
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Zap className="w-8 h-8 text-amber-600 mb-2" />
              <CardTitle>Real-Time Updates</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Instant feedback and status updates across all user roles and devices.
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        {/* How It Works */}
        <div className="bg-white rounded-xl border border-slate-200 p-8 mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold text-lg mx-auto mb-4">
                1
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">Admin Creates Event</h3>
              <p className="text-slate-600">
                Set up events, define counting services, and assign coordinators through the admin dashboard.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-lg mx-auto mb-4">
                2
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">Coordinator Manages Counters</h3>
              <p className="text-slate-600">
                Monitor counter activity, assign roles with QR codes, and review submissions.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-emerald-600 text-white rounded-full flex items-center justify-center font-bold text-lg mx-auto mb-4">
                3
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">Counters Submit Counts</h3>
              <p className="text-slate-600">
                Record attendance and counts in real-time, get instant feedback and approvals.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 py-16">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 text-balance">
            Ready to streamline your event tracking?
          </h2>
          <p className="text-indigo-100 mb-8 text-lg">
            Join organizations using EventTrackPro to manage their events efficiently.
          </p>
          <Link href="/select-role">
            <Button size="lg" variant="secondary">
              Get Started Today
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-white" />
              </div>
              <span className="font-semibold text-white">EventTrackPro</span>
            </div>
            <p className="text-sm">© 2024 EventTrackPro. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
