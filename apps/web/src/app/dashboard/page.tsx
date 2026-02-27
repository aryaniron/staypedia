import Link from 'next/link';

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-8">
              <Link href="/">
                <h1 className="text-2xl font-semibold text-primary">Staypedia</h1>
              </Link>
              <div className="hidden md:flex gap-6">
                <Link href="/dashboard" className="text-sm font-medium text-primary">
                  Dashboard
                </Link>
                <Link href="/blogs" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                  Blog
                </Link>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                Profile
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">Your Guidebooks</h2>
          <p className="text-muted-foreground">Manage your digital house manuals</p>
        </div>

        {/* Create New Guidebook Card */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Link
            href="/guidebook/new"
            className="border-2 border-dashed border-border rounded-lg p-8 flex flex-col items-center justify-center hover:border-primary hover:bg-card transition-all min-h-[250px] group"
          >
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
              <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-foreground mb-1">Create New Guidebook</h3>
            <p className="text-sm text-muted-foreground text-center">Start a new digital manual for your property</p>
          </Link>

          {/* Example Guidebook Cards */}
          <div className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
            <div className="h-32 bg-primary/20"></div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-foreground mb-2">Cozy Mountain Cabin</h3>
              <p className="text-sm text-muted-foreground mb-4">Last updated 2 days ago</p>
              <div className="flex gap-2">
                <Link
                  href="/guidebook/1"
                  className="flex-1 text-center bg-primary text-primary-foreground py-2 px-4 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
                >
                  View
                </Link>
                <button className="flex-1 text-center border border-border bg-background text-foreground py-2 px-4 rounded-lg text-sm font-medium hover:bg-card transition-colors">
                  Edit
                </button>
              </div>
            </div>
          </div>

          <div className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
            <div className="h-32 bg-accent/20"></div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-foreground mb-2">Beach House Retreat</h3>
              <p className="text-sm text-muted-foreground mb-4">Last updated 1 week ago</p>
              <div className="flex gap-2">
                <Link
                  href="/guidebook/2"
                  className="flex-1 text-center bg-primary text-primary-foreground py-2 px-4 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
                >
                  View
                </Link>
                <button className="flex-1 text-center border border-border bg-background text-foreground py-2 px-4 rounded-lg text-sm font-medium hover:bg-card transition-colors">
                  Edit
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-medium text-muted-foreground">Total Guidebooks</h4>
              <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <p className="text-3xl font-bold text-foreground">2</p>
          </div>
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-medium text-muted-foreground">Total Views</h4>
              <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
            <p className="text-3xl font-bold text-foreground">347</p>
          </div>
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-medium text-muted-foreground">Active Properties</h4>
              <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </div>
            <p className="text-3xl font-bold text-foreground">2</p>
          </div>
        </div>
      </main>
    </div>
  );
}
