const { query } = require('../../../utils/mysql');

const findAll = async () => {
    const sql = `SELECT ga.* FROM games ga WHERE status = 1`;
    return await query(sql, []);
};

const findById = async (id) => {
    if (Number.isNaN(id)) throw Error('Wrong type');
    if (!id) throw Error('Missing fields');
    const sql = `SELECT ga.* FROM games ga WHERE ga.id = ?;`;
    return await query(sql, [id]);
};

const save = async (game) => {
    if (
        !game.name ||
        !game.description ||
        !game.image ||
        !game.price
    )
        throw Error('Missing fields');
    const sql = `INSERT INTO games (name,description,image,price) VALUES (?,?,?,?)`;
    const { insertedId } = await query(sql, [
        game.name,
        game.description,
        game.image,
        game.price
    ]);
    return { ...game, id: insertedId };
};


const edit = async (game) => {
    //if (Number.isNaN(id)) throw Error('Wrong type');
    //if (!id) throw Error('Missing fields');
    if (
        !game.name||
        !game.description||
        !game.image||
        !game.price||
        !game.id
    )
        throw Error('Missing fields');
    const sql = `UPDATE games SET name=?,description=?,image=?,price=? WHERE id=?`;
    await query(sql, [
        game.name,
        game.description,
        game.image,
        game.price,
        game.id
    ]);
    return {...game}
};

const changeStatus = async (game) => {
    console.log(game);
    if (!game.id)
        throw Error('Missing fields');
    const sql = `UPDATE games SET status=? WHERE id=?`;
    const {insertedId} = await query(sql, [
        game.status == 1?0:1,
        game.id
    ]);
    return {...game, id: insertedId}
}

module.exports = {
    findAll,
    findById,
    save,
    edit,
    changeStatus
};
