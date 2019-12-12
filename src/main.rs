#![feature(proc_macro_hygiene, decl_macro)]

#[macro_use] extern crate rocket;
#[macro_use] extern crate rocket_contrib;
#[macro_use] extern crate serde_derive;
#[macro_use] extern crate serde_json;
#[macro_use] extern crate reqwest;

#[cfg(test)] mod tests;

use std::result::Result;
use std::sync::Mutex;
use std::collections::HashMap;
use std::env;
use std::cell::RefCell;

use rocket::State;
use rocket_contrib::json::{Json, JsonValue};
use rocket_contrib::serve::StaticFiles;

#[derive(Serialize, Deserialize)]
struct MovieMeta {
    adult: bool,
    backdrop_path: String,
    genre_ids: Vec<i32>,
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
#[derive(Serialize, Deserialize)]
struct Genre {
    id: i32,
    name: String
}

#[derive(Serialize, Deserialize)]
struct TvMeta {
    adult: bool,
    backdrop_path: Option<String>,
    belongs_to_collection: Option<String>,
    genres: Vec<Genre>
}

#[derive(Serialize, Deserialize)]
struct Movie {
    id: usize,
    image: String,
    title: String
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
                    title: m.title
                });
            }
        },
        None => {}
    };

    Json(movies)

    
    
    // Json(vec![Movie {
    //     id: 0,
    //     image: "https://image.tmdb.org/t/p/w1280/qdfARIhgpgZOBh3vfNhWS4hmSo3.jpg".to_string()
    // }])
}

fn main() {
    rocket::ignite().mount("/", StaticFiles::from("static")).mount("/api", routes![movies]).launch();
}
