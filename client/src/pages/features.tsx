import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  Briefcase,
  CheckCircle,
  Trello,
  CheckSquare,
  BarChart3,
} from "lucide-react";

export default function Features() {
  const handleGetStarted = () => {
    window.location.href = "/dashboard";
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto max-w-7xl px-4 sm:px-10">
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
              <a href="/features" className="text-sm font-bold text-primary">
                Features
              </a>
            </nav>

            <div className="flex items-center gap-3">
              <Button onClick={handleGetStarted} className="rounded-lg">
                Start
              </Button>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="flex flex-col items-center gap-6 py-16 sm:py-24 text-center px-4">
          <div className="flex flex-col gap-4 max-w-3xl">
            <h1 className="text-4xl font-black leading-tight tracking-tighter sm:text-5xl md:text-6xl">
              Platform Features
            </h1>
            <p className="text-base font-normal leading-relaxed sm:text-lg text-muted-foreground">
              Discover the powerful tools that make TalentFlow the ultimate hiring and recruitment platform. Streamline your workflow, make data-driven decisions, and find the perfect candidates, faster than ever.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            <Button 
              size="lg" 
              onClick={handleGetStarted}
              className="rounded-lg px-8 shadow-lg hover:shadow-xl transition-shadow bg-gradient-to-r from-primary to-teal-500"
            >
              Start Free Trial
            </Button>
          </div>
        </section>

        <div className="container mx-auto max-w-7xl px-4 sm:px-10">
          <div className="flex flex-col gap-24 py-10">
            {/* Job Management Feature */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="flex flex-col gap-4">
                <div className="inline-flex items-center gap-3">
                  <div className="flex items-center justify-center size-12 rounded-lg bg-primary/10 text-primary">
                    <Briefcase className="h-6 w-6" />
                  </div>
                  <h2 className="text-3xl font-bold">Job Management</h2>
                </div>
                <p className="text-lg text-muted-foreground">
                  Effortlessly create, publish, and manage job postings across multiple platforms from a single, centralized dashboard. Our tools are designed to maximize visibility and attract top-tier talent.
                </p>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                    <span>
                      <strong className="text-foreground">One-Click Posting:</strong> Distribute job listings to major job boards and social media channels instantly.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                    <span>
                      <strong className="text-foreground">Customizable Templates:</strong> Create professional and consistent job descriptions with our easy-to-use templates.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                    <span>
                      <strong className="text-foreground">Branded Career Pages:</strong> Build a beautiful career page that reflects your company culture and attracts the right candidates.
                    </span>
                  </li>
                </ul>
              </div>
              <div className="rounded-xl shadow-lg overflow-hidden bg-gradient-to-br from-primary/10 to-blue-500/10 border aspect-[4/3] flex items-center justify-center">
                <div className="text-center p-8">
                  <Briefcase className="h-16 w-16 text-primary mx-auto mb-4" />
                  <p className="text-lg font-semibold text-muted-foreground">Job Management Dashboard</p>
                </div>
              </div>
            </section>

            {/* Candidate Pipeline Feature */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="flex flex-col gap-4 md:order-2">
                <div className="inline-flex items-center gap-3">
                  <div className="flex items-center justify-center size-12 rounded-lg bg-primary/10 text-primary">
                    <Trello className="h-6 w-6" />
                  </div>
                  <h2 className="text-3xl font-bold">Candidate Pipeline</h2>
                </div>
                <p className="text-lg text-muted-foreground">
                  Visualize and manage your entire hiring process with our intuitive drag-and-drop Kanban pipeline. Track candidates from application to hire, ensuring no talent gets lost in the process.
                </p>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                    <span>
                      <strong className="text-foreground">Visual Workflow:</strong> Move candidates through custom hiring stages with a simple, visual interface.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                    <span>
                      <strong className="text-foreground">Automated Communication:</strong> Set up triggers to automatically send emails and updates to candidates.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                    <span>
                      <strong className="text-foreground">Collaborative Hiring:</strong> Tag team members, leave notes, and share feedback to make collaborative decisions.
                    </span>
                  </li>
                </ul>
              </div>
              <div className="rounded-xl shadow-lg overflow-hidden md:order-1 bg-gradient-to-br from-blue-500/10 to-teal-500/10 border aspect-[4/3] flex items-center justify-center">
                <div className="text-center p-8">
                  <Trello className="h-16 w-16 text-primary mx-auto mb-4" />
                  <p className="text-lg font-semibold text-muted-foreground">Kanban Pipeline Board</p>
                </div>
              </div>
            </section>

            {/* Smart Assessments Feature */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="flex flex-col gap-4">
                <div className="inline-flex items-center gap-3">
                  <div className="flex items-center justify-center size-12 rounded-lg bg-primary/10 text-primary">
                    <CheckSquare className="h-6 w-6" />
                  </div>
                  <h2 className="text-3xl font-bold">Smart Assessments</h2>
                </div>
                <p className="text-lg text-muted-foreground">
                  Go beyond resumes. Integrate customizable skills tests, coding challenges, and video interviews directly into your workflow to identify the best candidates with data-backed confidence.
                </p>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                    <span>
                      <strong className="text-foreground">Skills Testing:</strong> Choose from a library of pre-built tests or create your own to evaluate specific abilities.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                    <span>
                      <strong className="text-foreground">One-Way Video Interviews:</strong> Save time by allowing candidates to record video responses at their convenience.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                    <span>
                      <strong className="text-foreground">Standardized Scorecards:</strong> Evaluate candidates consistently with scorecards tailored to each role's requirements.
                    </span>
                  </li>
                </ul>
              </div>
              <div className="rounded-xl shadow-lg overflow-hidden bg-gradient-to-br from-teal-500/10 to-green-500/10 border aspect-[4/3] flex items-center justify-center">
                <div className="text-center p-8">
                  <CheckSquare className="h-16 w-16 text-primary mx-auto mb-4" />
                  <p className="text-lg font-semibold text-muted-foreground">Assessment Reports</p>
                </div>
              </div>
            </section>

            {/* Analytics & Reports Feature */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="flex flex-col gap-4 md:order-2">
                <div className="inline-flex items-center gap-3">
                  <div className="flex items-center justify-center size-12 rounded-lg bg-primary/10 text-primary">
                    <BarChart3 className="h-6 w-6" />
                  </div>
                  <h2 className="text-3xl font-bold">Analytics & Reports</h2>
                </div>
                <p className="text-lg text-muted-foreground">
                  Make smarter hiring decisions with powerful analytics. Track key metrics, identify bottlenecks, and optimize your recruitment strategy with comprehensive, easy-to-understand reports.
                </p>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                    <span>
                      <strong className="text-foreground">Hiring Dashboards:</strong> Get a real-time overview of your entire hiring funnel, from source to hire.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                    <span>
                      <strong className="text-foreground">Source Effectiveness:</strong> Discover which channels are bringing you the best candidates and optimize your spending.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                    <span>
                      <strong className="text-foreground">Diversity & Inclusion Reporting:</strong> Track your D&I goals and build a more diverse workforce with actionable data.
                    </span>
                  </li>
                </ul>
              </div>
              <div className="rounded-xl shadow-lg overflow-hidden md:order-1 bg-gradient-to-br from-purple-500/10 to-pink-500/10 border aspect-[4/3] flex items-center justify-center">
                <div className="text-center p-8">
                  <BarChart3 className="h-16 w-16 text-primary mx-auto mb-4" />
                  <p className="text-lg font-semibold text-muted-foreground">Analytics Dashboard</p>
                </div>
              </div>
            </section>
          </div>

          {/* Final CTA */}
          <section className="py-16 sm:py-20">
            <div className="rounded-xl bg-primary dark:bg-slate-900/50 p-10 md:p-16 text-center flex flex-col items-center gap-6 border-2 border-primary/20">
              <h2 className="text-white text-3xl font-bold tracking-tight">
                Ready to Revolutionize Your Recruitment?
              </h2>
              <p className="text-slate-200 dark:text-slate-300 max-w-xl">
                Join hundreds of companies that trust TalentFlow to find, assess, and hire the best talent. Get started today and see the difference.
              </p>
              <Button 
                size="lg" 
                onClick={handleGetStarted}
                className="rounded-lg px-8 shadow-lg hover:shadow-xl transition-shadow bg-gradient-to-r from-blue-500 to-teal-500 text-white"
              >
                Request a Demo
              </Button>
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-card border-t">
        <div className="container mx-auto max-w-7xl px-4 sm:px-10 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <h3 className="text-sm font-semibold tracking-wider uppercase">Product</h3>
              <ul className="space-y-2">
                <li>
                  <a href="/features" className="text-base text-muted-foreground hover:text-primary">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="text-base text-muted-foreground hover:text-primary">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="text-base text-muted-foreground hover:text-primary">
                    Integrations
                  </a>
                </li>
                <li>
                  <a href="#" className="text-base text-muted-foreground hover:text-primary">
                    Demo
                  </a>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-semibold tracking-wider uppercase">Company</h3>
              <ul className="space-y-2">
                <li>
                  <a href="/about" className="text-base text-muted-foreground hover:text-primary">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="text-base text-muted-foreground hover:text-primary">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="text-base text-muted-foreground hover:text-primary">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="text-base text-muted-foreground hover:text-primary">
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-semibold tracking-wider uppercase">Support</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-base text-muted-foreground hover:text-primary">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="text-base text-muted-foreground hover:text-primary">
                    API Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="text-base text-muted-foreground hover:text-primary">
                    System Status
                  </a>
                </li>
              </ul>
            </div>

            <div className="space-y-4 col-span-2 md:col-span-1">
              <a href="/" className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity w-fit">
                <div className="w-6 h-6 bg-primary rounded flex items-center justify-center">
                  <Briefcase className="w-4 h-4 text-primary-foreground" />
                </div>
                <h2 className="text-lg font-bold">TalentFlow</h2>
              </a>
              <p className="text-sm text-muted-foreground">The future of hiring, today.</p>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">© 2024 TalentFlow, Inc. All rights reserved.</p>
            <div className="flex space-x-6">
              <a href="#" className="text-sm text-muted-foreground hover:text-primary">
                Privacy Policy
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-primary">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
