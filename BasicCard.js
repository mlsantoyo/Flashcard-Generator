// Create a new file named BasicCard.js:

// This file should define a Node module that exports a constructor for creating basic flashcards, e.g.: module.exports = BasicCard;

// The constructor should accept two arguments: front and back.

// The constructed object should have a front property that contains the text on the front of the card.

// The constructed object should have a back property that contains the text on the back of the card.


var inquirer = require("inquirer");
var fs = require("fs");
var cardArray = [];


// ask user what to do: create cards or quit
const flashcards = () => {

        inquirer.prompt([{

                type: 'list',
                name: 'userType',
                message: 'What would you like to do?',
                choices: ['create-basic-cards', 'quit']
            }

        ]).then(function(choice) {

            if (choice.userType === 'create-basic-cards') {
                createCards(basicPrompt, 'basic.txt');
            } else if (choice.userType === 'quit') {
                console.log('Thank you! Goodbye!');
            }
        });
    }

const createCards = (promptType, logFile) => {

    inquirer.prompt(promptType).then(function(answers) {

        cardArray.push(answers);

        if (answers.makeMore) {

            createCards(promptType, logFile);
        } else {

            writeToLog(logFile, JSON.stringify(cardArray));
           
        }
    });
};


const writeToLog = (logFile, info) => {

    fs.writeFile(logFile, info, function(err) {
        if (err)
            console.error(err);
    });
}

const basicPrompt = [{
    name: "front",
    message: "Enter Front of Card: "
}, {
    name: "back",
    message: "Enter Back of Card: "

}, {
    type: 'confirm',
    name: 'makeMore',
    message: 'Create another card (hit enter for YES)?',
    default: true
}]

const makeMore = {
    //Prompt to find out if user wants to make more cards (default is yes)
    type: 'confirm',
    name: 'makeMore',
    message: 'Create another card (hit enter for YES)?',
    default: true
}

flashcards();