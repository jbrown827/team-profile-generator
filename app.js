const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

//Array to store team member profiles
const teamMembers = [];

//Intitial Prompt
//========================================

const getInput = () => {
  inquirer
    .prompt([
      {
        type: "list",
        name: "employee",
        message: "What kind of employee would you like to enter?",
        choices: ["Manager", "Engineer", "Intern"],
      },
    ])
    .then((response) => {
      if (response.employee === "Manager") {
        managerInfo();
      } else if (response.employee === "Engineer") {
        engineerInfo();
      } else {
        internInfo();
      }
    });
};

//Manager Prompt
//===================================

const managerInfo = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "manName",
        message: "What is your Manager's name?",
      },
      {
        type: "input",
        name: "manId",
        message: "Give your Manager an ID number.",
      },
      {
        type: "input",
        name: "manEmail",
        message: "What is the Manager's email?",
      },
      {
        type: "input",
        name: "officeNumber",
        message: "What is the office number of your Manager?",
      },
    ])
    .then((answers) => {
      const manager = new Manager(
        answers.manName,
        answers.manId,
        answers.manEmail,
        answers.officeNumber
      );
      teamMembers.push(manager);
      option();
    });
};

//Engineer Prompt
//====================================

const engineerInfo = () => {
  return inquirer
    .prompt([
      {
        type: "input",
        name: "engName",
        message: "What is your Engineer's name?",
      },
      {
        type: "input",
        name: "engId",
        message: "Please give your Engineer an ID number!",
      },
      {
        type: "input",
        name: "engEmail",
        message: "What is your Engineer's email?",
      },
      {
        type: "input",
        name: "github",
        message: "What is the gitHub username of your Engineer?",
      },
    ])
    .then((answers) => {
      const engineer = new Engineer(
        answers.engName,
        answers.engId,
        answers.engEmail,
        answers.github
      );
      teamMembers.push(engineer);
      option();
    });
};

//Intern Prompt
//=============================
const internInfo = () => {
  return inquirer
    .prompt([
      {
        type: "input",
        name: "internName",
        message: "What is your Intern's name?",
      },
      {
        type: "input",
        name: "internId",
        message: "Please give your Intern an ID number",
      },
      {
        type: "input",
        name: "internEmail",
        message: "What is your Intern's email?",
      },
      {
        type: "input",
        name: "school",
        message: "What school did your Intern attend?",
      },
    ])
    .then((answers) => {
      const intern = new Intern(
        answers.internName,
        answers.internId,
        answers.internEmail,
        answers.school
      );
      teamMembers.push(intern);
      option();
    });
};

//Final Option Prompt
//===========================================

const option = () => {
  inquirer
    .prompt([
      {
        type: "list",
        name: "finish",
        message: "Would you like to add another Employee?",
        choices: ["Yes", "No"],
      },
    ])
    .then((response) => {
      if (response.finish === "Yes") {
        console.log("\n Choose another employee");
        getInput();
      } else {
        console.log("\nYour Team Profile has been generated.\n");
        let output = render(teamMembers);
        fs.writeFile("index.html", output, (err) => {
          if (err) throw err;
        });
      }
    });
};

getInput();

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!
// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
