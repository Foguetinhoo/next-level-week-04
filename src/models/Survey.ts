import { Column,PrimaryColumn,CreateDateColumn, Entity } from "typeorm";
import { v4 as uuid } from 'uuid';
@Entity("surveys")
class Survey{
    @PrimaryColumn()
    readonly survey_id: string;

    @Column()
    title: string;
    
    @Column()
    description: string;

    @CreateDateColumn()
    created_at: Date;
        
    constructor() {
        if (!this.survey_id) {
            this.survey_id = uuid()
        }
    }
}

export {Survey}