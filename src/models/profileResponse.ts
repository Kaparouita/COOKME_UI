import { Review } from './review';


export class ProfileRecipeResponse {
    recipe_id = 0;
    recipe_name = '';
    recipe_image = '';
    total_price = 0;
    order_status = '';
    review = new Review(0, 0, '', 0);
    is_favorite = false;

    constructor(recipeID: number, recipeName: string, recipeImage: string, totalPrice: number, orderStatus: string, review: Review, isFavorite: boolean) {
        this.recipe_id = recipeID;
        this.recipe_name = recipeName;
        this.recipe_image = recipeImage;
        this.total_price = totalPrice;
        this.order_status = orderStatus;
        this.review = review;
        this.is_favorite = isFavorite;
    }
}