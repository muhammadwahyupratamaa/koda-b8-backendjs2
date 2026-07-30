import { Router } from "express";
import { login, register } from "../controllers/auth.controller.js";

const router = Router();

/**
 * @openapi
 * /auth/register:
 *   post:
 *     description: register
 *     tags :
 *        - Auth
 *     requestBody:
 *       description: register into system
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             required :
 *              - name
 *              - email
 *              - password
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Register Success
 */

router.post("/register", register);

/**
 * @openapi
 * /auth/login:
 *   post:
 *     description: login .
 *     tags:
 *       - Auth
 *     requestBody:
 *       description : login into system
 *       required : true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             required :
 *              - email
 *              - password
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/x-www/form-urlencoded:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *       401:
 *         description: Invalid email or password
 */

router.post("/login", login);

export default router;
