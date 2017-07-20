// Create a new file named ClozeCard.js:

// This file should define a Node module that exports a constructor for creating cloze-deletion flashcards, e.g.: module.exports = ClozeCard;

// The constructor should accept two arguments: text and cloze.

// The constructed object should have a cloze property that contains only the cloze-deleted portion of the text.

// The constructed object should have a partial property that contains only the partial text.

// The constructed object should have a fullText property that contains only the full text.

// The constructor should throw or log an error when the cloze deletion does not appear in the input text.

// Use prototypes to attach these methods, wherever possible.


var inquirer = require("inquirer");
var fs = require("fs");
var cardArray = [];


// ask user what to do: create cards or quit

const flashcards = () => {

        inquirer.prompt([{

                type: 'list',
                name: 'userType',
                message: 'What would you like to do?',
                choices: ['create-cloze-cards', 'quit']
            }

        ]).then(function(choice) {

            if (choice.userType === 'create-cloze-cards') {
                createCards(clozePrompt, 'cloze.txt');
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
            flashcards();
        }
    });
};


const writeToLog = (logFile, info) => {

    fs.writeFile(logFile, info, function(err) {
        if (err)
            console.error(err);
    });
}

const clozePrompt = [{
    name: "text",
    message: "Write a question and put the word you want to hide in parentheses. Ex:'Two plus two is (four)'",
    }, 
    {
    type: 'confirm',
    name: 'makeMore',
    message: 'Make another card (hit enter for YES)?',
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