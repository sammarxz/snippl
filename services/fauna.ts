import {Client} from 'faunadb'

export const fauna = new Client({
  secret: process.env.FAUNDADB_KEY || 'secret',
  domain: 'db.us.fauna.com',
})
