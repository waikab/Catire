const router = require('express').Router();

const Bebida = require('../models/Bebida');
const {
    isAuthenticated
} = require('../helpers/auth');

router.get('/products/new-bebida', isAuthenticated, (req, res) => {
    res.render('products/new-bebida');
});

router.post('/products/new-bebida', isAuthenticated, async(req, res) => {
    const {
        description
    } = req.body;
    const errors = [];
    if (!description) {
        errors.push({
            text: 'Please Write a Description'
        });
    }
    if (errors.length > 0) {
        res.render('products/new-bebida', {
            errors,
            description
        });
    } else {
        const newBebida = new Bebida({
            description
        });
        await newBebida.save();
        req.flash('success_msg', 'Bebida Added Successfully');
        res.redirect('/products');
    }
});

router.put('/products/edit-bebida/:id', isAuthenticated, async(req, res) => {
    const {
        description
    } = req.body;

    await Bebida.findByIdAndUpdate(req.params.id, {
        description
    });
    req.flash('success_msg', 'Producto Updated Successfully');
    res.redirect('/products');
});


router.get('/products', isAuthenticated, async(req, res) => {
    const bebidas = await Bebida.find();
    res.render('products/all-bebidas', {
        bebidas
    });
});

router.delete('/products/delete/:id', isAuthenticated, async(req, res) => {
    await Bebida.findByIdAndDelete(req.params.id);
    req.flash('success_msg', 'Product Deleted Successfully');
    res.redirect('/products');
});

router.get('/products/edit/:id', isAuthenticated, async(req, res) => {
    const bebida = await Bebida.findById(req.params.id);
    res.render('products/edit-bebida', {
        bebida
    });
});

module.exports = router;