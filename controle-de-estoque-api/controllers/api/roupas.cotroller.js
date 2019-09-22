var config = require('config.json');
var express = require('express');
var router = express.Router();
var roupaService = require('services/roupa.service');

// routes
router.get('/', getAll);
router.get('/:_id', getById);
router.post('/', insert);
router.put('/:_id', update);
router.delete('/:_id', _delete);

module.exports = router;


function getAll(req, res) {
    roupaService.getAll()
        .then(function (roupas) {
            if (roupas) {
                res.send(roupas);
            } else {
                res.sendStatus(404);
            }
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function getById(req, res) {
    roupaService.getById(req.params._id)
        .then(function (roupa) {
            if (roupa) {
                res.send(roupa);
            } else {
                res.sendStatus(404);
            }
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function insert(req, res) {
    roupaService.create(req.body)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function update(req, res) {
    roupaService.update(req.params._id, req.body)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function _delete(req, res) {
    roupaService.delete(req.params._id)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}