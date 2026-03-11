import { Injectable } from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import { CategoryRepository } from "./repositories/category.repository";
import { CategoryListResponseDto } from "./dto/response/category.response";

@Injectable()
export class CategoryService {
    constructor(private readonly categoryRepository: CategoryRepository) {}

    async findAll(): Promise<CategoryListResponseDto[]> {
        const categories = await this.categoryRepository.findAll();
        return plainToInstance(CategoryListResponseDto, categories, { excludeExtraneousValues: true });
    }
}