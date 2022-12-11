const { hashPassword } = require('../../../utils/functions');
const { query } = require('../../../utils/mysql');



const findAll = async () => {
    const sql = `SELECT us.username, us.email FROM user us WHERE status = 1`;
    return await query(sql, []);
};

const findById = async (id) => {
    if (Number.isNaN(id)) throw Error('Wrong type');
    if (!id) throw Error('Missing fields');
    const sql = `SELECT us.username, us.email FROM user us WHERE us.id = ?;`;
    return await query(sql, [id]);
};

const save = async (user) => {
    if (!user.username ||!user.email || !user.password || !user.role || !user.person?.id)
        throw Error('Missing fields');
    const hashedPassword = await hashPassword(user.password);
    const sql = `INSERT INTO user (username,email,password,role,person_id)
        VALUES (?,?,?,?,?)`;
    const { insertId } = await query(sql, [
        user.username,
        user.email,
        hashedPassword,
        user.role,
        user.person.id,
    ]);
    delete user.password; // Elimina la propiedad del objeto user
    return { ...user, id: insertId };
};

const edit = async (user) => {
    //if (Number.isNaN(id)) throw Error('Wrong type');
    //if (!id) throw Error('Missing fields');
    if (
        !user.username||
        !user.email||
        !user.id
    )
        throw Error('Missing fields');
    const sql = `UPDATE USER SET username=?,email=? WHERE id=?`;
    await query(sql, [
        user.username,
        user.email,
        user.id
    ]);
    return {...user}
};

const changeStatus = async (user) => {
    console.log(user);
    if (!user.id)
        throw Error('Missing fields');
    const sql = `UPDATE user SET status=? WHERE id=?`;
    const {insertedId} = await query(sql, [
        user.status == 1?0:1,
        user.id
    ]);
    return {...user, id: insertedId}
}

const changePassword = async (user) => {
    console.log(user);
    if (!user.id, !user.password)
        throw Error('Missing fields');
    const hashedPassword = await hashPassword(user.password);
    const sql = `UPDATE user SET password=? WHERE id=?`;
    const {insertedId} = await query(sql, [
        hashedPassword,
        user.id
    ]);
    delete user.password;
    return {...user, id: insertedId}
}

module.exports = {
    save,
    edit,
    changeStatus,
    changePassword,
    findAll,
    findById
};