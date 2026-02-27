import Link from 'next/link';

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <h1 className="text-3xl font-semibold text-primary">Staypedia</h1>
          </Link>
          <h2 className="mt-6 text-2xl font-medium text-foreground">Create your account</h2>
          <p className="mt-2 text-muted-foreground">Start creating beautiful guidebooks</p>
        </div>

        <div className="bg-card p-8 rounded-lg border border-border shadow-sm">
          <form className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                Full name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                className="w-full px-4 py-2 border border-input rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder="Jane Doe"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="w-full px-4 py-2 border border-input rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-foreground mb-2">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                className="w-full px-4 py-2 border border-input rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder="••••••••"
              />
            </div>

            <div>
              <label htmlFor="confirm-password" className="block text-sm font-medium text-foreground mb-2">
                Confirm password
              </label>
              <input
                id="confirm-password"
                name="confirm-password"
                type="password"
                autoComplete="new-password"
                required
                className="w-full px-4 py-2 border border-input rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder="••••••••"
              />
            </div>

            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  required
                  className="h-4 w-4 rounded border-input text-primary focus:ring-ring"
                />
              </div>
              <div className="ml-2">
                <label htmlFor="terms" className="text-sm text-muted-foreground">
                  I agree to the{' '}
                  <a href="#" className="font-medium text-primary hover:opacity-90">
                    Terms of Service
                  </a>{' '}
                  and{' '}
                  <a href="#" className="font-medium text-primary hover:opacity-90">
                    Privacy Policy
                  </a>
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-primary text-primary-foreground py-2 px-4 rounded-lg font-medium hover:opacity-90 transition-opacity"
            >
              Create account
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Already have an account?{' '}
              <Link href="/signin" className="font-medium text-primary hover:opacity-90">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
