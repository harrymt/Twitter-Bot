
var assert = require("assert")

describe('Admin', function() {
  
  // Initial
  describe('Testing the tests', function() {
    it('Initial basic test that should always pass', function() {
      assert.equal(-1, -1);
    })
  })
  
  
  describe('Environment variables', function() {
    it('Test the environment variables', function() {
      assert.equal(process.env.test_env, "aaa");
      
//       // Get the values from Travis CI encrypted environment variables
// var keys = {
//   "consumer_secret": process.env.keys_consumer_secret,
//   "consumer_key": process.env.keys_consumer_key,
//   "access_token": process.env.keys_access_token,
//   "access_token_secret": process.env.keys_access_token_secret
// };

    })
  })
  
})
