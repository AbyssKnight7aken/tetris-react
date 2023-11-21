import { Routes, Route } from 'react-router-dom';
import './App.css';
import Game from './components/Game/Game';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Game rows={20} columns={10} />}/>
      </Routes>
    </div>
  );
}

export default App;
