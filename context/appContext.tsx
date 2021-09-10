import {createContext, useReducer} from 'react'

const defaultState = {
  selectedCollection: '',
  selectedSnippet: 0,
}

export interface SelectCollectionAction {
  type: 'SELECT_COLLECTION'
  payload: string
}

export interface SelectSnippetAction {
  type: 'SELECT_SNIPPET'
  payload: number
}

export type Action = SelectSnippetAction | SelectCollectionAction
export type State = typeof defaultState
export type Dispatch = (action: Action) => void

function AppReducer(state: State, action: Action) {
  switch (action.type) {
    case 'SELECT_COLLECTION':
      return {
        ...state,
        selectedCollection: action.payload,
      }
    case 'SELECT_SNIPPET':
      return {
        ...state,
        selectedSnippet: action.payload,
      }
    default:
      return state
  }
}

export const AppContext = createContext<{
  state: State
  dispatch: Dispatch
}>({
  state: defaultState,
  dispatch: () => null,
})

export function AppProvider({children}: {children: React.ReactNode}) {
  const [state, dispatch] = useReducer(AppReducer, defaultState)

  return (
    <AppContext.Provider value={{state, dispatch}}>
      {children}
    </AppContext.Provider>
  )
}
