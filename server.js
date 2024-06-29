const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const path = require('path');
const routes = require('./routes');
const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;
const hbs = exphbs.create({});
app.engine('handlebars', hbs.engine);
app.set('view enging', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

const { Event } = require('./models');

app.get('/', (req, res) => {
    res.render('login'); //start the main.handlebars view
});

app.use(session({
    secret: process.env.SESSION_SECRET,
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
}));

app.use(routes);

sequelize.sync({ force: false }).then (() => {
    app.listen(PORT, () => console.log(`Now listening on port ${PORT}`));
});