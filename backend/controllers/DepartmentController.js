const Department = require("../models/DepartmentModel");
const User = require("../models/UserModel");
const responsesStatus = require("../enum/responsesStatus");
const mongoose = require("mongoose");
// Get All departments

const getDepartments = async (req, res) => {
  const departments = await Department.find({});
  try {
    res.status(responsesStatus.OK).json(departments);
  } catch (error) {
    res.status(responsesStatus.NotFound).json({ error: "Not Found" });
  }
};

// Get Department By Id
const getDepartmentById = async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(responsesStatus.NotFound).json({ error: "Invalid ID" });
    }
    const department = await Department.findById(id);
    if (!department) {
      res.status(responsesStatus.NotFound).json({ error: "No Such Department!" });
    }
    res.status(responsesStatus.OK).json(department);
  } catch (error) {
    res.status(responsesStatus.BadRequest).json({ error: error.message });
  }
};
// get users in  Department
const getAllUsersInDepartment = async (req, res) => {
   const { id } = req.params;
  try {
    // Fetch all departments
    // Array to store users in departments
    const usersInDepartments = [];

    // Loop through each department
    // for (const department of departments) {
    //   // Fetch users in the current department


    //   // Push users to the array
    //   usersInDepartments.push({ department: department.name, users });
    // }
       const users = await User.find({ departments: id });
      
    res.json(users);
  } catch (error) {
    console.error("Error fetching users in departments:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
// Create new Department
const createDepartment = async (req, res) => {
  const {
    name,
    description,
    photo,
    head,
    active,
    sections
  } = req.body;
  const emptyFields = [];
  if (!name) {
    emptyFields.push("name");
  }
  if (!description) {
    emptyFields.push("description");
  }
  if (!head) {
    emptyFields.push("head");
  }
  if (!active) {
    emptyFields.push("active");
  }
  if (emptyFields.length > 0) {
    return res.status(responsesStatus.BadRequest).json({
      error: `Please fill in the following fields: ${emptyFields.join(", ")}`,
      emptyFields,
    });
  }
  // add department to db
  try {
    const department = await Department.create({
      name,
      description,
      head,
      active,
      photo,
      sections,
    });
    res.status(responsesStatus.OK).json(department);
  } catch (error) {
    return res
      .status(responsesStatus.BadRequest)
      .json({ error: error.message });
  }
};

// Delete Department
const deleteDepartment = async (req, res) => {
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(responsesStatus.NotFound).json({ error: "Invalid ID" });
    }
    // const department = await Department.findByIdAndDelete({ _id: id });
    // Step 1: Fetch users associated with the department
    const users = await User.find({ departments: id });
    


    // Step 2: Update users to remove association with the department
    await Promise.all(
      users.map(async (user) => {
        // Option 1: Set department field to null
        // user.department = null;

        // Option 2: Remove department ID from the departments array
        const filteredDepartments = user.departments.filter(
          (depId) => depId.toString() !== id.toString()
        );
        user.departments = filteredDepartments;
        console.log(user.departments,id);
        await user.save();
      })
    );

    // Step 3: Delete the department
    // Replace Department with your actual model name
    const department = await Department.findByIdAndDelete(id);
    if (!department) {
      return res
        .status(responsesStatus.NotFound)
        .json({ error: "No Such Department!" });
    }
    res.status(responsesStatus.OK).json(department);
  } catch (error) {
    res.status(responsesStatus.BadRequest).json({ error: error.message });
  }
};

// Update Department
const updateDepartment = async (req, res) => {
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(responsesStatus.NotFound).json({ error: "Invalid ID" });
    }
    const department = await Department.findByIdAndUpdate({ _id: id }, { ...req.body });
    if (!department) {
      return res
        .status(responsesStatus.BadRequest)
        .json({ error: "Not Found!" });
    }
    res.status(responsesStatus.OK).json(department);
  } catch (error) {
    res.status(responsesStatus.BadRequest).json({ error: error.message });
  }
};

module.exports = {
  createDepartment,
  getDepartments,
  getDepartmentById,
  getAllUsersInDepartment,
  deleteDepartment,
  updateDepartment,
  
};
