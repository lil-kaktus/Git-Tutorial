console.log("app.js, v5")

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

async function getAnswer(){
    const answer = await prompt("Would you like to try your luck ? (Y/N) ")

    if(answer.toUpperCase() === "Y"){
        let dice = Math.floor(Math.random() * 6) + 1;

        if(dice === 6){
            console.log(`\nJackpot ! You rolled a ${dice} !\n`)
        }
        else{
            console.log(`\nYou rolled a ${dice}.\n`)
        }
    }
    else if (answer.toUpperCase() === "N"){
        console.log("\nThat's a shame. See you next time !\n")
        return
    }
    else{
        console.log("Please enter a valid caracter.")
    }
    getAnswer()
}

console.log("Welcom to the JS casino !")
getAnswer()