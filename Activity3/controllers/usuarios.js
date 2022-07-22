let Usuario = require("../models/usuario");

module.exports = {
  list: function (req, res, next) {
    Usuario.find({}, (err, usuarios) => {
      res.render("usuarios/index", { usuarios: usuarios });
    });
  },

  update_get: function (req, res, next) {
    Usuario.findById(req.params.id, function (err, usuario) {
      res.render("usuarios/update", { errors: {}, usuario: usuario });
    });
  },

  update: function (req, res, next) {
    let update_values = { nombre: req.body.nombre };
    Usuario.findByIdAndUpdate(
      req.params.id,
      update_values,
      function (err, usuario) {
        if (err) {
          console.log(err);
          res.render("usuario/update", {
            errors: err.errors,
            usuario: new Usuario({
              nombre: req.body.nombre,
              email: req.body.email,
            }),
          });
        } else {
          res.redirect("/usuarios");
          return;
        }
      }
    );
  },

  create_get: function (req, res, next) {
    res.render("usuarios/create", { errors: {}, usuario: new Usuario() });
  },

  create: function (req, res, next) {
    if (req.body.password != req.body.confirm_password) {
      res.render("usuarios/create", {
        errors: {
          confirm_password: { message: "No coinciden los passwords " },
        },
        usuario: new Usuario({
          nombre: req.body.nombre,
          email: req.body.email,
        }),
      });
      return;
    }
    Usuario.create(
      {
        nombre: req.body.nombre,
        email: req.body.email,
        password: req.body.password,
      },
      function (err, nuevoUsuario) {
        if (err) {
          res.render("usuarios/create", {
            errors: {
              email: { message: "Ya existe un usuario con ese password" },
            },
            usuario: new Usuario({
              nombre: req.body.nombre,
              email: req.body.email,
            }),
          });
        } else {
          nuevoUsuario.enviar_mail_bienvenida();
          res.redirect("/usuarios");
        }
      }
    );
  },

  delete: function (req, res, next) {
    Usuario.findByIdAndDelete(req.body.id, function (err) {
      if (err) next(err);
      else res.redirect("/usuarios");
    });
  },

  get_login: function (req, res, next) {
    res.render("usuarios/login", { errors: {}, usuario: new Usuario() });
  },

  login: function (req, res, next) {
    const email = req.body.email;
    const password = req.body.password;
    Usuario.findOne({ email: email }, async function (err, user) {
      if (user === null) {
        res.status(404).json("El usuario no existe");
      }

      if (!(await user.validPassword(password))) {
        res.status(404).json("Las credenciales son incorrectas");
      }
      if (!user.verificado) {
        res.status(404).json("Por favor verifique su correo");
      }
      res.render("usuarios/auth_success", { errors: {}, usuario: user });
    });
  },

  get_auth_success: function (req, res, next) {
    res.render("usuarios/auth_success", { errors: {}, usuario: new Usuario() });
  },
};
