import Link from 'next/link';

export default function BlogsPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-8">
              <Link href="/">
                <h1 className="text-2xl font-semibold text-primary">Staypedia</h1>
              </Link>
              <div className="hidden md:flex gap-6">
                <Link href="/dashboard" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                  Dashboard
                </Link>
                <Link href="/blogs" className="text-sm font-medium text-primary">
                  Blog
                </Link>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Link
                href="/signin"
                className="text-sm font-medium text-foreground hover:text-primary transition-colors"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Header */}
      <div className="bg-card border-b border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h2 className="text-4xl font-bold text-foreground mb-4">Host Tips & Stories</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Insights, tips, and inspiration for creating unforgettable guest experiences
          </p>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Featured Post */}
        <article className="mb-16">
          <div className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
            <div className="h-64 bg-gradient-to-r from-primary/30 to-accent/30"></div>
            <div className="p-8">
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                <span>Featured</span>
                <span>•</span>
                <span>5 min read</span>
                <span>•</span>
                <span>Jan 15, 2024</span>
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-3">
                10 Ways to Make Your Guests Feel at Home
              </h3>
              <p className="text-muted-foreground mb-4">
                Creating a warm, welcoming environment goes beyond clean sheets and fresh towels.
                Discover the small touches that turn a good stay into an unforgettable experience.
              </p>
              <Link
                href="/blogs/1"
                className="inline-flex items-center gap-2 text-primary font-medium hover:opacity-90"
              >
                Read more
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </article>

        {/* Blog Posts Grid */}
        <div className="space-y-8">
          <article className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
            <div className="md:flex">
              <div className="md:w-1/3 h-48 md:h-auto bg-primary/20"></div>
              <div className="p-6 md:w-2/3">
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                  <span>Hosting Tips</span>
                  <span>•</span>
                  <span>4 min read</span>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  Creating the Perfect Welcome Package
                </h3>
                <p className="text-muted-foreground text-sm mb-3">
                  First impressions matter. Learn how to curate a thoughtful welcome package
                  that delights your guests from the moment they arrive.
                </p>
                <Link
                  href="/blogs/2"
                  className="inline-flex items-center gap-2 text-primary text-sm font-medium hover:opacity-90"
                >
                  Read more
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </article>

          <article className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
            <div className="md:flex">
              <div className="md:w-1/3 h-48 md:h-auto bg-accent/20"></div>
              <div className="p-6 md:w-2/3">
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                  <span>Technology</span>
                  <span>•</span>
                  <span>6 min read</span>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  Digital Guidebooks vs. Paper Binders
                </h3>
                <p className="text-muted-foreground text-sm mb-3">
                  Explore the benefits of modern digital guidebooks and why more hosts are
                  making the switch from traditional paper manuals.
                </p>
                <Link
                  href="/blogs/3"
                  className="inline-flex items-center gap-2 text-primary text-sm font-medium hover:opacity-90"
                >
                  Read more
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </article>

          <article className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
            <div className="md:flex">
              <div className="md:w-1/3 h-48 md:h-auto bg-primary/10"></div>
              <div className="p-6 md:w-2/3">
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                  <span>Local Love</span>
                  <span>•</span>
                  <span>5 min read</span>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  How to Curate Local Recommendations
                </h3>
                <p className="text-muted-foreground text-sm mb-3">
                  Share your favorite hidden gems and local spots that will make your guests'
                  stay truly memorable and authentic.
                </p>
                <Link
                  href="/blogs/4"
                  className="inline-flex items-center gap-2 text-primary text-sm font-medium hover:opacity-90"
                >
                  Read more
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </article>

          <article className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
            <div className="md:flex">
              <div className="md:w-1/3 h-48 md:h-auto bg-accent/10"></div>
              <div className="p-6 md:w-2/3">
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                  <span>Success Stories</span>
                  <span>•</span>
                  <span>3 min read</span>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  Host Spotlight: Sarah's Mountain Retreat
                </h3>
                <p className="text-muted-foreground text-sm mb-3">
                  Meet Sarah, a Superhost who transformed her guest experience with a
                  beautifully crafted digital guidebook.
                </p>
                <Link
                  href="/blogs/5"
                  className="inline-flex items-center gap-2 text-primary text-sm font-medium hover:opacity-90"
                >
                  Read more
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </article>
        </div>

        {/* Newsletter Signup */}
        <div className="mt-16 bg-primary/5 border border-primary/20 rounded-lg p-8 text-center">
          <h3 className="text-2xl font-semibold text-foreground mb-2">Stay Updated</h3>
          <p className="text-muted-foreground mb-6">
            Get the latest hosting tips and updates delivered to your inbox
          </p>
          <form className="max-w-md mx-auto flex gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 border border-input rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
            <button
              type="submit"
              className="bg-primary text-primary-foreground px-6 py-2 rounded-lg font-medium hover:opacity-90 transition-opacity"
            >
              Subscribe
            </button>
          </form>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-8 px-4 sm:px-6 lg:px-8 mt-16">
        <div className="max-w-7xl mx-auto text-center text-muted-foreground">
          <p>Made with care for hosts who care</p>
        </div>
      </footer>
    </div>
  );
}
