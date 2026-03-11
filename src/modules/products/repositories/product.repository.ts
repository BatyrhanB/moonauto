import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ProductEntity } from "../entities/product.entity";
import { PageOptionsDto } from '../../../common';

@Injectable()
export class ProductRepository {
    constructor(
        @InjectRepository(ProductEntity)
        private readonly repo: Repository<ProductEntity>,
    ) {}

    findAllPaginated({ limit, offset }: PageOptionsDto): Promise<[ProductEntity[], number]> {
        return this.repo.findAndCount({
            where: { isDeleted: false, isActive: true },
            order: { createdAt: 'DESC' },
            take: limit,
            skip: offset,
        });
    }

    findBySlug(slug: string): Promise<ProductEntity | null> {
        return this.repo.findOne({
            where: { slug, isDeleted: false, isActive: true },
            relations: { photos: true },
            order: { photos: { sortOrder: 'ASC' } },
        });
    }

    create(data: Partial<ProductEntity>): ProductEntity {
        return this.repo.create(data);
    }

    save(product: ProductEntity): Promise<ProductEntity> {
        return this.repo.save(product);
    }
}