import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { UserRepository } from '../repositories/UserRepositories';
import * as yup from 'yup'
import { AppError } from '../error/AppError';
class UserController{
    async create(request: Request, response: Response)
     {
        try {
            const { name, email } = request.body;

            let schema = yup.object().shape({
                name: yup.string().trim().required(),
                email: yup.string().email().trim().required()
            })
            
            if (!(await schema.isValid(request.body))) {
                throw new AppError("Invalid Data")
            }
           
            const usersRepository = getCustomRepository(UserRepository);

            const userEmailExists = await usersRepository.findOne({ email })
            
            if (userEmailExists) throw new AppError("email ja existe")
    

            const user = usersRepository.create({
                name,
                email
            });

            await usersRepository.save(user);

            return response.status(201).json(user)


        } catch (err) {
            throw new AppError(err.message)
        }
    }
}
export { UserController };
