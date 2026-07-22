require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();


// importing database
const db = require('./models');

//midelware
app.use(express.json())
app.use(cors());

//routes
const authRoutes = require('./routes/authRoutes')
const clientRoutes = require('./routes/clientRoutes')
const commandeRoutes = require('./routes/commandeRoutes')
const livreurRoutes = require('./routes/livreurRoutes')
const statsRoutes = require('./routes/statsRoutes')
const settingsRoutes = require('./routes/settingsRoutes')
const missionRoutes = require('./routes/missions')

app.use('/api/auth', authRoutes)
app.use('/api/commandes', commandeRoutes)
app.use('/api/livreurs', livreurRoutes)
app.use('/api/clients', clientRoutes)
app.use('/api/stats', statsRoutes)
app.use('/api/settings', settingsRoutes)
app.use('/api/mission',missionRoutes)

db.sequelize.sync()
    .then(() => {
        console.log('Database connected');
        app.listen(3000, () => {
            console.log('server running on port 3000');
        });
    })
    .catch((err) => {
        console.log(err);
        process.exit(1);
    });