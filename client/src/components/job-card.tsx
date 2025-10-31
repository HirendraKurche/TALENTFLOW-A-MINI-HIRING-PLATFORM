import { Briefcase, MapPin, Clock, Archive, Pencil, GripVertical } from "lucide-react";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Job } from "@shared/schema";

interface JobCardProps {
  job: Job;
  onEdit?: (job: Job) => void;
  onArchive?: (job: Job) => void;
  isDragging?: boolean;
  dragHandleProps?: any;
}

export function JobCard({ job, onEdit, onArchive, isDragging, dragHandleProps }: JobCardProps) {
  return (
    <Card className={isDragging ? "opacity-50" : ""} data-testid={`card-job-${job.id}`}>
      <CardHeader className="flex flex-row items-start justify-between gap-4 space-y-0 pb-3">
        <div className="flex items-start gap-3 flex-1">
          {dragHandleProps && (
            <div {...dragHandleProps} className="cursor-grab active:cursor-grabbing mt-1" data-testid="button-drag-job">
              <GripVertical className="h-4 w-4 text-muted-foreground" />
            </div>
          )}
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold truncate" data-testid={`text-job-title-${job.id}`}>{job.title}</h3>
            <p className="text-sm text-muted-foreground">{job.department}</p>
          </div>
        </div>
        <div className="flex gap-2">
          {onEdit && (
            <Button variant="ghost" size="icon" onClick={() => onEdit(job)} data-testid={`button-edit-job-${job.id}`} className="h-8 w-8">
              <Pencil className="h-4 w-4" />
            </Button>
          )}
          {onArchive && (
            <Button variant="ghost" size="icon" onClick={() => onArchive(job)} data-testid={`button-archive-job-${job.id}`} className="h-8 w-8">
              <Archive className="h-4 w-4" />
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm text-muted-foreground line-clamp-2">{job.description}</p>
        <div className="flex flex-wrap gap-2">
          {job.tags?.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="secondary" data-testid={`badge-tag-${tag}`}>
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex flex-wrap gap-4 text-sm text-muted-foreground pt-3">
        <div className="flex items-center gap-1">
          <MapPin className="h-3 w-3" />
          <span>{job.location}</span>
        </div>
        <div className="flex items-center gap-1">
          <Briefcase className="h-3 w-3" />
          <span>{job.employmentType}</span>
        </div>
        <div className="flex items-center gap-1">
          <Clock className="h-3 w-3" />
          <span>{new Date(job.createdAt!).toLocaleDateString()}</span>
        </div>
      </CardFooter>
    </Card>
  );
}
