'use client';

import { User } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function AdminHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  const userEmail = typeof window !== 'undefined' ? localStorage.getItem('userEmail') || 'Admin User' : 'Admin User';

  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="px-8 py-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">{title}</h1>
          {subtitle && <p className="text-slate-600 mt-1">{subtitle}</p>}
        </div>
        <Button variant="ghost" size="sm" className="gap-2">
          <User className="w-4 h-4" />
          <span className="text-sm text-slate-600">{userEmail}</span>
        </Button>
      </div>
    </header>
  );
}
