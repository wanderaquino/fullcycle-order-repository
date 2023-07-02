export class Address {
    private _street: string = "";
    private _number: number = 0;
    private _zip: string = "";
    private _city: string = "";
    private _country: string = "";
    private _active: boolean = false;
    

    constructor(street: string, number: number, zip: string, city: string, country: string) {
        this._street = street;
        this._number = number;
        this._zip = zip;
        this._country = country;
        this._city = city;
        this.validate();
    }

    validate(){
        if(this._street.length === 0) {
            throw new Error("Street is required");
        }

        if(this._number === undefined || this._number < 1) {
            throw new Error("Number is required");
        }

        if(this._zip.length === 0) {
            throw new Error("Zip is required");
        }

        if(this._country.length === 0) {
            throw new Error("Country is required");
        }

        if(this._city.length === 0) {
            throw new Error("City is required");
        }
    }

    get street () {
        return this._street;
    }

    get number () {
        return this._number;
    }

    get zip () {
        return this._zip;
    }

    get city () {
        return this._city;
    }

    get country() {
        return this._country;
    }

    isActive(): boolean {
        return this._active
    }

    activate() : void {
        this._active = true;
    }
}