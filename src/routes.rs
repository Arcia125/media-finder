extern crate rocket_contrib;
extern crate serde_json;
extern crate reqwest;

use std::result::Result;
use std::path::{Path, PathBuf};

use rocket::response::{NamedFile, Responder};
use rocket::{Request, Response};
use rocket_contrib::json::{Json};
use rocket::http::Status;


use crate::models;
use crate::controllers;

#[get("/movie/<movie_id>", format = "json", rank = 1)]
pub fn movie(movie_id: String) -> Json<Option<models::Movie>> {
    let response_json = controllers::get_movie(movie_id);

    let mut movie: Option<models::Movie> = None;
    match response_json {
        Some(res) => {
            movie = Some(models::Movie::from_movie_meta(res));
        },
        None => {}
    }

    Json(movie)
}

#[get("/movie/<movie_id>/credits", format = "json", rank = 1)]
pub fn movie_credits(movie_id: String) -> Json<Option<models::CreditResponse>> {
    Json(controllers::get_movie_credits(movie_id))
}

#[get("/movies/<resource_name>", format = "json", rank = 1)]
pub fn movies(resource_name: String) -> Json<Vec<models::Movie>> {
    println!("Resource requested {}", resource_name);
    let response_json = controllers::get_movies(resource_name);

    let mut movies: Vec<models::Movie> = vec![];
    match response_json {
        Some(res) => {
            for m in res.results {
                movies.push(models::Movie::from_movie_meta(m));
            }
        },
        None => {}
    }

    Json(movies)
}

pub enum PathResp { File(PathBuf), Dir(PathBuf) }

impl Responder<'static> for PathResp {
    fn respond_to(self, req: &Request) -> Result<Response<'static>, Status> {
        match self {
            PathResp::File(path) => NamedFile::open(path).ok().respond_to(req),
            PathResp::Dir(_path) => NamedFile::open(Path::new("static/index.html")).ok().respond_to(req)
        }
    }
}

#[get("/", rank = 10)]
pub fn index() -> Option<NamedFile> {
    NamedFile::open(Path::new("static/index.html")).ok()
}

#[get("/<path..>", rank = 10)]
pub fn files(path: PathBuf) -> PathResp {
    let static_path = Path::new("static").join(path);
    if static_path.is_file() { PathResp::File(static_path) } else { PathResp::Dir(static_path) }
}