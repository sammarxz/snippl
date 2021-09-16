import {useRouter} from 'next/router'
import {Button} from '@chakra-ui/react'
import {SupabaseClient} from '@supabase/supabase-js'
import {FaGithub} from 'react-icons/fa'

type AuthProps = {
  supabase: SupabaseClient
}

export const Auth = ({supabase}: AuthProps) => {
  const router = useRouter()

  const signInWithGithub = async () => {
    const { user, session, error } = await supabase.auth.signIn({
      provider: 'github',
    }, {
      redirectTo: 'app'
    })

    if (!error) {
      console.log('ok')
      router.push('app')
    }
  }

  return (
    <Button
      colorScheme="green"
      bg="green.300"
      _hover={{bg: "green.400"}}
      textColor="blackAlpha.900"
      leftIcon={<FaGithub />}
      onClick={signInWithGithub}
    >
      Sign in with Github
    </Button>
  )
}
