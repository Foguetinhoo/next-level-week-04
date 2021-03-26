import { Router } from 'express';
import { AnswersController } from './controller/AnswerController';
import { NpsController } from './controller/NpsController';
import { SendMailController } from './controller/SendMailController';
import { SurveyController } from './controller/SurveyController';
import { UserController } from './controller/UserController';

const router = Router();

const userController = new UserController();
const surveyController = new SurveyController();
const sendMailController = new SendMailController()
const answersController = new AnswersController()
const npcController =  new NpsController()

router.post("/users/create", userController.create);
router.post("/surveys/create", surveyController.create);
router.get("/surveys/all", surveyController.show);
router.get("/sendmail", sendMailController.execute)
router.get("/answers/:value", answersController.execute)
router.get("/npc/:survey_id",npcController.execute)

export { router };

