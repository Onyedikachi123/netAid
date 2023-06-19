import { NextApiRequest, NextApiResponse } from "next";
import { connectToMongoDB } from "../../../lib/mongodb";
import User from "../../../models/user";
import { IUser } from "../../../types";
import { error } from "console";
import mongoose from "mongoose";


const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    connectToMongoDB().catch(err => res.json(err))

    if(req.method === "POST") {
        if(!req.body) return res.status(400).json({error: "Data is missing"})

        const {firstName, lastName, fullAddress, email, phoneNumber, ssn, driverLicense, position} = req.body

        const userExists = await User.findOne({ email })

        if(userExists) {
            return res.status(409).json({error: "User Already exists"})
        }
        else {
            try {
              const user = new User({
                firstName,
                lastName,
                fullAddress,
                email,
                phoneNumber,
                ssn,
                driverLicense,
                position
              })
            

            const savedUser = await user.save()

            const newUser = {
                _id: savedUser._id,
            firstName: savedUser.firstName,
            lastName: savedUser.lastName,
            fullAddress: savedUser.fullAddress,
            email: savedUser.email,
            phoneNumber: savedUser.phoneNumber,
            ssn: savedUser.ssn,
            driverLincense: savedUser.driverLicense,
            position: savedUser.position,        
        }
        return res.status(201).json({
            success: true,
            user: newUser
        })
    } catch(error) {
        if(error && error instanceof mongoose.Error.ValidationError) {
                for (let field in error.errors) {
                    const msg = error.errors[field].message
                    return res.status(409).json({ error: msg })
                }
            } else {
                console.log(error)
                return res.status(500).json({error: "Server Error"})
            }
    }
}
}
    else {
        res.status(405).json({error: "Method Not Allowed"})
    }
}

export default handler;

