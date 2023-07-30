const User = require('../modal/user');
const { v4: uuidv4 } = require('uuid');
const email = require('../config/mail')
require('dotenv').config()


// generate New share URL
exports.generateLink = async (req, res) => {
  try {
    let domain = 'http://localhost:3001/game/'
    let uniqueID = uuidv4()
    let createdLink = domain + uniqueID
    return res.status(201).json({ success: true, data: createdLink });

  } catch (err) {
    return res.status(500).json({ success: false, error: 'Error creating URL' });
  }
};


// share link to user
exports.shareLinkToUser = async (req, res) => {

  try {
    const { gameUrl, userEmail } = req.body

    const mailOptions = {
      from: process.env.EMAIL,
      to: userEmail,
      subject: 'Join The Game!',
      html: `<p>Click the link below To Join Game:</p><a href=${gameUrl}>Join Game</a>`,
    };

    const existingUser = await User.findOne({ gameUrl: gameUrl });
    if (!existingUser) {
      email.sendMail(mailOptions, async (error, info) => {
        if (error) {
          console.error('Error sending email:', error);
          return res.status(201).json({ success: true, data: "email not sent" });
        } else {
          console.log('Email sent:', info.response);
          const game = new User({ email: userEmail, gameUrl: gameUrl, status: 0 });
          await game.save();
          return res.status(201).json({ success: true, data: "Email Sent successfully!" });
        }
      });
    } else {
      return res.status(201).json({ success: false, data: "URL Already Present, Generate New!" });
    }



  } catch (err) {
    return res.status(500).json({ success: false, error: 'Error sharing url' });
  }
};


// join the game
exports.joinGame = async (req, res) => {

  try {
    const { gameUrl, status } = req.body;

    if (gameUrl) {
      const isCorrect = await User.findOne({ gameUrl: gameUrl });
      if (isCorrect) {
        const existingUser = await User.findOne({ gameUrl: gameUrl, status: 1 });
        // console.log(existingUser)
        if (existingUser) {
          return res.status(201).json({ success: true, data: 'ALREADY JOINED THE GAME!' });
        } else {
          const user = await User.findOne({ gameUrl });

          if (!user) {
            return res.status(201).json({ success: false, data: 'enter correct url' });
          }
          // Update the status
          user.status = 1;
          await user.save();
          return res.status(201).json({ success: true, data: 'YOU HAVE SUCCESSFULLY JOINED THE GAME' });
        }
      } else {
        return res.status(201).json({ success: false, data: 'enter correct url' });
      }

    } else {
      return res.status(201).json({ success: false, data: 'enter correct url' });
    }

  } catch (err) {
    return res.status(500).json({ error: 'Error enter game' });
  }
};

// show all the user
exports.showAllUser = async (req, res) => {
  try {
    let getUsers = await User.find({})
    return res.status(201).json({ success: true, data: getUsers });


  } catch (err) {
    console.log(err)
    return res.status(500).json({ success: false, error: 'Error show user' });
  }
};

