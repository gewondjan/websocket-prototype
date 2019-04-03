
function getPool() {
    require('dotenv').config();
    const { Pool } = require('pg');
    const myPool = new Pool({connectionString: process.env.DATABASE_URL});
    return myPool;
}


exports.getPosts = function getPosts() {
    myPool = getPool();
    return myPool.query('SELECT * FROM posts ORDER BY id')
        .then((results) => {
            return JSON.stringify(results.rows);
            myPool.end();
        }).catch(e => {
            console.log(e.message);
        });
}

exports.increaseLikesByOne = function increaseLikesByOne(id) {
    myPool = getPool();
    return myPool.query('UPDATE posts SET likes = likes + 1 WHERE id = $1', [id])
    .then(() => {
        myPool.end();
    }).catch(e => e.message);
}

// (async () => {
//  await increaseLikesByOne(1);
//  await showPosts();
// })();

