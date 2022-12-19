const { generateToken } = require('../../../config/jwt');
const { validatePassword } = require('../../../utils/functions');
const { query } = require('../../../utils/mysql');

const login = async (person) => {
    if (!person.email || !person.password) throw Error('Missing fields');
    const sql = `SELECT * FROM person WHERE email = ? and status = 1;`;
    const existsUser = await query(sql, [person.email]);
    if (await validatePassword(person.password, existsUser[0].password)) {
        return {
            token: generateToken({
                username: existsUser[0].username,
                email: person.email,
                role: existsUser[0].role,
                id: existsUser[0].id
            }),
        };
    }
    throw Error('Password mismatch');
};
module.exports = { login };