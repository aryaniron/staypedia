import Link from 'next/link';

export default function GuidebookPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section with Cover Image */}
      <div className="relative h-64 bg-gradient-to-r from-primary/30 to-accent/30 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-foreground mb-2">Cozy Mountain Cabin</h1>
          <p className="text-lg text-muted-foreground">Welcome to your home away from home</p>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-border bg-card sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex gap-8 overflow-x-auto">
            <a href="#welcome" className="py-4 text-sm font-medium text-primary border-b-2 border-primary whitespace-nowrap">
              Welcome
            </a>
            <a href="#house-info" className="py-4 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap">
              House Info
            </a>
            <a href="#wifi" className="py-4 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap">
              WiFi & Codes
            </a>
            <a href="#recommendations" className="py-4 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap">
              Local Spots
            </a>
            <a href="#house-rules" className="py-4 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap">
              House Rules
            </a>
            <a href="#emergency" className="py-4 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap">
              Emergency
            </a>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Welcome Section */}
        <section id="welcome" className="mb-16">
          <div className="bg-card border border-border rounded-lg p-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">Welcome to Your Stay</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We're so happy to have you! This guidebook contains everything you need to know about the cabin and the local area.
              Our goal is to make your stay as comfortable and enjoyable as possible.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              If you have any questions during your stay, don't hesitate to reach out. We're here to help make your visit memorable!
            </p>
            <div className="mt-6 flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div>
                <p className="font-medium text-foreground">Sarah & Mike</p>
                <p className="text-sm text-muted-foreground">Your hosts</p>
              </div>
            </div>
          </div>
        </section>

        {/* House Information */}
        <section id="house-info" className="mb-16">
          <h2 className="text-2xl font-semibold text-foreground mb-6">House Information</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-foreground mb-2">Heating & Cooling</h3>
                  <p className="text-sm text-muted-foreground">Thermostat is in the living room. Set between 68-72°F for optimal comfort.</p>
                </div>
              </div>
            </div>
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-foreground mb-2">Kitchen Appliances</h3>
                  <p className="text-sm text-muted-foreground">Coffee maker, toaster, and blender ready to use. Dishwasher pods under the sink.</p>
                </div>
              </div>
            </div>
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-foreground mb-2">Fireplace</h3>
                  <p className="text-sm text-muted-foreground">Gas fireplace - flip switch on the right side. Firewood available for outdoor fire pit.</p>
                </div>
              </div>
            </div>
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-foreground mb-2">Entertainment</h3>
                  <p className="text-sm text-muted-foreground">Smart TV with Netflix, Hulu, and Disney+. Remote on the coffee table.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* WiFi & Access Codes */}
        <section id="wifi" className="mb-16">
          <h2 className="text-2xl font-semibold text-foreground mb-6">WiFi & Access Codes</h2>
          <div className="bg-card border border-border rounded-lg p-8">
            <div className="space-y-6">
              <div>
                <h3 className="font-medium text-foreground mb-2 flex items-center gap-2">
                  <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
                  </svg>
                  WiFi Network
                </h3>
                <div className="bg-muted p-4 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">Network Name:</p>
                  <p className="font-mono text-foreground">MountainCabin_5G</p>
                  <p className="text-sm text-muted-foreground mb-1 mt-3">Password:</p>
                  <p className="font-mono text-foreground">CozyStay2024!</p>
                </div>
              </div>
              <div>
                <h3 className="font-medium text-foreground mb-2 flex items-center gap-2">
                  <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                  </svg>
                  Door Lock Code
                </h3>
                <div className="bg-muted p-4 rounded-lg">
                  <p className="font-mono text-2xl text-foreground">1234#</p>
                  <p className="text-sm text-muted-foreground mt-2">Press the Schlage button, enter code, then press Schlage button again</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Local Recommendations */}
        <section id="recommendations" className="mb-16">
          <h2 className="text-2xl font-semibold text-foreground mb-6">Local Recommendations</h2>
          <div className="space-y-4">
            <div className="bg-card border border-border rounded-lg p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-foreground">Mountain View Cafe</h3>
                    <span className="text-sm text-muted-foreground">0.5 mi</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">Best breakfast in town! Try their homemade cinnamon rolls.</p>
                  <div className="flex gap-2 text-xs text-primary">
                    <span>Breakfast</span>
                    <span>•</span>
                    <span>Coffee</span>
                    <span>•</span>
                    <span>$$</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-card border border-border rounded-lg p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-foreground">Alpine Trail</h3>
                    <span className="text-sm text-muted-foreground">2 mi</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">Easy 3-mile loop with stunning valley views. Pet-friendly!</p>
                  <div className="flex gap-2 text-xs text-primary">
                    <span>Hiking</span>
                    <span>•</span>
                    <span>Easy</span>
                    <span>•</span>
                    <span>Free</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-card border border-border rounded-lg p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-foreground">Local Farmer's Market</h3>
                    <span className="text-sm text-muted-foreground">1.2 mi</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">Saturday mornings 8am-12pm. Fresh produce and artisan goods.</p>
                  <div className="flex gap-2 text-xs text-primary">
                    <span>Shopping</span>
                    <span>•</span>
                    <span>Weekends</span>
                    <span>•</span>
                    <span>Local</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* House Rules */}
        <section id="house-rules" className="mb-16">
          <h2 className="text-2xl font-semibold text-foreground mb-6">House Rules</h2>
          <div className="bg-card border border-border rounded-lg p-8">
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-muted-foreground">Check-in time is 3:00 PM, check-out is 11:00 AM</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-muted-foreground">Please respect quiet hours between 10:00 PM and 8:00 AM</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-muted-foreground">No smoking inside the cabin (designated outdoor area available)</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-muted-foreground">Pets are welcome! Please clean up after them and keep off furniture</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-muted-foreground">Take trash to the bins on your checkout day</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Emergency Information */}
        <section id="emergency" className="mb-16">
          <h2 className="text-2xl font-semibold text-foreground mb-6">Emergency Information</h2>
          <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-8">
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-foreground mb-4">Emergency Services</h3>
                <div className="space-y-2">
                  <p className="flex items-center gap-2 text-foreground">
                    <svg className="w-5 h-5 text-destructive" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <span className="font-medium">Emergency: 911</span>
                  </p>
                  <p className="flex items-center gap-2 text-muted-foreground">
                    <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span>Non-Emergency Police: (555) 123-4567</span>
                  </p>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-4">Host Contact</h3>
                <p className="flex items-center gap-2 text-muted-foreground">
                  <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span>Sarah & Mike: (555) 987-6543</span>
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">Important Locations</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Fire extinguisher: Kitchen cabinet under sink</li>
                  <li>• First aid kit: Bathroom medicine cabinet</li>
                  <li>• Nearest hospital: Mountain Regional Medical Center (5 miles)</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <div className="text-center pt-12 border-t border-border">
          <p className="text-muted-foreground mb-2">Enjoy your stay!</p>
          <Link href="/dashboard" className="text-sm text-primary hover:opacity-90">
            Back to Dashboard
          </Link>
        </div>
      </main>
    </div>
  );
}
