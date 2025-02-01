import React, { useState } from "react";
import { Button, Container, Typography, Grid, Paper, CircularProgress } from "@mui/material";
import { motion } from "framer-motion";
import axios from "axios";
const BasicUrl = "http://localhost:5000/api";
const App = () => {
  //set intial points to 5000
  const [points, setPoints] = useState(5000);
  //initlal selected bet amount to 100
  const [betAmount, setBetAmount] = useState(100);
  //there are three bet options 7 up, 7 down and lucky 7
  const [betOption, setBetOption] = useState("");
  //initlal dice result to 0
  const [diceResult, setDiceResult] = useState({ dice1: 0, dice2: 0, total: 0 });
  //initlal game result to empty string
  const [gameResult, setGameResult] = useState("");
  //initlal loading to false
  const [loading, setLoading] = useState(false);

  const handleBetAmount = (amount) => {
    setBetAmount(amount);
  };

  const handleBetOption = (option) => {
    setBetOption(option);
  };

  // function to execute when the roll dice button is clicked

  const rollDice = async () => {
    if (!betOption) {
      alert("Please select a bet option!");
      return;
    }

    setLoading(true);
    try {
      // Roll the dice
      const diceResponse = await axios.post(`${BasicUrl}/roll_dice`);
      setDiceResult(diceResponse.data);

      // Check the result
      const resultResponse = await axios.post(`${BasicUrl}/check_result`, {
        bet: betOption,
        total: diceResponse.data.total,
      });
      setGameResult(resultResponse.data.result);

      // Update points
      const pointsResponse = await axios.post(`${BasicUrl}/update_points`, {
        currentPoints: points,
        betAmount: betAmount,
        multiplier: resultResponse.data.multiplier,
      });
      setPoints(pointsResponse.data.updatedPoints);
    } catch (error) {
      console.error("Error:", error);
      setLoading(true)
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container >
      <Typography variant="h3" align="center" gutterBottom>
       Dice Game
      </Typography>
      <Paper elevation={3} style={{ padding: "20px", marginTop: "20px" }}>
        <Typography variant="h5" gutterBottom>
          Points: {points}
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h6">Select Bet Amount:</Typography>
            <Button variant={betAmount === 100 ? "contained" : "outlined"} onClick={() => handleBetAmount(100)}>
              100
            </Button>
            <Button variant={betAmount === 200 ? "contained" : "outlined"} onClick={() => handleBetAmount(200)}>
              200
            </Button>
            <Button variant={betAmount === 500 ? "contained" : "outlined"} onClick={() => handleBetAmount(500)}>
              500
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6">Choose Bet Option:</Typography>
            <Button variant={betOption === "7 Up" ? "contained" : "outlined"}  onClick={() => handleBetOption("7 Up")}>
              7 Up
            </Button>
            <Button variant={betOption === "7 Down" ? "contained" : "outlined"} onClick={() => handleBetOption("7 Down")}>
              7 Down
            </Button>
            <Button variant={betOption === "Lucky 7" ? "contained" : "outlined"} onClick={() => handleBetOption("Lucky 7")}>
              Lucky 7
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" onClick={rollDice} disabled={loading || !betOption}>
              {loading ? <CircularProgress size={24} color="success" /> : "Roll Dice"}
            </Button>
          </Grid>
          <Grid item xs={12}>
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Typography variant="h6">RollResult:</Typography>
              <Typography>
                Dice 1: {diceResult.dice1}, Dice 2: {diceResult.dice2}, Total: {diceResult.total}
              </Typography>
            </motion.div>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6">OutCome:</Typography>
            <Typography>{gameResult}</Typography>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default App;