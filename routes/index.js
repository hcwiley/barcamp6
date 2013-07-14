var Tweet = require('../models').Tweet;

var tags = ["#nolabulls",
            "#totc",
            "#nolacommunity",
            "#neworleanspelicans",
            "#nola",
            "#essencefest",
            "#nolacrawl",
            "#NewOrleans",
            "#whodat",
            "#nolaproblems",
            "#onlyinnola",
            "#barcampnola"
           ]

exports.index = function(req, res){
  res.render('index', { title: 'Barcamp6' });
};

exports.topFive = function (req, res) {
  Tweet.topFiveTagsFiltered(tags, function (err, stats) {
    res.json({ stats: stats });
  });
};

exports.leaderboard = function (req, res) {
  Tweet.tagLeaderboard(req.params.tag, function (err, stats) {
    res.json({ stats: stats });
  });
};
