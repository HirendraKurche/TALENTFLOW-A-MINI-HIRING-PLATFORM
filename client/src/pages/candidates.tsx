import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Search, LayoutGrid, LayoutList } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CandidateRow } from "@/components/candidate-row";
import { KanbanBoard } from "@/components/kanban-board";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useRef } from "react";
import type { Candidate } from "@shared/schema";
import { useLocation } from "wouter";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export default function Candidates() {
  const [, setLocation] = useLocation();
  const [search, setSearch] = useState("");
  const [stageFilter, setStageFilter] = useState("all");
  const [view, setView] = useState<"list" | "kanban">("kanban");
  const { toast } = useToast();

  const { data, isLoading } = useQuery({
    queryKey: ["/api/candidates", { search, stage: stageFilter }],
  });

  const candidates = data?.candidates || [];

  const filteredCandidates = candidates.filter((c: Candidate) => {
    const matchesSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase());
    const matchesStage = stageFilter === "all" || c.stage === stageFilter;
    return matchesSearch && matchesStage;
  });

  const updateStageMutation = useMutation({
    mutationFn: async ({ candidateId, newStage }: { candidateId: string; newStage: string }) => {
      const candidate = candidates.find((c: Candidate) => c.id === candidateId);
      const newTimeline = [
        ...(candidate?.timeline || []),
        {
          id: Math.random().toString(36),
          type: "stage_change",
          stage: newStage,
          timestamp: new Date().toISOString(),
        },
      ];
      
      return apiRequest(`/api/candidates/${candidateId}`, {
        method: "PATCH",
        body: JSON.stringify({ stage: newStage, timeline: newTimeline }),
      });
    },
    onMutate: async ({ candidateId, newStage }) => {
      await queryClient.cancelQueries({ queryKey: ["/api/candidates"] });

      const previousData = queryClient.getQueryData(["/api/candidates", { search, stage: stageFilter }]);

      queryClient.setQueryData(["/api/candidates", { search, stage: stageFilter }], (old: any) => {
        if (!old) return old;
        return {
          ...old,
          candidates: old.candidates.map((c: Candidate) =>
            c.id === candidateId ? { ...c, stage: newStage } : c
          ),
        };
      });

      return { previousData };
    },
    onError: (_err, _variables, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(["/api/candidates", { search, stage: stageFilter }], context.previousData);
      }
      toast({ title: "Failed to update candidate stage", variant: "destructive" });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/candidates"] });
      toast({ title: "Candidate stage updated successfully!" });
    },
  });

  const handleStageChange = (candidateId: string, newStage: string) => {
    updateStageMutation.mutate({ candidateId, newStage });
  };

  const parentRef = useRef<HTMLDivElement>(null);

  const virtualizer = useVirtualizer({
    count: filteredCandidates.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 80,
    overscan: 10,
  });

  return (
    <div className="space-y-6" data-testid="page-candidates">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-semibold mb-2">Candidates</h1>
          <p className="text-muted-foreground">
            Track {candidates.length} candidates through your hiring pipeline
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant={view === "list" ? "default" : "outline"}
            size="icon"
            onClick={() => setView("list")}
            data-testid="button-view-list"
            className="h-9 w-9"
          >
            <LayoutList className="h-4 w-4" />
          </Button>
          <Button
            variant={view === "kanban" ? "default" : "outline"}
            size="icon"
            onClick={() => setView("kanban")}
            data-testid="button-view-kanban"
            className="h-9 w-9"
          >
            <LayoutGrid className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
            data-testid="input-search-candidates"
          />
        </div>
        {view === "list" && (
          <Select value={stageFilter} onValueChange={setStageFilter}>
            <SelectTrigger className="w-40" data-testid="select-stage-filter">
              <SelectValue placeholder="Stage" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Stages</SelectItem>
              <SelectItem value="applied">Applied</SelectItem>
              <SelectItem value="screening">Screening</SelectItem>
              <SelectItem value="interview">Interview</SelectItem>
              <SelectItem value="assessment">Assessment</SelectItem>
              <SelectItem value="offer">Offer</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
        )}
      </div>

      {isLoading ? (
        <div className="space-y-4">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="h-20 bg-muted animate-pulse rounded-lg" />
          ))}
        </div>
      ) : view === "list" ? (
        <div
          ref={parentRef}
          className="border rounded-lg overflow-auto"
          style={{ height: "600px" }}
          data-testid="candidate-list"
        >
          <div
            style={{
              height: `${virtualizer.getTotalSize()}px`,
              width: "100%",
              position: "relative",
            }}
          >
            {virtualizer.getVirtualItems().map((virtualItem) => {
              const candidate = filteredCandidates[virtualItem.index];
              return (
                <div
                  key={candidate.id}
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: `${virtualItem.size}px`,
                    transform: `translateY(${virtualItem.start}px)`,
                  }}
                >
                  <CandidateRow
                    candidate={candidate}
                    onClick={() => setLocation(`/candidates/${candidate.id}`)}
                  />
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <KanbanBoard
          candidates={filteredCandidates}
          onStageChange={handleStageChange}
          onCardClick={(c) => setLocation(`/candidates/${c.id}`)}
        />
      )}
    </div>
  );
}
