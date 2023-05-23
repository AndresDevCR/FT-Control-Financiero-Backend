import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { FINANCE_ADMINISTRATION_CONTROL as schema } from '@/const';

@Entity({ schema: schema, name: 'invoice' })
export class Invoice {
   
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255, nullable: false })
    client_name: string;

    @Column({ type: 'varchar', length: 255, nullable: false })
    address: string;


    @Column({ type: 'varchar', length: 255, nullable: false })
    phone: string;

    
    @Column({ type: 'varchar', length: 255, nullable: false })
    email: string;


    @Column({ type: 'date', nullable: false })
    issue_date: Date;


    @Column({ type: 'date', nullable: false })
    expiration_date: Date;


    @Column({ type: 'int', nullable: false })
    invoice_number: number;


    @Column({ type: 'int', nullable: false })
    order_number: number;


    @Column({ type: 'timestamp', nullable: false, default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;


    @Column({ type: 'timestamp', nullable: false, default: () => 'CURRENT_TIMESTAMP' })
    updated_at: Date;
}

