import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  Briefcase,
  Users,
  FileText,
  BarChart3,
  Eye,
  Zap,
  Shield,
  Download,
  RotateCcw,
  Database as DatabaseIcon,
} from "lucide-react";

export default function Landing() {
  const handleGetStarted = () => {
    window.location.href = "/dashboard";
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <a href="/" className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity">
              <div className="w-6 h-6 bg-primary rounded flex items-center justify-center">
                <Briefcase className="w-4 h-4 text-primary-foreground" />
              </div>
              <h2 className="text-lg font-bold tracking-tight">TF | TalentFlow</h2>
            </a>

            {/* Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              <a href="/" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                Home
              </a>
              <a href="/about" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                About
              </a>
              <a href="/features" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                Features
              </a>
            </nav>
            <div className="flex items-center gap-3">
              <Button onClick={handleGetStarted} className="rounded-full shadow-lg">
                Start
              </Button>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 sm:py-28">
          <div className="absolute inset-0 -z-10 mx-auto max-w-6xl">
            <div className="absolute inset-y-0 left-0 w-1/3 bg-primary/5 rounded-full blur-3xl"></div>
            <div className="absolute inset-y-0 right-0 w-1/3 bg-blue-500/5 rounded-full blur-3xl"></div>
          </div>
          <div className="container mx-auto max-w-6xl px-4 text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
              TalentFlow — Professional Hiring Platform
            </h1>
            <h2 className="mt-6 text-lg leading-8 text-muted-foreground sm:text-xl">
              Streamline Your Hiring Process
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground">
              Find the best candidates with our intuitive and powerful tools. TalentFlow simplifies every step of your recruitment journey, from posting jobs to making the final offer.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Button 
                size="lg" 
                onClick={handleGetStarted}
                className="rounded-full px-8 shadow-lg shadow-primary/40 hover:shadow-xl transition-shadow"
              >
                Get Started
              </Button>
            </div>
            
            {/* Video Player */}
            <div className="mt-16 w-full max-w-4xl mx-auto">
              <div className="rounded-2xl overflow-hidden shadow-2xl border border-border">
                <video 
                  autoPlay
                  muted
                  loop
                  playsInline
                  controls 
                  className="w-full h-auto"
                >
                  <source src="/e51f2e93-9ad1-4484-9ac5-29043f95e567.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
          </div>
        </section>

        {/* Core Features Section */}
        <section id="features" className="py-16 sm:py-24">
          <div className="container mx-auto max-w-6xl px-4">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Core Features</h2>
              <p className="mt-4 text-lg leading-8 text-muted-foreground">
                Everything you need to manage your recruitment pipeline efficiently and effectively.
              </p>
            </div>
            <div className="mx-auto mt-16 grid max-w-none grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {/* Feature 1 */}
              <div className="flex flex-col gap-3 rounded-xl border bg-card p-6 shadow-sm transition-shadow hover:shadow-lg">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Briefcase className="h-6 w-6" />
                </div>
                <div className="flex flex-col gap-1">
                  <h3 className="text-lg font-bold">Job Management</h3>
                  <p className="text-sm text-muted-foreground">
                    Create, publish, and manage job postings across multiple platforms with ease.
                  </p>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="flex flex-col gap-3 rounded-xl border bg-card p-6 shadow-sm transition-shadow hover:shadow-lg">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Users className="h-6 w-6" />
                </div>
                <div className="flex flex-col gap-1">
                  <h3 className="text-lg font-bold">Candidate Pipeline</h3>
                  <p className="text-sm text-muted-foreground">
                    Visualize and track candidates through every stage of the hiring process.
                  </p>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="flex flex-col gap-3 rounded-xl border bg-card p-6 shadow-sm transition-shadow hover:shadow-lg">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <FileText className="h-6 w-6" />
                </div>
                <div className="flex flex-col gap-1">
                  <h3 className="text-lg font-bold">Smart Assessments</h3>
                  <p className="text-sm text-muted-foreground">
                    Use data-driven assessments to identify the most qualified candidates.
                  </p>
                </div>
              </div>

              {/* Feature 4 */}
              <div className="flex flex-col gap-3 rounded-xl border bg-card p-6 shadow-sm transition-shadow hover:shadow-lg">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <BarChart3 className="h-6 w-6" />
                </div>
                <div className="flex flex-col gap-1">
                  <h3 className="text-lg font-bold">Analytics & Reports</h3>
                  <p className="text-sm text-muted-foreground">
                    Gain valuable insights with comprehensive reports and analytics dashboards.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Key Advantages Section */}
        <section id="advantages" className="bg-muted/50 py-16 sm:py-24">
          <div className="container mx-auto max-w-6xl px-4">
            <h2 className="text-center text-3xl font-bold tracking-tight sm:text-4xl">
              Key Advantages
            </h2>
            <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              <div className="flex gap-4 rounded-xl p-4">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-blue-500/10 text-blue-500">
                  <Eye className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold">Pipeline Visibility</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Get a clear, real-time view of your entire candidate pipeline.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 rounded-xl p-4">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-blue-500/10 text-blue-500">
                  <Zap className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold">Fast Performance</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    A blazing-fast interface that keeps your team productive and focused.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 rounded-xl p-4">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-blue-500/10 text-blue-500">
                  <Shield className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold">Data Security</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Your data is safe with enterprise-grade security and compliance.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Data Management Section */}
        <section className="py-16 sm:py-24">
          <div className="container mx-auto max-w-3xl px-4 text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Complete Control Over Your Data
            </h2>
            <p className="mt-4 text-lg leading-8 text-muted-foreground">
              We believe in data ownership. Easily manage, export, or reset your recruitment data at any time, ensuring you're always in command.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button variant="outline" className="gap-2">
                <Download className="h-4 w-4" />
                Export All Data
              </Button>
              <Button variant="outline" className="gap-2">
                <RotateCcw className="h-4 w-4" />
                Reset Database
              </Button>
              <Button variant="outline" className="gap-2">
                <DatabaseIcon className="h-4 w-4" />
                View Storage Status
              </Button>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="container mx-auto max-w-6xl px-4 py-16 sm:py-24">
          <div className="rounded-xl bg-primary dark:bg-slate-900/50 p-10 md:p-16 text-center flex flex-col items-center gap-6 border-2 border-primary/20">
            <h2 className="text-white text-3xl font-bold tracking-tight sm:text-4xl">
              Ready to Get Started?
            </h2>
            <p className="text-slate-200 dark:text-slate-300 max-w-xl text-lg leading-8">
              Transform your hiring process today. Join thousands of companies that trust TalentFlow to find the best talent.
            </p>
            <Button 
              size="lg" 
              onClick={handleGetStarted}
              className="rounded-lg px-8 shadow-lg hover:shadow-xl transition-shadow bg-gradient-to-r from-blue-500 to-teal-500 text-white"
            >
              Start Now
            </Button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-muted/50 border-t">
        <div className="container mx-auto max-w-6xl px-4 py-12">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            <div className="col-span-2 md:col-span-1">
              <a href="/" className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity w-fit">
                <div className="w-6 h-6 bg-primary rounded flex items-center justify-center">
                  <Briefcase className="w-4 h-4 text-primary-foreground" />
                </div>
                <h2 className="text-lg font-bold">TalentFlow</h2>
              </a>
              <p className="mt-4 text-sm text-muted-foreground">
                The modern hiring platform for growing teams.
              </p>
            </div>

            <div>
              <h3 className="text-sm font-semibold">Product</h3>
              <ul className="mt-4 space-y-3">
                <li>
                  <a href="/features" className="text-sm text-muted-foreground hover:text-primary">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-muted-foreground hover:text-primary">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-muted-foreground hover:text-primary">
                    Integrations
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-muted-foreground hover:text-primary">
                    Demo
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold">Company</h3>
              <ul className="mt-4 space-y-3">
                <li>
                  <a href="/about" className="text-sm text-muted-foreground hover:text-primary">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-muted-foreground hover:text-primary">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-muted-foreground hover:text-primary">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold">Legal</h3>
              <ul className="mt-4 space-y-3">
                <li>
                  <a href="#" className="text-sm text-muted-foreground hover:text-primary">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-muted-foreground hover:text-primary">
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 border-t pt-8">
            <p className="text-sm text-muted-foreground text-center">
              © 2024 TalentFlow, Inc. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
