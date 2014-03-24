// in test/e2e/main.spec.js
describe('E2E: main page', function() {
  var ptor;

  beforeEach(function() {
    browser.get('http://127.0.0.1:7000/');
    ptor = protractor.getInstance();
  });
    
it("should loaad the customers list page", function(){
    browser.get('http://arpho:7000/#/customers');
    var ele = by.id('customersList');
  expect(ptor.isElementPresent(ele)).toBe(true);
})

 it('should load the home page', function() {
  var ele = by.id('home');
  expect(ptor.isElementPresent(ele)).toBe(true);
});

});