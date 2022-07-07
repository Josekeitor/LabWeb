let messageModel = require("../Models/Messages");
exports.create = (req, res) => {
  res.render("pages/create");
};

exports.store = (req, res) => {
  let message = {
    title: req.body.title,
    name: req.body.name,
    email: req.body.email,
    subject: req.body.subject,
    message: req.body.message,
  };
  messageModel.create(message).then((id) => {
    res.redirect("/");
  });
};

exports.show = (req, res) => {
  let id = req.params.id;
  messageModel.find(id).then((message) => {
    if (message == null) {
      res.status(404).send("Not found");
      return;
    }
    res.render("messages/show", { message: message });
  });
};

exports.edit = (req, res) => {
  let id = req.params.id;

  messageModel.find(id).then((message) => {
    if (message == null) {
      res.status(404).send("Not found");
      return;
    }
    res.render("messages/edit", { message: message });
  });
};

exports.update = (req, res) => {
  // Obtiene el id que viene en la url
  let id = req.params.id;
  // Busca dentro de la base de datos el producto con el id indicado
  messageModel.find(id).then((message) => {
    // Si el producto no existe entonces
    if (message == null) {
      // Regresa el error 404
      res.status(404).send("Not found");
      return;
    }

    // Define los datos del producto actualizado
    let updateMessage = {
      title: req.body.title,
      name: req.body.name,
      email: req.body.email,
      subject: req.body.subject,
      message: req.body.message,
    };

    // Actualiza los datos del producto
    messageModel.update(product.id, updateMessage).then((id) => {
      // Al terminar redirige el índice
      res.redirect("/");
    });
  });
};

exports.delete = (req, res) => {
  let id = req.params.id;
  messageModel.find(id).then((message) => {
    if (message == null) {
      res.status(404).send("Not found");
      return;
    }
    messageModel.delete(message.id).then((id) => {
      res.redirect("/");
    });
  });
};
