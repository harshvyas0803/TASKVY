import express from 'express'
import { body,validationResult } from 'express-validator'
import {register,login} from '../controllers/authController.js'

const router = express.Router()

router.post('/register',

body('username').notEmpty().withMessage('Username is required'),
body('email').notEmpty().withMessage('Email is required'),
body('password').isLength({min:8}).withMessage('Password must be at least 8 characters'),

async (req,res)=>{

const errors = validationResult(req);
if(!errors.isEmpty()){

    return res.status(422).json({errors:errors.array()})

}

await register(req,res)
}
)


router.post('/login',
    body('email').notEmpty().withMessage('Email is required'),
    body('password').notEmpty().withMessage('Password is required'),

    async (req,res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()){
            return res.status(422).json ({errors:errors.array()})
        }
        await login(req,res)
        
    }

)

export default router