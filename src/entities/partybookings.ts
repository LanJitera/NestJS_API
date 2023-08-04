import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '@entities/users';
import { Party } from '@entities/parties';

enum StatusEnum {
  APPROVE = 'Approve',
  REJECT = 'Reject',
  UNVALUE = 'Unvalue',
}

@Entity('partybookings')
export class Partybooking {
  @Column({ type: 'integer', primary: true })
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true, type: 'timestamp' })
  @CreateDateColumn()
  created_at: Date;

  @Column({ nullable: true, type: 'timestamp' })
  @UpdateDateColumn()
  updated_at: Date;

  @Column({ nullable: false, type: 'integer' })
  user_id: number;

  @Column({ nullable: false, type: 'integer' })
  party_id: number;

  @Column({
    nullable: true,
    type: 'enum',
    enum: ['Approve', 'Reject', 'Unvalue'],
    default: 'Approve',
  })
  status: `${StatusEnum}` = 'Approve';

  @ManyToOne(() => User, (user) => user.partybookings, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Party, (party) => party.partybookings, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'party_id' })
  party: Party;
}

export { StatusEnum };
