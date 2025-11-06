import {
  DndContext,
  useDraggable,
  useDroppable,
  type DragEndEvent,
} from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { useBlocks } from "../context/BlocksContext";
import Block from "./Block";
import "../styles/canvas.css";

const DEFAULT_CELLS = 6; // Minimum number of cells always visible on the grid
const EXTRA_CELLS = 4; // Extra cells added after the last occupied position

export default function Canvas() {
  const { blocks, moveBlock } = useBlocks();

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;
    const fromId = active.id as string;
    const toPosition = Number(over.id);

    const targetFilled = blocks.some((b) => b.position === toPosition);
    if (targetFilled) return;

    moveBlock(fromId, toPosition);
  };

  const maxPosition = Math.max(0, ...blocks.map((b) => b.position)); // Find the highest occupied grid position
  const totalCells = Math.max(DEFAULT_CELLS, maxPosition + EXTRA_CELLS); // Determine total visible cells

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="canvas">
        {Array.from({ length: totalCells }).map((_, i) => {
          const block = blocks.find((b) => b.position === i);
          return (
            <Cell key={i} id={i}>
              {block && <DraggableBlock block={block} />}
            </Cell>
          );
        })}
      </div>
    </DndContext>
  );
}

function Cell({ id, children }: { id: number; children?: React.ReactNode }) {
  const { isOver, setNodeRef } = useDroppable({
    id: id.toString(),
  });

  return (
    <div ref={setNodeRef} className={`cell ${isOver ? "over" : ""}`}>
      {children}
    </div>
  );
}

function DraggableBlock({ block }: any) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: block.id,
    });

  const style = {
    transform: CSS.Translate.toString(transform),
    opacity: isDragging ? 0.8 : 1,
    zIndex: isDragging ? 1000 : "auto",
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="block-wrapper"
    >
      <Block block={block} />
    </div>
  );
}
