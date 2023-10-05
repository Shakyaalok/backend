const signupModel = require('../models/signupModel')
const expenseModel = require('../models/expenseModels')



const premiumFeauter = async(req, res) => {
    try {
        const users = await signupModel.findAll();

        const userExpenses = [];

        // iterate all the user based on their user id
        for (const user of users) {
            // Retrieve all expenses for the current user
            const expenses = await expenseModel.findAll({ where: { userId: user.id } });

            // Calculate the total expense for the user by summing up all expenses

            let totalExpense = 0;

            // Set totalExpense to 0 if the user has no expenses
            if (expenses.length === 0) {
                totalExpense = 0;
            }

            // Calculate the total expense for the user by summing up all expenses
            for (const expense of expenses) {
                totalExpense += expense.productPrice;
            }


            userExpenses.push({ 'Name': user.name, 'totalExpenses': totalExpense });
            // res.json({ 'Name': user.name, 'expenses': expenses })  // why this will not work and i have to an array the reason is that we cannot send multiple response so we
            // have to the response at once i have to use enpty array
        }
        // sort-->use . because of objects inside an array
        userExpenses.sort((a, b) => b.totalExpenses - a.totalExpenses);
        // Send a JSON response with all user expenses
        res.json(userExpenses);
    } catch (error) {
        console.log('Error in calculating the expenses', error)
    }


}


module.exports = { premiumFeauter };