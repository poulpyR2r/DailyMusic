const express = require("express");
const router = express.Router();
const {
  submitMusic,
  getAllMusicBySession,
  deleteMusicFromSession,
} = require("../controllers/musicManagement.controller");
const { verifyToken } = require("../middleware/verifyToken");
const { verifyIfIsAdmin } = require("../middleware/verifyUser");

/**
 * @swagger
 * /music:
 *   post:
 *     summary: Soumettre une nouvelle musique
 *     tags: [Gestion de la Musique]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Music'
 * 
 *     responses:
 *       201:
 *         description: Musique soumise avec succès
 *       401:
 *         description: En-tête d'autorisation manquant ou format invalide
 *       403:
 *         description: Jeton invalide ou expiré
 *       500:
 *         description: Erreur interne du serveur
 */

router.post("/music", verifyToken, verifyIfIsAdmin, submitMusic);

/**
 * @swagger
 * /get-musics/{sessionId}:
 *   get:
 *     summary: Obtenir toutes les musiques pour une session spécifique
 *     tags: [Gestion de la Musique]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: sessionId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Liste des musiques pour la session
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Music'
 *       404:
 *         description: Session non trouvée
 *       500:
 *         description: Erreur interne du serveur
 */
router.get("/get-musics/:sessionId", verifyToken, getAllMusicBySession);

/**
 * @swagger
 * /delete-music/{sessionId}/{musicId}:
 *   delete:
 *     summary: Supprimer une musique d'une session
 *     tags: [Gestion de la Musique]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: sessionId
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: musicId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Musique supprimée de la session avec succès
 *       404:
 *         description: Session ou musique non trouvée
 *       500:
 *         description: Erreur interne du serveur
 */

router.delete(
  "/delete-music/:sessionId/:musicId",
  verifyToken,
  verifyIfIsAdmin,
  deleteMusicFromSession
);

module.exports = router;
