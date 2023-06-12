import { Product } from "../../domain/entity/product";
import { ProductRepositoryInterface } from "../../domain/repository/productRepositoryInterface";
import { ProductModel } from "../db/sequelize/model/productModel";

export class ProductRepository implements ProductRepositoryInterface {

    async create(entity: Product): Promise<void> {
        await ProductModel.create({
            id: entity.id,
            name: entity.name,
            price: entity.price
        });

    }
    async update(entity: Product): Promise<void> {
        await ProductModel.update({
            name: entity.name,
            price: entity.price
        }, {where: {id: entity.id}})
    }
    async find(id: string): Promise<Product> {
        const product = await ProductModel.findOne({where: {id}});

        if(product !== null) {
            return new Product(product.id, product.name, product.price);
        }

        throw new Error("Product not Found");

    }
    async findAll(): Promise<Product[]> {
        const productsResponse = await ProductModel.findAll();
        
        if (productsResponse) {
            const products = productsResponse.map((product) => new Product(product.id, product.name, product.price));
            return products;
        }
        return []
    }

}