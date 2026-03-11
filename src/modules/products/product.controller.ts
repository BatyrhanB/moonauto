import { Controller, Get, Param, Query } from "@nestjs/common";
import { ProductService } from "./product.service";
import { ProductListResponseDto } from "./dto/response/product-list.response.dto";
import { ProductResponseDto } from "./dto/response/product.response.dto";
import { PageDto, PageOptionsDto } from "../../common";

@Controller('products')
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    @Get()
    list(@Query() pageOptions: PageOptionsDto): Promise<PageDto<ProductListResponseDto>> {
        return this.productService.findAll(pageOptions);
    }

    @Get(':slug')
    findOne(@Param('slug') slug: string): Promise<ProductResponseDto> {
        return this.productService.findBySlug(slug);
    }
}