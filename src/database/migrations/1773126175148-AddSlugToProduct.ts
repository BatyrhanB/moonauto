import { MigrationInterface, QueryRunner } from "typeorm";

export class AddSlugToProduct1773126175148 implements MigrationInterface {
    name = 'AddSlugToProduct1773126175148'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" ADD "slug" character varying(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "UQ_464f927ae360106b783ed0b4106" UNIQUE ("slug")`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_464f927ae360106b783ed0b410" ON "products" ("slug") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_464f927ae360106b783ed0b410"`);
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "UQ_464f927ae360106b783ed0b4106"`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "slug"`);
    }

}
