import { Sequelize } from "sequelize-typescript"
import { Product } from "../domain/entity/product";
import { ProductModel } from "../infrastructure/db/sequelize/model/productModel";
import { ProductRepository } from "../infrastructure/repository/productRepository";

describe("ProductRepository unit tests", () => {

    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage:":memory:",
            logging: false,
            sync: {force:true}
        })

        sequelize.addModels([ProductModel])
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    })

    it("should create a product", async () => {
        const productRepository = new ProductRepository();
        const product = new Product("123", "Produto 01", 1999);
        await productRepository.create(product);

        const productModel = await ProductModel.findOne({where: {id: "123"}});

        expect(productModel?.toJSON()).toStrictEqual({
            id: "123",
            name: "Produto 01",
            price: 1999
        })
    })

    it("should update a product", async () => {
        const productRepository = new ProductRepository();
        const product = new Product("123", "Produto 01", 1999);
        await productRepository.create(product);

        product.changeName("Produto 001");
        product.changePrice(2000);

        await productRepository.update(product);
        
        const productUpdated = await ProductModel.findOne({where: {id: "123"}});


        expect(productUpdated?.toJSON()).toStrictEqual({
            id: "123",
            name: "Produto 001",
            price: 2000
        })
    })

    it("should find a product", async () => {
        const productRepository = new ProductRepository();
        const product = new Product("123", "Produto 01", 1999);
        await productRepository.create(product);        
        const productResponse = await productRepository.find(product.id);

        expect({
            id: productResponse.id,
            name: productResponse.name,
            price: productResponse.price
        }).toStrictEqual({
            id: "123",
            name: "Produto 01",
            price: 1999
        })
    })

    it("should find all products", async () => {
        const productRepository = new ProductRepository();
        const products = [new Product("123", "Produto 01", 1999), new Product("124", "Produto 02", 2099), new Product("125", "Produto 03", 2199)];

        products.forEach(async product => {
            await productRepository.create(product);        
        })

        const productResponse = await productRepository.findAll();

        expect(products).toEqual(productResponse);
    })
})