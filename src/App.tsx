
import React, {useReducer, useMemo} from 'react';
import { AppStateContext, AppStateReducer,initializingAppStateWithSession } from "./context/AppContext";
import { IAppStateType, initial_AppState } from "./helpers/types";
import AppContent from './containers/AppContent'
import {BrowserRouter} from "react-router-dom"

function App() {
  const [initAppState, dispatch] = useReducer(
    AppStateReducer,
    initializingAppStateWithSession as IAppStateType
  )

  function AppWrapper(appState: IAppStateType) {
    return useMemo(
      ()=> (
        <BrowserRouter>
          <AppStateContext.Provider value={{ initAppState, dispatch}}>
            <AppContent />
          </AppStateContext.Provider>
        </BrowserRouter>
      ),[initAppState]
    );
  }
    
  return AppWrapper(initAppState);
}

export default App;
