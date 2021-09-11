/* eslint-disable react/display-name */
import {ReactNode} from 'react'
import {useRouter} from 'next/router'
import useSupabase from './useSupabase'

export const withAuth = (WrappedComponent: ReactNode | any) => {
  return (props: JSX.IntrinsicAttributes) => {
    if (typeof window !== 'undefined') {
      const {session} = useSupabase()
      const Router = useRouter()

      if (!session) {
        Router.replace('/')
        return null
      }

      return <WrappedComponent {...props} />
    }

    return null
  }
}

export default withAuth
