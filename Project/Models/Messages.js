exports.create = (message) => {
  return knex("messages").insert({
    title: message.title,
    name: message.name,
    email: message.email,
    subject: message.subject,
    message: message.message,
  });
};

exports.find = (id) => {
  return knex.select("*").from("messages").where("id", id).first();
};

exports.update = (id, message) => {
  return knex("messages")
    .update(message)
    .update("updated_at", knex.fn.now())
    .where("id", id);
};

exports.delete = (id) => {
  return knex("messages").delete().where("id", id);
};
