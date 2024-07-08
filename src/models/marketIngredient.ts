export class MarketIngredient {
    id: number = 0;
    name: string  = '';
    price: number = 0;
    market: string ='';

    constructor(id: number, name: string, price: number, market: string) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.market = market;
    }
}