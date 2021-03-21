import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { resolve } from 'path';
import { SurveyRepository } from "../repositories/SurveyRepository";
import { SurveyUserRepository } from "../repositories/SurveyUsersRepository";
import { UserRepository } from "../repositories/UserRepositories";
import SendMailService from "../services/SendMailService";

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

            const variables = {
                name: alreadyUser.name,
                title: survey.title,
                description: survey.description,
                user_id: alreadyUser.user_id,
                link: process.env.API_LINK_MAIL
            }

            if (!survey) return response.status(404)
                .json({
                    type: "error",
                    message: "survey not found"
                })

            if (!alreadyUser) return response.status(404)
                .json({
                    type: "error",
                    message: "email não existe na base de dados"
                })

            const surveyIdAlreadyExists = await surveyUserRepository.findOne({
                where: [{ user_id: alreadyUser.user_id }, { value: null }],
                relations:["user","survey"]
            })
            if (surveyIdAlreadyExists) {
                await SendMailService.execute(email, survey.title, variables, npcPath)
                return response.json(surveyIdAlreadyExists  )
            }
            const surveyUsersCreate = surveyUserRepository.create({
                user_id: alreadyUser.user_id,
                survey_id
            })

            await surveyUserRepository.save(surveyUsersCreate)


            await SendMailService.execute(email, survey.title, variables, npcPath)


            return response.status(200).json({
                type: "success",
                message: `o conteudo foi enviado com sucesso para ${email}`,
                surveyUsersCreate
            })

        } catch (err)
        {
            throw new Error(`Error found => ${err}`)
        }
    }

}

export{ SendMailController}