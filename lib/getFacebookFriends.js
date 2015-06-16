'use strict';

module.exports = function getFacebookFriends(user, url, callback) {
  url = url || 'https://graph.facebook.com/me/taggable_friends';
  request
   .get(url)
   .query({ access_token: user.access_token })
   .query({ fields: 'name,picture.width(500)' })
   .query({ limit: 5000 })
   .end(function(err, res) {
      //If facebook returns an error, return with err
      if (err) {
        return callback(err, res);
      };
      var resData = JSON.parse(res.text);
      var picData = resData.data;
      for (var i=0; i<picData.length; i++) {
        var newCard = new Card();
        newCard.personName = picData[i].name;
        newCard.personPic = picData[i].picture.data.url;
        newCard.userId = user.facebook_id;
        newCard.save(function(err, card) {
        });
      }
      if (resData.paging.next) {
        return getFacebookFriends(user, resData.paging.next, callback);
      }
      return callback(null, res);
   });
}

