const User = require("../models/UserModel");
const responsesStatus = require("../enum/responsesStatus");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt"); 
const jwt = require("jsonwebtoken"); 
const {validationResult} = require("express-validator");

// Get All User
const getUsers = async (req, res) => {
  const users = await User.find({});
  try {
    res.status(responsesStatus.OK).json(users);
  } catch (error) {
    res.status(responsesStatus.NotFound).json({ error: "Not Found" });
  }
};

// Get User By Id
const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(responsesStatus.NotFound).json({ error: "Invalid ID" });
    }
    const user = await User.findById(id);
    if (!user) {
      res.status(responsesStatus.NotFound).json({ error: "No Such User!" });
    }
    res.status(responsesStatus.OK).json(user);
  } catch (error) {
    res.status(responsesStatus.BadRequest).json({ error: error.message });
  }
};
// Login User 
const generateAccessToken =async (user)=>{
  const token = await jwt.sign(user, process.env.ACCESS_SECRET_TOKEN,{expiresIn:"2h"}); 
  return token
}
const loginUser = async (req, res) => {
  const {
    email,
    password,
   
  } = req.body;
  // add User to db
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(responsesStatus.BadRequest).json({
        success: false,
        msg: "Error",
        errors: errors.array(),
      });
    }
    const userData = await User.findOne({ email });
    if (!userData) {
      return res.status(responsesStatus.BadRequest).json({
        success: false,
        msg: "Email & Password is incorrect",
      });
    }
    const isPasswordMatch = await bcrypt.compare(password, userData.password);
     if (!isPasswordMatch) {
       return res.status(responsesStatus.BadRequest).json({
         success: false,
         msg: "Email & Password is incorrect",
       });
     }
     const accessToken = generateAccessToken({user:userData})
       return res.status(responsesStatus.OK).json({
         success: true,
         msg: "Login Successfully",
         accessToken: accessToken,
         tokenType: "Bearer",
         data:userData
       });
  } catch (error) { 
    return res
      .status(responsesStatus.BadRequest)
      .json({ error: error.message });
  }
};

// Create new User
const createUser = async (req, res) => {

  const {
    firstName,
    lastName,
    email,
    phone,
    address: { street, city, state, zipCode, country },
    password,
    confirmPassword,
    joiningDate,
    licenseExpireDate,
    gender,
    dateOfBirth,
    photo,
    departments,
    active,
    roles,
  } = req.body;
//   const emptyFields = [];
//   if (!firstName) {
//     emptyFields.push("firstName");
//   }
//   if (!lastName) {
//     emptyFields.push("lastName");
//   }
//   if (!email) {
//     emptyFields.push("email");
//   }
//     if (!phone) {
//       emptyFields.push("phone");
//     }
//   if (!street || !city || !country) {
//     emptyFields.push("address");
//   }
//   if (!password) {
//     emptyFields.push("password");
//   }
//   if (!confirmPassword) {
//     emptyFields.push("confirmPassword");
//   }
//     if (!gender) {
//       emptyFields.push("gender");
//     }
//  if (!dateOfBirth) {
//    emptyFields.push("dateOfBirth");
//  }
//   if (!departments) {
//     emptyFields.push("Departments");
//   }
//   if (emptyFields.length > 0) {
//     return res.status(responsesStatus.BadRequest).json({
//       error: `Please fill in the following fields: ${emptyFields.join(", ")}`,
//       emptyFields,
//     });
//   }
  // add User to db
  try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(responsesStatus.BadRequest).json({
          success: false,
          msg: "Error",
          errors: errors.array(),
        });
      }
      const isExistUser = await User.findOne({email}) 
      if(isExistUser){
         return res.status(responsesStatus.BadRequest).json({
           success: false,
           msg: "Email is Exist",
         });
      }
      const hashedPAssword = await bcrypt.hash(password,10);
      const hashedConfirmPassword = await bcrypt.hash(confirmPassword, 10);
      const workout = await User.create({
      firstName,
      lastName,
      email,
      phone,
      address: {
        street,
        city : city ? city : "city",
        state,
        zipCode,
        country,
      },
      password: hashedPAssword,
      confirmPassword: hashedConfirmPassword,
      gender,
      dateOfBirth,
      joiningDate,
      licenseExpireDate,
      photo,
      roles,
      departments,
      active,
    });
    res.status(responsesStatus.OK).json({
      success: true,
      msg: "Registered Successfully",
      data: workout,
    });
  } catch (error) {
    return res
      .status(responsesStatus.BadRequest)
      .json({ error: error.message });
  }
};

// Delete User
const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(responsesStatus.NotFound).json({ error: "Invalid ID" });
    }
    const user = await User.findByIdAndDelete({ _id: id });
    if (!user) {
      return res
        .status(responsesStatus.NotFound)
        .json({ error: "No Such User!" });
    }
    res.status(responsesStatus.OK).json(user);
  } catch (error) {
    res.status(responsesStatus.BadRequest).json({ error: error.message });
  }
};

// Update User

const updateUser = async (req, res) => {
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(responsesStatus.NotFound).json({ error: "Invalid ID" });
    }
    const user = await User.findByIdAndUpdate(
      { _id: id },
      { ...req.body }
    );
    if (!user) {
      return res
        .status(responsesStatus.BadRequest)
        .json({ error: "Not Found!" });
    }
    res.status(responsesStatus.OK).json(user);
  } catch (error) {
    res.status(responsesStatus.BadRequest).json({ error: error.message });
  }
};
module.exports = {
  createUser,
  getUsers,
  loginUser,
  getUserById,
  deleteUser,
  updateUser,
};
