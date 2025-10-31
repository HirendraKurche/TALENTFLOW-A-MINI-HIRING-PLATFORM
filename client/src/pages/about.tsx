import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  Briefcase,
  Trello,
  GitCommit,
  CheckSquare,
} from "lucide-react";

export default function About() {
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
              <a href="/about" className="text-sm font-bold text-primary">
                About
              </a>
              <a href="/features" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
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
        <section className="flex flex-col items-center gap-8 py-16 sm:py-24 text-center px-4">
          <div className="flex flex-col gap-4 max-w-3xl">
            <h1 className="text-4xl font-black leading-tight tracking-tighter sm:text-5xl md:text-6xl">
              About Our Platform
            </h1>
            <h2 className="text-lg font-medium leading-normal sm:text-xl text-primary">
              Transform Your Hiring Process With Smarter, Faster, Data-Driven Technology
            </h2>
            <p className="text-base font-normal leading-relaxed sm:text-lg text-muted-foreground">
              TalentFlow is on a mission to revolutionize recruitment. We provide HR professionals with the intelligent tools they need to find, assess, and hire top talent, turning a complex process into a streamlined, strategic advantage.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            <Button 
              size="lg" 
              onClick={handleGetStarted}
              className="rounded-lg px-8 shadow-lg hover:shadow-xl transition-shadow bg-gradient-to-r from-primary to-blue-500"
            >
              Get Started
            </Button>
          </div>
        </section>

        {/* Stats Section */}
        <section className="container mx-auto max-w-7xl px-4 sm:px-10">
          <div className="flex flex-wrap justify-center gap-8 py-16 sm:py-20">
            <div className="flex min-w-[280px] flex-1 flex-col gap-2 rounded-xl p-8 bg-card border shadow-md">
              <p className="tracking-tight text-5xl font-bold">120k+</p>
              <p className="text-primary text-lg font-semibold leading-normal">Users Worldwide</p>
              <p className="text-muted-foreground text-base">
                Joining our platform to streamline their hiring and find the best candidates efficiently.
              </p>
            </div>
            <div className="flex min-w-[280px] flex-1 flex-col gap-2 rounded-xl p-8 bg-card border shadow-md">
              <p className="tracking-tight text-5xl font-bold">120+</p>
              <p className="text-primary text-lg font-semibold leading-normal">Companies Trusting Us</p>
              <p className="text-muted-foreground text-base">
                From innovative startups to Fortune 500s, businesses rely on TalentFlow for their recruitment needs.
              </p>
            </div>
          </div>
        </section>

        {/* Platform Overview */}
        <section className="container mx-auto max-w-7xl px-4 sm:px-10 py-16 sm:py-20">
          <div className="flex flex-col items-center text-center gap-4 mb-12 max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
              Find Your Strategic Workforce Planning Partners Today
            </h2>
            <p className="text-base font-normal leading-relaxed sm:text-lg text-muted-foreground">
              Our platform is designed to streamline every aspect of your recruitment process, helping you achieve your strategic workforce goals with precision and efficiency.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature Card 1 */}
            <div className="flex flex-col gap-4 rounded-xl p-6 bg-card border text-left transition-all hover:shadow-lg hover:-translate-y-1">
              <div className="flex items-center justify-center size-12 rounded-lg bg-primary/10 text-primary">
                <Trello className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold">Smart Job Management</h3>
              <p className="text-muted-foreground">
                Easily create and manage job postings. Our smart system distributes them to the right channels to attract qualified candidates.
              </p>
            </div>

            {/* Feature Card 2 */}
            <div className="flex flex-col gap-4 rounded-xl p-6 bg-card border text-left transition-all hover:shadow-lg hover:-translate-y-1">
              <div className="flex items-center justify-center size-12 rounded-lg bg-primary/10 text-primary">
                <GitCommit className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold">Candidate Pipeline Management</h3>
              <p className="text-muted-foreground">
                Visualize your hiring process with our intuitive Kanban boards. Track applicants from screening to offer with simple drag-and-drop.
              </p>
            </div>

            {/* Feature Card 3 */}
            <div className="flex flex-col gap-4 rounded-xl p-6 bg-card border text-left transition-all hover:shadow-lg hover:-translate-y-1">
              <div className="flex items-center justify-center size-12 rounded-lg bg-primary/10 text-primary">
                <CheckSquare className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold">Comprehensive Assessment Tools</h3>
              <p className="text-muted-foreground">
                Integrate skills tests, video interviews, and scorecards directly into your workflow to make data-driven hiring decisions.
              </p>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="container mx-auto max-w-7xl px-4 sm:px-10 py-16 sm:py-20">
          <div className="rounded-xl bg-primary dark:bg-slate-900/50 p-10 md:p-16 text-center flex flex-col items-center gap-6 border-2 border-primary/20">
            <h2 className="text-white text-3xl font-bold tracking-tight">
              Ready to Elevate Your Hiring Strategy?
            </h2>
            <p className="text-slate-200 dark:text-slate-300 max-w-xl">
              See TalentFlow in action. Schedule a personalized demo to discover how our platform can help you hire better, faster.
            </p>
            <Button 
              size="lg" 
              onClick={handleGetStarted}
              className="rounded-lg px-8 shadow-lg hover:shadow-xl transition-shadow bg-gradient-to-r from-blue-500 to-teal-500 text-white"
            >
              Sign in for Demo
            </Button>
          </div>
        </section>
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
