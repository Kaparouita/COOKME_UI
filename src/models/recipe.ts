export class Recipe {
    id?: number;
    description?: string;
    cooking_time?: number;
    prep_time?: number;
    serves?: number;
    keywords?: string[];
    ratings?: number;
    nutrition_info?: any;
    ingredients: string[] = [];
    courses?: string[];
    cuisine?: string;
    skill_level?: string;
    post_dates?: string;
    title?: string;
    image?: string;

    constructor(
    ) {
    }
}