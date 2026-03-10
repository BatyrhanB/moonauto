import { Injectable } from "@nestjs/common";
import { ProductRepository } from "./repositories/product.repository";
import { ProductListResponseDto } from "./dto/response/product-list.response.dto";
import { PageDto, PageMetaDto, PageOptionsDto } from "../../common";

@Injectable()
export class ProductService {
    constructor(private readonly productRepository: ProductRepository) {}

    async findAll(pageOptions: PageOptionsDto): Promise<PageDto<ProductListResponseDto>> {
        const [products, total] = await this.productRepository.findAllPaginated(pageOptions);

        const data = products.map(
            (p) => new ProductListResponseDto(p.title, p.description, p.price, p.discount, p.stock),
        );

        return new PageDto(data, new PageMetaDto(total, pageOptions.limit, pageOptions.offset));
    }
}