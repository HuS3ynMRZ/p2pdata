const { MongoClient } = require('mongodb')

/**
 * Sample code to test if your system is working
 */

async function main () {
  const uri = 'mongodb://127.0.0.1:27017'
  const client = new MongoClient(uri)

  try {
    await client.connect()
    await listDatabases(client)
  } catch (e) {
    console.error(e)
  } finally {
    await client.close()
    console.log('Success !')
  }
}

async function listDatabases (client) {
  const databasesList = await client.db().admin().listDatabases()

  console.log('Databases:')
  databasesList.databases.forEach(db => console.log(` - ${db.name}`))
};

main().catch(console.error)
