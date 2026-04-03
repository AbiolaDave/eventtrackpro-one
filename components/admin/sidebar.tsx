'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BarChart3, Plus, Settings, LogOut, QrCode } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

export function AdminSidebar() {
  const pathname = usePathname();

  const navItems = [
    { href: '/dashboard/admin', label: 'Events', icon: BarChart3 },
    { href: '/dashboard/admin/create-event', label: 'Create Event', icon: Plus },
    { href: '/dashboard/admin/manage-counters', label: 'Manage Counters', icon: Settings },
    { href: '/dashboard/admin/scan-qr', label: 'Scan Counter QR', icon: QrCode },
  ];

  return (
    <aside className="w-64 border-r border-slate-200 bg-slate-50 flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-slate-200">
        <Link href="/dashboard/admin" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
            <BarChart3 className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-slate-900">EventTrackPro</span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link key={item.href} href={item.href}>
              <button
                className={cn(
                  'w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-indigo-100 text-indigo-700'
                    : 'text-slate-700 hover:bg-slate-100'
                )}
              >
                <Icon className="w-5 h-5" />
                {item.label}
              </button>
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-slate-200">
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 text-slate-700"
          onClick={() => {
            localStorage.removeItem('userRole');
            localStorage.removeItem('userEmail');
            window.location.href = '/';
          }}
        >
          <LogOut className="w-5 h-5" />
          Sign Out
        </Button>
      </div>
    </aside>
  );
}
