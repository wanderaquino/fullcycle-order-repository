import { BelongsTo, Column, ForeignKey, HasMany, HasOne, Model, PrimaryKey, Table } from "sequelize-typescript";
import { CustomerModel } from "../../../customer/repository/sequelize/customerModel";
import { OrderItemModel } from "./orderItemModel";


@Table ({
    tableName: "orders",
    timestamps: false
})

export class OrderModel extends Model {
    @PrimaryKey
    @Column
    declare id: string;

    @ForeignKey (() => CustomerModel)
    @Column({allowNull: false})
    declare customerId: string;

    @BelongsTo(() => CustomerModel)
    declare customer: CustomerModel;

    @HasMany(() => OrderItemModel)
    declare orderItems: OrderItemModel[];

    @Column({allowNull: false})
    declare total: number;
}