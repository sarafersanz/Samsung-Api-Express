// Incluir el fichero con la definición de la BD
var db = require("../db");
var ObjectId = require("mongodb").ObjectID;

//Incluir express-validator
const { validationResult } = require("express-validator");

// Conectar con la BD
db.connect("mongodb://localhost:27017", function (err) {
  if (err) {
    throw "Fallo en la conexión con la BD";
  }
});

// Display all users
module.exports.users_list = function (req, res, next) {
  // Si el objeto es nulo es que no se ha establecido la conexión
  if (db.get() === null) {
    next(new Error("La conexión no está establecida"));
    return;
  }
  // Recuperar datos de la base de datos en formato array
  db.get()
    .db("apidb")
    .collection("users")
    .find()
    .toArray(function (err, result) {
      // Si se produjo un error, enviar el error a la siguiente función
      if (err) {
        next(new Error("Fallo en la conexión con la BD"));
        return;
      } else {
        // Si todo fue bien, devolver el resultado al cliente
        res.send(result);
      }
    });
};

//Display one user
module.exports.users_getOne = function (req, res, next) {
  // Si el objeto es nulo es que no se ha establecido la conexión
  if (db.get() === null) {
    next(new Error("La conexión no está establecida"));
    return;
  }
  const id = req.params.id;
  // Recuperar datos de la base de datos en formato array
  db.get()
    .db("apidb")
    .collection("users")
    .find({
      _id: ObjectId(id),
    })
    .toArray(function (err, result) {
      // Si se produjo un error, enviar el error a la siguiente función
      if (err) {
        next(new Error("Fallo en la conexión con la BD"));
        return;
      } else {
        // Si todo fue bien, devolver el resultado al cliente
        res.send(result);
      }
    });
};

// Create user
module.exports.users_create = function (req, res, next) {
  //Pasar el validador
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      errors: errors.array(),
    });
  }
  // Si el objeto es nulo es que no se ha establecido la conexión
  if (db.get() === null) {
    next(new Error("La conexión no está establecida"));
    return;
  }
  const user = {};
  user.nombre = req.body.nombre;
  user.apellidos = req.body.apellidos;
  user.edad = req.body.edad;
  user.dni = req.body.dni;
  user.cumple = req.body.cumple;
  user.color = req.body.color;
  user.sexo = req.body.sexo;
  // Insertar un documento
  db.get()
    .db("apidb")
    .collection("users")
    .insertOne(user, function (err, result) {
      // Si se produjo un error, enviar el error a la siguiente función
      if (err) {
        next(new Error("Fallo en la conexión con la BD"));
        return;
      } else {
        // Si todo fue bien, devolver el resultado al cliente
        res.send(result);
      }
    });
};

// Update users
module.exports.users_update_one = function (req, res, next) {
  //Pasar el validador
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      errors: errors.array(),
    });
  }
  // Si el objeto es nulo es que no se ha establecido la conexión
  if (db.get() === null) {
    next(new Error("La conexión no está establecida"));
    return;
  }
  const id = req.params.id;
  const update = {
    $set: {
      nombre: req.body.nombre,
      apellidos: req.body.apellidos,
      edad: req.body.edad,
      dni: req.body.dni,
      cumple: req.body.cumple,
      color: req.body.color,
      sexo: req.body.sexo,
    },
  };
  // Insertar un documento
  db.get()
    .db("apidb")
    .collection("users")
    .updateOne({ _id: ObjectId(id) }, update, function (err, result) {
      // Si se produjo un error, enviar el error a la siguiente función
      if (err) {
        next(new Error("Fallo en la conexión con la BD"));
        return;
      } else {
        // Si todo fue bien, devolver el resultado al cliente
        res.send(result);
      }
    });
};

// Delete users
module.exports.users_delete_one = function (req, res, next) {
  // Si el objeto es nulo es que no se ha establecido la conexión
  if (db.get() === null) {
    next(new Error("La conexión no está establecida"));
    return;
  }
  const id = req.params.id;
  // Eliminar un documento
  db.get()
    .db("apidb")
    .collection("users")
    .deleteOne({ _id: ObjectId(id) }, function (err, result) {
      // Si se produjo un error, enviar el error a la siguiente función
      if (err) {
        next(new Error("Fallo en la conexión con la BD"));
        return;
      } else {
        // Si todo fue bien, devolver el resultado al cliente
        res.send(result);
      }
    });
};
