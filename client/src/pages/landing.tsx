import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  Briefcase,
  Users,
  FileText,
  LayoutDashboard,
  ArrowRight,
  Shield,
  Zap,
  Database,
} from "lucide-react";
import { useState } from "react";

export default function Landing() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Since this is a demo, just redirect to dashboard
    window.location.href = "/dashboard";
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Briefcase className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <span className="text-xl font-bold tracking-tight">TalentFlow</span>
                <span className="ml-2 text-xs text-muted-foreground">HR Platform</span>
              </div>
            </div>

            {/* Theme Toggle */}
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-6xl grid md:grid-cols-2 gap-8 items-center">
          {/* Left Side - Login Form */}
          <Card className="w-full max-w-md mx-auto">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
              <CardDescription>
                Sign in to your TalentFlow HR account to manage hiring
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="hr@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" className="w-full" size="lg">
                  Sign In to Dashboard
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </form>

              <div className="mt-6 p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground mb-2">
                  <strong>Demo Access:</strong> This is a frontend-only demo
                </p>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => (window.location.href = "/dashboard")}
                >
                  Enter Demo Dashboard
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Right Side - Features Overview */}
          <div className="space-y-6 hidden md:block">
            <div>
              <h2 className="text-3xl font-bold mb-2">
                Internal Hiring Management System
              </h2>
              <p className="text-lg text-muted-foreground">
                Streamline your recruitment process from job posting to candidate onboarding
              </p>
            </div>

            <div className="space-y-4">
              {/* Feature 1 */}
              <div className="flex gap-4 p-4 rounded-lg border border-border bg-card">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <LayoutDashboard className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Manage Job Openings</h3>
                  <p className="text-sm text-muted-foreground">
                    Create, edit, and track all your job postings with advanced filtering and search
                  </p>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="flex gap-4 p-4 rounded-lg border border-border bg-card">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Users className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Track 1000+ Candidates</h3>
                  <p className="text-sm text-muted-foreground">
                    Visualize candidate pipeline with Kanban boards and manage stages efficiently
                  </p>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="flex gap-4 p-4 rounded-lg border border-border bg-card">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <FileText className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Custom Assessments</h3>
                  <p className="text-sm text-muted-foreground">
                    Build job-specific tests with multiple question types and conditional logic
                  </p>
                </div>
              </div>

              {/* Feature 4 */}
              <div className="flex gap-4 p-4 rounded-lg border border-border bg-card">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Database className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Local Data Persistence</h3>
                  <p className="text-sm text-muted-foreground">
                    All data stored locally with IndexedDB - no backend required for demo
                  </p>
                </div>
              </div>
            </div>

            {/* Tech Stack Info */}
            <div className="flex items-center gap-2 text-xs text-muted-foreground pt-4 border-t border-border">
              <Shield className="w-4 h-4" />
              <span>Frontend-only demo</span>
              <span>â€¢</span>
              <Zap className="w-4 h-4" />
              <span>Mock API with MirageJS</span>
              <span>â€¢</span>
              <Database className="w-4 h-4" />
              <span>IndexedDB Storage</span>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-6">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              Â© 2025 TalentFlow - Internal HR Platform Demo
            </p>
            <div className="flex gap-4 text-sm text-muted-foreground">
              <a href="#" className="hover:text-primary transition-colors">Documentation</a>
              <a href="#" className="hover:text-primary transition-colors">GitHub</a>
              <a href="#" className="hover:text-primary transition-colors">Technical Assignment</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
