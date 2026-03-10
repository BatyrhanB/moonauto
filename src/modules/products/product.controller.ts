import { Controller, Get, HttpCode, HttpStatus, Query } from "@nestjs/common";
import { ProductService } from "./product.service";
import { ProductListResponseDto } from "./dto/response/product-list.response.dto";
import { PageDto, PageOptionsDto } from "../../common";

@Controller('products')
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    @Get('list')
    @HttpCode(HttpStatus.OK)
    list(@Query() pageOptions: PageOptionsDto): Promise<PageDto<ProductListResponseDto>> {
        return this.productService.findAll(pageOptions);
    }
}