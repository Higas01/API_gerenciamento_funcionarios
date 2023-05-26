const expressInstance = require("express");
const {
  registerEmployees,
  deleteEmployees,
  getAllEmployees,
  getEmployeeID,
  UpdateEmployees,
} = require("./controllers/employeesController");
const {
  registerSalary,
  updateSalary,
} = require("./controllers/SalaryController");
const { registerJob, updateJob } = require("./controllers/JobController");
const router = expressInstance.Router();

// Employees
router.get("/", getAllEmployees);
router.get("/:id", getEmployeeID);
router.post("/register", registerEmployees);
router.delete("/delete", deleteEmployees);
router.put("/update", UpdateEmployees);

// Salary
router.post("/registerSalary", registerSalary);
router.put("/updateSalary", updateSalary);

// Job
router.post("/registerJob", registerJob);
router.put("/updateJob", updateJob);

module.exports = router;
