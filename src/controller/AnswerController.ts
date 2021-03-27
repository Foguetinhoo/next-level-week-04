import { Request, Response } from "express";
import { getCustomRepository, IsNull, Not } from "typeorm";
import { SurveyUserRepository } from "../repositories/SurveyUsersRepository";
import * as yup from 'yup'
import { AppError } from "../error/AppError";
class AnswersController{

    async execute(request: Request, response: Response) {
        try {
            const { u } = request.query
            const { value } = request.params

            let schema = yup.object().shape({
                u: yup.string().required(),
                value: yup.number().required()
            })
       
            const surveyUserRepository = getCustomRepository(SurveyUserRepository)
            
            const surveyUser = await surveyUserRepository.findOne({
                survey_user_id: String(u),
                value:Not(IsNull())
            })

            if (!surveyUser) throw new AppError("Enquete não existe")
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