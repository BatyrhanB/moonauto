import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProductEntity } from "./entities/product.entity";
import { ProductPhotoEntity } from "./entities/photo.entity";
import {ProductRepository} from "./repositories/product.repository";
import {ProductService} from "./product.service";
import {ProductController} from "./product.controller";

@Module({
    imports: [TypeOrmModule.forFeature([ProductEntity, ProductPhotoEntity])],
    providers: [ProductRepository, ProductService],
    exports: [ProductService],
    controllers: [ProductController],
})
export class ProductsModule {}
