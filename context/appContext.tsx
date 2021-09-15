import {createContext, useReducer} from 'react'

export type SnippetType = {
  id: string
  title: string
  description: string
  lang: string
  code: string
  created_at: string
  updated_at: Date | string
}

const defaultState:{
  selectedCollection: string,
  selectedSnippet: string,
  snippets: SnippetType[],
  snippet: SnippetType
} = {
  selectedCollection: '',
  selectedSnippet: '',
  snippets: [],
  snippet: {
    id: '',
    title: '',
    description: '',
    lang: '',
    code: '',
    created_at: '',
    updated_at: ''
  }
}

export interface SelectCollectionAction {
  type: 'SELECT_COLLECTION'
  payload: string
}

export interface SelectSnippetAction {
  type: 'SELECT_SNIPPET'
  payload: string
}

export interface SetSnippetAction {
  type: 'SET_SNIPPET'
  payload: SnippetType
}

export interface SetSnippetsAction {
  type: 'SET_SNIPPETS'
  payload: SnippetType[]
}

export type Action = 
  SelectSnippetAction | 
  SelectCollectionAction | 
  SetSnippetAction |
  SetSnippetsAction
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
    case 'SET_SNIPPET':
      return {
        ...state,
        snippet: action.payload
      }
    case 'SET_SNIPPETS':
      return {
        ...state,
        snippets: action.payload
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
