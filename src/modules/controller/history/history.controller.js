const { Response, Router } = require('express');
const validateError = require('../../../utils/functions');
const { findById, save } = require('./history.gateway');


const getById = async (req, res = Response) => {
    try {
        const { id } = req.params;
        const history = await findById(id);
        res.status(200).json(history);
    } catch (error) {
        console.log(error);
        const message = validateError(error);
        res.status(400).json({ message });
    }
};

const insert = async (req, res = Response) => {
    try {
        const { games, user} = req.body;
        const game = await save({
            games,
            user
        });
        res.status(200).json(game);
    } catch (error) {
        console.log(error);
        const message = validateError(error);
        res.status(400).json({ message });
    }
};

const historyRouter = Router();

historyRouter.get(`/:id`, [], getById);
historyRouter.post(`/`, [], insert);

module.exports = {
    historyRouter,
};
