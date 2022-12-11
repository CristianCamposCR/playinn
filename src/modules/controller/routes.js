const { personRouter } = require('./person/person.controller');
const { userRouter } = require('./user/user.controller');
const { gameRouter } = require('./games/games.controller');
const { authRouter } = require('./auth/auth.controller');
const { historyRouter } = require('./history/history.controller');
module.exports = {
    personRouter,
    userRouter,
    gameRouter,
    authRouter,
    historyRouter
}