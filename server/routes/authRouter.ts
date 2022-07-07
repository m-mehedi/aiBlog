import express from 'express'
import authCtrl from '../controllers/authCtrl'
import { validRegister } from '../middleware/valid'

const router = express.Router()

router.post('/register', validRegister, authCtrl.register)
router.post('/login', authCtrl.login)
router.post('/active', authCtrl.activeAccount)
router.get('/logout', authCtrl.logout)
router.get('/refresh_token', authCtrl.refreshToken)

export default router;