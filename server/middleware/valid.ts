import { Request, Response, NextFunction } from 'express'
export const validRegister = async(req: Request, res: Response, next: NextFunction) => {
    const {name, account, password } = req.body
    if(!name){
        return res.status(400).json({msg: "Please, add your name."})
    } else if(name.length > 20){
        return res.status(400).json({msg:"Name must be of 20 characters."})
    }

    if(!account){
        return res.status(400).json({msg: "Please, add your email account or phone number."})
    } else if(!validPhone(account) && !validateEmail(account)){
        return res.status(400).json({msg:"Email or phone number is not correct."})
    }

    if(password.length < 6){
        return res.status(400).json({msg: "Password must be at least 6 digits."})
    }

    next();
}

const validPhone = (phone: string) =>{
    const re = /^[+]/g
    return re.test(phone)
}

const validateEmail = (account: string) => {
    return String(account)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };