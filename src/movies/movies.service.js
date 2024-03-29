const knex = require("../db/connection");

// Middleware

function listActiveMovies() {
  return knex("movies as m")
    .join("movies_theaters as mt", "mt.movie_id", "m.movie_id")
    .select("m.*", "m.movie_id as id")
    .where({ is_showing: true })
    .groupBy("m.movie_id");
}

// CRUD

async function list(isShowing) {
  if (isShowing) {
    return await listActiveMovies();
  }
  return knex("movies").select("*");
}

async function read(movie_id) {
  return knex("movies").select("*").where({ movie_id }).first();
}

module.exports = { list, read };