const express = require('express');
const app = express();
const path = require('path');

const router = express.Router();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

const pagesPath = path.join(__dirname, '..', 'public', 'pages');

router.get('/{home}', (req, res) => {
    res.sendFile(path.join(pagesPath, 'home.html'));
});

/* 
router.param('id', (req, res, next, id) => {
    req.user = {id: id, name: `User${id}`};
    next();
});

router.get('/order/:id', (req, res, next) => {
    console.log(`Hello ${req.user.name}!`);
    res.send(`<h1>Hello ${req.user.name}</h1>`)
    next();
});
*/

router.get('/order', (req,res) => {
    res.sendFile(path.join(pagesPath, 'order.html'));
});

router.get('/oldpage', (req, res) => {
    res.sendFile(path.join(pagesPath, 'oldpage.html'));
});

router.get('/sign-up', (req, res) => {
    res.sendFile(path.join(pagesPath, 'sign-up.html'));
});

router.get("/user-profile", (req, res) => {
    res.sendFile(path.join(pagesPath, 'profile.html'));
});

router.post('/submit',(req, res) => {
    console.log(req.body);
    res.json(req.body);
});

module.exports = router;


