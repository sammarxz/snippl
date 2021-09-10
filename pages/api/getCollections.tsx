import {supabase} from 'utils/useSupabase'
import {NextApiRequest, NextApiResponse} from 'next'

export default async function getCollections(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const {
    query: {id},
  } = req
  let collections = []

  let {data: collection, error} = await supabase
    .from('collection')
    .select('*')
    .eq('user_id', id)

  if (collection) {
    const updatedCollections = collection.map(item => {
      return {
        ...item,
        isActive: false,
      }
    })

    updatedCollections[0].isActive = true
    collections = updatedCollections
  }

  return res.status(200).json({
    collections,
  })
}
