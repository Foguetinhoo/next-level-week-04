import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { SurveyRepository } from "../repositories/SurveyRepository";
import { SurveyUserRepository } from "../repositories/SurveyUsersRepository";
import { UserRepository } from "../repositories/UserRepositories";
import SendMailService from "../services/SendMailService";

class SendMailController{
    
    constructor() {
        
    }
    async execute(request:Request, response:Response) {
        const { survey_id ,email } = request.body
        
        const userRepository = getCustomRepository(UserRepository)
        const surveyRepository = getCustomRepository(SurveyRepository)
        const surveyUserRepository = getCustomRepository(SurveyUserRepository )
        
        const alreadyUser = await userRepository.findOne({ email })
        const survey = await surveyRepository.findOne({ survey_id })
        console.log('resp => ', survey)
        if (!survey) return response.status(404)
            .json({
                type: "error",
                message:"survey not found"
            })

        if (!alreadyUser) return response.status(404)
            .json({ 
                type: "error",
                message:"email não existe na base de dados"
            })
        
        const surveyUsersCreate = surveyUserRepository.create({
            user_id: alreadyUser.user_id,
            survey_id
        })

        await surveyUserRepository.save(surveyUsersCreate)
      
       
        await SendMailService.execute(email, survey.title,survey.description )
        
        
        return response.status(200).json({
            type: "success",
            message: `o conteudo foi enviado com sucesso para ${email}`,
            surveyUsersCreate
        })
        
    }

}

export{ SendMailController}