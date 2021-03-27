import {application, Request,Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { AppError } from '../error/AppError';
import { SurveyRepository } from '../repositories/SurveyRepository';
import  * as yup from 'yup'
class SurveyController{
    async create(request:Request,response:Response) {
        try {
            const schema = yup.object().shape({
                title: yup.string().trim().required(),
                description: yup.string().trim().required()
            })

            if (!(await schema.isValid(request.body))) throw new AppError("Invalid Format Data")
            
            const { title, description } = request.body

            const SurveyRepositories = getCustomRepository(SurveyRepository)
            
            const survey = await SurveyRepositories.create({
                title,
                description
            })
            
            await SurveyRepositories.save(survey);
            
            return response.status(201).json(survey)

        } catch (err) {
            throw new AppError(err.message)
        }
    }
    async show(request: Request, response: Response) {
        try {
            const surveyRepository = getCustomRepository(SurveyRepository)
            
            const allSurveys = await surveyRepository.find();

            if (allSurveys.length == 0) throw new AppError("no survey found")

            return response.status(200).json(allSurveys)

        } catch (err) {
            throw new AppError(err.message)
        }
    }
}

export {SurveyController}