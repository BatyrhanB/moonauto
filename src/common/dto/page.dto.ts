export class PageMetaDto {
  readonly total: number;
  readonly limit: number;
  readonly offset: number;
  readonly hasNext: boolean;
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
  readonly data: T[];
  readonly meta: PageMetaDto;

  constructor(data: T[], meta: PageMetaDto) {
    this.data = data;
    this.meta = meta;
  }
}