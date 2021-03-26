import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { SurveyUserRepository } from "../repositories/SurveyUsersRepository";

class NpsController{

    async execute(request: Request, response: Response) {
        try {
            const { survey_id } = request.params
            const surveyUserRepository = getCustomRepository(SurveyUserRepository)
            const surveyUsers = await surveyUserRepository.find({ survey_id })
            if (surveyUsers.length == 0) {
                return response.status(200).json({message:'not found'})
            }
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

        }
    }
}
export {NpsController}