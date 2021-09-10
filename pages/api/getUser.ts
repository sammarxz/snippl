import {supabase} from 'utils/useSupabase'
import {NextApiRequest, NextApiResponse} from 'next'

export default async function getUser(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const user = await supabase.auth.user()
  return res.status(200).json({user: user})
}
