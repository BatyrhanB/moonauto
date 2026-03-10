import { Column, Entity, Index, ManyToOne, JoinColumn } from 'typeorm';
import { AbstractEntity } from '../../../common';
import { ProductEntity } from './product.entity';

@Entity('product_photos')
@Index(['productId'])
export class ProductPhotoEntity extends AbstractEntity {
  @Column({ name: 'product_id', type: 'uuid' })
  productId: string;

  @Column({ name: 'url', type: 'varchar', length: 2048 })
  url: string;

  @Column({ name: 'sort_order', type: 'int', default: 0 })
  sortOrder: number;

  @ManyToOne(() => ProductEntity, (product) => product.photos, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'product_id' })
  product: ProductEntity;
}