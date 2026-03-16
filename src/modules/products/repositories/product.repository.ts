import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ProductEntity } from "../entities/product.entity";
import { ProductFilterDto } from '../dto/query/product-filter.dto';

@Injectable()
export class ProductRepository {
    constructor(
        @InjectRepository(ProductEntity)
        private readonly repo: Repository<ProductEntity>,
    ) {}

    findAllPaginated({ limit, offset, categorySlug }: ProductFilterDto): Promise<[ProductEntity[], number]> {
        const qb = this.repo.createQueryBuilder('product')
            .leftJoinAndSelect('product.category', 'category')
            .where('product.isDeleted = :isDeleted', { isDeleted: false })
            .andWhere('product.isActive = :isActive', { isActive: true })
            .orderBy('product.createdAt', 'DESC')
            .take(limit)
            .skip(offset);

        if (categorySlug) {
            qb.innerJoin(
                'categories_closure',
                'cc',
                'product.category_id = cc.id_descendant',
            ).innerJoin(
                'categories',
                'cat',
                'cat.id = cc.id_ancestor AND cat.slug = :categorySlug AND cat.is_deleted = false AND cat.is_active = true',
                { categorySlug },
            );
        }

        return qb.getManyAndCount();
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