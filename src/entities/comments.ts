import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Party } from 'entities/parties';
import { User } from 'entities/users';

@Entity('comments')
export class Comment {
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
  party_id: number;

  @Column({ nullable: false, type: 'integer' })
  user_id: number;

  @Column({ nullable: false, type: 'text' })
  comment: string;

  @Column({ nullable: false, type: 'integer' })
  id_cmtrep: number;

  @ManyToOne(() => Party, (party) => party.comments, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'party_id' })
  party: Party;

  @ManyToOne(() => User, (user) => user.comments, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;
}
