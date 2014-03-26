// in test/e2e/main.spec.js
describe('E2E: main page', function() {
  var ptor;

  beforeEach(function() {
    browser.get('http://127.0.0.1:7000/');
    ptor = protractor.getInstance();
    browser.get('http://arpho:7000/#/customer/25618')
    var ele = by.id('addAddress');
    element(by.id('addAddress')).click();
  });
    


it(" modal-Dialog should be open",function(){
    var mod = by.id('addAddressDialog');
    expect(ptor.isElementPresent(mod)).toBe(true);})

it("should add an item to the address list with class 'nuovo'",function(){
    ptor.findElements(protractor.By.repeater('a in customer.LIVES_IN')).then(function(arr) {
      expect(arr.length).toEqual(2);
        var initial_length = arr.length;
      // set values to  new address
      ptor.findElement(protractor.By.model('street')).sendKeys('via don Luigi sturzo');
      ptor.findElement(protractor.By.model('city')).sendKeys('Giarre');
      ptor.findElement(protractor.By.model('number')).sendKeys('88');
      ptor.findElement(protractor.By.model('use')).sendKeys('nonno');
        element(by.id('addAddressButton')).click();
        
        //check one address more
        ptor.findElements(protractor.By.repeater('a in customer.LIVES_IN')).then(function(arr) {
            
            expect(arr.length).toEqual(initial_length+1);
            var inserted_item = element(arr[arr.length-1]) //get the last element, the just inserted one
            //console.log(inserted_item);
            var lastRow = arr[arr.length-1];
            lastRow.getText().then(function(v){
                expect(v).toMatch('nonno');
            });
            var attributes = '';
            //console.log(
                arr[arr.length-1].getAttribute('className').then(function(o){
                                                                           // console.log('then');
                                                                            //console.log(o)
                                                                            attributes = o;
                                                                            //console.log(attributes);
                                                                            var pos = attributes.indexOf('nuovo'); // if != -1 nuovo is in the attribute's list
                                                                            //console.log(attributes.indexOf('nuovo'));
                                                                          //  expect(pos!=-1).toBe(true);*/
                                                        expect(attributes).toMatch('nuovo');
                                                                         });
            
        })
});
    
})
});