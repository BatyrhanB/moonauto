import { Entity, Column, OneToMany, Index } from 'typeorm';
import { AbstractEntity } from '../../../common';
import { ProductPhotoEntity } from './photo.entity';

@Entity('products')
export class ProductEntity extends AbstractEntity {
  @Column({ name: 'title', type: 'varchar', length: 255 })
  title: string;

  @Index({ unique: true })
  @Column({ name: 'slug', type: 'varchar', length: 255, unique: true })
  slug: string;

  @Column({ name: 'description', type: 'varchar', length: 1024, nullable: true, default: null })
  description: string | null;

  @Column({ name: 'price', type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column({ name: 'discount', type: 'decimal', precision: 10, scale: 2, default: 0 })
  discount: number;

  @Column({ name: 'stock', type: 'int', default: 0 })
  stock: number;

  @Column({ name: 'is_active', type: 'boolean', default: false })
  isActive: boolean;

  @OneToMany(() => ProductPhotoEntity, (photo) => photo.product, { cascade: true })
  photos: ProductPhotoEntity[];
}