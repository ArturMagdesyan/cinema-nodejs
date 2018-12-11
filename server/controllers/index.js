const models = require('../models/index');

// get teatre
exports.getTeatre = (req, res) => {
	models.getTeatre (req.body, (error, response) => {
		if (error) {
            res.status(500).json(response);
        } else {
            res.status(200).json(response);
        }
	})
};
// get teatre for id
exports.getTeatreId = (req, res) => {
    models.getTeatreId (req.params.id, req.body, (error, response) => {
        if (error) {
            res.status(500).json(response);
        } else {
            res.status(200).json(response);
        }
    })
};
// get kino for idsaveReserve
exports.getKinoId = (req, res) => {
    models.getKinoId (req.params.id, req.body, (error, responese) => {
        if (error) {
            res.status(500).json(responese);
            res.end();
            res.render('template');
        } else {
            res.status(200).json(responese);
        }
    })
};
// get kino date for id
exports.getDateId = (req, res) => {
    models.getDateId (req.params.id, req.body, (error, responese) => {
        if (error) {
            res.status(500).json(responese);
        } else {
            res.status(200).json(responese);
        }
    })
};
// post save reserve
exports.saveReserve = (req, res) => {
    models.saveReserve (req.body, (error, responese) => {
        if (error) {
            res.status(500).json(responese);
        } else {
            res.status(200).json(responese);
        }
    })
};

// get kino date for id
exports.getReserveId = (req, res) => {
    models.getReserveId (req.params.id, req.body, (error, responese) => {
        if (error) {
            res.status(500).json(responese);
        } else {
            res.status(200).json(responese);
        }
    })
};
