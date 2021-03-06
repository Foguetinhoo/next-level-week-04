import { Router } from 'express';
import { SurveyController } from './controller/SurveyController';
import { UserController } from './controller/UserController';

const router = Router();

const userController = new UserController();
const surveyController = new SurveyController();

router.post("/users/create", userController.create);
router.post("/surveys/create", surveyController.create);
router.get("/surveys/all", surveyController.show);

export { router };

