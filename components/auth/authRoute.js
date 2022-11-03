const validatorHandler = require('../../middleware/validatorHandler');
const response = require('../../network/response');
const AuthController = require('./authController');
const { loginSchema } = require('./authSchema');
const passport = require('passport');
const express = require('express');

const router = express.Router();
const controller = new AuthController();

router.post(
  '/login',     
  //validatorHandler(loginSchema, 'body'), // validate body
  //passport.authenticate('local', { session: false }), // passport authenticate
  async (req, res, next) => {
    try {
<<<<<<< HEAD
      const user = req.body;         
      //const data = controller.signToken(user);      
      const data = await controller.getUser(user.email, user.password);  
      console.log(data);     
      res.send(data);            
=======
      const user = req.user;
      const data = await controller.signToken(user);
      console.log(data);
      response.success(req, res, data, 200);
>>>>>>> d2b220b44b7aa6019c607be922ec96aeff919cda
    } catch (error) {
      console.log("error");
      next(error);
    }
  }
);

router.post('/recovery', async (req, res, next) => {
  try {
    const { email } = req.body;
    const rta = await controller.sendRecovery(email);
    response.success(req, res, rta, 200);
  } catch (error) {
    next(error);
  }
});

router.post('/change-password', async (req, res, next) => {
  try {
    const { token, newPassword } = req.body;
    const rta = await controller.changePassword(token, newPassword);
    response.success(req, res, rta, 200);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
