import { BlocksProvider } from './context/BlocksContext';
import Toolbar from './components/Toolbar';
import Canvas from './components/Canvas';
import './styles/global.css';

function App() {
  return (
    <BlocksProvider>
      <Toolbar />
      <Canvas />
    </BlocksProvider>
  );
}

export default App;
