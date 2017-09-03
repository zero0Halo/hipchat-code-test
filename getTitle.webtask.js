var request = require('request');

var getTitle = function(context, cb){
  var titleExp = /<title\>(.*)<\/title>/;
  var url = context.body.url || false;
  var title = false;

  if(url){
    request.get(url, {}, function(err, res, body){
      try {
        title = titleExp.exec(res.body)[1];
      } catch(err){
        title = 'err';
      }

      cb(null, {
        title: title,
        url: url
      });
    });
  }

  else {
    cb(null, 'No Url Provided')
  }

};

module.exports = getTitle;
