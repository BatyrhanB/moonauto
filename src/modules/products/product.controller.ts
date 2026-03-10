import {Controller, Get, HttpCode, HttpStatus} from "@nestjs/common";
import {ProductService} from "./product.service";
import {ProductListResponseDto} from "./dto/response/product-list.response.dto";

@Controller('products')
export class ProductController {
    constructor(private readonly productService: ProductService) {}

  @Get("list")
  @HttpCode(HttpStatus.OK)
  list(): Promise<ProductListResponseDto[]> {
    return this.productService.findAll();
}
}

