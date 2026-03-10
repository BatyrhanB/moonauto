import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProductEntity } from "./entities/product.entity";
import { ProductPhotoEntity } from "./entities/photo.entity";

@Module({})
export class ProductsModule {
    imports = [TypeOrmModule.forFeature([ProductEntity, ProductPhotoEntity])]
}
