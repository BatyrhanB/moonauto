import {Injectable} from "@nestjs/common";
import {ProductRepository} from "./repositories/product.repository";
import {ProductListResponseDto} from "./dto/response/product-list.response.dto";


@Injectable()
export class ProductService {
    constructor(private readonly productRepository: ProductRepository) {}

    async findAll(): Promise<ProductListResponseDto[]> {
        const products = await this.productRepository.findAll();
        return products.map(
            (p) => new ProductListResponseDto(p.title, p.description, p.price, p.discount, p.stock),
        );
    }
}