var request = require('request');

/**
 * [getTitle Gets the title of a website based on a submitted url]
 * @param  {[obj]}   context [Object provided by webtask.io that holds 'context' information about the request]
 * @param  {Function} cb      [description]
 * @return {[obj]}           [Strictly speaking, this doesn't have a return. However the callback will send a response back containing the returnObj variable]
 */
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
