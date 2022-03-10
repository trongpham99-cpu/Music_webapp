const app = require('./server');
const http = require('http').Server(app);
const Database = require('./configs/database');
const key = require('./configs/key');

async function main() {
    await Database.instance.connect();
    http.listen(key.PORT, () => { console.log(`server is running !!!`);})
}
  
main();