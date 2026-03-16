import { Controller, Get, Param, Query } from "@nestjs/common";
import { ApiExtraModels, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags, getSchemaPath } from "@nestjs/swagger";
import { ProductService } from "./product.service";
import { ProductListResponseDto } from "./dto/response/product-list.response.dto";
import { ProductResponseDto } from "./dto/response/product.response.dto";
import { PageDto } from "../../common";
import { ProductFilterDto } from './dto/query/product-filter.dto';

@ApiTags('Products')
@ApiExtraModels(PageDto, ProductListResponseDto)
@Controller('products')
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    @ApiOperation({ summary: 'Get paginated product list', description: 'Supports pagination and optional filtering by category slug (includes all subcategories)' })
    @ApiOkResponse({
        description: 'Paginated list of products',
        schema: {
            allOf: [
                { $ref: getSchemaPath(PageDto) },
                {
                    properties: {
                        data: {
                            type: 'array',
                            items: { $ref: getSchemaPath(ProductListResponseDto) },
                        },
                    },
                },
            ],
        },
    })
    @Get()
    list(@Query() filter: ProductFilterDto): Promise<PageDto<ProductListResponseDto>> {
        return this.productService.findAll(filter);
    }

    @ApiOperation({ summary: 'Get product by slug' })
    @ApiOkResponse({ type: ProductResponseDto, description: 'Product details with photos' })
    @ApiNotFoundResponse({ description: 'Product not found' })
    @Get(':slug')
    findOne(@Param('slug') slug: string): Promise<ProductResponseDto> {
        return this.productService.findBySlug(slug);
    }
}