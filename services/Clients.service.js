const { MongoConnection } = require('../lib/Mongo');
var ObjectId = require("mongodb").ObjectID;
var randtoken = require('rand-token');

const COLLECTION = "clients"

const findUsers = (id) => new Promise(async(resolve, reject) => {
    try {
        const DB = await MongoConnection();
        const clients = DB.collection(COLLECTION);
        const clientsList = await clients.find({}).toArray();
        if(id != undefined){
            var filterResult = clientsList.filter((persona) => persona._id == id);
            resolve(filterResult);
        }
        resolve(clientsList);
    } catch (error) {
        reject(error);
    }
});

const createUser = (primer_nombre, segundo_nombre, primer_apellido, segundo_apellido,rol) => new Promise(async(resolve, reject) => {
    try {
        const DB = await MongoConnection();
        const clients = DB.collection(COLLECTION);
        var token = randtoken.generate(16);
        const result = await clients.insertOne({
            primer_nombre: primer_nombre,
            segundo_nombre: segundo_nombre,
            primer_apellido: primer_apellido,
            segundo_apellido: segundo_apellido,
            codigo_acceso: token,
            password: token,
            rol: "60e0a8c76f7aad1cf87b35a5",
            nuevo_usuario: true
        });
        resolve(result);

    } catch (error) {
        reject(error);
    }
});

const updateUser = (id, primer_nombre, segundo_nombre, primer_apellido, segundo_apellido) => new Promise(async (resolve, reject) => {
    try {
        const DB = await MongoConnection()
        const clients = DB.collection(COLLECTION)
        const result = await clients.updateOne(
            { "_id" : ObjectId(id) },
            { $set: { primer_nombre, segundo_nombre, primer_apellido, segundo_apellido } }
        );
        console.log(result);
        resolve(result);
    } catch (error) {
        reject(error);
    }
})

const deleteUser = (id) => new Promise(async (resolve, reject) => {
    try {
        const DB = await MongoConnection()
        const clients = DB.collection(COLLECTION)
        const result = await clients.deleteOne(
            { "_id" : ObjectId(id) }
        );
        console.log(result);
        resolve(result);
    } catch (error) {
        reject(error);
    }
})

//////
// COLECCION ROLES
//////
const COLLECTION2 = "roles"

const findRol = (id) => new Promise(async(resolve, reject) => {
    try {
        const DB = await MongoConnection();
        const roles = DB.collection(COLLECTION2);
        const rolesList = await roles.find({}).toArray();
        if(id != undefined){
            var filterResult = rolesList.filter((rol) => rol._id == id);
            resolve(filterResult);
        }
        resolve(rolesList);
    } catch (error) {
        reject(error);
    }
});

const createRol = (roles) => new Promise(async (resolve, reject) => {
    try {
        const DB = await MongoConnection()
        const rol = DB.collection(COLLECTION2)
        const result = await rol.insertOne(roles)
        resolve(result);
    } catch (error) {
        reject(error)
    }
})

const updateRol = (id, nombre, permisos) => new Promise(async (resolve, reject) => {
    try {
        const DB = await MongoConnection()
        const rol = DB.collection(COLLECTION2)
        const result = await rol.updateOne(
            { "_id" : ObjectId(id) },
            { $set: { nombre: nombre, permisos: permisos } }
        );
        console.log(result);
        resolve(result);
    } catch (error) {
        reject(error);
    }
})

const deleteRol = (id) => new Promise(async (resolve, reject) => {
    try {
        const DB = await MongoConnection()
        const clients = DB.collection(COLLECTION2)
        const result = await clients.deleteOne(
            { "_id" : ObjectId(id) }
        );
        console.log(result);
        resolve(result);
    } catch (error) {
        reject(error);
    }
})

//////
// COLECCION Permisos
//////
const COLLECTION3 = "permisos"
const findPerm = (id) => new Promise(async(resolve, reject) => {
    try {
        const DB = await MongoConnection();
        const permisos = DB.collection(COLLECTION3);
        const permisosList = await permisos.find({}).toArray();

        if(id != undefined){
            var filterResult = permisosList.filter((permiso) => permiso._id == id);
            resolve(filterResult);
        }

        resolve(permisosList);
    } catch (error) {
        reject(error);
    }
});

const createPerm = (permiso) => new Promise(async (resolve, reject) => {
    try {
        const DB = await MongoConnection()
        const perm = DB.collection(COLLECTION3)
        const result = await perm.insertOne(permiso)
        resolve(result);
    } catch (error) {
        reject(error)
    }
})

const updatePerm = (id, nombre) => new Promise(async (resolve, reject) => {
    try {
        const DB = await MongoConnection()
        const perm = DB.collection(COLLECTION3)
        const result = await perm.updateOne(
            { "_id" : ObjectId(id) },
            { $set: { nombre: nombre } }
        );
        console.log(result);
        resolve(result);
    } catch (error) {
        reject(error);
    }
})

const deletePerm = (id) => new Promise(async (resolve, reject) => {
    try {
        const DB = await MongoConnection()
        const perm = DB.collection(COLLECTION3)
        const result = await perm.deleteOne(
            { "_id" : ObjectId(id) }
        );
        console.log(result);
        resolve(result);
    } catch (error) {
        reject(error);
    }
})

//
//CHANGE PASSWORD
//
const changePasswords = (id, newPassword, repeatPassword) => new Promise(async(resolve, reject) => {

    try {  
        const DB = await MongoConnection();
        const clients = DB.collection(COLLECTION);
        if(newPassword === repeatPassword){
            const result = await clients.updateOne(
                {"_id": ObjectId(id)},
                {
                    $set: {
                        password: newPassword, 
                        nuevo_usuario: false  
                          }
                }
            )
            resolve(result);
        }
        else{
            let error = {
                msg: "error",
            }
            resolve(error);
        }
    } catch (error) {
        reject(error)
    }
});



module.exports = {
    findUsers,
    createUser,
    updateUser,
    deleteUser,
    findRol,
    createRol,
    updateRol,
    deleteRol,
    findPerm,
    createPerm,
    updatePerm,
    deletePerm,
    changePasswords,
}