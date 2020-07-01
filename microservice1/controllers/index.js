const fetch = require("node-fetch");
const dotenv = require("dotenv");
dotenv.config();
const { REVERSE_STRING_GENERATOR_URL } = process.env;

const Controller = {
  displayLanding: async (req, res) => {
    res.status(200).send('Hello! To return the reverse of a string and a random number, go to /reverse-random');
  },

  generateReverseStringAndRandomNumber: async(req, res) => {
    try {
      const { message } = req.body;
      if (!message) res.status(400).json({
        success: false,
        error: {
          message: 'Invalid message'
        }
      })
      const response = await fetch(`${REVERSE_STRING_GENERATOR_URL}/reverse?message=${message}`);
      if (!response) throw 'server error';
      const reverse = await response.json();
      const random = (Math.random()*100).toFixed(2);
      res.status(200).json({...reverse, random });
    } catch (e) {
      res.status(500).json({
        success: false,
        error: {
          message: 'Server error. Please try again.'
        }
      })
    }
  }
}

module.exports = Controller;