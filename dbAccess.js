

function showPosts() {
    require('dotenv').config();
    const { Pool } = require('pg');
    const myPool = new Pool({configurationString: process.env.DATABASE_URL});
    return myPool.query('SELECT * FROM posts')
        .then((results) => {
            console.log(results);
            myPool.end();
        }).catch(e => {
            console.log(e.message);
        });
}

(async () => {
await showPosts(); 
})();

