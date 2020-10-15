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
            choices: ["GPL", "BSD", "MIT", "Apache"]
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

readme.then(data => {
    const queryUrl = `https://api.github.com/users/${data.username}`

     axios.get(queryUrl).then(res => {
         console.log(res.data)
            
            const githubInfo = {
                githubImage: res.data.avatar_url,
                email: res.data.email,
                profile: res.data.html_url,
                name: res.data.name
            };

        const markdown =
`# **${data.title}**
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
- [GitHub Info](#GitHub) 
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
## GitHub
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