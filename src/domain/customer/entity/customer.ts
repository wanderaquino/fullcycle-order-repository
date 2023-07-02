import {Address} from "../value-object/address";

export class Customer {
    [x: string]: any;
    private _id: string;
    private _name: string;
    private _address!: Address;
    private _active: boolean = false;
    private _rewardPoints: number = 0;

    constructor(id: string, name: string) {
        this._id = id;
        this._name = name;
        this.validate();
    }

    changeName(name: string) {
        this._name = name;
    }

    changeAddress(address: Address) {
        this._address = address;
    }

    validate() {
        if(this._name.length === 0) {
            throw new Error("Customer name is mandatory");
        }

        if(this._id.length === 0) {
            throw new Error("ID is mandatory");
        }
    }

    activate(state: boolean) {
        if(this._address === undefined) {
            throw new Error("Address is mandatory");
        }
        this._active = state;
    }

    get address () {
        return this._address;
    }

    get name() {
        return this._name;
    }

    get id() {
        return this._id;
    }

    get active () {
        return this._active;
    }

    isActive(): boolean {
        return this._active;
    }

    addRewardPoints(points: number):void {
        this._rewardPoints += points;
    }

    getRewardPoints() {
        return this._rewardPoints;
    }
}