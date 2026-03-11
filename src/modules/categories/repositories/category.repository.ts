import {Injectable} from "@nestjs/common";
import {Repository, IsNull} from "typeorm";
import {CategoryEntity} from "../entities/category.entity";
import {InjectRepository} from "@nestjs/typeorm";

@Injectable()
export class CategoryRepository {
    constructor(
        @InjectRepository(CategoryEntity)
        private readonly repo: Repository<CategoryEntity>) {
    }

    findAll(): Promise<CategoryEntity[]> {
        return this.repo.find({
            where: {isDeleted: false, isActive: true, parent: IsNull()},
            order: { sortOrder: 'ASC', children: { sortOrder: 'ASC'}},
            relations: { children: true}
        });
    }
}