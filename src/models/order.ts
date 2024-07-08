export class Order {
    id = 0;
    user_id = 0;
    recipe_id = 0;
    market = '';
    price = 0;
    status = '';
    order_now = false;
    date = '';
  
    constructor( userID: number, recipeID: number, market: string, price: number, orderNow: boolean, date: string, status: string ) {
        this.user_id = userID;
        this.recipe_id = recipeID;
        this.market = market;
        this.price = price;
        this.order_now = orderNow;
        this.date = date;
        this.status = status;
    }
}