const db = require("../models/index");
const Biodata = db.biodata;
const Op = db.Sequelize.op;
const { nanoid } = require("nanoid");

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empety",
    });
    return;
  }

  const id = `biodata-${nanoid(12)}`;

  const biodata = {
    id: id,
    nama: req.body.nama,
    tempat_lahir: req.body.tempat_lahir,
    tanggal_lahir: req.body.tanggal_lahir,
    alamat: req.body.alamat,
  };

  Biodata.create(biodata)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error occured while inserting biodata.",
      });
    });
};

exports.findAll = (req, res) => {
  Biodata.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error while retrieving biodatas.",
      });
    });
};

exports.findOne = (req, res) => {
  Biodata.findOne({
    where: {
      id: req.params.id,
    },
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error while finding biodata.",
      });
    });
};

exports.delete = (req, res) => {
  Biodata.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then(
      res.send({
        message: "Success delete biodata with id: " + req.params.id,
      })
    )
    .catch((err) => {
      res.status(500).send({
        message: "Cloud not delete biodata with id: " + req.params.id,
      });
    });
};

exports.update = (req, res) => {
    const id = req.params.id;
  
    Biodata.update(req.body, {
      where: { id: id },
    })
      .then((data) => {
        if (data[0] === 1) {
          return Biodata.findByPk(id);
        } else if (data[0] === 0) {
          res.status(404).send({
            message: `Cannot update Biodata with id=${id}. Maybe Biodata was not found or req.body is empty!`,
          });
        } else {
          res.status(500).send({
            message: "Error updating Biodata with id=" + id,
          });
        }
      })
      .then((updatedBiodata) => {
        res.send({
          message: "Biodata was updated successfully.",
          data: updatedBiodata,
        });
      })
      .catch((err) => {
        res.status(500).send({
          message: "Error updating Biodata with id=" + id,
        });
      });
  };
  
