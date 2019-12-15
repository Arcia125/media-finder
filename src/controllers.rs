use std::cell::RefCell;
use std::env;

use crate::models;

const TMDB_BASE_URL: &'static str = "https://api.themoviedb.org";

thread_local!(static API_KEY: RefCell<String> = RefCell::new(env::var("TMDB_API_KEY").unwrap()));

pub fn get_movies(resource_name: String) -> Option<models::MovieResponse> {
    API_KEY.with(|api_key| {
        match reqwest::blocking::get(&format!("{}/3/movie/{}?api_key={}&language=en-US&page=1", TMDB_BASE_URL, resource_name, api_key.borrow())) {
            Ok(res) => {
                match res.text() {
                    Ok(text) => {
                        match serde_json::from_str::<models::MovieResponse>(&text) {
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

pub fn get_movie(movie_id: String) -> Option<models::MovieMeta> {
    API_KEY.with(|api_key| {
        match reqwest::blocking::get(&format!("{}/3/movie/{}?api_key={}&language=en-US", TMDB_BASE_URL, movie_id, api_key.borrow())) {
            Ok(res) => {
                match res.text() {
                    Ok(text) => {
                        match serde_json::from_str::<models::MovieMeta>(&text) {
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

pub fn get_movie_credits(movie_id: String) -> Option<models::CreditResponse> {
    API_KEY.with(|api_key| {
        match reqwest::blocking::get(&format!("{}/3/movie/{}/credits?api_key={}&language=en-US", TMDB_BASE_URL, movie_id, api_key.borrow())) {
            Ok(res) => {
                match res.text() {
                    Ok(text) => {

                        match serde_json::from_str::<models::CreditResponse>(&text) {
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


