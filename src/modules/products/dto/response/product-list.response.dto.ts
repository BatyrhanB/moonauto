export class ProductListResponseDto {
    title: string;
    slug: string;
    description: string | null;
    price: number;
    discount: number;
    stock: number;

    constructor(title: string, slug: string, description: string | null, price: number, discount: number, stock: number) {
        this.title = title;
        this.slug = slug;
        this.description = description;
        this.price = price;
        this.discount = discount;
        this.stock = stock;
    }
}