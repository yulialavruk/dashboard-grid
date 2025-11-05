import { useBlocks } from "../context/BlocksContext";
import { lineData, barData, textData } from "../mock/data";

export default function Toolbar() {
  const { addBlock } = useBlocks();

  return (
    <div className="toolbar">
      <button onClick={() => addBlock("line", lineData)}>Add Line Chart</button>
      <button onClick={() => addBlock("bar", barData)}>Add Bar Chart</button>
      <button onClick={() => addBlock("text", textData)}>Add Text Block</button>
    </div>
  );
}
