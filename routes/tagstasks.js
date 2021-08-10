const router = require("express").Router();
const auth = require("../middlewares/auth");
const tagsController = require("../controller/tagsController");

router.post("/addtags", auth, tagsController.addtags);
router.put("/tagupdate", auth, tagsController.tagupdate);
router.get("/gettags" , tagsController.gettags)
router.get("/gettagsuser" , auth,  tagsController.gettaguser)
router.delete("/deletetags" , auth,  tagsController.deletetags)

module.exports = router;
