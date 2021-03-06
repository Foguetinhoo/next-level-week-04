import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { resolve } from 'path';
import { SurveyRepository } from "../repositories/SurveyRepository";
import { SurveyUserRepository } from "../repositories/SurveyUsersRepository";
import { UserRepository } from "../repositories/UserRepositories";
import SendMailService from "../services/SendMailService";
import { AppError } from "../error/AppError";

class SendMailController{
    
    constructor() {
        
    }
    async execute(request:Request, response:Response) {
        try {
            const { survey_id, email } = request.body

            const userRepository = getCustomRepository(UserRepository)
            const surveyRepository = getCustomRepository(SurveyRepository)
            const surveyUserRepository = getCustomRepository(SurveyUserRepository)

            const alreadyUser = await userRepository.findOne({ email })
            const survey = await surveyRepository.findOne({ survey_id })
            const npcPath = resolve(__dirname, "..", "views", "emails", "NPCmail.hbs");


            if (!survey) throw new AppError("survey not found", 404)
            
            if (!alreadyUser) throw new AppError("email not exists in the database")

            const surveyUserAlreadyExists = await surveyUserRepository.findOne({
                where: { user_id: alreadyUser.user_id,value: null },
                relations:["user","survey"]
            })

            const variables = {
                name: alreadyUser.name,
                title: survey.title,
                description: survey.description,
                id: "",
                link: process.env.API_LINK_MAIL
            }

            if (surveyUserAlreadyExists) {
                variables.id =  surveyUserAlreadyExists.survey_user_id
                await SendMailService.execute(email, survey.title, variables, npcPath)
                return response.json(surveyUserAlreadyExists)
            }
            
            const surveyUsersCreate = surveyUserRepository.create({
                user_id: alreadyUser.user_id,
                survey_id
            })

            await surveyUserRepository.save(surveyUsersCreate)

            variables.id =  surveyUsersCreate.survey_user_id  

            await SendMailService.execute(email, survey.title, variables, npcPath)

            
            return response.status(200).json({
                type: "success",
                message: `o conteudo foi enviado com sucesso para ${email}`,
                surveyUsersCreate
            })

        } catch (err)
        {
            throw new AppError(err.message)
        }
    }

}

export{ SendMailController}