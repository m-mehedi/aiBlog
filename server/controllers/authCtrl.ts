import { Request, Response} from 'express'
import Users from '../models/userModel'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import {generateActiveToken, generateAccessToken, generateRefreshToken } from '../config/generateToken'
import sendEmail from '../config/sendMail'
import { validateEmail, validPhone } from '../middleware/valid'
import { sendSMS } from '../config/sendSMS'
import { IDecodedToken, IUser } from '../config/interface'


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
    },
    login: async(req: Request, res: Response) => {
        try{
            const {account, password} = req.body
            
            const user = await Users.findOne({account})
            if(!user) return res.status(400).json({msg: "This account doesn't exist."})

            loginUser(user, password, res)
            // res.json({msg: "Login success"})         

        } catch (err: any) {
            return res.status(500).json({msg: err.message})
        }
    },
    logout: async(req: Request, res: Response) => {
        try{
                res.clearCookie('refreshtoken', {path: `/api/refresh_token`})
                return res.json({msg: "Logged out!"})
        } catch (err: any) {
            return res.status(500).json({msg: err.message})
        }
    },
    refreshToken: async(req: Request, res: Response) => {
        try{
                const rf_token = req.cookies.refreshtoken
                // If there is no refreshtoken
                if(!rf_token) return res.status(400).json({msg: "Please log in."})

                //  verifies refresh token with server
                const decoded = <IDecodedToken> jwt.verify(rf_token,`${process.env.REFRESH_TOKEN_SECRET}`)
                //  if id doesn't  found while decoding
                if(!decoded.id) return res.status(400).json({msg: "Please log in."})
                
                // gets user object
                const user = await Users.findById(decoded.id).select("-password")
                // checks if user exists while login
                if(!user) return res.status(400).json({msg:"This account doesn't exist"})

                const access_token = generateAccessToken({id: user._id})
                return res.json({access_token})
        } catch (err: any) {
            return res.status(500).json({msg: err.message})
        }
    },
}

const loginUser = async (user: IUser, password: string, res: Response ) => {
    const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch) return res.status(500).json({msg: "Incorrect password!"})
    
    const access_token = generateAccessToken({id: user._id})
    const refresh_token = generateRefreshToken({id: user._id})

    res.cookie('refreshtoken', refresh_token, {
        httpOnly: true,
        path: `/api/refresh_token`,
        maxAge: 30*24*60*60*1000
    })

    res.json({
        msg: 'Login Success!',
        access_token,
        user: {...user._doc, password:''}
    })
}
export default authCtrl;