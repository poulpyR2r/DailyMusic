const express = require("express");
const { addVote, getVotesByMusic } = require("../controllers/vote.controller");
const router = express.Router();

const { verifyToken } = require("../middleware/verifyToken");
const { verifyIfIsAdmin } = require("../middleware/verifyUser");

/**
 * @swagger
 * /vote:
 *   post:
 *     summary: Ajouter un vote
 *     tags: [Vote]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Vote'
 *     responses:
 *       201:
 *         description: Vote ajouté avec succès
 *       400:
 *         description: L'utilisateur a déjà voté pour cette session
 *       401:
 *         description: En-tête d'autorisation manquant ou format invalide
 *       403:
 *         description: Jeton invalide ou expiré
 *       500:
 *         description: Erreur interne du serveur
 */

router.post("/vote", verifyToken, addVote);

/**
 * @swagger
 * /get-votes/{musicId}:
 *   get:
 *     summary: Obtenir les votes pour une musique spécifique
 *     tags: [Vote]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: musicId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Liste des votes pour la musique
 *       401:
 *         description: En-tête d'autorisation manquant ou format invalide
 *       403:
 *         description: Jeton invalide ou expiré
 *       500:
 *         description: Erreur interne du serveur
 */

router.get("/get-votes/:musicId", verifyToken, getVotesByMusic);

module.exports = router;
