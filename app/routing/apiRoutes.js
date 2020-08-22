var friendData = require('../data/friends');

module.exports = function (app) {
  app.get('/api/friends', function (req, res) {
    res.json(friendData);
  });

  app.post('/api/friends', function (req, res) {
    console.log(req.body.scores);

    var user = req.body;

    for (var i = 0; i < user.scores.length; i++) {
      user.scores[i] = parseInt(user.scores[i]);
    }

    var friendIndex = 0;
    var minDifference = 40;

    for (var i = 0; i < friendData.length; i++) {
      var totalDifference = 0;
      for (var j = 0; j < friendData[i].scores.length; j++) {
        var difference = Math.abs(user.scores[j] - friendData[i].scores[j]);
        totalDifference += difference;
      }

      if (totalDifference < minDifference) {
        friendIndex = i;
        minDifference = totalDifference;
      }
    }

    friendData.push(user);
    res.json(friendData[friendIndex]);
  });
};
