
var assert = require("assert")

describe('Admin', function() {
  
  // Initial
  describe('Testing the tests', function() {
    it('should always pass, to test these tests', function() {
      assert.equal(-1, -1);
    })
  })
  
  describe('Environment variables', function() {
    it('should match the test environment variable we setup', function() {
      assert.equal(process.env.test_env, "aaa");
    })
  })
  
})
