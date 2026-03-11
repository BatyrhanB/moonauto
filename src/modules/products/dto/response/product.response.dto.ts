import { Expose, Type } from "class-transformer";

export class ProductPhotoResponseDto {
    @Expose()
    url: string;

    @Expose()
    sortOrder: number;
}

export class ProductResponseDto {
    @Expose()
    title: string;

    @Expose()
    slug: string;

    @Expose()
    description: string | null;

    @Expose()
    price: number;

    @Expose()
    discount: number;

    @Expose()
    stock: number;

    @Expose()
    @Type(() => ProductPhotoResponseDto)
    photos: ProductPhotoResponseDto[];
}