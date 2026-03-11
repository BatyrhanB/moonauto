import { Controller, Get } from "@nestjs/common";
import { CategoryService } from "./category.service";
import { CategoryListResponseDto } from "./dto/response/category.response";

@Controller('categories')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) {}

    @Get()
    list(): Promise<CategoryListResponseDto[]> {
        return this.categoryService.findAll();
    }
}