const express = require("express");
const router = express.Router();
const joinController = require("../controllers/Join");
const manageController = require("../controllers/Manage");
const validate = require("express-validation");
const userValidation = require("../utils/validations");
const { authUserLocal, authColabLocal, authJWT } = require("../services/auth");
const privileges = require("../utils/privileges");

//the middleware function
const middleware = (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    next();
};
router.use(middleware);


//**************************joining***************************
router.post("/loginUser", authUserLocal, joinController.loginUser);
router.post(
    "/loginCollaborator",
    authColabLocal,
    joinController.loginCollaborator
);
router.post(
    "/registerUser",
    validate(userValidation.register),
    joinController.registerUser
);
router.post("/registerCandidate", joinController.registerCandidate);
router.get("/email/confirm/:id", joinController.confirmEmail); //componentDidMount() will handle this one right here....
router.put("/updatePasswordViaEmail", joinController.updatePasswordViaEmail);
router.put("/updatePassword", joinController.updatePassword);
router.get("/reset/:resetPasswordToken", joinController.resetPassword);
router.post("/forgotPassword", joinController.forgotPassword);


//***************************managing***************************
router.delete("/:id", manageController.deleteUser);
router.put("/", manageController.updateUser);
router.get("/findUser", manageController.findUser);
router.post("/accept/:id", manageController.activateUser);
router.post("/deny/:id", manageController.deactivateUser);
router.get("/", manageController.listAll);
router.get("/:id", manageController.listOne);

//***************************collaborators***************************
router.post(
    "/register/collab",
    authJWT,
    privileges.isColabAdmin,
    joinController.addCollaborator
);
router.put(
    "/update/collab/:id",
    authJWT,
    privileges.isColabAdmin,
    joinController.updateCollaborator
);
router.delete(
    "/delete/collab/:id",
    authJWT,
    privileges.isColabAdmin,
    joinController.deleteCollaborator
);

//params
router.param("userId", joinController.findUserById);

module.exports = router;