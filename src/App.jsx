import './App.css';
import Board from './components/Board/Board';
import AppContext from './contexts/Context';

import { useReducer } from 'react';
import {reducer} from './reducer/reducer';
import { initGameState } from './constant';
import Control from './components/Control/Control';
import MovesList from './components/Control/bits/MovesList';
import TakeBack from './components/Control/bits/TakeBack';
import SaveDrill from './components/Control/bits/SaveDrill';

function App() {

  const [appState, dispatch] = useReducer(reducer,initGameState)

  const providerState = {
      appState,
      dispatch
  }

  return (
    <AppContext.Provider value = {providerState} >
      <div className="App">
         <Board/>
         <Control>
            <MovesList />
            <SaveDrill />
            <TakeBack />
            
         </Control>
      </div>
    </AppContext.Provider>
  );
}

export default App;
