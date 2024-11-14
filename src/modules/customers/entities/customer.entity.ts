import { User } from 'src/modules/user/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('customers')
export class Customer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @Column()
  name: string;

  @Column('decimal')
  salary: number;

  @Column('decimal')
  companyValue: number;

  @ManyToOne(() => User, (user) => user.customers)
  user: User;
}