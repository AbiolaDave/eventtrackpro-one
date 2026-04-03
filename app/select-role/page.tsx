'use client';

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Users, CheckSquare, ArrowRight } from "lucide-react";

const roles = [
  {
    id: "admin",
    name: "Event Administrator",
    description: "Create events, assign counters, manage the overall counting operation",
    icon: Shield,
    features: [
      "Create and manage events",
      "Assign roles and QR codes",
      "Review all submissions",
      "Generate reports"
    ],
    color: "from-indigo-600 to-indigo-700",
    href: "/auth/login/admin"
  },
  {
    id: "coordinator",
    name: "Count Coordinator",
    description: "Manage counters, review submissions, and approve counts",
    icon: Users,
    features: [
      "Monitor counter activity",
      "Review submissions",
      "Approve or reject counts",
      "Track coordination progress"
    ],
    color: "from-purple-600 to-purple-700",
    href: "/auth/login/coordinator"
  },
  {
    id: "counter",
    name: "Counter",
    description: "Submit attendance and count data for coordinator review",
    icon: CheckSquare,
    features: [
      "Submit counts in real-time",
      "Track submission status",
      "View event details",
      "Get instant feedback"
    ],
    color: "from-emerald-600 to-emerald-700",
    href: "/auth/login/counter"
  }
];

export default function SelectRole() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="border-b border-slate-200 bg-white sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/" className="text-slate-600 hover:text-slate-900 text-sm font-medium">
            ← Back to Home
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4 text-balance">
            Choose Your Role
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto text-balance">
            Select your role to access the appropriate dashboard and workflow for your responsibilities.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {roles.map((role) => {
            const Icon = role.icon;
            return (
              <Card key={role.id} className="flex flex-col hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className={`w-12 h-12 bg-gradient-to-br ${role.color} rounded-lg flex items-center justify-center mb-4`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-xl">{role.name}</CardTitle>
                  <CardDescription>{role.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col">
                  <div className="mb-6 flex-1">
                    <p className="text-sm font-semibold text-slate-700 mb-3">Key Features:</p>
                    <ul className="space-y-2">
                      {role.features.map((feature, idx) => (
                        <li key={idx} className="text-sm text-slate-600 flex items-start gap-2">
                          <span className="text-emerald-600 mt-1">✓</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Link href={role.href} className="w-full">
                    <Button className="w-full gap-2 group">
                      Select Role
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="mt-16 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="font-semibold text-blue-900 mb-2">Need Help Choosing?</h3>
          <p className="text-blue-800 text-sm">
            Each role has a specific set of responsibilities and features. Select the role that matches your responsibilities in the event.
          </p>
        </div>
      </div>
    </main>
  );
}
