import { ApiProperty } from '@nestjs/swagger';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @ApiProperty({ example: '9f6a9b6b-0db0-4412-b1fd-9a14dcfdad24' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: 'John Doe' })
  @Column()
  name: string;

  @ApiProperty({ example: 'user@example.com' })
  @Column({ unique: true })
  email: string;

  @ApiProperty({ example: '+1234567890' })
  @Column({ unique: true })
  @Column()
  phone: string;

  @ApiProperty({ example: 30 })
  @Column({ default: 0 })
  @Column()
  age: number;

  @ApiProperty({ example: 'password123' })
  @Column()
  password: string;
}
