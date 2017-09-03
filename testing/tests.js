(function(){
  var TEST_ELEMENT_ID = 'chatter-test';
  var TEST_ELEMENT = document.getElementById(TEST_ELEMENT_ID);

  QUnit.test('elements.exist', function(assert){
    var hipChatter = new HipChatter(TEST_ELEMENT);

    assert.ok(hipChatter.input, !false);
    assert.ok(hipChatter.output, !false);
    assert.ok(hipChatter.button, !false);
  });


  QUnit.test('no.input', function(assert){
    var hipChatter = new HipChatter(TEST_ELEMENT);

    hipChatter.textSubmit();

    assert.equal(hipChatter.results, false);
  });


  QUnit.test('multiple.mentions', function(assert){
    var hipChatter = new HipChatter(TEST_ELEMENT);

    hipChatter.input.value = 'Hello @bob and @dave, how are you?';

    hipChatter.textSubmit();

    assert.deepEqual(hipChatter.results.mentions, ['bob', 'dave']);
  });


  QUnit.test('emoticons.and.length', function(assert){
    var hipChatter = new HipChatter(TEST_ELEMENT);

    hipChatter.input.value = 'Hello @bob and @dave! (smilesreallybroadly) how are you (waves)?';

    hipChatter.textSubmit();

    assert.deepEqual(hipChatter.results.emoticons, ['waves']);
  });


})();
