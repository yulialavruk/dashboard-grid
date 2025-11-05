import React, { createContext, useContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import type { ChartData } from "chart.js";

export type BlockType = "line" | "bar" | "text";

export type BlockDataMap = {
  line: ChartData<"line">;
  bar: ChartData<"bar">;
  text: { content: string[] };
};

export interface BlockItem<T extends BlockType = BlockType> {
  id: string;
  type: BlockType;
  position: number;
  data: BlockDataMap[T];
}

interface BlocksContextType {
  blocks: BlockItem[];
  addBlock: <T extends BlockType>(type: T, data: BlockDataMap[T]) => void;
  deleteBlock: (id: string) => void;
  moveBlock: (id: string, toPosition: number) => void;
}

const BlocksContext = createContext<BlocksContextType | undefined>(undefined);

export const BlocksProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [blocks, setBlocks] = useState<BlockItem[]>([]);

  const addBlock =  <T extends BlockType>(type: T, data: BlockDataMap[T]) => {
    let newPosition = 0;
    while (blocks.some((b) => b.position === newPosition)) {
      newPosition++;
    }

    const newBlock: BlockItem<T> = { id: uuidv4(), type, data, position: newPosition };
    setBlocks((prev) =>
      [...prev, newBlock].sort((a, b) => a.position - b.position)
    );
  };

  const deleteBlock = (id: string) => {
    setBlocks((prev) => prev.filter((b) => b.id !== id));
  };

 const moveBlock = (id: string, toPosition: number) => {
  if (blocks.some((b) => b.position === toPosition)) return;
  setBlocks((prev) =>
    prev.map((b) => (b.id === id ? { ...b, position: toPosition } : b))
  );
};

  return (
    <BlocksContext.Provider value={{ blocks, addBlock, deleteBlock, moveBlock }}>
      {children}
    </BlocksContext.Provider>
  );
};

export const useBlocks = () => {
  const ctx = useContext(BlocksContext);
  if (!ctx) throw new Error("useBlocks must be used within BlocksProvider");
  return ctx;
};
