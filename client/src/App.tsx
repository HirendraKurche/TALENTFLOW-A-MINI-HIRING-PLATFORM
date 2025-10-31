import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { ThemeProvider } from "@/hooks/use-theme";
import Landing from "@/pages/landing";
import Dashboard from "@/pages/dashboard";
import Jobs from "@/pages/jobs";
import JobDetail from "@/pages/job-detail";
import Candidates from "@/pages/candidates";
import CandidateDetail from "@/pages/candidate-detail";
import Assessments from "@/pages/assessments";
import AssessmentRun from "@/pages/assessment-run";
import NotFound from "@/pages/not-found";
import { useEffect } from "react";
import { makeServer } from "./lib/mirage";
import { useIndexedDBSync } from "./hooks/use-indexeddb-sync";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Landing} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/jobs" component={Jobs} />
      <Route path="/jobs/:id" component={JobDetail} />
      <Route path="/candidates" component={Candidates} />
      <Route path="/candidates/:id" component={CandidateDetail} />
      <Route path="/assessments" component={Assessments} />
      <Route path="/assessments/:jobId/run" component={AssessmentRun} />
      <Route component={NotFound} />
    </Switch>
  );
}

function AppLayout() {
  const [location] = useLocation();
  const isLandingPage = location === "/";

  if (isLandingPage) {
    return <Router />;
  }

  return (
    <SidebarProvider style={{
      "--sidebar-width": "16rem",
      "--sidebar-width-icon": "3rem",
    } as React.CSSProperties}>
      <div className="flex h-screen w-full">
        <AppSidebar />
        <div className="flex flex-col flex-1">
          <header className="flex items-center justify-between p-4 border-b">
            <SidebarTrigger data-testid="button-sidebar-toggle" />
          </header>
          <main className="flex-1 overflow-auto p-8">
            <Router />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}

function App() {
  useIndexedDBSync();

  useEffect(() => {
    // Enable MirageJS in both development AND production for demo purposes
    const w = window as any;
    if (!w.__mirage) {
      w.__mirage = makeServer();
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <AppLayout />
          <Toaster />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
