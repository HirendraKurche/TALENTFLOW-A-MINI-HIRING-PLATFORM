import { useDroppable } from "@dnd-kit/core";
import { Badge } from "@/components/ui/badge";

interface KanbanColumnProps {
  id: string;
  title: string;
  count: number;
  color: string;
  children: React.ReactNode;
}

export function KanbanColumn({ id, title, count, color, children }: KanbanColumnProps) {
  const { setNodeRef, isOver } = useDroppable({ id });

  return (
    <div
      ref={setNodeRef}
      className={`flex flex-col w-full ${
        isOver ? "opacity-75" : ""
      }`}
      data-testid={`kanban-column-${id}`}
    >
      <div className="sticky top-0 z-10 bg-background pb-3">
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${color}`} />
            <h3 className="font-semibold text-sm truncate">{title}</h3>
          </div>
          <Badge variant="secondary" className="text-xs flex-shrink-0">
            {count}
          </Badge>
        </div>
      </div>
      
      <div className={`flex flex-col gap-3 min-h-[200px] rounded-md p-2 overflow-y-auto max-h-[calc(100vh-300px)] ${
        isOver ? "bg-accent/50 border-2 border-dashed border-primary" : "border-2 border-transparent"
      }`}>
        {children}
      </div>
    </div>
  );
}
