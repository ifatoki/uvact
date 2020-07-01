const Controller = {
  displayLanding: async (req, res) => {
    res.status(200).send('Hello! To return the reverse of a string message, go to /reverse?message={MESSAGE} and pass the message as a query');
  },

  generateReverseString: async(req, res) => {
    const { message } = req.query;
    if (!message) res.status(400).json({
      success: false,
      error: {
        message: 'Invalid message'
      }
    })
    res.status(200).json({ message: message.split('').reverse().join('') });
  }
}

module.exports = Controller;