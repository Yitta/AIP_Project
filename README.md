# AIP Assignment 3

## What you need

You will need:
- MySQL
- Node.js: https://nodejs.org/en/
- angular-cli: https://github.com/angular/angular-cli
- Nodemon: (https://nodemon.io/)

## Before you start

Make sure you have MySQL running on port `3306`.

## How to run

To set up the database and seed some data, run `npm run seed`. It is recommended to do this when the model has been changed.

 **WARNING:** If you have already created a database of the same name eg. `cheapcheep_dev`, this will delete that database and all data contained. You have been warned.

Run  `npm run build` to serve the project, typically at http://localhost:3000. This will refresh when there are changes to the API layer, however you will need to restart it for front-end changes.

If you are solely editing the front-end, run `ng serve` to enable auto refresh.

### Detail Instruction
- Clone this repository using this command in terminal (Git):

`git clone https://github.com/Yitta/AIP_Project.git`
- Change the current directory to the file repository using this command in terminal (Node):

`cd AIP_Project`
- Install the required node modules using this command in terminal (Node):

`npm install`
-  serve the project using this command in terminal (Node):

`npm run build` 
- The project would typically run at http://localhost:3000.


## Project principles

To contribute to this project we should abide by some coding and contributing principles

### In general

- Use 2 spaces for indentation
- Use inbuilt functionality: No need to re-invent the wheel
- Abstract code where possible: Reusable code is handy and keeps the project easy to read and maintain
- Use meaningful names: You should have a sense of what something’s purpose is by it’s name
- Provide meaningful comments: If some code is not clear (and can’t be refactored to be clearer) pop in a comment. Not everything needs a comment - a function called getDiscountById() should be clear enough
- Complicated function or function with long code should have comment (/** format )
- Use camelCase: e.g. likeThis, not like_this (with the exception of in the database)
- Don't abbreviate local variables (e.g., 'total' not 'tot')
- No console.logs in master: This includes other debugging that may be needed for development

### Front-end
- Put all pictures needed in /assets
- Put reusable or small components in /components
- All routes would be put in one route file
- Give every single view a folder which would contain all the files needed in same name follow by different type name（all lower case）
- Selector would be the same name with the folder (contain -)
- Component would use camelCase with same name of folder （remove -）
- Instance would be the same name as dependency but first chapter use lower case（e.g. router : Router rather than _router : Router)
- Format javascript method and long variable list in different lines for better understanding and clear structure
- Separate CSS in template CSS files 

### Back-end
- Separate routes by object: Don’t forget to identify it in routes/api.js!
- Document your APIs! (In progress)
- Avoid using raw queries if possible

## CheapCheep API Documentation

Swagger is used to document CheapCheep APIs

### Installing dependencies

  `npm install -g swagger`

This will install swagger globally.

### How to view and/or edit

Open `cheapcheep-api` in terminal and run

  `swagger project edit`

This will start an express server and open the editor in your browser.

The documentation will be loaded from `api/swagger/swagger.yaml` and changes are saved instantly.
