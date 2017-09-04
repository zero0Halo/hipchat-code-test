(function(){
  var TEST_ELEMENT_ID = 'chatter-test';
  var TEST_ELEMENT = document.getElementById(TEST_ELEMENT_ID);

  // Verify that the 3 main elements for the form to work exist
  QUnit.test('elements.exist', function(assert){
    var hipChatter = new HipChatter(TEST_ELEMENT);

    assert.ok(hipChatter.input, !false);
    assert.ok(hipChatter.output, !false);
    assert.ok(hipChatter.button, !false);
  });


  // Checks to see that nothing happens when no value is in the text input area the first time
  QUnit.test('no.input', function(assert){
    var hipChatter = new HipChatter(TEST_ELEMENT);

    hipChatter.textSubmit();

    assert.equal(hipChatter.results, false);
  });


  // Makes sure that multiple mentions are recorded
  QUnit.test('multiple.mentions', function(assert){
    var hipChatter = new HipChatter(TEST_ELEMENT);

    hipChatter.input.value = 'Hello @bob and @dave, how are you?';

    hipChatter.textSubmit();

    assert.deepEqual(hipChatter.results.mentions, ['bob', 'dave']);
  });


  // Verifies that multiple emoticons can be detected, and that they are only recorded if under the default limit
  QUnit.test('emoticons.and.length', function(assert){
    var hipChatter = new HipChatter(TEST_ELEMENT);

    hipChatter.input.value = 'Hello @bob and @dave! (smilesreallybroadly) how are you (waves)?';

    hipChatter.textSubmit();

    assert.deepEqual(hipChatter.results.emoticons, ['waves']);
  });


  // Checks that the async call to getTitle works, and that there are no errors returned from a known valid address
  QUnit.test('async.url', function(assert){
    var hipChatter = new HipChatter(TEST_ELEMENT);
    var done = assert.async();
    var promise;

    hipChatter.results = hipChatter._resultConstructor();
    promise = hipChatter.parseValue('Hello @bob and @dave! Have you been to http://www.cnn.com before?');

    promise.then( function(){
      assert.equal(hipChatter.results.links[0].hasOwnProperty('error'), false);
      done();
    });


  });


})();
