import { Expose, Transform } from "class-transformer";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class ProductListResponseDto {
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

    @ApiPropertyOptional({ example: 'Smartphones', nullable: true })
    @Expose()
    @Transform(({ obj }) => obj.category?.title ?? null)
    categoryName: string | null;
}