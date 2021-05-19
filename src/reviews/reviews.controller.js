const service = require("./reviews.service");
const reduceProperties = require("../utils/reduce-properties");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function doesReviewExist(req, res, next) {
  const foundReview = await service.read(req.params);
  if (!foundReview) {
    return next({
      status: 404,
      message: `cannot be found: ${req.params.reviewId}`,
    });
  }
  res.locals.review = foundReview;
  next();
}

async function list(req, res) {
  const data = await service.list(req.params);
  const reducedReviews = reduceProperties("review_id", {
    preferred_name: ["critic", "preferred_name"],
    surname: ["critic", "surname"],
    organization_name: ["critic", "organization_name"],
  });

  res.json({ data: reducedReviews(data) });
}

async function update(req, res) {
  const { review_id } = res.locals.review;
  await service.update(review_id, req.body.data);

  const data = await service.readAfterUpdate(review_id);
  const reducedReview = reduceProperties("review_id", {
    preferred_name: ["critic", "preferred_name"],
    surname: ["critic", "surname"],
    organization_name: ["critic", "organization_name"],
  });

  res.json({ data: reducedReview(data)[0] });
}

async function destroy(req, res) {
  await service.delete(res.locals.review.review_id);
  res.sendStatus(204);
}

module.exports = {
  list: asyncErrorBoundary(list),
  update: [asyncErrorBoundary(doesReviewExist), asyncErrorBoundary(update)],
  delete: [asyncErrorBoundary(doesReviewExist), asyncErrorBoundary(destroy)],
};