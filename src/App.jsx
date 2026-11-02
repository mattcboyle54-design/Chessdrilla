import './App.css';
import Board from './components/Board/Board';
import AppContext from './contexts/Context';

import { useReducer } from 'react';
import {reducer} from './reducer/reducer';
import { initGameState } from './constant';
import MovesList from './components/Control/RightControl/bits/MovesList';
import TakeBack from './components/Control/RightControl/bits/TakeBack';
import SaveDrill from './components/Control/RightControl/bits/SaveDrill';
import LeftControl from './components/Control/LeftControl/LeftControl';
import RightControl from './components/Control/RightControl/RightControl';
import DrillCollection from './components/Control/LeftControl/bits/DrillCollection';
import PlayDrill from './components/Control/LeftControl/bits/PlayDrill';

function App() {

  const [appState, dispatch] = useReducer(reducer,initGameState)

  const providerState = {
      appState,
      dispatch
  }

  return (
    <AppContext.Provider value = {providerState} >
      <div className="App">

         <LeftControl>
            <DrillCollection/>
            <PlayDrill />
         </LeftControl>

         <Board/>

         <RightControl>
            <MovesList />
            <SaveDrill />
            <TakeBack />
         </RightControl>


         
      </div>
    </AppContext.Provider>
  );
}

export default App;
