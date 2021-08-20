const router = require("express").Router();
const userController = require("../controller/userController");
const auth = require("../middlewares/auth");

router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/logout", userController.logout);
router.get("/refresh_token", userController.refreshToken);
router.get("/info", auth, userController.getUser);
router.post("/forgotpass", userController.forgotpass);
router.post("/updatepass",userController.updatepass)
router.patch("/house",auth, userController.sethouse);
router.put('/userupdate',auth, userController.userupdate);
// router.patch("/addtasks", auth, userController.addtasks);

module.exports = router;
