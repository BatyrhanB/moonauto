import { Expose, Type } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";

export class ProductPhotoResponseDto {
    @ApiProperty({ example: 'https://cdn.example.com/photo.jpg' })
    @Expose()
    url: string;

    @ApiProperty({ example: 1 })
    @Expose()
    sortOrder: number;
}

export class ProductResponseDto {
    @ApiProperty({ example: 'iPhone 15 Pro' })
    @Expose()
    title: string;

    @ApiProperty({ example: 'iphone-15-pro' })
    @Expose()
    slug: string;

    @ApiProperty({ example: 'Latest Apple flagship', nullable: true })
    @Expose()
    description: string | null;

    @ApiProperty({ example: 999.99 })
    @Expose()
    price: number;

    @ApiProperty({ example: 50.00 })
    @Expose()
    discount: number;

    @ApiProperty({ example: 42 })
    @Expose()
    stock: number;

    @ApiProperty({ type: () => [ProductPhotoResponseDto] })
    @Expose()
    @Type(() => ProductPhotoResponseDto)
    photos: ProductPhotoResponseDto[];
}