import { BelongsTo, Column, ForeignKey, HasOne, Model, PrimaryKey, Table } from "sequelize-typescript";
import { ProductModel } from "./productModel";
import { OrderModel } from "./orderModel";


@Table ({
    tableName: "order_items",
    timestamps: false
})

export class OrderItemModel extends Model {
    @PrimaryKey
    @Column
    declare id: string;

    @ForeignKey (() => ProductModel)
    @Column({allowNull: false})
    declare productId: string;

    @BelongsTo(() => ProductModel)
    declare product: ProductModel;

    @ForeignKey (() => OrderModel)
    @Column({allowNull: false})
    declare orderId: string;

    @BelongsTo(() => OrderModel)
    declare order: ProductModel;

    @Column({allowNull: false})
    declare name: string;

    @Column({allowNull: false})
    declare quantity: number;
    
    @Column({allowNull: false})
    declare price: number;
}