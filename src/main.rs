#![feature(proc_macro_hygiene, decl_macro)]

#[macro_use] extern crate rocket;
#[macro_use] extern crate rocket_contrib;
#[macro_use] extern crate serde_derive;
#[macro_use] extern crate reqwest;

#[cfg(test)] mod tests;

use std::sync::Mutex;
use std::collections::HashMap;

use rocket::State;
use rocket_contrib::json::{Json, JsonValue};
use rocket_contrib::serve::StaticFiles;


#[derive(Serialize, Deserialize)]
struct Movie {
    id: usize,
    image: String
}


#[get("/movies/<resource_name>", format = "json")]
fn movies(resource_name: String) -> Json<Vec<Movie>> {
    println!("Resource requested {}", resource_name);
    println!("Response: {:?}", reqwest::blocking::get(&format!("https://api.themoviedb.org/3/movie/popular?api_key={}&language=en-US&page=1", env!("TMDB_API_KEY"))));
    
    Json(vec![Movie {
        id: 0,
        image: "https://image.tmdb.org/t/p/w1280/qdfARIhgpgZOBh3vfNhWS4hmSo3.jpg".to_string()
    }])
}

fn main() {
    rocket::ignite().mount("/", StaticFiles::from("static")).mount("/api", routes![movies]).launch();
}
