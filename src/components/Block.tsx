import type { BlockItem } from "../context/BlocksContext";
import { useBlocks } from "../context/BlocksContext";
import "../styles/block.css";
import { Line, Bar } from "react-chartjs-2";
import type { ChartData } from "chart.js";

interface Props {
  block: BlockItem;
}

export default function Block({ block: { position, data, type, id } }: Props) {
  const { deleteBlock } = useBlocks();

  const row = Math.floor(position / 3) + 1;
  const col = (position % 3) + 1;

  const renderContent = () => {
    switch (type) {
      case "line":
        return (
          <Line
            data={data as ChartData<"line">}
            options={{ responsive: true, maintainAspectRatio: false }}
          />
        );
      case "bar":
        return (
          <Bar
            data={data as ChartData<"bar">}
            options={{ responsive: true, maintainAspectRatio: false }}
          />
        );
      case "text":
        return (
          <div className="text-block">
            {(data as { content: string[] }).content.map((i) => (
              <p>{i}</p>
            ))}
          </div>
        );
    }
  };

  return (
    <div className="block" style={{ gridColumn: col, gridRow: row }}>
      <button
        className="delete"
        onClick={() => deleteBlock(id)}
        onPointerDown={(e) => e.stopPropagation()}
        onMouseDown={(e) => e.stopPropagation()}
      >
        ×
      </button>
      <h3>Widget</h3>
      <div className="block-content">{renderContent()}</div>
    </div>
  );
}
