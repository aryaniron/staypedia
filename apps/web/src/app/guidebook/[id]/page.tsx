'use client';

import { useState } from 'react';
import Link from 'next/link';
import { HostProfilesTab } from './HostProfilesTab';

type Tab = 'home' | 'essentials' | 'dashboard';

type HostProfile = {
  id: string;
  name: string;
  phone: string;
  whatsapp: string;
  availabilityHours: string;
  responseTime: string;
  role: 'host' | 'manager' | 'caretaker';
  guidebookCount: number;
};

export default function GuidebookPage() {
  const [activeTab, setActiveTab] = useState<Tab>('home');
  const [hostProfiles, setHostProfiles] = useState<HostProfile[]>([
    {
      id: '1',
      name: 'Sarah Johnson',
      phone: '+1 (555) 123-4567',
      whatsapp: '+1 (555) 123-4567',
      availabilityHours: '9 AM - 9 PM',
      responseTime: 'Within 1 hour',
      role: 'host',
      guidebookCount: 3,
    },
    {
      id: '2',
      name: 'Mike Anderson',
      phone: '+1 (555) 987-6543',
      whatsapp: '+1 (555) 987-6543',
      availabilityHours: '24/7',
      responseTime: 'Within 30 mins',
      role: 'manager',
      guidebookCount: 5,
    },
  ]);

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Mobile App Header */}
      <header className="sticky top-0 z-20 bg-background/95 backdrop-blur-lg border-b border-border">
        <div className="px-4 py-3 flex items-center justify-between">
          <Link href="/dashboard" className="p-2 -ml-2 rounded-full hover:bg-muted transition-colors">
            <svg className="w-6 h-6 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </Link>
          <h1 className="text-lg font-semibold text-foreground">Cozy Mountain Cabin</h1>
          <button className="p-2 -mr-2 rounded-full hover:bg-muted transition-colors">
            <svg className="w-6 h-6 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
          </button>
        </div>
      </header>

      {/* Tab Content */}
      <main className="px-4 py-6">
        {activeTab === 'home' && <HomeTab />}
        {activeTab === 'essentials' && <EssentialsTab />}
        {activeTab === 'dashboard' && <DashboardTab hostProfiles={hostProfiles} setHostProfiles={setHostProfiles} />}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border z-30 safe-area-bottom">
        <div className="grid grid-cols-3 h-16">
          <button
            onClick={() => setActiveTab('home')}
            className={`flex flex-col items-center justify-center gap-1 transition-colors ${
              activeTab === 'home' ? 'text-primary' : 'text-muted-foreground'
            }`}
          >
            <svg className="w-6 h-6" fill={activeTab === 'home' ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <span className="text-xs font-medium">Home</span>
          </button>
          <button
            onClick={() => setActiveTab('essentials')}
            className={`flex flex-col items-center justify-center gap-1 transition-colors ${
              activeTab === 'essentials' ? 'text-primary' : 'text-muted-foreground'
            }`}
          >
            <svg className="w-6 h-6" fill={activeTab === 'essentials' ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <span className="text-xs font-medium">Essentials</span>
          </button>
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`flex flex-col items-center justify-center gap-1 transition-colors ${
              activeTab === 'dashboard' ? 'text-primary' : 'text-muted-foreground'
            }`}
          >
            <svg className="w-6 h-6" fill={activeTab === 'dashboard' ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            <span className="text-xs font-medium">Dashboard</span>
          </button>
        </div>
      </nav>
    </div>
  );
}

// Home Tab Component
function HomeTab() {
  return (
    <div className="space-y-6">
      {/* Hero Card */}
      <div className="relative h-48 rounded-2xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/40 to-accent/40" />
        <div className="absolute inset-0 flex items-center justify-center text-center p-6">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">Welcome Home!</h2>
            <p className="text-white/90 text-sm">We're so happy to have you here</p>
          </div>
        </div>
      </div>

      {/* Host Card */}
      <div className="bg-card rounded-2xl p-5 border border-border">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
            <svg className="w-7 h-7 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <div className="flex-1">
            <p className="text-sm text-muted-foreground mb-0.5">Your Hosts</p>
            <p className="font-semibold text-foreground">Sarah & Mike</p>
          </div>
          <button className="w-11 h-11 rounded-full bg-primary flex items-center justify-center">
            <svg className="w-5 h-5 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h3 className="text-sm font-semibold text-foreground mb-3 px-1">Quick Actions</h3>
        <div className="grid grid-cols-4 gap-3">
          <button className="flex flex-col items-center gap-2">
            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
              <svg className="w-7 h-7 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-15.355 21.213 0" />
              </svg>
            </div>
            <span className="text-xs text-center font-medium text-foreground">WiFi</span>
          </button>
          <button className="flex flex-col items-center gap-2">
            <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center">
              <svg className="w-7 h-7 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
              </svg>
            </div>
            <span className="text-xs text-center font-medium text-foreground">Codes</span>
          </button>
          <button className="flex flex-col items-center gap-2">
            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
              <svg className="w-7 h-7 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <span className="text-xs text-center font-medium text-foreground">Places</span>
          </button>
          <button className="flex flex-col items-center gap-2">
            <div className="w-14 h-14 rounded-2xl bg-destructive/10 flex items-center justify-center">
              <svg className="w-7 h-7 text-destructive" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <span className="text-xs text-center font-medium text-foreground">SOS</span>
          </button>
        </div>
      </div>

      {/* Explore Section */}
      <div>
        <div className="flex items-center justify-between mb-3 px-1">
          <h3 className="text-sm font-semibold text-foreground">Explore Nearby</h3>
          <button className="text-xs font-medium text-primary">See all</button>
        </div>
        <div className="space-y-3">
          <div className="bg-card rounded-2xl overflow-hidden border border-border">
            <div className="h-32 bg-primary/20" />
            <div className="p-4">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h4 className="font-semibold text-foreground">Mountain View Cafe</h4>
                  <p className="text-sm text-muted-foreground">Best breakfast in town</p>
                </div>
                <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-full">0.5 mi</span>
              </div>
              <div className="flex gap-2 text-xs">
                <span className="text-muted-foreground">Breakfast</span>
                <span className="text-muted-foreground">•</span>
                <span className="text-muted-foreground">$$</span>
                <span className="text-muted-foreground">•</span>
                <span className="text-primary">⭐ 4.8</span>
              </div>
            </div>
          </div>

          <div className="bg-card rounded-2xl overflow-hidden border border-border">
            <div className="h-32 bg-accent/20" />
            <div className="p-4">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h4 className="font-semibold text-foreground">Alpine Trail</h4>
                  <p className="text-sm text-muted-foreground">Easy 3-mile loop</p>
                </div>
                <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-full">2 mi</span>
              </div>
              <div className="flex gap-2 text-xs">
                <span className="text-muted-foreground">Hiking</span>
                <span className="text-muted-foreground">•</span>
                <span className="text-muted-foreground">Easy</span>
                <span className="text-muted-foreground">•</span>
                <span className="text-primary">Pet friendly</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* House Rules Preview */}
      <div className="bg-muted/50 rounded-2xl p-5 border border-border">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="font-semibold text-foreground">House Rules</h3>
        </div>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li className="flex items-start gap-2">
            <span className="text-primary mt-0.5">•</span>
            <span>Check-in: 3:00 PM, Check-out: 11:00 AM</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary mt-0.5">•</span>
            <span>Quiet hours: 10:00 PM - 8:00 AM</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary mt-0.5">•</span>
            <span>Pets welcome (off furniture)</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

// Essentials Tab Component
function EssentialsTab() {
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      {/* WiFi Card */}
      <div className="bg-card rounded-2xl p-5 border border-border">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
            <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
            </svg>
          </div>
          <div>
            <h3 className="font-semibold text-foreground">WiFi Network</h3>
            <p className="text-sm text-muted-foreground">Tap to copy</p>
          </div>
        </div>
        <div className="space-y-3">
          <div className="bg-muted rounded-xl p-3">
            <p className="text-xs text-muted-foreground mb-1">Network Name</p>
            <p className="font-mono text-foreground font-medium">MountainCabin_5G</p>
          </div>
          <div className="bg-muted rounded-xl p-3">
            <p className="text-xs text-muted-foreground mb-1">Password</p>
            <p className="font-mono text-foreground font-medium">CozyStay2024!</p>
          </div>
        </div>
      </div>

      {/* Location Card */}
      <div className="bg-card rounded-2xl p-5 border border-border">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
            <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Location</h3>
            <p className="text-sm text-muted-foreground">Property address</p>
          </div>
        </div>
        <div className="bg-muted rounded-xl p-4">
          <p className="text-foreground font-medium mb-2">Cozy Mountain Cabin</p>
          <p className="text-sm text-muted-foreground">123 Mountain View Dr, Aspen, CO 81611</p>
        </div>
        <button className="w-full mt-3 bg-primary text-primary-foreground rounded-xl py-3 font-medium flex items-center justify-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
          </svg>
          Open in Maps
        </button>
      </div>

      {/* Callouts - Full width sticky note style cards */}
      <div>
        <h3 className="text-sm font-semibold text-foreground mb-3 px-1">Important Info</h3>
        <div className="space-y-3">
          {/* Emergency Contact Callout */}
          <div className="rounded-2xl p-5 border border-border shadow-sm" style={{ backgroundColor: '#fee2e2' }}>
            <div className="flex items-start gap-3">
              <div className="text-3xl flex-shrink-0">🚨</div>
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-foreground mb-2">Emergency Contact</h4>
                <div className="space-y-2 text-sm text-foreground/80">
                  <p>In case of emergency, please call 911 immediately.</p>
                  <p>For non-urgent issues, you can reach us at (555) 123-4567.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quiet Hours Callout */}
          <div className="rounded-2xl p-5 border border-border shadow-sm" style={{ backgroundColor: '#e0e7ff' }}>
            <div className="flex items-start gap-3">
              <div className="text-3xl flex-shrink-0">🤫</div>
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-foreground mb-2">Quiet Hours</h4>
                <div className="space-y-2 text-sm text-foreground/80">
                  <p>Please keep noise to a minimum between 10 PM and 8 AM.</p>
                  <p>This helps ensure all guests have a peaceful stay.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cards - Accordion style */}
      <div>
        <h3 className="text-sm font-semibold text-foreground mb-3 px-1">House Info</h3>
        <div className="space-y-2">
          {/* Heating & Cooling Card */}
          <div className="bg-card rounded-xl border border-border overflow-hidden">
            <button
              onClick={() => setExpandedCard(expandedCard === '1' ? null : '1')}
              className="w-full p-4 flex items-center justify-between hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="text-2xl">🌡️</div>
                <span className="font-medium text-foreground">Heating & Cooling</span>
              </div>
              <svg
                className={`w-5 h-5 text-muted-foreground transition-transform ${expandedCard === '1' ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {expandedCard === '1' && (
              <div className="px-4 pb-4 pt-2 text-sm text-muted-foreground border-t border-border">
                The thermostat is located in the living room. Please keep the temperature between 65-75°F to conserve energy.
              </div>
            )}
          </div>

          {/* Garbage & Recycling Card */}
          <div className="bg-card rounded-xl border border-border overflow-hidden">
            <button
              onClick={() => setExpandedCard(expandedCard === '2' ? null : '2')}
              className="w-full p-4 flex items-center justify-between hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="text-2xl">♻️</div>
                <span className="font-medium text-foreground">Garbage & Recycling</span>
              </div>
              <svg
                className={`w-5 h-5 text-muted-foreground transition-transform ${expandedCard === '2' ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {expandedCard === '2' && (
              <div className="px-4 pb-4 pt-2 text-sm text-muted-foreground border-t border-border">
                Trash day is every Tuesday. Please separate recyclables into the blue bin. Compost bin is under the kitchen sink.
              </div>
            )}
          </div>

          {/* Internet & TV Card */}
          <div className="bg-card rounded-xl border border-border overflow-hidden">
            <button
              onClick={() => setExpandedCard(expandedCard === '3' ? null : '3')}
              className="w-full p-4 flex items-center justify-between hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="text-2xl">📺</div>
                <span className="font-medium text-foreground">Internet & TV</span>
              </div>
              <svg
                className={`w-5 h-5 text-muted-foreground transition-transform ${expandedCard === '3' ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {expandedCard === '3' && (
              <div className="px-4 pb-4 pt-2 text-sm text-muted-foreground border-t border-border">
                Smart TV has Netflix, Hulu, and Disney+. Use the remote to switch between apps. Streaming may require login.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Quick Widgets - Link buttons to Memos */}
      <div>
        <h3 className="text-sm font-semibold text-foreground mb-3 px-1">Quick Guides</h3>
        <div className="space-y-3">
          {/* Coffee Machine Guide - Half Width */}
          <div className="grid grid-cols-2 gap-3">
            <button className="bg-card rounded-xl p-4 border border-border hover:shadow-md transition-shadow text-left">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xl">☕</span>
                <h4 className="font-medium text-foreground text-sm">Coffee Machine</h4>
              </div>
              <p className="text-xs text-muted-foreground">View guide</p>
            </button>
            <div></div>
          </div>

          {/* Parking Information - Full Width */}
          <button className="w-full bg-card rounded-xl p-4 border border-border hover:shadow-md transition-shadow text-left">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xl">🅿️</span>
              <h4 className="font-medium text-foreground">Parking Information</h4>
            </div>
            <p className="text-xs text-muted-foreground">View details about parking</p>
          </button>
        </div>
      </div>
    </div>
  );
}

// Dashboard Tab Component
function DashboardTab({ hostProfiles, setHostProfiles }: { hostProfiles: HostProfile[], setHostProfiles: (profiles: HostProfile[]) => void }) {
  const [dashboardSubTab, setDashboardSubTab] = useState<'overview' | 'profiles'>('overview');

  return (
    <div className="space-y-6">
      {/* Dashboard Sub-Tabs */}
      <div className="flex gap-2 border-b border-border">
        <button
          onClick={() => setDashboardSubTab('overview')}
          className={`px-4 py-2 font-medium text-sm border-b-2 transition-colors ${
            dashboardSubTab === 'overview'
              ? 'border-primary text-primary'
              : 'border-transparent text-muted-foreground hover:text-foreground'
          }`}
        >
          Overview
        </button>
        <button
          onClick={() => setDashboardSubTab('profiles')}
          className={`px-4 py-2 font-medium text-sm border-b-2 transition-colors ${
            dashboardSubTab === 'profiles'
              ? 'border-primary text-primary'
              : 'border-transparent text-muted-foreground hover:text-foreground'
          }`}
        >
          Host Profiles
        </button>
      </div>

      {/* Sub-Tab Content */}
      {dashboardSubTab === 'overview' && <DashboardOverview />}
      {dashboardSubTab === 'profiles' && <HostProfilesTab hostProfiles={hostProfiles} setHostProfiles={setHostProfiles} />}
    </div>
  );
}

// Dashboard Overview Component (original dashboard content)
function DashboardOverview() {
  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-card rounded-2xl p-5 border border-border">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
          </div>
          <p className="text-2xl font-bold text-foreground mb-1">347</p>
          <p className="text-sm text-muted-foreground">Total Views</p>
        </div>

        <div className="bg-card rounded-2xl p-5 border border-border">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
              <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <p className="text-2xl font-bold text-foreground mb-1">2m 34s</p>
          <p className="text-sm text-muted-foreground">Avg. Time</p>
        </div>
      </div>

      {/* Activity Chart Placeholder */}
      <div className="bg-card rounded-2xl p-5 border border-border">
        <h3 className="font-semibold text-foreground mb-4">Views This Week</h3>
        <div className="h-40 bg-muted/30 rounded-xl flex items-center justify-center">
          <div className="text-center">
            <svg className="w-12 h-12 text-muted-foreground mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            <p className="text-sm text-muted-foreground">Analytics Chart</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h3 className="text-sm font-semibold text-foreground mb-3 px-1">Manage</h3>
        <div className="space-y-2">
          <button className="w-full bg-card rounded-xl p-4 border border-border flex items-center justify-between hover:bg-muted/50 transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </div>
              <span className="font-medium text-foreground">Edit Guidebook</span>
            </div>
            <svg className="w-5 h-5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <button className="w-full bg-card rounded-xl p-4 border border-border flex items-center justify-between hover:bg-muted/50 transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
              </div>
              <span className="font-medium text-foreground">Share Link</span>
            </div>
            <svg className="w-5 h-5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <button className="w-full bg-card rounded-xl p-4 border border-border flex items-center justify-between hover:bg-muted/50 transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <span className="font-medium text-foreground">Settings</span>
            </div>
            <svg className="w-5 h-5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Share QR Code */}
      <div className="bg-card rounded-2xl p-6 border border-border text-center">
        <h3 className="font-semibold text-foreground mb-3">Share with Guests</h3>
        <div className="w-40 h-40 mx-auto bg-muted/30 rounded-xl flex items-center justify-center mb-4">
          <svg className="w-20 h-20 text-muted-foreground" fill="currentColor" viewBox="0 0 24 24">
            <path d="M3 3h6v6H3V3zm12 0h6v6h-6V3zM3 15h6v6H3v-6zm15 0h3v3h-3v-3zm-3-3h3v3h-3v-3zm3 6h3v3h-3v-3z" />
          </svg>
        </div>
        <p className="text-sm text-muted-foreground mb-4">Guests scan to view guidebook</p>
        <button className="w-full bg-primary text-primary-foreground rounded-xl py-3 font-medium">
          Download QR Code
        </button>
      </div>
    </div>
  );
}
