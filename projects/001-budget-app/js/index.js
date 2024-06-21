/** Class representing a Category. */
class Category {
    /**
     * Create a category and assigns it the name and an empty array, the ledger, which will be populated later by the history of the movement of money.
     * @param {string} category - The name of the category 
     */
    constructor(category){
        this.categoryName = category;
        this.ledger = [];
    }
    /**
     * Append a deposit to the ledger list reporting the amount and the description
     * @param {number} amount - The amount to be deposited
     * @param {string} description - The description of the deposit
     */
    deposit(amount, description = ''){
        this.ledger.push({
            amount: amount,
            description: description
        });
    }
    /**
    * Append a withdrawal to the ledger list reporting the negative amount and the description
    * @param {number} amount - The amount to be withdrawn
    * @param {string} description - The description of the withdrawal
    * @returns {boolean} `true` if the balance is positive and the amount to be withdrawn does not make it negative, otherwise `false`
    */
    withdraw(amount, description = ''){
        if(this.checkFunds(amount)){
            this.ledger.push({
                amount: -amount,
                description: description
            });
            return true;
        }
        
        return false;
    }
    /**
     * Returns the current balance of the budget category based on the deposits and withdrawals that have occurred
     * @returns {number} The balance
     */
    getBalance(){
        return this.ledger.reduce((totalBalance, transaction) => totalBalance + parseFloat(transaction.amount), 0);
    }
    /**
     * Returns the current balance of the budget category based only on the withdrawals that have occurred
     * @returns {number} The balance
     */
    getWithdrawBalance(){
        // more performant code
        // return this.ledger.reduce((totalBalance, transaction) => transaction.amount < 0 ? totalBalance + parseFloat(transaction.amount) : 0, 0);
        // just for education
        return this.ledger
            .filter(transaction => transaction.amount < 0)
            .reduce((totalBalance, transaction) => totalBalance + parseFloat(transaction.amount), 0);
    }
    /**
     * Transfer an amount from a category to another and reports it int the ledger
     * @param {*} amount - The amount to be transferred
     * @param {*} budgetCategory - The category to which the transfer is made
     * @returns {boolean} `true` if the balance is positive and the amount to be transferred does not make it negative, otherwise `false`
     */
    transfer(amount, budgetCategory){
        if(this.checkFunds(amount)){
            this.withdraw(amount, `Transfer to ${budgetCategory.categoryName}`);
            budgetCategory.deposit(amount, `Transfer from ${this.categoryName}`);
            return true;
        }

        return false;
    }
    /**
     * Check if the amount is greater than the balance of the budget category
     * @param {*} amount - The amount to be checked
     * @returns {boolean} `false` if the amount is greater than the balance of the budget category, otherwise `true`
     */
    checkFunds(amount){
        if(amount > this.getBalance())
            return false;        

        return true;
    }
    /**
     * A static method that returns the relevant data of the category, i.e.: the name, the ledger movements and the balance
     * @param {Category} category - The category to be processed
     * @returns {string} The relevant data of the category
     */
    static str(category){
        const asterisksLength = Math.floor((30 - category.categoryName.length) / 2);
        let text = '*'.repeat(asterisksLength) + category.categoryName + '*'.repeat(asterisksLength + (category.categoryName.length % 2 === 0 ? 0 : 1));
        category.ledger.forEach(row => {
            const amount = row.amount.toFixed(2);
            const description = row.description.substring(0,23);
            text += '\n' + description + ' '.repeat(30 - description.length - amount.length) + amount;
        });

        return `${text}\nTotal: ${category.getBalance(category)}`;
    }
}
/**
 * Returns the percentage spent in each category passed in to the function representing the data as a chart
 * @param {Array} categories - The categories to be processed
 * @returns {string} The resulting chart
 */
function createSpendChart(categories){
    let text = 'Percentage spent by category';
    const percentagesInTens = [];

    for (let i = 100; i >= 0; i=i-10) {
        percentagesInTens.push(i)
    }

    let totalWithdraw = 0;
    let longestCategoryName = '';

    const categoriesExtractedData = categories.map(category => {
        const withdraw = category.getWithdrawBalance();

        totalWithdraw += withdraw;

        if(category.categoryName.length > longestCategoryName.length){
            longestCategoryName = category.categoryName;
        }

        return {
            name: category.categoryName,
            withdraw
        }
    });

    let percentages = '';

    percentagesInTens.forEach(percentage => {
        percentages += '\n' + String(percentage).padStart(3, ' ') + '| ';

        categoriesExtractedData.forEach(category => {
            const withdrawPercentage = Math.floor((category.withdraw / totalWithdraw) * 100);            

            if(percentage <= withdrawPercentage){
                percentages += 'o  ';
            } else {
                percentages += '   ';
            }
        });
    });

    let dashes = `\n${' '.repeat(4)}${'-'.repeat(categoriesExtractedData.length*3 + 1)}`;

    let categoriesNames = '';

    for (let i = 0; i < longestCategoryName.length; i++) {
        categoriesNames += `\n${' '.repeat(5)}`;
        categoriesExtractedData.forEach(category => {
            if(typeof category.name[i] === 'undefined'){
                categoriesNames += ' '.repeat(3);
            } else {
                categoriesNames += `${category.name[i]}  `;
            }
        });

    }

    return text + percentages + dashes + categoriesNames;
}

module.exports = { // For CommonJS environment
// export { // For ES module environment. In addition for Visual Studio Code two package.json files must be created, one in this file folder, the other one in the application file folder, they must contain the following code { "type": "module" }
    Category,
    createSpendChart
};