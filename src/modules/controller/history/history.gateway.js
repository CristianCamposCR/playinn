const { query } = require('../../../utils/mysql');



const findById = async (id) => {
    if (Number.isNaN(id)) throw Error('Wrong type');
    if (!id) throw Error('Missing fields');
    const sql = `select ga.name, ga.description, ga.image, us.username from shopping_history s inner join
games ga on s.games_id = ga.id inner join user us on s.user_id = us.id where s.user_id = ?;;`;
    return await query(sql, [id]);
};


/*const findById = async (history) => {
    if (!history.user?.id)
        throw Error('Missing fields');
    const sql = `select ga.name, ga.description, ga.image, us.username from shopping_history s inner join
games ga on s.games_id = ga.id inner join user us on s.user_id = us.id where s.user_id = ?;`;
    return await query(sql, [history.user.id]);
};
*/
const save = async (history) => {
    if (!history.games?.id ||!history.user?.id)
        throw Error('Missing fields');
    const sql = `INSERT INTO shopping_history (games_id,user_id)
        VALUES (?,?)`;
    const { insertId } = await query(sql, [
        history.games.id,
        history.user.id
    ]);
    return { ...history, id: insertId };
};



module.exports = {
    save,
    findById
};