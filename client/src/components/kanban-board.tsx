import { useState } from "react";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { KanbanColumn } from "./kanban-column";
import { KanbanCard } from "./kanban-card";
import type { Candidate } from "@shared/schema";

interface KanbanBoardProps {
  candidates: Candidate[];
  onStageChange?: (candidateId: string, newStage: string) => void;
  onCardClick?: (candidate: Candidate) => void;
}

const stages = [
  { id: "applied", title: "Applied", color: "bg-blue-500" },
  { id: "screening", title: "Screening", color: "bg-purple-500" },
  { id: "interview", title: "Interview", color: "bg-orange-500" },
  { id: "assessment", title: "Assessment", color: "bg-cyan-500" },
  { id: "offer", title: "Offer", color: "bg-green-500" },
  { id: "rejected", title: "Rejected", color: "bg-red-500" },
];

export function KanbanBoard({ candidates, onStageChange, onCardClick }: KanbanBoardProps) {
  const [activeCandidate, setActiveCandidate] = useState<Candidate | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    const candidate = candidates.find((c) => c.id === event.active.id);
    setActiveCandidate(candidate || null);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveCandidate(null);

    if (!over) return;

    const candidateId = active.id as string;
    const newStage = over.id as string;

    // Get the current candidate to check if stage actually changed
    const candidate = candidates.find((c) => c.id === candidateId);
    if (!candidate) return;

    // Only trigger update if stage actually changed
    if (candidate.stage !== newStage && stages.some((s) => s.id === newStage)) {
      onStageChange?.(candidateId, newStage);
    }
  };

  const getCandidatesByStage = (stageId: string) => {
    return candidates.filter((c) => c.stage === stageId);
  };

  return (
    <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 pb-4" data-testid="kanban-board">
        {stages.map((stage) => {
          const stageCandidates = getCandidatesByStage(stage.id);
          return (
            <KanbanColumn
              key={stage.id}
              id={stage.id}
              title={stage.title}
              count={stageCandidates.length}
              color={stage.color}
            >
              {stageCandidates.map((candidate) => (
                <KanbanCard
                  key={candidate.id}
                  candidate={candidate}
                  onClick={() => onCardClick?.(candidate)}
                />
              ))}
            </KanbanColumn>
          );
        })}
      </div>

      <DragOverlay>
        {activeCandidate ? <KanbanCard candidate={activeCandidate} isDragging /> : null}
      </DragOverlay>
    </DndContext>
  );
}
