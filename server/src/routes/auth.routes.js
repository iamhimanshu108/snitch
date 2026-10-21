import { Router } from "express"
import { loginValidator, registerValidator} from "../validators/auth.validator.js"
import {
  register,
  login,
  refresh,
  getMe
} from "../controller/auth.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js"

const router = Router()


/**
 * @Post /api/auth/register
 * @param req Express req
 * @param req.body = {email, name, password}
 * @response res.status = 201 (if successful)
 */

router.post("/register", registerValidator, register)

/**
 * @Post /api/auth/login
 * @param req
 * @param req.body = {email, password}
 * res.status = 200
 */


router.post("/login", loginValidator, login)

/**
 * @Post /api/auth/refresh
 */


router.post("/refresh", refresh)

router.get("/me", authenticate, getMe)

export default router