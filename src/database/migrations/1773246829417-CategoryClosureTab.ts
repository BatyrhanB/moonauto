import { MigrationInterface, QueryRunner } from "typeorm";

export class CategoryClosureTab1773246829417 implements MigrationInterface {
    name = 'CategoryClosureTab1773246829417'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "categories" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "is_deleted" boolean NOT NULL DEFAULT false, "title" character varying(255) NOT NULL, "slug" character varying(255) NOT NULL, "is_active" boolean NOT NULL DEFAULT false, "sort_order" integer NOT NULL DEFAULT '0', "parentId" uuid, CONSTRAINT "UQ_420d9f679d41281f282f5bc7d09" UNIQUE ("slug"), CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "categories_closure" ("id_ancestor" uuid NOT NULL, "id_descendant" uuid NOT NULL, CONSTRAINT "PK_dc67f6a82852c15ec6e4243398d" PRIMARY KEY ("id_ancestor", "id_descendant"))`);
        await queryRunner.query(`CREATE INDEX "IDX_ea1e9c4eea91160dfdb4318778" ON "categories_closure" ("id_ancestor") `);
        await queryRunner.query(`CREATE INDEX "IDX_51fff5114cc41723e8ca36cf22" ON "categories_closure" ("id_descendant") `);
        await queryRunner.query(`ALTER TABLE "products" ADD "category_id" uuid`);
        await queryRunner.query(`ALTER TYPE "public"."users_role_enum" RENAME TO "users_role_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."users_role_enum" AS ENUM('user', 'admin', 'superuser')`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "role" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "role" TYPE "public"."users_role_enum" USING "role"::"text"::"public"."users_role_enum"`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "role" SET DEFAULT 'user'`);
        await queryRunner.query(`DROP TYPE "public"."users_role_enum_old"`);
        await queryRunner.query(`ALTER TABLE "categories" ADD CONSTRAINT "FK_9a6f051e66982b5f0318981bcaa" FOREIGN KEY ("parentId") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "FK_9a5f6868c96e0069e699f33e124" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "categories_closure" ADD CONSTRAINT "FK_ea1e9c4eea91160dfdb4318778d" FOREIGN KEY ("id_ancestor") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "categories_closure" ADD CONSTRAINT "FK_51fff5114cc41723e8ca36cf227" FOREIGN KEY ("id_descendant") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "categories_closure" DROP CONSTRAINT "FK_51fff5114cc41723e8ca36cf227"`);
        await queryRunner.query(`ALTER TABLE "categories_closure" DROP CONSTRAINT "FK_ea1e9c4eea91160dfdb4318778d"`);
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_9a5f6868c96e0069e699f33e124"`);
        await queryRunner.query(`ALTER TABLE "categories" DROP CONSTRAINT "FK_9a6f051e66982b5f0318981bcaa"`);
        await queryRunner.query(`CREATE TYPE "public"."users_role_enum_old" AS ENUM('user', 'admin')`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "role" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "role" TYPE "public"."users_role_enum_old" USING "role"::"text"::"public"."users_role_enum_old"`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "role" SET DEFAULT 'user'`);
        await queryRunner.query(`DROP TYPE "public"."users_role_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."users_role_enum_old" RENAME TO "users_role_enum"`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "category_id"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_51fff5114cc41723e8ca36cf22"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_ea1e9c4eea91160dfdb4318778"`);
        await queryRunner.query(`DROP TABLE "categories_closure"`);
        await queryRunner.query(`DROP TABLE "categories"`);
    }

}
