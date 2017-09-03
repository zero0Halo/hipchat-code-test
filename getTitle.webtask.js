var request = require('request');

var getTitle = function(context, cb){
  var titleExp = /<title\>(.*)<\/title>/;
  var url = context.body.url || false;
  var title = false;
  var returnObj = {
    title: '',
    url
  };

  if(url){
    request.get(url, {}, function(err, res, body){
      try {
        returnObj.title = titleExp.exec(res.body)[1];
      } catch(err){
        returnObj.title = 'Invalid URL';
        returnObj.error = err.message;
      }

      cb(null, returnObj);
    });
  }

  else {
    cb(null, 'No Url Provided')
  }

};

module.exports = getTitle;
