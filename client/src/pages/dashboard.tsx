import { useQuery } from "@tanstack/react-query";
import { Briefcase, Users, FileText, TrendingUp } from "lucide-react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function Dashboard() {
  const { data: jobsData } = useQuery({
    queryKey: ["/api/jobs"],
  });

  const { data: candidatesData } = useQuery({
    queryKey: ["/api/candidates"],
  });

  const stats = [
    {
      title: "Active Jobs",
      value: jobsData?.jobs?.filter((j: any) => j.status === "active").length || 0,
      icon: Briefcase,
      color: "text-blue-500",
      link: "/jobs",
    },
    {
      title: "Total Candidates",
      value: candidatesData?.candidates?.length || 0,
      icon: Users,
      color: "text-green-500",
      link: "/candidates",
    },
    {
      title: "In Interview",
      value: candidatesData?.candidates?.filter((c: any) => c.stage === "interview").length || 0,
      icon: TrendingUp,
      color: "text-orange-500",
      link: "/candidates?stage=interview",
    },
    {
      title: "Assessments",
      value: 3,
      icon: FileText,
      color: "text-purple-500",
      link: "/assessments",
    },
  ];

  return (
    <div className="space-y-8" data-testid="page-dashboard">
      <div>
        <h1 className="text-3xl font-semibold mb-2">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome to TalentFlow. Here's an overview of your hiring pipeline.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Link key={stat.title} href={stat.link}>
            <Card className="hover-elevate cursor-pointer" data-testid={`card-stat-${stat.title.toLowerCase().replace(/\s/g, '-')}`}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Link href="/jobs">
              <Button variant="outline" className="w-full justify-start" data-testid="button-create-job">
                <Briefcase className="h-4 w-4 mr-2" />
                Create New Job
              </Button>
            </Link>
            <Link href="/candidates">
              <Button variant="outline" className="w-full justify-start" data-testid="button-view-candidates">
                <Users className="h-4 w-4 mr-2" />
                View All Candidates
              </Button>
            </Link>
            <Link href="/assessments">
              <Button variant="outline" className="w-full justify-start" data-testid="button-create-assessment">
                <FileText className="h-4 w-4 mr-2" />
                Create Assessment
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 text-sm">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-blue-500 mt-2" />
                <div>
                  <p className="font-medium">New job posted</p>
                  <p className="text-muted-foreground">Senior Frontend Engineer</p>
                  <p className="text-xs text-muted-foreground mt-1">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-green-500 mt-2" />
                <div>
                  <p className="font-medium">Candidate advanced</p>
                  <p className="text-muted-foreground">Emma Johnson moved to Interview stage</p>
                  <p className="text-xs text-muted-foreground mt-1">5 hours ago</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-purple-500 mt-2" />
                <div>
                  <p className="font-medium">Assessment completed</p>
                  <p className="text-muted-foreground">3 candidates submitted responses</p>
                  <p className="text-xs text-muted-foreground mt-1">1 day ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
