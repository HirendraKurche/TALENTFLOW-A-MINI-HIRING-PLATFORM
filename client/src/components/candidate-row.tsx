import { Mail, Phone, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { Candidate } from "@shared/schema";

interface CandidateRowProps {
  candidate: Candidate;
  onClick?: () => void;
}

const stageColors: Record<string, string> = {
  applied: "secondary",
  screening: "default",
  interview: "default",
  assessment: "default",
  offer: "default",
  rejected: "destructive",
};

export function CandidateRow({ candidate, onClick }: CandidateRowProps) {
  const initials = candidate.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <div
      className="flex items-center gap-4 p-4 border-b hover-elevate cursor-pointer"
      onClick={onClick}
      data-testid={`row-candidate-${candidate.id}`}
    >
      <Avatar className="h-10 w-10">
        <AvatarImage src={candidate.avatar || undefined} alt={candidate.name} />
        <AvatarFallback>{initials}</AvatarFallback>
      </Avatar>
      
      <div className="flex-1 min-w-0">
        <h4 className="font-medium truncate" data-testid={`text-candidate-name-${candidate.id}`}>{candidate.name}</h4>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Mail className="h-3 w-3" />
            <span className="truncate">{candidate.email}</span>
          </div>
          {candidate.phone && (
            <div className="flex items-center gap-1">
              <Phone className="h-3 w-3" />
              <span>{candidate.phone}</span>
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Badge variant={stageColors[candidate.stage] as any} data-testid={`badge-stage-${candidate.id}`}>
          {candidate.stage}
        </Badge>
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <Calendar className="h-3 w-3" />
          <span>{new Date(candidate.createdAt!).toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  );
}
