export default class Movie {
    constructor({
        id,
        title,
        overview,
        popularity,
        genre_ids,
        genres,
        poster_path,
        release_date,
        vote_average,
        vote_count,
        backdrop_path,
        budget,
        revenue,
    }) {
        this.id = id;
        this.title = title;
        this.overview = overview;
        this.popularity = popularity;
        this.genre_ids = genre_ids;
        this.genres = genres;
        this.poster_path = poster_path;
        this.release_date = release_date;
        this.vote_average = vote_average;
        this.vote_count = vote_count;
        this.backdrop_path = backdrop_path;
        this.budget = budget;
        this.revenue = revenue;
    }
}