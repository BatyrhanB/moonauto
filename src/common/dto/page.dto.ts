import { ApiProperty } from '@nestjs/swagger';

export class PageMetaDto {
  @ApiProperty({ example: 100 })
  readonly total: number;

  @ApiProperty({ example: 20 })
  readonly limit: number;

  @ApiProperty({ example: 0 })
  readonly offset: number;

  @ApiProperty({ example: true })
  readonly hasNext: boolean;

  @ApiProperty({ example: false })
  readonly hasPrev: boolean;

  constructor(total: number, limit: number, offset: number) {
    this.total = total;
    this.limit = limit;
    this.offset = offset;
    this.hasNext = offset + limit < total;
    this.hasPrev = offset > 0;
  }
}

export class PageDto<T> {
  @ApiProperty({ isArray: true })
  readonly data: T[];

  @ApiProperty({ type: () => PageMetaDto })
  readonly meta: PageMetaDto;

  constructor(data: T[], meta: PageMetaDto) {
    this.data = data;
    this.meta = meta;
  }
}