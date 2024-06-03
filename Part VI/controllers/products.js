const apiResponse = require('../utils/response/apiResponse');
const Products = require('../data/entities/products');

const fs = require('fs');

exports.getAll = async (req, res) => {
    const datajson = fs.readFileSync("data/data.json", "utf-8");
    const data = JSON.parse(datajson);
    return res.send(data.products);
}

exports.getById = async (req, res) => {
    const id = req.params.id;
    const datajson = fs.readFileSync("data/data.json", "utf-8");
    const data = JSON.parse(datajson);
    const products = data.products.filter(products => products.id == id);
    res.send(products);
}

exports.create = async (req, res) => {
    const {id, Nome, Quantidade, Detalhes} = req.body;
    const datajson = fs.readFileSync("data/data.json", "utf-8");
    const data = JSON.parse(datajson);
    data.products.push(req.body);
    fs.writeFileSync('data/data.json', JSON.stringify(data));
    return res.status(201).send(req.body);
}

exports.update = async (req, res) => {
    const {id, Nome, Quantidade, Detalhes} = req.body;
    const datajson = fs.readFileSync("data/data.json", "utf-8");
    const data = JSON.parse(datajson);
    const products = data.products.find(products => products.id == id);
    products.Nome = Nome;
    products.Quantidade = Quantidade;
    products.Detalhes = Detalhes;
    fs.writeFileSync('data/data.json', JSON.stringify(data));
    return res.send({id, Nome, Quantidade, Detalhes});
}

exports.delete = async (req, res) => {
    const id = req.params.id;
    const datajson = fs.readFileSync("data/data.json", "utf-8");
    const data = JSON.parse(datajson);
    const productsIndex  = data.products.findIndex(products => products.id == id);
    if (productsIndex !== -1) {
        const apagaProduct = data.products.splice(productsIndex, 1)[0];
        fs.writeFileSync('data/data.json', JSON.stringify(data));
        return res.status(200).send(apagaProduct);
    } else {
        return res.status(404).send("Product not found");
    }
}


