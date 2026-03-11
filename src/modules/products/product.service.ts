import { Injectable, NotFoundException } from "@nestjs/common";
import { ProductRepository } from "./repositories/product.repository";
import { ProductListResponseDto } from "./dto/response/product-list.response.dto";
import { ProductPhotoResponseDto, ProductResponseDto } from "./dto/response/product.response.dto";
import { PageDto, PageMetaDto, PageOptionsDto } from "../../common";

@Injectable()
export class ProductService {
    constructor(private readonly productRepository: ProductRepository) {}

    async findAll(pageOptions: PageOptionsDto): Promise<PageDto<ProductListResponseDto>> {
        const [products, total] = await this.productRepository.findAllPaginated(pageOptions);

        const data = products.map(
            (p) => new ProductListResponseDto(p.title, p.slug, p.description, p.price, p.discount, p.stock),
        );

        return new PageDto(data, new PageMetaDto(total, pageOptions.limit, pageOptions.offset));
    }

    async findBySlug(slug: string): Promise<ProductResponseDto> {
        const product = await this.productRepository.findBySlug(slug);

        if (!product) {
            throw new NotFoundException(`Продукта по данному запросу не существует`);
        }

        return new ProductResponseDto({
            id: product.id,
            title: product.title,
            slug: product.slug,
            description: product.description,
            price: product.price,
            discount: product.discount,
            stock: product.stock,
            isActive: product.isActive,
            photos: product.photos.map((ph) => new ProductPhotoResponseDto(ph.url, ph.sortOrder)),
        });
    }
}