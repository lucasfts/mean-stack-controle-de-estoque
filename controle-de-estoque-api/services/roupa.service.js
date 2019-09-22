var config = require('config.json');
var _ = require('lodash');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var Q = require('q');
var mongo = require('mongoskin');
var db = mongo.db(config.connectionString, { native_parser: true });
db.bind('roupas');

var service = {};

service.getAll = getAll;
service.getById = getById;
service.create = create;
service.update = update;
service.delete = _delete;


module.exports = service;

function getAll() {
    var deferred = Q.defer();

    db.roupas.find().toArray(function (err, roupas) {
        if (err) deferred.reject(err.name + ': ' + err.message);

        if (roupas) {
            // return user (without hashed password)
        //    return roupas;
        deferred.resolve(roupas);
        } else {
            // user not found
            deferred.resolve();
        }
    });

    return deferred.promise;
}

function getById(_id) {
    var deferred = Q.defer();

    db.roupas.findById(_id, function (err, user) {
        if (err) deferred.reject(err.name + ': ' + err.message);

        if (roupa) {
            // return user (without hashed password)
            deferred.resolve(roupa);
        } else {
            // user not found
            deferred.resolve();
        }
    });

    return deferred.promise;
}

function create(roupaParam) {
    var deferred = Q.defer();

    createroupa(roupaParam);

    function createroupa(roupa) {
        db.roupas.insert(
            roupa,
            function (err, doc) {
                if (err) deferred.reject(err.name + ': ' + err.message);

                deferred.resolve();
            });
    }

    return deferred.promise;
}

function update(_id, roupaParam) {
    var deferred = Q.defer();

    // validation
    db.roupas.findById(_id, function (err, user) {
        if (err) deferred.reject(err.name + ': ' + err.message);

        if (user.codigo !== roupaParam.codigo) {
            // codigo has changed so check if the new codigo is already taken
            db.roupas.findOne(
                { codigo: roupaParam.codigo },
                function (err, user) {
                    if (err) deferred.reject(err.name + ': ' + err.message);

                    if (user) {
                        // codigo already exists
                        deferred.reject('codigo "' + req.body.codigo + '" is already taken')
                    } else {
                        updateRoupa();
                    }
                });
        } else {
            updateRoupa();
        }
    });

    function updateRoupa() {
        // fields to update
        var set = {
            dataEntrada: roupaParam.dataEntrada,
            tipo: roupaParam.tipo,
            marca: roupaParam.marca,
            tamanho: roupaParam.tamanho,
            cor: roupaParam.cor,
            valorEtiqueta: roupaParam.valorEtiqueta,
            valorPago: roupaParam.valorPago,
            valorMargem: roupaParam.valorMargem,
            precoSugerido: roupaParam.precoSugerido
        };

        db.roupas.update(
            { _id: mongo.helper.toObjectID(_id) },
            { $set: set },
            function (err, doc) {
                if (err) deferred.reject(err.name + ': ' + err.message);

                deferred.resolve();
            });
    }

    return deferred.promise;
}

function _delete(_id) {
    var deferred = Q.defer();

    db.roupas.remove(
        { _id: mongo.helper.toObjectID(_id) },
        function (err) {
            if (err) deferred.reject(err.name + ': ' + err.message);

            deferred.resolve();
        });

    return deferred.promise;
}