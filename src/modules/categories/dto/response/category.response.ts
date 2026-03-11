import { Expose, Type } from "class-transformer";

export class CategoryListResponseDto {
    @Expose()
    title: string;

    @Expose()
    slug: string;

    @Expose()
    @Type(() => CategoryListResponseDto)
    children: CategoryListResponseDto[];
}