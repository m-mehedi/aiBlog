import { Request, Response} from 'express'
import Users from '../models/userModel'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import {generateActiveToken } from '../config/generateToken'
import sendEmail from '../config/sendMail'
import { validateEmail, validPhone } from '../middleware/valid'
import { sendSMS } from '../config/sendSMS'
import { IDecodedToken } from '../config/interface'
import { decode } from 'punycode'


const CLIENT_URL= process.env.BASE_URL;

const authCtrl = {
    register: async(req: Request, res: Response) => {
        try{
            const {name, account, password } = req.body

            const user = await Users.findOne({account})
            if(user) return res.status(400).json({msg: "Email or phone already exists."})
            
            const passwordHash = await bcrypt.hash(password, 12)

            const newUser = {
                name, account, password: passwordHash
            }

            const active_token = generateActiveToken({newUser})
            const url = `${CLIENT_URL}/active/${active_token}`
            
            if(validateEmail(account)){
                sendEmail(account, url, 'Verify your email address.')
                res.json({msg: "Success! Please check your email."})
            } else if(validPhone(account)){
                sendSMS(account, url, 'Verify your phone number')
                return res.json({msg: "Success! Please check your  phone."})
            }

        } catch (err: any) {
            return res.status(500).json({msg: err.message})
        }
    },
    activeAccount: async(req: Request, res: Response) => {
        try{
            const { active_token } = req.body

            const decoded = <IDecodedToken>jwt.verify(active_token, `${process.env.ACTIVE_TOKEN_SECRET}`)
            
            const { newUser } = decoded
            if(!newUser) return res.status(400).json({msg: "Invalid Authentication!"})

            const user = new Users(newUser)
            await user.save()
            res.status(200).json({msg: "Your account has been successfully activated!"})
            
        } catch(err: any){
            console.log(err);     
            let errMsg;
            if(err.code ===11000){
                // Object.values(err.keyValue)[0]
                errMsg = err.keyValue.account + " already exists."
            } else{
                let name = Object.keys(err.errors)[0]
                errMsg=err.errors[`${name}`].message
                
            }
            return res.status(500).json({msg: errMsg })
        }
    }
}

export default authCtrl;