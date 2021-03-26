import { Request, Response } from "express";
import { getCustomRepository, IsNull, Not } from "typeorm";
import { SurveyUserRepository } from "../repositories/SurveyUsersRepository";

class AnswersController{

    async execute(request: Request, response: Response) {
        try {
            const { u } = request.query
            const { value } = request.params
            
            const surveyUserRepository = getCustomRepository(SurveyUserRepository)
            const surveyUser = await surveyUserRepository.findOne({
                survey_user_id: String(u),
                value:Not(IsNull())
            })
            if (!surveyUser) {
                return response.status(404).json({
                    type: "error",
                    message:"Enquete não existe"
                })
            }

           surveyUser.value = Number(value)

            const surveyResponse = await surveyUserRepository.save(surveyUser)

            return response.status(200).json({
                type: "success",
                surveyResponse
            })
        } catch (err) {
            throw err
        }
    }
}

export { AnswersController}