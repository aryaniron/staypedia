'use client';

import { useState } from 'react';
import Link from 'next/link';
import { HostProfilesTab } from './HostProfilesTab';

type Tab = 'guidebooks' | 'guests' | 'profiles' | 'billing' | 'account';

type Guidebook = {
  id: string;
  propertyName: string;
  address: string;
  image?: string;
  status: 'draft' | 'public';
  occupancyStatus: 'hosted' | 'vacant';
  currentGuestName?: string;
  views: number;
  lastEditedOn: string;
};

type Guest = {
  id: string;
  name: string;
  numberOfAdditionalGuests: number;
  checkInDate: string;
  checkOutDate: string;
  code: string;
  propertyId?: string;
  propertyName?: string;
  email?: string;
  phone?: string;
  hasCheckedIn?: boolean;
  isCurrent?: boolean;
};

type HostProfile = {
  id: string;
  name: string;
  phone: string;
  whatsapp: string;
  availabilityHours: string;
  responseTime: string;
  role: 'host' | 'manager' | 'caretaker';
  guidebookIds: string[];
};

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<Tab>('guidebooks');
  const [hostProfiles, setHostProfiles] = useState<HostProfile[]>([
    {
      id: '1',
      name: 'Sarah Johnson',
      phone: '+1 (555) 123-4567',
      whatsapp: '+1 (555) 123-4567',
      availabilityHours: '9 AM - 9 PM',
      responseTime: 'Within 1 hour',
      role: 'host',
      guidebookIds: ['1', '2', '3'],
    },
    {
      id: '2',
      name: 'Mike Anderson',
      phone: '+1 (555) 987-6543',
      whatsapp: '+1 (555) 987-6543',
      availabilityHours: '24/7',
      responseTime: 'Within 30 mins',
      role: 'manager',
      guidebookIds: ['1', '2'],
    },
  ]);

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="w-64 bg-card border-r border-border flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-border">
          <Link href="/">
            <h1 className="text-2xl font-semibold text-primary">Staypedia</h1>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <div className="space-y-2">
            <button
              onClick={() => setActiveTab('guidebooks')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${
                activeTab === 'guidebooks'
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              <span>Guidebooks</span>
            </button>

            <button
              onClick={() => setActiveTab('guests')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${
                activeTab === 'guests'
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              <span>Guests</span>
            </button>

            <button
              onClick={() => setActiveTab('profiles')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${
                activeTab === 'profiles'
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span>Host Profiles</span>
            </button>

            <button
              onClick={() => setActiveTab('billing')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${
                activeTab === 'billing'
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
              <span>Billing</span>
            </button>

            <button
              onClick={() => setActiveTab('account')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${
                activeTab === 'account'
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span>Account Details</span>
            </button>
          </div>
        </nav>

        {/* User Profile & Logout */}
        <div className="p-4 border-t border-border">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">Sarah Johnson</p>
              <p className="text-xs text-muted-foreground truncate">sarah@example.com</p>
            </div>
          </div>
          <button className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-muted text-foreground hover:bg-muted/80 transition-colors text-sm font-medium">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {activeTab === 'guidebooks' && <GuidebooksTab />}
        {activeTab === 'guests' && <GuestsTab />}
        {activeTab === 'profiles' && <HostProfilesTab hostProfiles={hostProfiles} setHostProfiles={setHostProfiles} />}
        {activeTab === 'billing' && <BillingTab />}
        {activeTab === 'account' && <AccountTab />}
      </main>
    </div>
  );
}

// Guidebooks Tab Component
function GuidebooksTab() {
  const [guidebooks] = useState<Guidebook[]>([
    {
      id: '1',
      propertyName: 'Cozy Mountain Cabin',
      address: '123 Pine Road, Aspen, CO',
      image: 'https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=400',
      status: 'public',
      occupancyStatus: 'hosted',
      currentGuestName: 'John & Sarah Miller',
      views: 487,
      lastEditedOn: '2 days ago',
    },
    {
      id: '2',
      propertyName: 'Beach House Retreat',
      address: '456 Ocean Drive, Malibu, CA',
      image: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=400',
      status: 'public',
      occupancyStatus: 'vacant',
      views: 623,
      lastEditedOn: '1 week ago',
    },
    {
      id: '3',
      propertyName: 'Downtown Loft',
      address: '789 Main Street, New York, NY',
      status: 'draft',
      occupancyStatus: 'vacant',
      views: 0,
      lastEditedOn: '3 days ago',
    },
  ]);

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-foreground mb-2">Your Guidebooks</h2>
        <p className="text-muted-foreground">Create and manage digital house manuals for your properties</p>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="bg-card rounded-2xl p-6 border border-border">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
          </div>
          <p className="text-3xl font-bold text-foreground mb-1">3</p>
          <p className="text-sm text-muted-foreground">Total Guidebooks</p>
        </div>

        <div className="bg-card rounded-2xl p-6 border border-border">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
              <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
          </div>
          <p className="text-3xl font-bold text-foreground mb-1">1,248</p>
          <p className="text-sm text-muted-foreground">Total Views</p>
        </div>

        <div className="bg-card rounded-2xl p-6 border border-border">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </div>
          </div>
          <p className="text-3xl font-bold text-foreground mb-1">3</p>
          <p className="text-sm text-muted-foreground">Active Properties</p>
        </div>
      </div>

      {/* Guidebooks List */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-foreground">All Guidebooks</h3>
          <Link
            href="/guidebook/create"
            className="flex items-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground rounded-xl font-medium hover:opacity-90 transition-opacity"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Create New Guidebook
          </Link>
        </div>

        <div className="space-y-4">
          {guidebooks.map((guidebook) => (
            <div
              key={guidebook.id}
              className="bg-card border border-border rounded-2xl overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col md:flex-row">
                {/* Image Section */}
                <div className="md:w-64 h-48 md:h-auto flex-shrink-0 relative">
                  {guidebook.image ? (
                    <img
                      src={guidebook.image}
                      alt={guidebook.propertyName}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center">
                      <svg className="w-16 h-16 text-muted-foreground/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                      </svg>
                    </div>
                  )}
                </div>

                {/* Content Section */}
                <div className="flex-1 p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-2xl font-semibold text-foreground mb-1">{guidebook.propertyName}</h3>
                      <p className="text-sm text-muted-foreground mb-3">{guidebook.address}</p>
                      
                      {/* Status Badges */}
                      <div className="flex flex-wrap items-center gap-2 mb-4">
                        {/* Occupancy Status */}
                        {guidebook.occupancyStatus === 'hosted' ? (
                          <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium flex items-center gap-1.5">
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            Currently Hosted
                          </span>
                        ) : (
                          <span className="px-3 py-1 rounded-full bg-muted text-muted-foreground text-xs font-medium flex items-center gap-1.5">
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                            </svg>
                            Vacant
                          </span>
                        )}

                        {/* Publication Status */}
                        {guidebook.status === 'public' ? (
                          <span className="px-3 py-1 rounded-full bg-green-500/10 text-green-700 text-xs font-medium">
                            Public
                          </span>
                        ) : (
                          <span className="px-3 py-1 rounded-full bg-muted text-muted-foreground text-xs font-medium">
                            Draft
                          </span>
                        )}
                      </div>

                      {/* Guest Info */}
                      {guidebook.currentGuestName && (
                        <p className="text-sm text-foreground mb-3">
                          <span className="text-muted-foreground">Current Guest:</span> <span className="font-medium">{guidebook.currentGuestName}</span>
                        </p>
                      )}

                      {/* Stats */}
                      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1.5">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                          <span>{guidebook.views} views</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span>Edited {guidebook.lastEditedOn}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  {guidebook.status === 'public' ? (
                    <div className="flex flex-wrap gap-2">
                      <Link
                        href={`/guidebook/${guidebook.id}`}
                        className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
                      >
                        Edit Guidebook
                      </Link>
                      <button className="px-4 py-2 border border-border bg-background text-foreground rounded-lg text-sm font-medium hover:bg-muted transition-colors">
                        Manage Guests
                      </button>
                      <button className="px-4 py-2 border border-border bg-background text-foreground rounded-lg text-sm font-medium hover:bg-muted transition-colors flex items-center gap-1.5">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                        Copy Link
                      </button>
                      <button className="px-4 py-2 border border-border bg-background text-foreground rounded-lg text-sm font-medium hover:bg-muted transition-colors flex items-center gap-1.5">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                        </svg>
                        Download QR
                      </button>
                      <button className="px-4 py-2 border border-destructive/30 bg-destructive/5 text-destructive rounded-lg text-sm font-medium hover:bg-destructive/10 transition-colors">
                        Delete
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      <Link
                        href={`/guidebook/${guidebook.id}`}
                        className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
                      >
                        Finish Setup
                      </Link>
                      <button className="px-4 py-2 border border-destructive/30 bg-destructive/5 text-destructive rounded-lg text-sm font-medium hover:bg-destructive/10 transition-colors">
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Guests Tab Component
function GuestsTab() {
  const [guests, setGuests] = useState<Guest[]>([
    {
      id: '1',
      name: 'John & Sarah Miller',
      numberOfAdditionalGuests: 2,
      checkInDate: '2024-02-25',
      checkOutDate: '2024-03-02',
      code: 'ABC123',
      propertyName: 'Cozy Mountain Cabin',
      email: 'john.miller@example.com',
      phone: '+1 (555) 123-4567',
      hasCheckedIn: true,
      isCurrent: true,
    },
    {
      id: '2',
      name: 'Emma Thompson',
      numberOfAdditionalGuests: 0,
      checkInDate: '2024-02-26',
      checkOutDate: '2024-03-01',
      code: 'DEF456',
      propertyName: 'Beach House Retreat',
      email: 'emma.t@example.com',
      phone: '+1 (555) 987-6543',
      hasCheckedIn: false,
      isCurrent: true,
    },
    {
      id: '3',
      name: 'David & Lisa Chen',
      numberOfAdditionalGuests: 1,
      checkInDate: '2024-01-15',
      checkOutDate: '2024-01-20',
      code: 'GHI789',
      propertyName: 'Downtown Loft',
      email: 'chen.family@example.com',
      phone: '+1 (555) 456-7890',
      hasCheckedIn: true,
      isCurrent: false,
    },
    {
      id: '4',
      name: 'Michael Roberts',
      numberOfAdditionalGuests: 3,
      checkInDate: '2024-01-10',
      checkOutDate: '2024-01-15',
      code: 'JKL012',
      propertyName: 'Cozy Mountain Cabin',
      email: 'michael.r@example.com',
      phone: '+1 (555) 222-3333',
      hasCheckedIn: true,
      isCurrent: false,
    },
  ]);

  const [isGuestModalOpen, setIsGuestModalOpen] = useState(false);
  const [editingGuest, setEditingGuest] = useState<Guest | null>(null);

  const handleAddGuest = () => {
    setEditingGuest({
      id: Date.now().toString(),
      name: '',
      numberOfAdditionalGuests: 0,
      checkInDate: '',
      checkOutDate: '',
      code: '',
      email: '',
      phone: '',
    });
    setIsGuestModalOpen(true);
  };

  const handleEditGuest = (guest: Guest) => {
    setEditingGuest({ ...guest });
    setIsGuestModalOpen(true);
  };

  const handleSaveGuest = () => {
    if (!editingGuest || !editingGuest.name.trim() || !editingGuest.checkInDate || !editingGuest.checkOutDate || !editingGuest.code.trim()) {
      alert('Please fill in required fields: Name, Check-in Date, Check-out Date, and Code');
      return;
    }

    const exists = guests.find((g) => g.id === editingGuest.id);
    if (exists) {
      setGuests(guests.map((g) => (g.id === editingGuest.id ? editingGuest : g)));
    } else {
      setGuests([...guests, editingGuest]);
    }

    setIsGuestModalOpen(false);
    setEditingGuest(null);
  };

  const handleDeleteGuest = (id: string) => {
    if (confirm('Are you sure you want to delete this guest?')) {
      setGuests(guests.filter((g) => g.id !== id));
    }
  };

  const currentGuests = guests.filter((g) => g.isCurrent);
  const previousGuests = guests.filter((g) => !g.isCurrent);

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-3xl font-bold text-foreground">Guests</h2>
          <button
            onClick={handleAddGuest}
            className="flex items-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground rounded-xl font-medium hover:opacity-90 transition-opacity"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Guest
          </button>
        </div>
        <p className="text-muted-foreground">Manage your guests and their access codes</p>
      </div>

      {/* Current Guests */}
      {currentGuests.length > 0 && (
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-foreground mb-4">Current Guests</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {currentGuests.map((guest) => (
              <div
                key={guest.id}
                className="bg-card border border-border rounded-2xl p-6 hover:shadow-md transition-shadow"
              >
                {/* Header with name and status */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-foreground mb-1">{guest.name}</h4>
                    <p className="text-sm text-muted-foreground">{guest.propertyName}</p>
                  </div>
                  {guest.hasCheckedIn ? (
                    <span className="px-3 py-1 rounded-full bg-green-500/10 text-green-700 text-xs font-medium whitespace-nowrap">
                      Checked In
                    </span>
                  ) : (
                    <span className="px-3 py-1 rounded-full bg-orange-500/10 text-orange-700 text-xs font-medium whitespace-nowrap">
                      Not Checked In
                    </span>
                  )}
                </div>

                {/* Details */}
                <div className="space-y-3 mb-4">
                  {/* Dates */}
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span>
                      {new Date(guest.checkInDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - {new Date(guest.checkOutDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                  </div>

                  {/* Additional Guests */}
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                    <span>+{guest.numberOfAdditionalGuests} additional {guest.numberOfAdditionalGuests === 1 ? 'guest' : 'guests'}</span>
                  </div>

                  {/* Access Code */}
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 flex-shrink-0 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                    </svg>
                    <code className="px-3 py-1.5 bg-primary/10 text-primary rounded-lg font-mono text-sm font-semibold">
                      {guest.code}
                    </code>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 pt-4 border-t border-border">
                  <button
                    onClick={() => handleEditGuest(guest)}
                    className="flex-1 px-4 py-2 border border-border bg-background text-foreground rounded-lg text-sm font-medium hover:bg-muted transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteGuest(guest.id)}
                    className="px-4 py-2 border border-destructive/30 bg-destructive/5 text-destructive rounded-lg text-sm font-medium hover:bg-destructive/10 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Previous Guests */}
      <div>
        <h3 className="text-xl font-semibold text-foreground mb-4">Previous Guests</h3>
        <div className="bg-card border border-border rounded-2xl overflow-hidden">
          {previousGuests.length === 0 ? (
            <div className="p-12 text-center">
              <p className="text-muted-foreground">No previous guests yet.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Guest Name</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Property</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Additional Guests</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Check-in</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Check-out</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Code</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {previousGuests.map((guest) => (
                    <tr key={guest.id} className="hover:bg-muted/30 transition-colors">
                      <td className="px-6 py-4">
                        <p className="font-medium text-foreground">{guest.name}</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-foreground">{guest.propertyName || '-'}</p>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-muted text-foreground text-sm font-medium">
                          +{guest.numberOfAdditionalGuests}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-foreground">
                        {new Date(guest.checkInDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </td>
                      <td className="px-6 py-4 text-sm text-foreground">
                        {new Date(guest.checkOutDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </td>
                      <td className="px-6 py-4">
                        <code className="px-3 py-1.5 bg-primary/10 text-primary rounded-lg font-mono text-sm font-semibold">
                          {guest.code}
                        </code>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleEditGuest(guest)}
                            className="p-2 hover:bg-muted rounded-lg transition-colors"
                            title="Edit guest"
                          >
                            <svg className="w-5 h-5 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </button>
                          <button
                            onClick={() => handleDeleteGuest(guest.id)}
                            className="p-2 hover:bg-destructive/10 text-destructive rounded-lg transition-colors"
                            title="Delete guest"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Add/Edit Guest Modal */}
      {isGuestModalOpen && editingGuest && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-border">
            {/* Modal Header */}
            <div className="sticky top-0 bg-card border-b border-border p-6">
              <h3 className="text-xl font-semibold text-foreground">
                {guests.find((g) => g.id === editingGuest.id) ? 'Edit Guest' : 'Add Guest'}
              </h3>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-4">
              {/* Guest Name */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Guest Name <span className="text-destructive">*</span>
                </label>
                <input
                  type="text"
                  value={editingGuest.name}
                  onChange={(e) => setEditingGuest({ ...editingGuest, name: e.target.value })}
                  placeholder="John & Sarah Miller"
                  className="w-full px-4 py-2 border border-input rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>

              {/* Number of Additional Guests */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Number of Additional Guests
                </label>
                <input
                  type="number"
                  min="0"
                  value={editingGuest.numberOfAdditionalGuests}
                  onChange={(e) => setEditingGuest({ ...editingGuest, numberOfAdditionalGuests: parseInt(e.target.value) || 0 })}
                  className="w-full px-4 py-2 border border-input rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>

              {/* Check-in and Check-out Dates */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Check-in Date <span className="text-destructive">*</span>
                  </label>
                  <input
                    type="date"
                    value={editingGuest.checkInDate}
                    onChange={(e) => setEditingGuest({ ...editingGuest, checkInDate: e.target.value })}
                    className="w-full px-4 py-2 border border-input rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Check-out Date <span className="text-destructive">*</span>
                  </label>
                  <input
                    type="date"
                    value={editingGuest.checkOutDate}
                    onChange={(e) => setEditingGuest({ ...editingGuest, checkOutDate: e.target.value })}
                    className="w-full px-4 py-2 border border-input rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
              </div>

              {/* Access Code */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Access Code <span className="text-destructive">*</span>
                </label>
                <input
                  type="text"
                  value={editingGuest.code}
                  onChange={(e) => setEditingGuest({ ...editingGuest, code: e.target.value.toUpperCase() })}
                  placeholder="ABC123"
                  className="w-full px-4 py-2 border border-input rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring font-mono"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  This code will be used to access the guidebook
                </p>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={editingGuest.email || ''}
                  onChange={(e) => setEditingGuest({ ...editingGuest, email: e.target.value })}
                  placeholder="guest@example.com"
                  className="w-full px-4 py-2 border border-input rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Phone
                </label>
                <input
                  type="tel"
                  value={editingGuest.phone || ''}
                  onChange={(e) => setEditingGuest({ ...editingGuest, phone: e.target.value })}
                  placeholder="+1 (555) 123-4567"
                  className="w-full px-4 py-2 border border-input rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>

              {/* Property */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Property
                </label>
                <input
                  type="text"
                  value={editingGuest.propertyName || ''}
                  onChange={(e) => setEditingGuest({ ...editingGuest, propertyName: e.target.value })}
                  placeholder="Cozy Mountain Cabin"
                  className="w-full px-4 py-2 border border-input rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>

              {/* Status Toggles */}
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
                {/* Current Guest Toggle */}
                <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">
                      Current Guest
                    </label>
                    <p className="text-xs text-muted-foreground">
                      Guest is currently staying
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setEditingGuest({ ...editingGuest, isCurrent: !editingGuest.isCurrent })}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      editingGuest.isCurrent ? 'bg-primary' : 'bg-muted'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        editingGuest.isCurrent ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                {/* Check-in Status Toggle */}
                {editingGuest.isCurrent && (
                  <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1">
                        Checked In
                      </label>
                      <p className="text-xs text-muted-foreground">
                        Guest has checked in
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setEditingGuest({ ...editingGuest, hasCheckedIn: !editingGuest.hasCheckedIn })}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        editingGuest.hasCheckedIn ? 'bg-green-500' : 'bg-orange-500'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          editingGuest.hasCheckedIn ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="sticky bottom-0 bg-card border-t border-border p-6 flex gap-3 justify-end">
              <button
                onClick={() => {
                  setIsGuestModalOpen(false);
                  setEditingGuest(null);
                }}
                className="px-6 py-2 border border-border rounded-lg text-foreground hover:bg-muted transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveGuest}
                disabled={!editingGuest.name.trim() || !editingGuest.checkInDate || !editingGuest.checkOutDate || !editingGuest.code.trim()}
                className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {guests.find((g) => g.id === editingGuest.id) ? 'Save Changes' : 'Add Guest'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Billing Tab Component
function BillingTab() {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-foreground mb-2">Billing & Subscription</h2>
        <p className="text-muted-foreground">Manage your subscription plan and payment methods</p>
      </div>

      {/* Pricing Plan Section */}
      <div className="bg-card rounded-2xl p-6 border border-border mb-6">
        <h3 className="text-xl font-semibold text-foreground mb-6">Pricing Plan</h3>

        {/* Current Plan */}
        <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 mb-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h4 className="text-lg font-semibold text-foreground mb-1">Pro Plan</h4>
              <p className="text-sm text-muted-foreground">Perfect for professional hosts</p>
            </div>
            <span className="px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-medium">Active</span>
          </div>
          <div className="flex items-baseline gap-2 mb-4">
            <span className="text-4xl font-bold text-foreground">$29</span>
            <span className="text-muted-foreground">/month</span>
          </div>
          <ul className="space-y-2 mb-6">
            <li className="flex items-center gap-2 text-sm text-muted-foreground">
              <svg className="w-5 h-5 text-primary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Unlimited guidebooks</span>
            </li>
            <li className="flex items-center gap-2 text-sm text-muted-foreground">
              <svg className="w-5 h-5 text-primary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Custom branding</span>
            </li>
            <li className="flex items-center gap-2 text-sm text-muted-foreground">
              <svg className="w-5 h-5 text-primary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Analytics & insights</span>
            </li>
            <li className="flex items-center gap-2 text-sm text-muted-foreground">
              <svg className="w-5 h-5 text-primary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Priority support</span>
            </li>
          </ul>
          <div className="flex gap-3">
            <button className="px-4 py-2 border border-border bg-background text-foreground rounded-xl text-sm font-medium hover:bg-muted transition-colors">
              Change Plan
            </button>
            <button className="px-4 py-2 text-destructive text-sm font-medium hover:underline">
              Cancel Subscription
            </button>
          </div>
        </div>

        {/* Billing Info */}
        <div>
          <h4 className="font-semibold text-foreground mb-4">Billing Information</h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-4 border border-border rounded-xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                  <svg className="w-6 h-6 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-foreground">•••• •••• •••• 4242</p>
                  <p className="text-sm text-muted-foreground">Expires 12/25</p>
                </div>
              </div>
              <button className="text-sm font-medium text-primary hover:underline">Edit</button>
            </div>
          </div>
          <button className="mt-4 px-4 py-2 border border-border bg-background text-foreground rounded-xl text-sm font-medium hover:bg-muted transition-colors">
            Add Payment Method
          </button>
        </div>
      </div>

      {/* Billing History */}
      <div className="bg-card rounded-2xl p-6 border border-border">
        <h3 className="text-xl font-semibold text-foreground mb-6">Billing History</h3>
        <div className="space-y-3">
          {[
            { date: 'Feb 1, 2024', amount: '$29.00', status: 'Paid' },
            { date: 'Jan 1, 2024', amount: '$29.00', status: 'Paid' },
            { date: 'Dec 1, 2023', amount: '$29.00', status: 'Paid' },
          ].map((invoice, index) => (
            <div key={index} className="flex items-center justify-between p-4 border border-border rounded-xl hover:bg-muted/50 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-foreground">{invoice.date}</p>
                  <p className="text-sm text-muted-foreground">Pro Plan - Monthly</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-semibold text-foreground">{invoice.amount}</span>
                <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-700 text-xs font-medium">{invoice.status}</span>
                <button className="text-sm font-medium text-primary hover:underline">Download</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Account Tab Component
function AccountTab() {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-foreground mb-2">Account Settings</h2>
        <p className="text-muted-foreground">Manage your profile information and preferences</p>
      </div>

      {/* Profile Section */}
      <div className="bg-card rounded-2xl p-6 border border-border mb-6">
        <h3 className="text-xl font-semibold text-foreground mb-6">Profile Information</h3>

        {/* Avatar Upload */}
        <div className="flex items-center gap-6 mb-8">
          <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
            <svg className="w-12 h-12 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <div>
            <button className="px-4 py-2 bg-primary text-primary-foreground rounded-xl text-sm font-medium hover:opacity-90 transition-opacity mb-2">
              Upload Photo
            </button>
            <p className="text-xs text-muted-foreground">JPG, PNG or GIF. Max size 2MB.</p>
          </div>
        </div>

        {/* Form Fields */}
        <div className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">First Name</label>
              <input
                type="text"
                defaultValue="Sarah"
                className="w-full px-4 py-2.5 border border-input rounded-xl bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Last Name</label>
              <input
                type="text"
                defaultValue="Johnson"
                className="w-full px-4 py-2.5 border border-input rounded-xl bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Email Address</label>
            <input
              type="email"
              defaultValue="sarah@example.com"
              className="w-full px-4 py-2.5 border border-input rounded-xl bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Phone Number</label>
            <input
              type="tel"
              defaultValue="+1 (555) 123-4567"
              className="w-full px-4 py-2.5 border border-input rounded-xl bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Bio</label>
            <textarea
              rows={4}
              defaultValue="Host with 5+ years of experience creating memorable stays for guests."
              className="w-full px-4 py-2.5 border border-input rounded-xl bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
            />
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button className="px-6 py-2.5 bg-primary text-primary-foreground rounded-xl font-medium hover:opacity-90 transition-opacity">
            Save Changes
          </button>
          <button className="px-6 py-2.5 border border-border bg-background text-foreground rounded-xl font-medium hover:bg-muted transition-colors">
            Cancel
          </button>
        </div>
      </div>

      {/* Security Settings */}
      <div className="bg-card rounded-2xl p-6 border border-border mb-6">
        <h3 className="text-xl font-semibold text-foreground mb-6">Security</h3>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Current Password</label>
            <input
              type="password"
              placeholder="Enter current password"
              className="w-full px-4 py-2.5 border border-input rounded-xl bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">New Password</label>
            <input
              type="password"
              placeholder="Enter new password"
              className="w-full px-4 py-2.5 border border-input rounded-xl bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Confirm New Password</label>
            <input
              type="password"
              placeholder="Confirm new password"
              className="w-full px-4 py-2.5 border border-input rounded-xl bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
        </div>

        <button className="mt-6 px-6 py-2.5 bg-primary text-primary-foreground rounded-xl font-medium hover:opacity-90 transition-opacity">
          Update Password
        </button>
      </div>

      {/* Preferences */}
      <div className="bg-card rounded-2xl p-6 border border-border">
        <h3 className="text-xl font-semibold text-foreground mb-6">Preferences</h3>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border border-border rounded-xl">
            <div>
              <p className="font-medium text-foreground mb-1">Email Notifications</p>
              <p className="text-sm text-muted-foreground">Receive email updates about your guests and bookings</p>
            </div>
            <button
              type="button"
              className="relative inline-flex h-6 w-11 items-center rounded-full bg-primary transition-colors"
            >
              <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-6" />
            </button>
          </div>

          <div className="flex items-center justify-between p-4 border border-border rounded-xl">
            <div>
              <p className="font-medium text-foreground mb-1">SMS Notifications</p>
              <p className="text-sm text-muted-foreground">Receive text messages for urgent updates</p>
            </div>
            <button
              type="button"
              className="relative inline-flex h-6 w-11 items-center rounded-full bg-muted transition-colors"
            >
              <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-1" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
