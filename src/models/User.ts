import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import {v4 as uuid}from 'uuid' 
@Entity("users")
class User{
    @PrimaryColumn()
    readonly user_id: string;

    @Column()
    name: string;

    @Column()
    email: string;

    @CreateDateColumn()
    created_at: Date;
    
    constructor() {
        if (!this.user_id) {
            this.user_id =  uuid()
        }
    }
}
 export {User}