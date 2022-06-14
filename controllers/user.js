const { query } = require('express');
const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');

const usuariosGet = async(req = request, res = response) => {

    const {limite = 5, desde = 0} = req.query;
    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(),
        Usuario.find()
        .skip(Number(desde))
        .limit(Number(limite))

    ]);

    res.json({
    total, usuarios
    });
};
const usuariosPost = async (req, res = response) => {
  const { nombre, correo, password, rol } = req.body;
  const usuario = new Usuario({ nombre, correo, password, rol });
  //encriptar la contraseña
  const salt = bcryptjs.genSaltSync();
  usuario.password = bcryptjs.hashSync(password, salt);

  //Guardar en la BD

  await usuario.save();

  res.json({
    usuario,
  });
};
const usuariosPut = async (req, res = response) => {
  const { id } = req.params;
  const { _id, password, google, correo, ...resto } = req.body;

  // Validar contra BD

  if (password) {
    //encriptar
    const salt = bcryptjs.genSaltSync();
    resto.password = bcryptjs.hashSync(password, salt);
  }
  const usuario = await Usuario.findByIdAndUpdate(id, resto);

  res.json(usuario);
};
const usuariosPatch = (req, res = response) => {
  res.json({
    msg: "patc API - controlador",
  });
};

const usuariosDelete = async(req, res = response) => {

    const {id} = req.params;

    const usuario = await Usuario.findByIdAndDelete(id);


    res.json(  usuario);
};

module.exports = {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosPatch,
  usuariosDelete
};