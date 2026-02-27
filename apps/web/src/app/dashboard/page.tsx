'use client';

import { useState } from 'react';
import Link from 'next/link';

type Tab = 'guidebooks' | 'account';

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<Tab>('guidebooks');

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
        {activeTab === 'account' && <AccountTab />}
      </main>
    </div>
  );
}

// Guidebooks Tab Component
function GuidebooksTab() {
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

      {/* Guidebooks Grid */}
      <div>
        <h3 className="text-xl font-semibold text-foreground mb-4">All Guidebooks</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Create New Card */}
          <Link
            href="/guidebook/create"
            className="border-2 border-dashed border-border rounded-2xl p-8 flex flex-col items-center justify-center hover:border-primary hover:bg-card transition-all min-h-[280px] group"
          >
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
              <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Create New Guidebook</h3>
            <p className="text-sm text-muted-foreground text-center">Start a new digital manual for your property</p>
          </Link>

          {/* Guidebook Card 1 */}
          <div className="bg-card border border-border rounded-2xl overflow-hidden hover:shadow-lg transition-shadow">
            <div className="h-40 bg-gradient-to-br from-primary/30 to-accent/30 relative">
              <div className="absolute top-3 right-3">
                <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-700 text-xs font-medium">Active</span>
              </div>
            </div>
            <div className="p-5">
              <h3 className="text-xl font-semibold text-foreground mb-2">Cozy Mountain Cabin</h3>
              <p className="text-sm text-muted-foreground mb-4">Updated 2 days ago</p>

              <div className="flex items-center gap-4 mb-4 text-sm">
                <div className="flex items-center gap-1 text-muted-foreground">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  <span>487 views</span>
                </div>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>2m 15s</span>
                </div>
              </div>

              <div className="flex gap-2">
                <Link
                  href="/guidebook/1"
                  className="flex-1 text-center bg-primary text-primary-foreground py-2.5 px-4 rounded-xl text-sm font-medium hover:opacity-90 transition-opacity"
                >
                  View
                </Link>
                <button className="flex-1 text-center border border-border bg-background text-foreground py-2.5 px-4 rounded-xl text-sm font-medium hover:bg-muted transition-colors">
                  Edit
                </button>
                <button className="w-10 h-10 flex items-center justify-center border border-border bg-background text-foreground rounded-xl hover:bg-muted transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Guidebook Card 2 */}
          <div className="bg-card border border-border rounded-2xl overflow-hidden hover:shadow-lg transition-shadow">
            <div className="h-40 bg-gradient-to-br from-accent/30 to-primary/30 relative">
              <div className="absolute top-3 right-3">
                <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-700 text-xs font-medium">Active</span>
              </div>
            </div>
            <div className="p-5">
              <h3 className="text-xl font-semibold text-foreground mb-2">Beach House Retreat</h3>
              <p className="text-sm text-muted-foreground mb-4">Updated 1 week ago</p>

              <div className="flex items-center gap-4 mb-4 text-sm">
                <div className="flex items-center gap-1 text-muted-foreground">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  <span>623 views</span>
                </div>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>3m 42s</span>
                </div>
              </div>

              <div className="flex gap-2">
                <Link
                  href="/guidebook/2"
                  className="flex-1 text-center bg-primary text-primary-foreground py-2.5 px-4 rounded-xl text-sm font-medium hover:opacity-90 transition-opacity"
                >
                  View
                </Link>
                <button className="flex-1 text-center border border-border bg-background text-foreground py-2.5 px-4 rounded-xl text-sm font-medium hover:bg-muted transition-colors">
                  Edit
                </button>
                <button className="w-10 h-10 flex items-center justify-center border border-border bg-background text-foreground rounded-xl hover:bg-muted transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Guidebook Card 3 */}
          <div className="bg-card border border-border rounded-2xl overflow-hidden hover:shadow-lg transition-shadow opacity-75">
            <div className="h-40 bg-gradient-to-br from-muted to-muted/50 relative">
              <div className="absolute top-3 right-3">
                <span className="px-3 py-1 rounded-full bg-muted text-muted-foreground text-xs font-medium">Draft</span>
              </div>
            </div>
            <div className="p-5">
              <h3 className="text-xl font-semibold text-foreground mb-2">Downtown Loft</h3>
              <p className="text-sm text-muted-foreground mb-4">Created 3 weeks ago</p>

              <div className="flex items-center gap-4 mb-4 text-sm">
                <div className="flex items-center gap-1 text-muted-foreground">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  <span>138 views</span>
                </div>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>1m 28s</span>
                </div>
              </div>

              <div className="flex gap-2">
                <Link
                  href="/guidebook/3"
                  className="flex-1 text-center bg-primary text-primary-foreground py-2.5 px-4 rounded-xl text-sm font-medium hover:opacity-90 transition-opacity"
                >
                  View
                </Link>
                <button className="flex-1 text-center border border-border bg-background text-foreground py-2.5 px-4 rounded-xl text-sm font-medium hover:bg-muted transition-colors">
                  Edit
                </button>
                <button className="w-10 h-10 flex items-center justify-center border border-border bg-background text-foreground rounded-xl hover:bg-muted transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
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
        <p className="text-muted-foreground">Manage your profile and billing information</p>
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
