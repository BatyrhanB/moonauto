import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {CategoryEntity} from "./entities/category.entity";
import {CategoryRepository} from "./repositories/category.repository";
import {CategoryService} from "./category.service";
import {CategoryController} from "./category.controller";

@Module({
    imports: [TypeOrmModule.forFeature([CategoryEntity])],
    providers: [CategoryRepository, CategoryService],
    exports: [CategoryService],
    controllers: [CategoryController],
})
export class CategoriesModule {}
