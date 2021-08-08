const router = require("express").Router();
const auth = require("../middlewares/auth");
const tagsController = require("../controller/tagsController");

router.post("/addtags", auth, tagsController.addtags);
router.put("/tagupdate", auth, tagsController.tagupdate);
router.get("/gettags" , tagsController.gettags)

module.exports = router;
