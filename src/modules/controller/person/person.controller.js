const { Response, Router } = require('express');
const validateError = require('../../../utils/functions');
const { findAll, findById, save, edit } = require('./person.gateway');

const getAll = async (req, res = Response) => {
    try {
        const personal = await findAll();
        res.status(200).json(personal);
    } catch (error) {
        console.log(error);
        const message = validateError(error);
        res.status(400).json({ message }); //{message:""}
    }
};

const getById = async (req, res = Response) => {
    try {
        const { id } = req.params;
        const person = await findById(id);
        res.status(200).json(person);
    } catch (error) {
        console.log(error);
        const message = validateError(error);
        res.status(400).json({ message });
    }
};

const insert = async (req, res = Response) => {
    try {
        const { name, surname, lastname, birthday} = req.body;
        const person = await save({
            name,
            surname,
            lastname,
            birthday
        });
        res.status(200).json(person);
    } catch (error) {
        console.log(error);
        const message = validateError(error);
        res.status(400).json({ message });
    }
};

const update = async (req, res = Response) => {
    try {
        //const { id } = req.params;
        const { name, surname, lastname, birthday, id } = req.body;
        const person = await edit({
            name,
            surname,
            lastname,
            birthday,
            id
        });
        res.status(200).json(person);
    } catch (error) {
        console.log(error);
        const message = validateError(error);
        res.status(400).json({ message });
    }
};

const personRouter = Router();

personRouter.get(`/`, [], getAll);
personRouter.get(`/:id`, [], getById);
personRouter.post(`/`, [], insert);
personRouter.put(`/`,[], update );

module.exports = {
    personRouter,
};
