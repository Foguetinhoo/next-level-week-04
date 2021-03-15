import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createSurveysUsers1615070771536 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "survey_users",
            columns: [
                {
                    name: "survey_user_id",
                    type: "uuid",
                    isPrimary:true
                },
                {
                    name: "user_id",
                    type:"varchar"
                },
                {
                    name: "survey_id",
                    type:"varchar"
                },
                {
                    name: "value",
                    type: "number",
                    isNullable: true
                },
                {
                    name: "created_at",
                    type: "timestamp",
                    default:"now()"
                }
            ],
            foreignKeys: [
                {
                    name: "FK_user",
                    referencedTableName: "users",
                    referencedColumnNames: ["user_id"],
                    columnNames: ["user_id"],
                    onDelete: "CASCADE",
                    onUpdate:"CASCADE"
                },
                {
                    name: "FK_survey",
                    referencedTableName: "surveys",
                    referencedColumnNames: ["survey_id"],
                    columnNames: ["survey_id"],
                    onDelete: "CASCADE",
                    onUpdate: "CASCADE"
                }
            ]
            
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("survey_users");
    }

}
