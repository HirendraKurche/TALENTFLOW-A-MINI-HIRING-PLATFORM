import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useRoute } from "wouter";
import { ArrowLeft, Mail, Phone, Linkedin, FileText, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Link } from "wouter";
import type { Candidate } from "@shared/schema";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { nanoid } from "nanoid";

export default function CandidateDetail() {
  const [, params] = useRoute("/candidates/:id");
  const candidateId = params?.id;
  const [note, setNote] = useState("");
  const { toast } = useToast();

  const { data: candidate, isLoading } = useQuery<Candidate>({
    queryKey: [`/api/candidates/${candidateId}`],
    enabled: !!candidateId,
  });

  const addNoteMutation = useMutation({
    mutationFn: async (noteText: string) => {
      const newTimeline = [
        ...(candidate?.timeline || []),
        {
          id: nanoid(),
          type: "note_added",
          note: noteText,
          timestamp: new Date().toISOString(),
        },
      ];

      return apiRequest(`/api/candidates/${candidateId}`, {
        method: "PATCH",
        body: JSON.stringify({ timeline: newTimeline, notes: noteText }),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/api/candidates/${candidateId}`] });
      setNote("");
      toast({ title: "Note added successfully!" });
    },
    onError: () => {
      toast({ title: "Failed to add note", variant: "destructive" });
    },
  });

  const handleAddNote = () => {
    if (!note.trim()) return;
    addNoteMutation.mutate(note);
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="h-8 w-48 bg-muted animate-pulse rounded" />
        <div className="h-64 bg-muted animate-pulse rounded-lg" />
      </div>
    );
  }

  if (!candidate) {
    return <div>Candidate not found</div>;
  }

  const initials = candidate.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  const renderNote = (text: string) => {
    const mentionRegex = /@(\w+)/g;
    const parts = text.split(mentionRegex);

    return parts.map((part, index) => {
      if (index % 2 === 1) {
        return (
          <span key={index} className="text-primary font-medium">
            @{part}
          </span>
        );
      }
      return <span key={index}>{part}</span>;
    });
  };

  return (
    <div className="space-y-6" data-testid="page-candidate-detail">
      <div className="flex items-center gap-4">
        <Link href="/candidates">
          <Button variant="ghost" size="icon" data-testid="button-back" className="h-9 w-9">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-semibold">{candidate.name}</h1>
          <p className="text-muted-foreground">Candidate Profile</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={candidate.avatar || undefined} alt={candidate.name} />
                  <AvatarFallback className="text-xl">{initials}</AvatarFallback>
                </Avatar>
                <div className="space-y-2">
                  <h2 className="text-xl font-semibold">{candidate.name}</h2>
                  <Badge>{candidate.stage}</Badge>
                </div>
              </div>

              <div className="space-y-3 pt-4">
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>{candidate.email}</span>
                </div>
                {candidate.phone && (
                  <div className="flex items-center gap-3">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span>{candidate.phone}</span>
                  </div>
                )}
                {candidate.linkedinUrl && (
                  <div className="flex items-center gap-3">
                    <Linkedin className="h-4 w-4 text-muted-foreground" />
                    <a href={candidate.linkedinUrl} className="text-primary hover:underline">
                      LinkedIn Profile
                    </a>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {candidate.timeline?.map((event) => (
                  <div key={event.id} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                      <div className="w-px h-full bg-border" />
                    </div>
                    <div className="flex-1 pb-4">
                      <p className="font-medium capitalize">{event.type.replace(/_/g, " ")}</p>
                      {event.stage && <p className="text-sm text-muted-foreground">Stage: {event.stage}</p>}
                      {event.note && <p className="text-sm mt-1">{renderNote(event.note)}</p>}
                      <p className="text-xs text-muted-foreground mt-1">
                        {new Date(event.timestamp).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start" data-testid="button-view-resume">
                <FileText className="h-4 w-4 mr-2" />
                View Resume
              </Button>
              <Button variant="outline" className="w-full justify-start" data-testid="button-schedule-interview">
                <Clock className="h-4 w-4 mr-2" />
                Schedule Interview
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Notes</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Add notes about this candidate... Use @name for mentions"
                rows={6}
                value={note}
                onChange={(e) => setNote(e.target.value)}
                data-testid="textarea-notes"
              />
              <Button
                className="w-full mt-3"
                onClick={handleAddNote}
                disabled={addNoteMutation.isPending || !note.trim()}
                data-testid="button-save-note"
              >
                {addNoteMutation.isPending ? "Saving..." : "Save Note"}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
