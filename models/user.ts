import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
    firstName: {
        type: String,
        required: [true, "First Name is required"],
        minLength: [4, "First name should be at least 4 characters long"],
        maxLength: [30, "First name should be less than 30 characters"]
    },
    lastName: {
        type: String,
        required: [true, "Last name is required"],
        minLength: [4, "Last name should be at least 4 characters long"],
        maxLength: [30, "Last name should be less than 30 characters"]
    },
   fullAddress: {
    type: String,
    required: true
   },
   email: {
    type: String,
    unique: true,
    required: [true, "Email is required"],
    match: [/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/, "Invalid email address"]
   },
   phoneNumber: {
    type: String,
    required: true,
   },
   ssn: {
    type: String,
    required: true,
   },
   position: {
    type: String, 
    enum: ['Customer Service', 'Data Entry', 'Virtual Assistant', 'Sales Assistant', 'Virtual Book keeper', 'Other'], default: 'Customer Service'
   },
   driverLicense: {
    type: String,
    required: true,
   }
})

const User = models.User || model("User", UserSchema)

export default User;