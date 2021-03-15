import { Router } from 'express';
import { SendMailController } from './controller/SendMailController';
import { SurveyController } from './controller/SurveyController';
import { UserController } from './controller/UserController';

const router = Router();

const userController = new UserController();
const surveyController = new SurveyController();
const sendMailController = new SendMailController()

router.post("/users/create", userController.create);
router.post("/surveys/create", surveyController.create);
router.get("/surveys/all", surveyController.show);
router.get("/sendmail",sendMailController.execute)

export { router };

