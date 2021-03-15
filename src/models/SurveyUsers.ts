import { Column, PrimaryColumn, CreateDateColumn, Entity } from "typeorm";
import { v4 as uuid } from 'uuid';
@Entity("survey_users")
class SurveyUser {
    @PrimaryColumn()
    readonly survey_user_id: string;

    @Column()
    user_id: string;

    @Column()
    survey_id: string;

    @Column()
    value:number

    @CreateDateColumn()
    created_at: Date;

    constructor() {
        if (!this.survey_user_id) {
            this.survey_user_id = uuid()
        }
    }
}

export { SurveyUser }