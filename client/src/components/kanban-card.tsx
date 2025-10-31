import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Mail, GripVertical } from "lucide-react";
import type { Candidate } from "@shared/schema";

interface KanbanCardProps {
  candidate: Candidate;
  isDragging?: boolean;
  onClick?: () => void;
}

export function KanbanCard({ candidate, isDragging, onClick }: KanbanCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: candidate.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const initials = candidate.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <Card
      ref={setNodeRef}
      style={style}
      className={`cursor-pointer ${isDragging ? "opacity-50" : ""}`}
      onClick={onClick}
      data-testid={`kanban-card-${candidate.id}`}
    >
      <CardHeader className="flex flex-row items-center gap-3 space-y-0 p-3">
        <div {...attributes} {...listeners} className="cursor-grab active:cursor-grabbing" data-testid="button-drag-candidate">
          <GripVertical className="h-4 w-4 text-muted-foreground" />
        </div>
        <Avatar className="h-8 w-8">
          <AvatarImage src={candidate.avatar || undefined} alt={candidate.name} />
          <AvatarFallback className="text-xs">{initials}</AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <h4 className="font-medium text-sm truncate">{candidate.name}</h4>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Mail className="h-3 w-3" />
            <span className="truncate">{candidate.email}</span>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
}
