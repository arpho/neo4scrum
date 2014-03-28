// in test/e2e/main.spec.js
describe('E2E: update address', function() {
  var ptor;

  beforeEach(function() {
    browser.get('http://127.0.0.1:7000/');
    ptor = protractor.getInstance();
    browser.get('http://arpho:7000/#/customer/25618')
    element(by.id('updateAddress25624')).click();
  });
    
it(" UpdateAddress button should open the modal dialog",function(){
    var up = by.id('updateAddressDialog');
    expect(ptor.isElementPresent(up)).toBe(true);
   /* ptor.findElements(protractor.By.repeater('a in customer.LIVES_IN')).then(function(arr) {
        var a = arr[0];
        /*a.getText().then(function(t){
                                        console.log(t);
            expect(t).toMatch('Prati')
                                    })*/
        //expect(a.isElementPresent()).toBe(true);
    })

it("updating the street should be reflected in the main window",function(){
    ptor.findElement(protractor.By.model('street')).sendKeys('updated');
    element(by.id('fundooSuccessButton')).click();
    ptor.findElements(protractor.By.repeater('a in customer.LIVES_IN')).then(function(arr) {
        var a = arr[0];
        a.getText().then(function(t){
            expect(t).toMatch('updated');
                                    })
})
})

it("updating the city should be reflected in the main window",function(){
    ptor.findElement(protractor.By.model('city')).sendKeys('updated');
    element(by.id('fundooSuccessButton')).click();
    ptor.findElements(protractor.By.repeater('a in customer.LIVES_IN')).then(function(arr) {
        var a = arr[0];
        a.getText().then(function(t){
            expect(t).toMatch('updated');
                                    })
})
})

it("updating the cap should be reflected in the main window",function(){
    ptor.findElement(protractor.By.model('cap')).sendKeys('updated');
    element(by.id('fundooSuccessButton')).click();
    ptor.findElements(protractor.By.repeater('a in customer.LIVES_IN')).then(function(arr) {
        var a = arr[0];
        a.getText().then(function(t){
            expect(t).toMatch('updated');
                                    })
})
})

it("updating the number should be reflected in the main window",function(){
    ptor.findElement(protractor.By.model('number')).sendKeys('updated');
    element(by.id('fundooSuccessButton')).click();
    ptor.findElements(protractor.By.repeater('a in customer.LIVES_IN')).then(function(arr) {
        var a = arr[0];
        a.getText().then(function(t){
            expect(t).toMatch('updated');
                                    })
})
})

it("updating the use should be reflected in the main window",function(){
    ptor.findElement(protractor.By.model('use')).sendKeys('updated');
    element(by.id('fundooSuccessButton')).click();
    ptor.findElements(protractor.By.repeater('a in customer.LIVES_IN')).then(function(arr) {
        var a = arr[0];
        a.getText().then(function(t){
            expect(t).toMatch('updated');
                                    })
})
})
     
})


                                                                           
