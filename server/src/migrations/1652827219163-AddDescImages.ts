import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class AddDescriptionImages1652818550545 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        console.log('START AddDescriptionImages migration');
        await queryRunner.addColumns(
            "cards",
            [
                new TableColumn({
                    name: "description",
                    type: "text",
                    isNullable: true
                }),
                new TableColumn({
                    name: "images",
                    type: "text",
                    isArray: true,
                    isNullable: true
                }),
            ]
        )

        console.log('END AddDescriptionImages migration');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
