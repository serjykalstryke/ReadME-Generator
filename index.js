const inquirer = require("inquirer");
const fs = require('fs');
const axios = require("axios");


const readme = new Promise((resolve, reject) => {
    resolve(inquirer.prompt([
        {
            type: "input",
            name: "title",
            message: "What is this project called?"
        },
        {
            type: "input",
            name: "description",
            message: "Describe the project"
        },
        {
            type: "input",
            name: "installation",
            message: "How would a user install this application?"
        },
        {
            type: "input",
            name: "usage",
            message: "How do you use this application?"
        },
        {
            type: "list",
            name: "license",
            message: "What License will this application be released under?",
            choices: ["GNU AGPLv3",
            "GNU GPLv3",
            "GNU LGPLv3",
            "Apache 2.0",
            "Boost Software 1.0",
            "MIT",
            "Mozilla",]
        },
        {
            type: "input",
            name: "contribution",
            message: "How can a user contribute to this application?"
        },
        {
            type: "input",
            name: "test",
            message: "How can a user test this application?"
        },
        {
            type: "input",
            name: "username",
            message: "what is your github username so that users can submit questions?"
        },
        {
            type: "input",
            name: "email",
            message: "what is your email so that users can submit questions?"
        },
        {
            type: "input",
            name: "repo",
            message: "Please enter the url for your application's repository."
        },

    ]))
})

function getLicense(value) {
    if (value === "GNU AGPLv3") {
        return "[![License: AGPL v3](https://img.shields.io/badge/License-AGPL%20v3-blue.svg)](https://www.gnu.org/licenses/agpl-3.0)";
    } else if (value === "GNU GPLv3") {
        return "[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)";
    } else if (value === "GNU LGPLv3") {
        return "[![License: LGPL v3](https://img.shields.io/badge/License-LGPL%20v3-blue.svg)](https://www.gnu.org/licenses/lgpl-3.0)";
    } else if (value === "Apache 2.0") {
        return "[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)";
    } else if (value === "MIT") {
        return "[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)";
    } else {
        return "[![License: MPL 2.0](https://img.shields.io/badge/License-MPL%202.0-brightgreen.svg)](https://opensource.org/licenses/MPL-2.0)";
    }
}

readme.then(data => {
    const queryUrl = `https://api.github.com/users/${data.username}`
    data.getLicense = getLicense(data.license)
     axios.get(queryUrl).then(res => {
         console.log(res.data)
            
            const githubInfo = {
                githubImage: res.data.avatar_url,
                profile: res.data.html_url,
                name: res.data.name
            };

        const markdown =
`# **${data.title}**
${data.getLicense}
## Description 
${data.description}
## Table of contents
- [Description](#Description)
- [Installation](#Installation)
- [Usage](#Usage)
- [Licence](#Licence)
- [Contributors](#Contributors)
- [Test](#Test)
- [Repository Link](#Repository)
- [Submit Questions to:](#GitHub) 
## Installation
${data.installation}
## Usage
${data.usage}
## Licence
${data.license}
## Contributors
${data.contribution}
## Test
${data.test}
## Repository
- [Project Repo](${data.repo})
## Questions? Contact me here:
![Image of me](${githubInfo.githubImage})
- ${githubInfo.name}
- [GitHub Profile](${githubInfo.profile})
- <${data.email}>`;

        fs.writeFile('README.md', markdown, err => {
            if (err) {
                return console.log(err);
            }

            console.log('Success!');
        });
    });

});