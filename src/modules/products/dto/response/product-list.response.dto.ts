import { Expose } from "class-transformer";

export class ProductListResponseDto {
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
}