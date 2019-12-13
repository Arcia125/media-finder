#![feature(proc_macro_hygiene, decl_macro)]

#[macro_use] extern crate rocket;
#[macro_use] extern crate serde_derive;
extern crate rocket_contrib;
extern crate serde_json;
extern crate reqwest;

#[cfg(test)] mod tests;

use std::result::Result;
use std::path::{Path, PathBuf};
use std::env;
use std::cell::RefCell;

use rocket::{Request, Response};
use rocket::response::{NamedFile, Responder};
use rocket::http::Status;
use rocket_contrib::json::{Json};

#[derive(Serialize, Deserialize)]
struct MovieMeta {
    adult: bool,
    backdrop_path: String,
    genre_ids: Option<Vec<i32>>,
    id: usize,
    original_language: String,
    original_title: String,
    overview: String,
    popularity: f32,
    poster_path: String,
    release_date: String,
    title: String,
    video: bool,
    vote_average: f32,
    vote_count: i32
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
struct Cast {
    cast_id: i32,
    character: String,
    credit_id: String,
    gender: i32,
    id: usize,
    name: String,
    order: i32,
    profile_path: Option<String>
}

#[derive(Serialize, Deserialize)]
struct Crew {
    id: usize,
    credit_id: String,
    department: String,
    gender: i32,
    job: String,
    name: String,
    profile_path: Option<String>
}

#[derive(Serialize, Deserialize)]
struct CreditResponse {
    id: usize,
    cast: Vec<Cast>,
    crew: Vec<Crew>
}

#[derive(Serialize, Deserialize)]
struct Movie {
    id: usize,
    image: String,
    title: String,
    release_date: String,
    vote_average: f32
}

#[derive(Serialize, Deserialize)]
struct MovieResponse {
    page: Option<i32>,
    results: Vec<MovieMeta>,
    total_pages: i32,
    total_results: i32
}

const TMDB_BASE_URL: &'static str = "https://api.themoviedb.org";

thread_local!(static API_KEY: RefCell<String> = RefCell::new(env::var("TMDB_API_KEY").unwrap()));

fn get_movies(resource_name: String) -> Option<MovieResponse> {
    API_KEY.with(|api_key| {
        match reqwest::blocking::get(&format!("{}/3/movie/{}?api_key={}&language=en-US&page=1", TMDB_BASE_URL, resource_name, api_key.borrow())) {
            Ok(res) => {
                match res.text() {
                    Ok(text) => {
                        match serde_json::from_str::<MovieResponse>(&text) {
                            Ok(json) => Some(json),
                            Err(error) => {
                                println!("Error: {:?}", error);
                                None
                            }
                        }
                    },
                    Err(error) => {
                        println!("Error: {:?}", error);
                        None
                    }
                }
            },
            Err(error) => {
                println!("Error: {:?}", error);
                None
            }
        }
    })
}

fn get_movie(movie_id: String) -> Option<MovieMeta> {
    API_KEY.with(|api_key| {
        match reqwest::blocking::get(&format!("{}/3/movie/{}?api_key={}&language=en-US", TMDB_BASE_URL, movie_id, api_key.borrow())) {
            Ok(res) => {
                match res.text() {
                    Ok(text) => {
                        match serde_json::from_str::<MovieMeta>(&text) {
                            Ok(json) => Some(json),
                            Err(error) => {
                                println!("Error: {:?}", error);
                                None
                            }
                        }
                    },
                    Err(error) => {
                        println!("Error: {:?}", error);
                        None
                    }
                }
            },
            Err(error) => {
                println!("Error: {:?}", error);
                None
            }
        }
    })
}

fn get_movie_credits(movie_id: String) -> Option<CreditResponse> {
    API_KEY.with(|api_key| {
        match reqwest::blocking::get(&format!("{}/3/movie/{}/credits?api_key={}&language=en-US", TMDB_BASE_URL, movie_id, api_key.borrow())) {
            Ok(res) => {
                match res.text() {
                    Ok(text) => {
                        println!("TEXT: {:?}", text);

                        match serde_json::from_str::<CreditResponse>(&text) {
                            Ok(json) => Some(json),
                            Err(error) => {
                                println!("Error: {:?}", error);
                                None
                            }
                        }
                    },
                    Err(error) => {
                        println!("Error: {:?}", error);
                        None
                    }
                }
            },
            Err(error) => {
                println!("Error: {:?}", error);
                None
            }
        }
    })
}

enum PathResp { File(PathBuf), Dir(PathBuf) }

impl Responder<'static> for PathResp {
    fn respond_to(self, req: &Request) -> Result<Response<'static>, Status> {
        match self {
            PathResp::File(path) => NamedFile::open(path).ok().respond_to(req),
            PathResp::Dir(_path) => NamedFile::open(Path::new("static/index.html")).ok().respond_to(req)
        }
    }
}

#[get("/", rank = 10)]
fn index() -> Option<NamedFile> {
    NamedFile::open(Path::new("static/index.html")).ok()
}

#[get("/<path..>", rank = 10)]
fn files(path: PathBuf) -> PathResp {
    let static_path = Path::new("static").join(path);
    if static_path.is_file() { PathResp::File(static_path) } else { PathResp::Dir(static_path) }
}

#[get("/movie/<movie_id>", format = "json")]
fn movie(movie_id: String) -> Json<Option<Movie>> {
    let response_json = get_movie(movie_id);

    let mut movie: Option<Movie> = None;
    match response_json {
        Some(res) => {
            movie = Some(Movie {
                id: res.id,
                image: format!("https://image.tmdb.org/t/p/w500{}", res.poster_path),
                title: res.title,
                release_date: res.release_date,
                vote_average: res.vote_average
            });
        },
        None => {}
    }

    Json(movie)
}

#[get("/movie/<movie_id>/credits", format = "json")]
fn movie_credits(movie_id: String) -> Json<Option<CreditResponse>> {
    Json(get_movie_credits(movie_id))
}

#[get("/movies/<resource_name>", format = "json")]
fn movies(resource_name: String) -> Json<Vec<Movie>> {
    println!("Resource requested {}", resource_name);
    let response_json = get_movies(resource_name);

    let mut movies: Vec<Movie> = vec![];
    match response_json {
        Some(res) => {
            for m in res.results {
                movies.push(Movie {
                    id: m.id,
                    image: format!("https://image.tmdb.org/t/p/w500{}", m.poster_path),
                    title: m.title,
                    release_date: m.release_date,
                    vote_average: m.vote_average
                });
            }
        },
        None => {}
    }

    Json(movies)
}

fn main() {
    
    rocket::ignite()
        .mount("/api", routes![movie, movie_credits, movies])
        .mount("/", routes![index, files])
        .launch();
}
