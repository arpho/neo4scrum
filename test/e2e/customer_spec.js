// in test/e2e/main.spec.js
describe('E2E: main page', function() {
  var ptor;

  beforeEach(function() {
    browser.get('http://127.0.0.1:7000/');
    ptor = protractor.getInstance();
    browser.get('http://arpho:7000/#/customer/25618')
  });
it("should show the customer's properties", function(){
    browser.get('http://arpho:7000/#/customers');
    browser.get('http://arpho:7000/#/customer/25618')
    var ele = by.id('customerProperties');
  expect(ptor.isElementPresent(ele)).toBe(true);
})

it("should show the customer's address",function(){
    var ele = by.id('customerAddress');
  expect(ptor.isElementPresent(ele)).toBe(true);})

it("should show the customer's phone",function(){
    var ele = by.id('customerPhone');
  expect(ptor.isElementPresent(ele)).toBe(true);})

it("should show the customer's Email",function(){
    var ele = by.id('customerEmail');
  expect(ptor.isElementPresent(ele)).toBe(true);})

it("should open modal-Dialog",function(){
    //var ele = by.id('addAddress');
    element(by.id('addAddress')).click();
    var mod = by.id('addAddressDialog');
    expect(ptor.isElementPresent(mod)).toBe(true);})

it('should add an item to the address list',function(){
    ptor.findElements(protractor.By.repeater('a in customer.LIVES_IN')).then(function(arr) {
  expect(arr.length).toEqual(2); // or whatever.
        // open modal window
  //var ele = by.id('fundooSuccess');
    element(by.id('addAddress')).click(); // open the modal dialog
    element(by.id('fundooSuccessButton')).click();
// set values to  new address
//ptor.findElement(protractor.By.model('email'));
});
    
})
});