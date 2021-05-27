var express = require("express");
var router = express.Router();
var users_controller = require("../controllers/usersController");

const { check } = require("express-validator");

const valid_user = [
  //Validar nombre
  check("nombre")
    .isLength({
      min: 4,
    }).withMessage("Nombre no válido. La longitud debe ser superior a 3.")
    .custom((value) => {
      return value.match(/^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/);
    })
    .withMessage("Nombre no válido. El nombre no puede incluir números."),
  //Validar apellidos
  check("apellidos")
    .isLength({
      min: 4,
    }).withMessage("Apellidos no válidos. La longitud debe ser superior a 3.")
    .custom((value) => {
      return value.match(/^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/);
    })
    .withMessage(
      "Apellidos no válidos. Los apellidos no puede incluir números."
    ),
  //Validar edad
  check("edad")
  .isInt({
    min: 0,
    max: 125,
  })
  .withMessage("Edad no válida. Debe estar comprendida entre 0 y 125."),
  //Validar dni
  check("dni")
    .isLength({
      min: 9,
      max: 9,
    }).withMessage("D.N.I no válido. Debe contener un total de 9 caracteres.")
    .isAlphanumeric('es-ES')
    .withMessage("D.N.I no válido. Debe ser una cadena alphanumérica."),
  //Validar cumple
  check("cumple")
  .isISO8601()
  .withMessage("Fecha de nacimiento no válida. Debe ser en formato yyyy-mm-dd."),
  //Validar color favorito
  check("color")
  .isLength({
    min: 4,
  }).withMessage("Color no válido. La longitud debe ser superior a 3.")
  .custom((value) => {
    return value.match(/^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/);
  })
  .withMessage("Color no válido. El color no puede incluir números."),
  //Validar sexo
  check("sexo")
  .isString()
  .withMessage("Sexo no válido. Debe ser una cadena")
  .isIn(["Hombre", "Mujer", "Otro", "No especificado"])
  .withMessage("Sexo no válido. Solo puede ser Hombre, Mujer, Otro o No especificado."),
];

/* GET users listing. */
router.get("/", users_controller.users_list);
/* GET one user. */
router.get("/:id", users_controller.users_getOne);
/* POST create user. */
router.post("/", valid_user, users_controller.users_create);
/* PUT update user. */
router.put("/:id", valid_user, users_controller.users_update_one);
/* DELTE delete user. */
router.delete("/:id", users_controller.users_delete_one);

module.exports = router;
