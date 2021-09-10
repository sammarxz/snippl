import {useContext} from 'react'
import {AppContext} from 'context/appContext'

export function useAppContext() {
  const context = useContext(AppContext)

  if (!context)
    throw new Error('useAppContext must be used inside a AppProvider')

  return context
}
