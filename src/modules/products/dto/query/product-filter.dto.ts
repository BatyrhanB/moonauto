import { IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { PageOptionsDto } from '../../../../common';

export class ProductFilterDto extends PageOptionsDto {
    @ApiPropertyOptional({ example: 'electronics', description: 'Filter by category slug (includes all subcategories)' })
    @IsOptional()
    @IsString()
    categorySlug?: string;
}