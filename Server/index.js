const app = require('./server');
const http = require('http').Server(app);
const Database = require('./configs/database');

async function main() {
    await Database.instance.connect();
    http.listen( 3000, () => { console.log(`server is running !!!`);})
}
  
main();