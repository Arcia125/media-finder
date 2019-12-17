
#[derive(Serialize, Deserialize)]
pub struct MovieMeta {
    pub adult: bool,
    pub backdrop_path: Option<String>,
    pub genre_ids: Option<Vec<i32>>,
    pub id: usize,
    pub original_language: String,
    pub original_title: String,
    pub overview: String,
    pub popularity: f32,
    pub poster_path: String,
    pub release_date: String,
    pub title: String,
    pub video: bool,
    pub vote_average: f32,
    pub vote_count: i32,
    pub runtime: Option<i32>
}
// #[derive(Serialize, Deserialize)]
// struct Genre {
//     id: i32,
//     name: String
// }

// #[derive(Serialize, Deserialize)]
// struct TvMeta {
//     adult: bool,
//     backdrop_path: Option<String>,
//     belongs_to_collection: Option<String>,
//     genres: Vec<Genre>
// }

#[derive(Serialize, Deserialize)]
pub struct Cast {
    pub cast_id: i32,
    pub character: String,
    pub credit_id: String,
    pub gender: i32,
    pub id: usize,
    pub name: String,
    pub order: i32,
    pub profile_path: Option<String>
}

#[derive(Serialize, Deserialize)]
pub struct Crew {
    pub id: usize,
    pub credit_id: String,
    pub department: String,
    pub gender: i32,
    pub job: String,
    pub name: String,
    pub profile_path: Option<String>
}

#[derive(Serialize, Deserialize)]
pub struct CreditResponse {
    pub id: usize,
    pub cast: Vec<Cast>,
    pub crew: Vec<Crew>
}

#[derive(Serialize, Deserialize)]
pub struct Movie {
    pub id: usize,
    pub image: String,
    pub title: String,
    pub release_date: String,
    pub vote_average: f32,
    pub overview: String,
    pub runtime: Option<i32>,
    pub backdrop_path: Option<String>
}

impl Movie {
  pub fn from_movie_meta(movie_meta: MovieMeta) -> Movie {
    Movie {
      id: movie_meta.id,
      image: format!("https://image.tmdb.org/t/p/w500{}", movie_meta.poster_path),
      title: movie_meta.title,
      release_date: movie_meta.release_date,
      vote_average: movie_meta.vote_average,
      overview: movie_meta.overview,
      runtime: movie_meta.runtime,
      backdrop_path: movie_meta.backdrop_path
    }
  }
}

#[derive(Serialize, Deserialize)]
pub struct MovieResponse {
    pub page: Option<i32>,
    pub results: Vec<MovieMeta>,
    pub total_pages: i32,
    pub total_results: i32
}
