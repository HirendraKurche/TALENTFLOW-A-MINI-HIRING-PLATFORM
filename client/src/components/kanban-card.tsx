import { useDraggable } from "@dnd-kit/core";
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
  } = useDraggable({ id: candidate.id });

  const style = {
    transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
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
      <CardHeader className="flex flex-row items-center gap-2 space-y-0 p-2">
        <div {...attributes} {...listeners} className="cursor-grab active:cursor-grabbing flex-shrink-0" data-testid="button-drag-candidate">
          <GripVertical className="h-4 w-4 text-muted-foreground" />
        </div>
        <Avatar className="h-7 w-7 flex-shrink-0">
          <AvatarImage src={candidate.avatar || undefined} alt={candidate.name} />
          <AvatarFallback className="text-xs">{initials}</AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <h4 className="font-medium text-xs truncate">{candidate.name}</h4>
          <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
            <Mail className="h-2.5 w-2.5 flex-shrink-0" />
            <span className="truncate">{candidate.email}</span>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
}
