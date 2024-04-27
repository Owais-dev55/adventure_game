#! /usr/bin/env node 
import chalk from "chalk";
import inquirer from "inquirer";
// GAME VARIABLES
let maxEnemyhealth = 100;
//PLAYER VARIABLES
let maxPlayerhealth = 100;
let guardHealer = 2;
let healthGH = 25;
let guardHealerDropChance = 50; //50 in percentage
//Here we will ask the user the assign a name to the hero
let playerName = await inquirer.prompt({
    name: "player",
    type: "input",
    message: "Enter your name",
});
//Here We'll capatilized the name of the hero assigned by the user
let capatalizedname = playerName.player.toUpperCase();
//If the user won't assigned anyname , we will give it a default name by using our if-else statment
if (playerName.player === "") {
    console.log(chalk.green.italic(`************PLAYER01,WELCOME TO THE GALAXY GUARDIANS************`));
}
else {
    console.log(chalk.green.italic(`************${capatalizedname},WELCOME TO THE GALAXY GUARDIANS************`));
}
//Here the Game OR ROUND begins
let running = true;
GAME: while (running) {
    let Enemy = await inquirer.prompt({
        name: "Enemyname",
        type: "list",
        message: "Select your enemy",
        choices: [
            "Monster Slayer",
            "Beast Hunter",
            "Terror Terminator",
            "Creature Crusher",
        ],
    });
    //After selecting the enemy against us . we will generate a random health for our enemy
    console.log(chalk.magenta(`############## GAME STARTED ##############`));
    maxEnemyhealth = Math.floor(Math.random() * 100 + 1);
    console.log(chalk.bold(`####### "Beware! ${Enemy.Enemyname} has arrived to challenge you!`));
    //Since we are adding one to any generted value, So the value won't be Zero , Therefore we could have battle
    while (maxEnemyhealth > 0 && maxPlayerhealth > 0) {
        console.log(`Your Health: ${maxPlayerhealth}`);
        console.log(`Enemy's Health: ${maxEnemyhealth}`);
        //Here the user is to be asked for the desiable actions to be performed
        let operation = await inquirer.prompt({
            name: "action",
            type: "list",
            message: "What you like to do",
            choices: ["Attack", "Drink GuardHealer", "Run"],
        });
        if (operation.action === "Attack") {
            let damagegiven = Math.floor(Math.random() * 25 + 1);
            let damagetaken = Math.floor(Math.random() * 25 + 1);
            maxEnemyhealth -= damagegiven;
            maxPlayerhealth -= damagetaken;
            console.log(chalk.redBright(`you hit the ${Enemy.Enemyname} for ${damagegiven}`));
            console.log(chalk.greenBright(`Enemy hit you ${Enemy.Enemyname} for ${damagetaken}`));
            //If the user feels his health to low , that he could lose the game. He can revive himself with 25 Health
        }
        else if (operation.action === "Drink GuardHealer") {
            if (guardHealer != 0) {
                //If there is any guardhealer available , They user can revive himself , other than user will have the message that havn't one left
                maxPlayerhealth = Math.min(maxPlayerhealth + healthGH, 100);
                guardHealer--;
                console.log(`You have revived yourself for ${healthGH}.
            \nYour health is now ${maxPlayerhealth}
            \nYou have ${guardHealer} guard healers left`);
            }
            else {
                console.log(`You have no guard healer left! Fight for the chance to get one`);
            }
        }
        else {
            //If the user neither chooses to attack nor to have drink guardhealer, he will run away and the game will begin from start
            console.log(`You can away from ${Enemy.Enemyname} !`);
            continue GAME;
        }
    }
    if (maxPlayerhealth <= 0) {
        console.log("You have taken too much damage. You limp out the Galaxy Guardian!!!");
        console.log(chalk.bgRed(`You lose !!! ${capatalizedname}`));
        console.log(chalk.bgBlueBright("TRY AGAIN"));
        break;
    }
    console.log("--------------------------------------------------");
    console.log(`The ${Enemy.Enemyname} was defeated`);
    console.log(`you have ${maxPlayerhealth} health left!!!`);
    //here is the percentage of the drop of guardhealer , If the value comes above 50 that means the user will have one more guardhealer
    if (Math.floor(Math.random() * 100 + 1) < guardHealerDropChance) {
        guardHealer++;
        console.log(`You have recieved a guard healer \n
        Now you have ${guardHealer}.`);
    }
    console.log("--------------------------------------------------");
    //if the user wins from its enemy . He would have 2 chooses shown below:
    let restartgame = await inquirer.prompt({
        name: "action",
        type: "list",
        message: "What would you like to do?",
        choices: ["Continue Fighting", "Exit the GALAXY GUARDIANS"],
    });
    if (restartgame.action === "Exit the GALAXY GUARDIANS") {
        console.log(`Congratulations! You have won from the ${Enemy.Enemyname}`);
        console.log("Exiting");
        running = false;
    }
    else {
        console.log(`You are starting your adventures again`);
        continue GAME;
    }
    console.log(chalk.magenta(`##########################`));
    console.log(chalk.magenta(`THANKS FOR PLAYEING ${capatalizedname}`));
    console.log(chalk.yellow(`RATE US AT "www.linkedin.com/in/owais-khilji-333owais2386556"`));
    console.log(chalk.magenta(`##########################`));
}
