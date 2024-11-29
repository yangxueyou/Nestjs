import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUserLoginTypeColumn1732788638081 implements MigrationInterface {
    name = 'AddUserLoginTypeColumn1732788638081'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`loginType\` int NOT NULL COMMENT '登录类型：0-密码登录，1-验证码登录' DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`loginType\``);
    }

}
