console.log("app.js, v6")

const readline = require("node:readline/promises");

const prompt = async (message) => {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    const answer = await rl.question(message);
    rl.close();

    return answer;
};

let score = 0;
let inshop = false;
let playerDices = 1;
let playerCombo = 1;

console.log("Welcom to the JS casino !")
getAnswer()

async function getAnswer() {
    const answer = await prompt("Are you tempted by a small gamble ?\n(Y: Roll a dice), (S: Shop & Upgrades), (I: Rules & Infos), (N: Exit) ")

    if(answer != "undefined"){
        if (answer.toUpperCase() === "Y") {

            for(let i = 1; i <= playerDices; i++){
                let dice = Math.floor(Math.random() * 6) + 1;

                if (dice === 6) {
                    console.log(`Jackpot ! You rolled a ${dice} !`)
                }
                else {
                    console.log(`You rolled a ${dice}.`)
                }
                score += dice * playerCombo;
            }
            if(playerCombo > 1){
                console.log(`COMBO x ${playerCombo}`)
            }
            console.log(`\nScore : ${score}.\n`)
        }
        else if (answer.toUpperCase() === "N") {
            console.log("\nThat's a shame. See you next time !\n")
            return
        }
        else if (answer.toUpperCase() === "S") {
            await console.log("\n-----Welcome to the shop !-----")
            inshop = true
            while(inshop == true){
                await goToShop()
            }
        }
        else if (answer.toUpperCase() === "I") {
            await console.log("\n======INFOS & RULES======")
            await console.log("The rules are quite simple. You roll a dice, you get points and")
            await console.log("with those, you can buy upgrades to get even more points !")
            await console.log("Try to get the highest score possible, and have fun.")
            await console.log("Good luck !")
            await console.log("=========================\n")
        }
        else {
            await console.log("Please enter a valid caracter.")
        }
    }
    else {
        await console.log("Please enter a valid caracter. test")
    }
    getAnswer()
}

class Upgrade {
    constructor(id, name, price, infos) {
        this.id = id,
            this.name = name,
            this.price = price,
            this.infos = infos
    }
}

let upgradeSuperDice = new Upgrade(1, "Super Dice", 20, "Gives you an extra dice.")
let upgradeCombo = new Upgrade(2, "Combo Points", 50, "More point per throws.")

const upgrades = [
    upgradeSuperDice,
    upgradeCombo
]

async function goToShop() {
    console.log(`You currently have $${score}.\n`)
    console.log("AVAILABLE UPGRADES :\n")
    upgrades.forEach(upgrade => {
        console.log(`${upgrade.id}-${upgrade.name}..........$${upgrade.price}`)
        console.log(upgrade.infos, "\n")
    })

    console.log("Would you like to purchase anything ?\n")
    const shopAnswer = await prompt("(Enter the id of the upgrade if yes, N to exit) ")

    if(shopAnswer != "undefined"){
        if (Number(shopAnswer) <= upgrades.length + 1 && Number(shopAnswer) > 0) {
            for (let i = 0; i <= upgrades.length; i++) {
                if (shopAnswer == i + 1) {
                    if (score >= upgrades[i].price) {
                        score -= upgrades[i].price
                        upgrades[i].price = Math.round(upgrades[i].price * 1.25)

                        await console.log(`\n### You buyed ${upgrades[i].name}. ###`)

                        if(upgrades[i].id === 1){
                            playerDices++;
                            await console.log(`You now have ${playerDices} dices.\n`)
                        }
                        else if(upgrades[i].id === 2){
                            playerCombo++;
                            await console.log(`Your points are now multiplied by ${playerCombo}x.\n`)
                        }
                    }
                    else{
                        await console.log("It seems that you're missing some points, friend. Sorry.")
                    }
                }
            }
        }
        else if (shopAnswer.toUpperCase() == "N") {
            inshop = false;
            await console.log("-----(You exited the shop)-----\n")
            return
        }
        else {
            await console.log("Please enter a valid caracter.\n")
        }
    }
    else {
        await console.log("Please enter a valid caracter.\n")
    }
}