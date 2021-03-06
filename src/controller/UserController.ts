import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { UserRepository } from '../repositories/UserRepositories';

class UserController{
    async create(request: Request, response: Response)
     {
        try {
            const { name, email } = request.body;
            const usersRepository = getCustomRepository(UserRepository);

            const userEmailExists = await usersRepository.findOne({ email })
            
            if (userEmailExists) {
                return response.status(400).json({
                    type:"error",
                    message:"usuario já existe"
                })
            }

            const user = usersRepository.create({
                name,
                email
            });

            await usersRepository.save(user);

            return response.status(201).json(user)


        } catch (err:any) {
            throw new Error('error na requisição' + err)
        }
    }
}
export { UserController };
