export class Review {
    id = 0;
    recipe_id = 0;
    user_id = 0;
    comment = '';
    rating = 0;
  
    constructor( recipeID: number, userID: number, comment: string, rating: number) {
        this.recipe_id = recipeID;
        this.user_id = userID;
        this.comment = comment;
        this.rating = rating;
    }
}