const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const cookieParser = require("cookie-parser");

const PORT = process.env.PORT || 3500;

app.use(cors({
    origin: `http://localhost: ${PORT}`,
    credentials: true
}));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/', express.static(path.join(__dirname, 'public')));


const { logRequest } = require('./middleware/logEvents');
const logError = require('./middleware/logEvents');
const verifyJWT = require('./middleware/verifyJWT');


app.use(logRequest);
app.use('/', require('./routes/root'));
app.use('/register', require('./routes/api/register'));
app.use('/auth', require('./routes/api/auth'));
app.use('/refresh', require('./routes/api/refresh'));
app.use('/logout', require('./routes/api/logout')); 

app.use(verifyJWT);
app.use('/employees', require('./routes/api/employees'));

app.use('/{*splat}', (req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'public', 'pages', 'notfound.html'));
});

//app.use(logError);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT} and at 127.0.0.1/localhost`);
});














 