import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Admin } from 'entities/admins';
import { Partybooking } from 'entities/partybookings';
import { Comment } from 'entities/comments';

enum IsstatusEnum {
  PUBLIC = 'Public',
  DRAFT = 'Draft',
  CLOSE = 'Close',
  PRIVATE = 'Private',
}

@Entity('parties')
export class Party {
  @Column({ type: 'integer', primary: true })
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true, type: 'timestamp' })
  @CreateDateColumn()
  created_at: Date;

  @Column({ nullable: true, type: 'timestamp' })
  @UpdateDateColumn()
  updated_at: Date;

  @Column({ nullable: false, type: 'varchar', default: '' })
  nameparty: string = '';

  @Column({ nullable: false, type: 'timestamp' })
  partystarttime: Date;

  @Column({ nullable: false, type: 'varchar', default: '' })
  partylocation: string = '';

  @Column({ nullable: true, type: 'integer' })
  numberofpeople: number;

  @Column({
    nullable: true,
    type: 'enum',
    enum: ['Public', 'Draft', 'Close', 'Private'],
    default: 'Public',
  })
  isstatus: `${IsstatusEnum}` = 'Public';

  @Column({ nullable: false, type: 'integer' })
  admin_id: number;

  @Column({ nullable: true, type: 'text' })
  describe: string;

  @Column({ nullable: true, type: 'integer' })
  requiredage: number;

  @Column({ nullable: true, type: 'text', default: '' })
  img: string = '';

  @ManyToOne(() => Admin, (admin) => admin.parties, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'admin_id' })
  admin: Admin;

  @OneToMany(() => Partybooking, (partybooking) => partybooking.party, { cascade: true })
  @JoinColumn({ name: 'party_id' })
  partybookings: Partybooking[];

  @OneToMany(() => Comment, (comment) => comment.party, { cascade: true })
  @JoinColumn({ name: 'party_id' })
  comments: Comment[];
}

export { IsstatusEnum };
