#! /usr/bin/env node
// Making a simple Text Based Adventure Game.
import inquirer from "inquirer";
import chalk from "chalk";
// Defining a Player class with properties name and hp.
class Player {
    name;
    hp;
    // Constructor for the Player class.
    constructor(name) {
        this.name = name;
        this.hp = 100; // Initializing a new player with a name and sets the initial hp to 100.
    }
    // Methods:
    // Calculates a random damage value between 1 and 20, subtracts this from the monster's hp, and prints the result.
    attack() {
        return Math.floor(Math.random() * 20) + 1;
    }
    // Calculates a random heal value between 1 and 20, adds this to the player's hp, and prints the result.
    drinkHealthPotion() {
        const heal = Math.floor(Math.random() * 20) + 1;
        this.hp = Math.min(100, this.hp + heal);
        return heal;
    }
}
// Defining a Monster class with properties name and hp.
class Monster {
    name;
    hp;
    constructor(name, hp) {
        this.name = name;
        this.hp = hp;
    }
    // Methods:
    // Calculates a random damage value between 1 and 20, subtracts this from the player's hp, and prints the result.
    attack() {
        return Math.floor(Math.random() * 20) + 1;
    }
}
// Defining the main function, which is the entry point of the game.
async function main() {
    console.log(chalk.greenBright("=".repeat(50)));
    console.log(chalk.bold.green("\tWelcome to the Dungeon!"));
    console.log(chalk.greenBright("=".repeat(50)));
    // Creates instances of Player and Monster.
    const player = new Player("Hero");
    const monster = new Monster("Skeleton", 72);
    // Battle Loop:
    while (monster.hp > 0 && player.hp > 0) {
        console.log(chalk.bgRedBright(`# ${monster.name} has appeared! #`));
        console.log(chalk.cyan(`Your HP: ${player.hp}`));
        console.log(chalk.red(`${monster.name}'s HP: ${monster.hp}`));
        console.log(chalk.bgBlackBright("-".repeat(50)));
        // Continuously prompting the player for actions until either the player or the monster's hp drops to 0.
        const action = await inquirer.prompt([
            {
                type: "list",
                name: "choice",
                message: "What would you like to do?",
                choices: ["Attack", "Drink health potion", "Run!"],
            },
        ]);
        if (action.choice === "Attack") {
            const playerDamage = player.attack();
            const monsterDamage = monster.attack();
            monster.hp -= playerDamage;
            player.hp -= monsterDamage;
            // Player attacks the monster and, if the monster survives, the monster attacks the player.
            console.log(chalk.bold.yellow(`You strike the ${monster.name} for ${playerDamage} damage.`));
            console.log(chalk.bold.red(`You receive ${monsterDamage} in retaliation!`));
        }
        else if (action.choice === "Drink health potion") {
            const heal = player.drinkHealthPotion();
            const monsterDamage = monster.attack();
            // Player heals, and if the monster is still alive, the monster attacks the player.
            player.hp -= monsterDamage;
            console.log(chalk.bold.green(`You drink a health potion and heal for ${heal} HP.`));
            console.log(chalk.bold.red(`You receive ${monsterDamage} in retaliation!`));
        }
        else if (action.choice === "Run!") {
            console.log(chalk.bold.magenta("You run away from the dungeon!"));
            break;
            // Player exits the battle loop.
        }
        console.log(chalk.bgBlackBright("-".repeat(50)));
        // Printing a message if the player is defeated or if the player defeats the monster.
        if (player.hp <= 0) {
            console.log(chalk.bold.red("You have been defeated!"));
        }
        else if (monster.hp <= 0) {
            console.log(chalk.bold.green(`You defeated the ${monster.name}!`));
        }
    }
}
// Calling the main function to start the game.
main();
