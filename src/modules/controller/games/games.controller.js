const { Response, Router } = require('express');
const validateError = require('../../../utils/functions');
const { findAll, findById, save, edit, changeStatus } = require('./games.gateway');

const getAll = async (req, res = Response) => {
    try {
        const games = await findAll();
        res.status(200).json(games);
    } catch (error) {
        console.log(error);
        const message = validateError(error);
        res.status(400).json({ message }); //{message:""}
    }
};

const getById = async (req, res = Response) => {
    try {
        const { id } = req.params;
        const game = await findById(id);
        res.status(200).json(game);
    } catch (error) {
        console.log(error);
        const message = validateError(error);
        res.status(400).json({ message });
    }
};

const insert = async (req, res = Response) => {
    try {
        const { name, description, image, price} = req.body;
        const game = await save({
            name,
            description,
            image,
            price
        });
        res.status(200).json(game);
    } catch (error) {
        console.log(error);
        const message = validateError(error);
        res.status(400).json({ message });
    }
};

const update = async (req, res = Response) => {
    try {
        //const { id } = req.params;
        const { name, description, image, price, status, id } = req.body;
        const game = await edit({
            name,
            description,
            image,
            price,
            status,
            id
        });
        res.status(200).json(game);
    } catch (error) {
        console.log(error);
        const message = validateError(error);
        res.status(400).json({ message });
    }
};

const updateStatus = async (req, res = Response) => {
    try {
        //const { id } = req.params;
        const {id, status } = req.body;
        const game = await changeStatus({
            id,
            status
        });
        res.status(200).json(game);
    } catch (error) {
        console.log(error);
        const message = validateError(error);
        res.status(400).json({ message });
    }
};

const gameRouter = Router();

gameRouter.get(`/`, [], getAll);
gameRouter.get(`/:id`, [], getById);
gameRouter.post(`/`, [], insert);
gameRouter.put(`/`,[], update );
gameRouter.delete(`/`,[],updateStatus);

module.exports = {
    gameRouter,
};
