import { Injectable, NotFoundException } from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import { ProductRepository } from "./repositories/product.repository";
import { ProductListResponseDto } from "./dto/response/product-list.response.dto";
import { ProductResponseDto } from "./dto/response/product.response.dto";
import { PageDto, PageMetaDto, PageOptionsDto } from "../../common";

@Injectable()
export class ProductService {
    constructor(private readonly productRepository: ProductRepository) {}

    async findAll(pageOptions: PageOptionsDto): Promise<PageDto<ProductListResponseDto>> {
        const [products, total] = await this.productRepository.findAllPaginated(pageOptions);

        const data = plainToInstance(ProductListResponseDto, products, { excludeExtraneousValues: true });

        return new PageDto(data, new PageMetaDto(total, pageOptions.limit, pageOptions.offset));
    }

    async findBySlug(slug: string): Promise<ProductResponseDto> {
        const product = await this.productRepository.findBySlug(slug);

        if (!product) {
            throw new NotFoundException(`Продукта по данному запросу не существует`);
        }

        return plainToInstance(ProductResponseDto, product, { excludeExtraneousValues: true });
    }
}