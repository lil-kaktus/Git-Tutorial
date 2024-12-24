console.log("index.js, v5")

let admin = {
    "user" : {
        "name" : "Admin",
        "mail" : "a.dmin@gmail.com"
    },
    "password" : "administrator123",
    "authorizations" : "ALL",
    "lastConnection" : new Date()
}

console.log(`${admin.user.name}'s e-mail address is ${admin.user.mail}.`)
console.log(`${admin.user.name} permissions are : ${admin.authorizations}`)
console.log(`${admin.name}'s last connection was : ${admin.lastConnection}.`)