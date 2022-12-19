const { query } = require('../../../utils/mysql');
const {hashPassword} = require("../../../utils/functions");

const findAll = async () => {
    const sql = `SELECT pe.* FROM person pe WHERE status = 1`;
    return await query(sql, []);
};

const findById = async (id) => {
    if (Number.isNaN(id)) throw Error('Wrong type');
    if (!id) throw Error('Missing fields');
    const sql = `SELECT pe.* FROM person pe WHERE pe.id = ?;`;
    return await query(sql, [id]);
};

const save = async (person) => {
    if (
        !person.name ||
        !person.surname ||
        !person.birthday||
        !person.username ||!person.email || !person.password || !person.role
    )
        throw Error('Missing fields');
    const hashedPassword = await hashPassword(person.password);
    const sql = `INSERT INTO person (name,surname,lastname,birthday,username,email,password,role) VALUES (?,?,?,?,?,?,?,?)`;
    const { insertedId } = await query(sql, [
        person.name,
        person.surname,
        person.lastname || null,
        person.birthday,
        person.username,
        person.email,
        hashedPassword,
        person.role
    ]);
    delete person.password; // Elimina la propiedad del objeto user
    return { ...person, id: insertedId };
};


const edit = async (person) => {
    //if (Number.isNaN(id)) throw Error('Wrong type');
    //if (!id) throw Error('Missing fields');
    if (
        !person.name ||
        !person.surname ||
        !person.birthday ||
        !person.id
    )
        throw Error('Missing fields');
    const sql = `UPDATE  person SET name=?,surname=?,lastname=?,birthday=? WHERE id=?`;
    await query(sql, [
        person.name,
        person.surname,
        person.lastname || null,
        person.birthday,
        person.username,
        person.email,
        person.id
    ]);
    return {...person}
};


const changeStatus = async (user) => {
    console.log(user);
    if (!user.id)
        throw Error('Missing fields');
    const sql = `UPDATE person SET status=? WHERE id=?`;
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
    const sql = `UPDATE person SET password=? WHERE id=?`;
    const {insertedId} = await query(sql, [
        hashedPassword,
        user.id
    ]);
    delete user.password;
    return {...user, id: insertedId}
}

module.exports = {
    findAll,
    findById,
    save,
    edit,
    changePassword,
    changeStatus
};
