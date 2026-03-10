export class ProductListResponseDto {
    title: string;
    description: string | null;
    price: number;
    discount: number;
    stock: number;

    constructor(title: string, description: string | null, price: number, discount: number, stock: number) {
        this.title = title;
        this.description = description;
        this.price = price;
        this.discount = discount;
        this.stock = stock;
    }
}