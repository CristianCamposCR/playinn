const { query } = require('../../../utils/mysql');

const findAll = async () => {
    const sql = `SELECT pe.* FROM person pe`;
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
        !person.birthday
    )
        throw Error('Missing fields');
    const sql = `INSERT INTO person (name,surname,lastname,birthday) VALUES (?,?,?,?)`;
    const { insertedId } = await query(sql, [
        person.name,
        person.surname,
        person.lastname || null,
        person.birthday
    ]);
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
        person.id
    ]);
    return {...person}
};


module.exports = {
    findAll,
    findById,
    save,
    edit
};
