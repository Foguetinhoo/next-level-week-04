import {application, Request,Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { SurveyRepository } from '../repositories/SurveyRepository';
class SurveyController{
    async create(request:Request,response:Response) {
        try {
            const { title, description } = request.body
            
            const SurveyRepositories = getCustomRepository(SurveyRepository)
            
            const survey = await SurveyRepositories.create({
                title,
                description
            })
            
            await SurveyRepositories.save(survey);
            
            return response.status(201).json(survey)

        } catch (err) {
            throw new Error('error in the request' + err)
        }
    }
    async show(request: Request, response: Response) {
        try {
            const surveyRepository = getCustomRepository(SurveyRepository)
            
            const all = await surveyRepository.find();

            all.length > 0 ? response.status(200).json(
                {
                    results:all.length,
                    data:all
                }
            ) : response.status(200).json({
                message:"nenhuma recompensa encontrada"
            })

        } catch (err) {
            throw new Error('error in the request' + err)
        }
    }
}

export {SurveyController}