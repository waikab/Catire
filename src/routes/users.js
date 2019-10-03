const router = require('express').Router();
const User = require('../models/User');

const passport = require('passport');

router.get('/users/signin', (req, res) => {
    res.render('users/signin');
});

router.get('/users/signup', (req, res) => {
    res.render('users/signup');
});

router.post('/users/signin', passport.authenticate('local', {
    successRedirect: '/notes',
    failureRedirect: '/users/signin',
    failureFlash: true
}));

router.post('/users/signup', async(req, res) => {
    const {
        name,
        nombre,
        apellido,
        cedula,
        email,
        password,
        confirm_password
    } = req.body;

    const errors = [];
    if (name.length <= 0) {
        errors.push({
            text: 'Please insert your name'
        });
    }

    if (password != confirm_password) {
        errors.push({
            text: 'Password do no match'
        });
    }
    if (password.length < 4) {
        errors.push({
            text: 'Password must be at least 4 characters'
        });
    }
    if (nombre.length < 2) {
        errors.push({
            text: 'Nombre must be at least 2 characters'
        });
    }
    if (apellido.length < 2) {
        errors.push({
            text: 'Apellido must be at least 2 characters'
        });
    }
    if (cedula.length < 5) {
        errors.push({
            text: 'Cedula must be at least 5 characters'
        });
    }

    if (errors.length > 0) {
        res.render('users/signup', {
            errors,
            name,
            nombre,
            apellido,
            cedula,
            email,
            password,
            confirm_password
        });
    } else {
        const emailUser = await User.findOne({
            email: email
        });
        if (emailUser) {
            req.flash('success_msg', 'The email is already in use');
            res.redirect('/users/signup');
        }
        const NewUser = new User({
            name,
            email,
            password,
            nombre,
            apellido,
            cedula
        });
        NewUser.password = await NewUser.encryptPassword(password);
        NewUser.rol = "user";
        await NewUser.save();
        req.flash('errors_msg', 'You are Register');
        res.redirect('/users/signin');
    }
});

router.get('/users/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

module.exports = router;