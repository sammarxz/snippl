/* eslint-disable react/display-name */
import {useRouter} from 'next/router'
import useSupabase from './useSupabase'

const withAuth = (WrappedComponent: React.FC) => {
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
