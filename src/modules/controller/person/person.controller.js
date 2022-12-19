const { Response, Router } = require('express');
const validateError = require('../../../utils/functions');
const { findAll, findById, save, edit } = require('./person.gateway');
const {changeStatus, changePassword} = require("../user/user.gateway");

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
        const { name, surname, lastname, birthday, username, email, password, role} = req.body;

        const person = await save({
            name,
            surname,
            lastname,
            birthday,
            username,
            email,
            password,
            role
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
        const { name, surname, lastname, birthday, username, email,id } = req.body;
        const person = await edit({
            name,
            surname,
            lastname,
            birthday,
            username,
            email,
            id
        });
        res.status(200).json(person);
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
        const user = await changeStatus({
            id,
            status
        });
        res.status(200).json(user);
    } catch (error) {
        console.log(error);
        const message = validateError(error);
        res.status(400).json({ message });
    }
};


const updatePassword = async (req, res = Response) => {
    try {
        //const { id } = req.params;
        const {id, password } = req.body;
        const user = await changePassword({
            id,
            password
        });
        res.status(200).json(user);
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
personRouter.delete(`/`, [], updateStatus);
personRouter.put(`/password`, [], updatePassword);

module.exports = {
    personRouter,
};
