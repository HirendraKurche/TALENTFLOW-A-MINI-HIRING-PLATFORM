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
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
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

    if (stages.some((s) => s.id === newStage)) {
      onStageChange?.(candidateId, newStage);
    }
  };

  const getCandidatesByStage = (stageId: string) => {
    return candidates.filter((c) => c.stage === stageId);
  };

  return (
    <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div className="flex gap-4 overflow-x-auto pb-4" data-testid="kanban-board">
        {stages.map((stage) => {
          const stageCandidates = getCandidatesByStage(stage.id);
          return (
            <SortableContext
              key={stage.id}
              items={stageCandidates.map((c) => c.id)}
              strategy={verticalListSortingStrategy}
            >
              <KanbanColumn
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
            </SortableContext>
          );
        })}
      </div>

      <DragOverlay>
        {activeCandidate ? <KanbanCard candidate={activeCandidate} isDragging /> : null}
      </DragOverlay>
    </DndContext>
  );
}
