import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ProductEntity } from "../entities/product.entity";

@Injectable()
export class ProductRepository {
    constructor(
        @InjectRepository(ProductEntity)
        private readonly repo: Repository<ProductEntity>,
    ) {}

    findAll(): Promise<ProductEntity[]> {
        return this.repo.find({where: {isDeleted: false}});
    }

    findBySlug(slug: string): Promise<ProductEntity | null> {
        return this.repo.findOne({where: {slug: slug}});
    }

    create(data: Partial<ProductEntity>): ProductEntity {
        return this.repo.create(data);
    }

    save(product: ProductEntity): Promise<ProductEntity> {
        return this.repo.save(product);
    }
}