const GetRandomNumber=require("../helperfunctions/GetRandomNumber")
const rollDice = GetRandomNumber
// Endpoint to roll the dice
const RollDice= (req, res) => {
  setTimeout(() => {
    const dice1 = rollDice()
    const dice2 = rollDice()
    const total = dice1 + dice2;

    res.json({ dice1, dice2, total });
  }, 2000); // 2-second delay
  };
  
  // Endpoint to check the result
  const checkResults= (req, res) => {
    const { bet, total } = req.body;
  
    let result = "lose";
    let multiplier = 0;
  
    if (bet === "Lucky 7" && total === 7) {
      result = "win";
      multiplier = 5;
    } else if (bet === "7 Up" && total > 7) {
      result = "win";
      multiplier = 2;
    } else if (bet === "7 Down" && total < 7) {
      result = "win";
      multiplier = 2;
    }
  
    res.json({ result, multiplier });
  }
  
  // Endpoint to update player points
  const UpdatePoints= (req, res) => {
    const { currentPoints, betAmount, multiplier } = req.body;
  
    let updatedPoints = currentPoints;
  
    if (multiplier > 0) {
      updatedPoints += betAmount * multiplier;
    } else {
      updatedPoints -= betAmount;
    }
  
    playerPoints = updatedPoints; // Update global player points
    res.json({ updatedPoints });
  }

  module.exports={RollDice,checkResults,UpdatePoints}