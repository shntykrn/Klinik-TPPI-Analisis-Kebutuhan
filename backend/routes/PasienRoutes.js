const express = require("express");
const router = express.Router();
const db = require("../config/db");
const pasienController = require("../controllers/PasienController");
const { getPasienByIdOrNik } = require("../controllers/PasienController");

router.get("/", async (req, res) => {
  try {
    const [rows] = await db.execute("SELECT * FROM pasien ORDER BY id DESC");
    res.status(200).json(rows);
  } catch (err) {
    res.status(500).json({ error: "Gagal mengambil data pasien", detail: err.message });
  }
});
router.delete("/delete/:id", pasienController.deletePasien);
router.get("/pasien/:key", getPasienByIdOrNik);

module.exports = router;
