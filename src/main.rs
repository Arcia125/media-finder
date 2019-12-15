#![feature(proc_macro_hygiene, decl_macro)]

#[macro_use] extern crate rocket;
#[macro_use] extern crate serde_derive;
extern crate rocket_contrib;
extern crate serde_json;
extern crate reqwest;

#[cfg(test)] mod tests;

mod models;
mod controllers;
mod routes;


fn main() {
    rocket::ignite()
        .mount("/api", routes![routes::movie, routes::movie_credits, routes::movies])
        .mount("/", routes![routes::index, routes::files])
        .launch();
}
