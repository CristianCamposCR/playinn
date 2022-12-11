const { Response, Router } = require('express');
const { validateError } = require('../../../utils/functions');
const { save, changePassword,edit, changeStatus,findAll, findById} = require('../user/user.gateway');
const { transporter, template } = require('../../../utils/email-service');


const getAll = async (req, res = Response) => {
    try {
        const user = await findAll();
        res.status(200).json(user);
    } catch (error) {
        console.log(error);
        const message = validateError(error);
        res.status(400).json({ message }); //{message:""}
    }
};

const getById = async (req, res = Response) => {
    try {
        const { id } = req.params;
        const user = await findById(id);
        res.status(200).json(user);
    } catch (error) {
        console.log(error);
        const message = validateError(error);
        res.status(400).json({ message });
    }
};

const saveAndFlush = async (req, res = Response) => {
    try {
        const { username,email, password, role, person } = req.body;
        const user = await save({ username,email, password, role, person });
        /*const info = await transporter.sendMail({
            from: `Cristian Campos <${ process.env.EMAIL_USER }>`,
            to: email,
            subject: 'Successful Registration',
            html: template('Nombre completo', 'Comentarios y creo que todos uya están en extra', email)
        });*/
        //console.log(info);
        res.status(200).json(user);
    } catch (error) {
        console.log(error);
        const message = validateError(error);
        res.status(400).json({ message }); //{message:""}
    }
};


const update = async (req, res = Response) => {
    try {
        //const { id } = req.params;
        const { username, email, id } = req.body;
        const user = await edit({
            username,
            email,
            id
        });
        res.status(200).json(user);
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

const userRouter = Router();
userRouter.get(`/`, [], getAll);
userRouter.get(`/:id`, [], getById);
userRouter.post(`/`, [], saveAndFlush);
userRouter.put(`/`, [], update);
userRouter.delete(`/`, [], updateStatus);
userRouter.put(`/password`, [], updatePassword);


module.exports = { userRouter };
