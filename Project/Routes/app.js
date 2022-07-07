let router = require("express").Router();
let pagesController = require("../Controllers/pagesController");
let messagesController = require("../Controllers/messagesController");

router.get("/", pagesController.homepage);
router.get("/About", pagesController.about);
router.get("/messages/create", messagesController.create);
router.get("/messages/:id", messagesController.show);
router.get("/messages/:id/edit", messagesController.edit);
router.put("/messages/:id", messagesController.update);
router.delete("/messages/:id", messagesController.delete);
router.post("/messages", messagesController.store);

module.exports = router;
