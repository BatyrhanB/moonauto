import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateProductsAndPhotos1773120956495 implements MigrationInterface {
    name = 'CreateProductsAndPhotos1773120956495'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "product_photos" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "is_deleted" boolean NOT NULL DEFAULT false, "product_id" uuid NOT NULL, "url" character varying(2048) NOT NULL, "sort_order" integer NOT NULL DEFAULT '0', CONSTRAINT "PK_0586e8a3f1766827efaf0ee3943" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_ef0be6cd13fe604b1e7ae5987b" ON "product_photos" ("product_id") `);
        await queryRunner.query(`CREATE TABLE "products" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "is_deleted" boolean NOT NULL DEFAULT false, "title" character varying(255) NOT NULL, "description" character varying(1024), "price" numeric(10,2) NOT NULL, "discount" numeric(10,2) NOT NULL DEFAULT '0', "stock" integer NOT NULL DEFAULT '0', "is_active" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "product_photos" ADD CONSTRAINT "FK_ef0be6cd13fe604b1e7ae5987b8" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product_photos" DROP CONSTRAINT "FK_ef0be6cd13fe604b1e7ae5987b8"`);
        await queryRunner.query(`DROP TABLE "products"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_ef0be6cd13fe604b1e7ae5987b"`);
        await queryRunner.query(`DROP TABLE "product_photos"`);
    }

}
