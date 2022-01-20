import { createConnection } from "typeorm"

// Run on first use of server to create the tables on database
async function createTables() {
  await createConnection()
    .then((connection) => {
      return console.log("Tables created!")
    })
    .catch((error) => {
      return console.log(error.message)
    })
}

createTables()
// After the tables are created set the "synchronize" value to false on ormconfig.json
