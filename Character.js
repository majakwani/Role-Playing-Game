import {getDiceRollArray, getDicePlaceholderHtml} from '/utils.js'

function Character(data) {
    Object.assign(this, data)
    
    this.maxHealth = this.health,

    this.diceArray = getDicePlaceholderHtml(this.diceCount)

    this.getDiceHtml = function() {
        this.currentDiceScore = getDiceRollArray(this.diceCount)
        this.diceArray = this.currentDiceScore.map( num => `<div class="dice">${num}</div>`).join("")
    }

    this.getHealthBarHtml = () => {
        const percent = getPercentage(this.health, this.maxHealth)
        return `<div class="health-bar-outer ${percent < 26 ? "danger": "" }>
        <div class="health-bar-inner  " 
            style="width: ${percent}%;">
        </div>
    </div>`
    }

    this.takeDamage = function(attackScoreArray){
        const totalDamage = attackScoreArray.reduce((total, current) =>{
            return total + current
        })
        this.health -= totalDamage
        if(this.health <= 0){
            this.health = 0
            this.dead = true
    }
}

    this.getCharacterHtml = function () {
        const {name, avatar, health, diceArray} = this;      
        const healthBar = this.getHealthBarHtml()
           return `
            <div class="character-card">
                <h4 class="name"> ${name} </h4>
                <img class="avatar" src="${avatar}" />
                <div class="health">health: <b> ${health} </b></div>
                ${healthBar}
                <div class="dice-container">
                    ${diceArray}
                </div>
            </div>`;
    }  
}

const getPercentage = (remainingHealth, maximumHealth) => (100 * remainingHealth) / maximumHealth

export default Character