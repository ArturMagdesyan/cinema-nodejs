const express = require('express');
const router = express.Router();

// Controllers
const controller = require('../controllers');
// test api '(-_-)'
router.get('/test', function(req, res)  {
  res.send('api works');
});

// get teatre
router.get ('/get-teatre', controller.getTeatre);
// get teatre for id
router.get ('/get-teatre/:id', controller.getTeatreId);
// get kino for id
router.get ('/get-kino/:id', controller.getKinoId);
// get kino date for id
router.get ('/get-date/:id', controller.getDateId);
// get kino date for id
router.post ('/save-reserve', controller.saveReserve);
// get reserve data for id
router.get ('/get-reserve/:id', controller.getReserveId);

module.exports = router;