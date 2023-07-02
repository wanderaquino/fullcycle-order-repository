import { Order } from "../../../../domain/checkout/entity/order";
import { OrderItem } from "../../../../domain/checkout/entity/orderItem";
import { OrderRepositoryInterface } from "../../../../domain/checkout/repository/orderRepositoryInterface";
import { OrderItemModel } from "./orderItemModel";
import { OrderModel } from "./orderModel";

export class OrderRepository implements OrderRepositoryInterface {

    async create(entity: Order): Promise<void> {
        await OrderModel.create({
             id: entity.id,
             customerId: entity.customerId,
             total: entity.total(),
             orderItems: entity.orderItems.map((item) => ({
                 id: item.id,
                 name: item.name,
                 price: item.price,
                 productId: item.productId,
                 quantity: item.quantity,
               })),
         }, {
             include: [{model: OrderItemModel}]
         })
    }

    async update(entity: Order): Promise<void> {
        try {
            await OrderModel.sequelize?.transaction(async (transaction) => {
                await OrderItemModel.destroy({where: {orderId: entity.id}, transaction});
                const items = entity.orderItems.map((item) => ({
                    id: item.id,
                    name: item.name,
                    price: item.price,
                    productId: item.productId,
                    quantity: item.quantity,
                    orderId: entity.id
                  }));
                await OrderItemModel.bulkCreate(items, { transaction });
                await OrderModel.update(
            { total: entity.total() },
            { where: { id: entity.id }, transaction});
            })
        } catch (error) {
            throw Error(`Error on update`);
        }
    }

    async find(id: string): Promise<Order> {

        try{
            const orderResponse = await OrderModel.findOne({where: {id},rejectOnEmpty: true, include: [{model: OrderItemModel}]});

                return new Order(
                    orderResponse.id, orderResponse.customerId, orderResponse.orderItems.map(
                        (item) => new OrderItem(
                            item.id,
                            item.name,
                            item.price,
                            item.productId,
                            item.quantity,
                          )
                    )
                )
        }
        catch(error) {
            throw Error(`Order not found: ${error}`);
        }
    }
    
    async findAll(): Promise<Order[]> {
        try {
            const ordersResponse = await OrderModel.findAll({include: [{model: OrderItemModel}]});

            return ordersResponse.map(order => {
                return new Order(   
                    order.id, 
                    order.customerId, 
                    order.orderItems.map(
                        orderItem => new OrderItem(    
                        orderItem.id,
                        orderItem.name,
                        orderItem.price,
                        orderItem.productId,
                        orderItem.quantity)));
            })
        } catch(error) {
            return []
        }
    }
}