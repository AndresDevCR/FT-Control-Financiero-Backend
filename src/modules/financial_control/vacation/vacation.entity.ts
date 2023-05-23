import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { FINANCE_ADMINISTRATION_CONTROL as schema } from '@/const';

@Entity({schema: schema, name :'vacation'})
export class Vacation {

    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    employee_name:string;

    @Column()
    available_quantity:number;

    @Column()
    start_date:Date;

    @Column()
    reentry_date:Date;

    @Column()
    request_status:string;

    @Column()
    created_at:Date;

    @Column()
    updated_at:Date;
}


