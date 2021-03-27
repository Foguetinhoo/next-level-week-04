import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { SurveyUserRepository } from "../repositories/SurveyUsersRepository";
import * as yup from 'yup'
import { AppError } from "../error/AppError";
class NpsController{

    async execute(request: Request, response: Response) {
        try { 
            const schema = yup.object().shape({
                survey_id: yup.string().required()
            })

            if (!(await schema.isValid(request.params))) throw new AppError("Dados invalidos")
                
            const { survey_id } = request.params
        
            const surveyUserRepository = getCustomRepository(SurveyUserRepository)
            const surveyUsers = await surveyUserRepository.find({ survey_id })

            if (surveyUsers.length == 0) throw new AppError("nenhuma enquete encontrada")

            const surveyLength = surveyUsers.length

            const detractor = surveyUsers.filter(
                (filter) => filter.value >= 0 && filter.value <= 6
            ).length

            const promoters = surveyUsers.filter(
                (filter) => filter.value >= 9 && filter.value <= 10
            ).length

            const resultNPC = ((promoters + detractor) / surveyLength) * 100
            
            return response.json({
                result: `${resultNPC.toFixed(2)}%`,
                total:`${promoters + detractor} pesquisas realizadas`
            })
        } catch (err)   
        {
            throw new AppError(err.message)
        }
    }
}
export {NpsController}