export class ProductPhotoResponseDto {
    url: string;
    sortOrder: number;

    constructor(url: string, sortOrder: number) {
        this.url = url;
        this.sortOrder = sortOrder;
    }
}

export class ProductResponseDto {
    id: string;
    title: string;
    slug: string;
    description: string | null;
    price: number;
    discount: number;
    stock: number;
    isActive: boolean;
    photos: ProductPhotoResponseDto[];

    constructor(data: ProductResponseDto) {
        Object.assign(this, data);
    }
}