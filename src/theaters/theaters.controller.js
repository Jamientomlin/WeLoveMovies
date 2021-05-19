const service = require("./theaters.service.js");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function list(req, res) {
    // const { movieId } = req.params;
    // const byResult = movieId ? theater => theater.result === movieId : () => true;
    const data = await service.list(req.params.movieId);
    res.json({ data});
}
  
module.exports = {
    list: asyncErrorBoundary(list),
};