export class OrderItem {
    private _id: string;
    private _name: string;
    private _price: number;
    private _productId: string;
    private _quantity: number;

    constructor(id: string, name: string, price: number, productId: string, quantity: number) {
        this._id = id;
        this._name = name;
        this._price = price;
        this._productId = productId;
        this._quantity = quantity;

        this.validate();
    }

    get id () : string {
        return this._id;
    }

    get name () : string {
        return this._name;
    }

    get price(): number{
        return this._price;
    }

    get quantity(): number {
        return this._quantity;
    }

    get productId () : string {
        return this._productId;
    }

    
    validate() {
        if(this._quantity < 1) {
            throw Error("At least one product quantity must be informed");
        }
        if(this._price < 1) {
            throw Error("Price must be greater than zero");
        }
        if (this._productId.length === 0) {
            throw Error("ProductID must be informed");
        }
        return true;
    }
}