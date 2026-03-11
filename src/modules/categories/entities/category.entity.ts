import {Column, Entity, OneToMany, Tree, TreeChildren, TreeParent} from "typeorm";
import {AbstractEntity} from "../../../common";
import {ProductEntity} from "../../products";

@Entity('categories')
@Tree('closure-table')
export class CategoryEntity extends AbstractEntity {
    @Column({ name: "title", type: "varchar", length: 255})
    title: string;

    @Column({ name: "slug", type: "varchar", length: 255, unique: true })
    slug: string;

    @Column({ name: "is_active", type: "boolean", default: false })
    isActive: boolean;

    @Column({ name: 'sort_order', type: 'int', default: 0 })
    sortOrder: number;

    @TreeChildren()
    children: CategoryEntity[]

    @TreeParent()
    parent: CategoryEntity;

    @OneToMany(() => ProductEntity, (product) => product.category)
    products: ProductEntity[];
}