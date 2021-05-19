const knex = require("../db/connection");

function list({ movieId }) {
  return knex("reviews as r")
    .join("critics as c", "r.critic_id", "c.critic_id")
    .select("*")
    .where({ movie_id: movieId });
}

function read({ reviewId }) {
  return knex("reviews").select("*").where({ review_id: reviewId }).first();
}

function readAfterUpdate(reviewId) {
  return knex("reviews as r")
    .join("critics as c", "r.critic_id", "c.critic_id")
    .select("*")
    .where({ review_id: reviewId });
}

function update(reviewId, updatedInfo) {
  return knex("reviews").where({ review_id: reviewId }).update(updatedInfo);
}

function destroy(reviewId) {
  return knex("reviews").where({ review_id: reviewId }).del();
}

module.exports = {
  list,
  read,
  update,
  readAfterUpdate,
  delete: destroy,
};