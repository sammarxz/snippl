import {Button} from '@chakra-ui/react'
import {SupabaseClient} from '@supabase/supabase-js'
import {FaGithub} from 'react-icons/fa'

type AuthProps = {
  supabase: SupabaseClient
}

export const Auth = ({supabase}: AuthProps) => {
  const signInWithGithub = () => {
    supabase.auth.signIn({
      provider: 'github',
    })
  }

  return (
    <Button
      colorScheme="purple"
      bg="purple.300"
      textColor="blackAlpha.900"
      leftIcon={<FaGithub />}
      onClick={signInWithGithub}
    >
      Sign in with Github
    </Button>
  )
}
