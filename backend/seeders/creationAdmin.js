'use strict '

const bcrypt = require('bcrypt')
const db = require('../models')

async function creationAdmin(){
    const hash = await bcrypt.hash("admin123",10);
    await db.User.create({
        email:"admin@gmail.com",
        nom:"admin",
        prenom:"admin",
        telephone:"065021030",
        role:"admin",
        password_hash:hash
    })

    console.log("admin created")
    process.exit()
}

creationAdmin();