'use strict';

describe('Controller: CustomerCtrl', function () {

  // load the controller's module
  beforeEach(module('neo4ScrumApp'));

  var MainCtrl,
    scope,
    $httpBackend;

  // Initialize the controller and a mock scope
  beforeEach(inject(function (_$httpBackend_, $controller, $rootScope) {
      // add matchers for object from stackoverflow
      this.addMatchers({
    toBeSimilarTo: function(expected) {
      function buildObject(object) {
        var built = {};
        for (var name in object) {
          if (object.hasOwnProperty(name)) {
            built[name] = object[name];
          }
        }
        return built;
      }

      var actualObject = buildObject(this.actual);
      var expectedObject = buildObject(expected);
      var notText = this.isNot ? " not" : "";

      this.message = function () {
        return "Expected " + actualObject + notText + " to be similar to " + expectedObject;
      };

      return jasmine.getEnv().equals_(actualObject, expectedObject);

    }
  });
    $httpBackend = _$httpBackend_;
    $httpBackend.expectGET('/api/customer/:25618').respond({columns:['r','c','o'],
                data:[
                    {data:{ name: 'Giuseppe', surname: 'D\'Amico', note: 'it\'s me' },id: '25618'},
                    {data:{use:'residenza'},type: 'LIVES_IN'},// relazione indirizzo
                    {data: // item 
                             { }
                    },

                    {data:{ name: 'Giuseppe', surname: 'D\'Amico', note: 'it\'s me' },id: '25618'},
                    {data:{use:'domicilio'},type: 'LIVES_IN'},
                    {data: 
                             { cap:20129,
                               via:'Via G. B. Morgagni 35',
                               city:'Milano',
                              country:'Italy'
                             }
                    },




          {
              data: { company: 'H3G', use: 'principale' },
              type: 'ANSWERS_TO'
          },
          {
                data: { 
                            number: '3928502668',
                            note: 'intestato a Marco' 
                },
           },


          {data:{ name: 'Giuseppe', surname: 'D\'Amico', note: 'it\'s me' },
           id: '25618'
          },
          {
              data: { use: 'extra' },
              type: 'RECEIVES'
          },
          {
              data: { mail: 'mail',
                     use: 'extra' 
                    }
          },

          {data:{ name: 'Giuseppe', surname: 'D\'Amico', note: 'it\'s me' },
           id: '25618'
          },
          {
              data: { use: 'principal' },
              type: 'RECEIVES'
          },
          {
              data: {
                  mail: 'mail',
                  use: 'principal' 
              }
          },

               ]});
      scope = $rootScope.$new();
      MainCtrl = $controller('CustomerCtrl', {
      $scope: scope
    });
    //$httpBackend.flush();
//    expect(scope.customers.length).toBe(1);

  }));

 /* it('should attach a list of customers with one only item', function () {
    //expect(scope.customers).toBeUndefined();
         // console.log('end test');
    //console.log('flush');
    //$httpBackend.flush();
      //console.log(scope.customers);
  //  expect(scope.customers.length).toBe(1);
  });*//*
  it('should create an add operation ',function(){
                    var address = {};
                    address.data = {street:'via',number:15,cap:20126,city:'città',just_insert:true};
                    address.just_insert = true;
                    address.id = 123456;
                    address.use = {use:'test'};
                    address.toDelete = true;
                    scope.customer.LIVES_IN.push(address);
                    var operations = scope.scrollList([],'LIVES_IN','address');
                    var expected = {'detail_type':'address','operation':'add','data':{street:'via',number:15,cap:20126,city:'città'},id:123456,use:{use:'test'}};
                    var compare = operations[0].detail_type == expected.detail_type
                     && operations[0].operation == expected.operation
                     && operations[0].data.street == expected.data.street
                     && operations[0].data.number == expected.data.number
                     && operations[0].data.cap == expected.data.cap
                     && operations[0].data.city == expected.data.city
                     && operations[0].id == expected.id
                     && operations[0].use.use == expected.use.use; 
                    expect(compare).toBeTrue;
                    
  });*/
  /*it('should create an add operation for address and one for mail for testing generateOperations',function(){
                    var address = {};
                    address.data = {street:'via',number:15,cap:20126,city:'città',just_insert:true};
                    address.id = 123456;
                    address.use = {use:'test'};
                    scope.customer.LIVES_IN.push(address);
                    var mail = {data:{just_insert:true}};
                    mail.mail = 'arpho@iol.it';
                    mail.note = 'test';
                    mail.use = {use:'spam'};
                    scope.customer.RECEIVES.push(mail);
                    var operations = scope.generateOperations();//scope.scrollList([],'LIVES_IN','address');
                    var expected = {'detail_type':'address','operation':'add','data':{street:'via',number:15,cap:20126,city:'città'},id:123456,use:{use:'test'}};
                    expect(operations.length).toBe(2);
                    
  });*/
 /* 
  it('scroolList should create a delete operation',function(){
                    var address = {};
                    address.data = {street:'via',number:15,cap:20126,city:'città',toDelete:true};
                    address.toDelete = true;
                    address.id = 123456;
                    scope.customer.LIVES_IN.push(address);
                    var operations = scope.scrollList([],'LIVES_IN','address');
                    var expected = {'detail_type':'address','operation':'delete',id:123456};
                    var compare = operations[0].detail_type == expected.detail_type
                     && operations[0].operation == expected.operation
                     && operations[0].id == expected.id; 
                    expect(compare).toBeTrue;
                    
  });*/
  it('testing scrollList should create an add operation',function(){
                    var address = {};
                    address.data = {street:'via',number:15,cap:20126,city:'città',just_insert:true,updated:true};
                    address.id = 123456;
                    address.use = {use:'test'};
                    scope.customer.LIVES_IN.push(address);
                    var operations = scope.scrollList([],'LIVES_IN','address');
                    expect(operations.length).toBe(1);
                    //console.log({'detail_type':'address','operation':'add','data':{street:'via',number:15,cap:20126,city:'città'},'use':{'use':'test'}});                                                                            // console.log(operations);
                    var expected = {'detail_type':'address','operation':'add','data':{street:'via',number:15,cap:20126,city:'città'},id:123456,use:{use:'test'}};
                    //operations = scope.scrollList([],'LIVES_IN','address');
                    var compare = operations[0].detail_type == expected.detail_type
                     && operations[0].operation == expected.operation
                     && operations[0].data.street == expected.data.street
                     && operations[0].data.number == expected.data.number
                     && operations[0].data.cap == expected.data.cap
                     && operations[0].data.city == expected.data.city
                     && operations[0].id == expected.id
                     && operations[0].use.use == expected.use.use; 
                    expect(compare).toBeTrue;
                   });

it ('update combined with add should give only add',function(){
                    var address = {};
                    address.data = {street:'via',number:15,cap:20126,city:'città',just_insert:true,updated:true};
                    address.id = 123456;
                    address.use = {use:'test'};
                    address.data.number = 16;
                    scope.customer.LIVES_IN.push(address);
                    var operations = scope.scrollList([],'LIVES_IN','address');
                    var expected = {'detail_type':'address','operation':'add','data':{street:'via',number:16,cap:20126,city:'città'},id:123456,use:{use:'test'}};
                    var compare = operations[0].detail_type == expected.detail_type
                     && operations[0].operation == expected.operation
                     && operations[0].data.street == expected.data.street
                     && operations[0].data.number == expected.data.number
                     && operations[0].data.cap == expected.data.cap
                     && operations[0].data.city == expected.data.city
                     && operations[0].id == expected.id
                     && operations[0].use.use == expected.use.use; 
                     expect(compare).toBeTrue;	
});
it('delete combined with add should give nothing',function(){
                    var address = {};
                    address.data = {street:'via',number:15,cap:20126,city:'città',just_insert:true,toDelete:true};
                    address.id = -1;
                    address.use = {use:'test'};
                    scope.customer.LIVES_IN.push(address);
                    var operations = scope.scrollList([],'LIVES_IN','address');
                    //console.log(operations);
                    expect(operations.length).toBe(0);
	
});
it('delete combined with add  andupdate should give nothing',function(){
                    var address = {};
                    address.data = {street:'via',number:15,cap:20126,city:'città',just_insert:true,updated:true,toDelete:true};
                    address.id = -1;
                    address.use = {use:'test'};
                    address.data.number = 16;
                    scope.customer.LIVES_IN.push(address);
                    var operations = scope.scrollList([],'LIVES_IN','address');
                    expect(operations.length).toBe(0);
	
});
it ('update combined with delete should give only delete',function(){
                    var address = {};
                    address.data = {street:'via',number:15,cap:20126,city:'città',just_insert:true,updated:true,toDelete:true};
                    address.id = 123456;
                    address.use = {use:'test'};
                    address.data.number = 16;
                    scope.customer.LIVES_IN.push(address);
                    var operations = scope.scrollList([],'LIVES_IN','address');
                    var expected = {'detail_type':'address','operation':'delete',id:123456};
                    var compare = operations[0].detail_type == expected.detail_type
                     && operations[0].operation == expected.operation
                     && operations[0].id == expected.id; 
                     expect(compare).toBeTrue;	
});
it ('add combined with update and delete should give nothing',function(){
                    var address = {};
                    address.data = {street:'via',number:15,cap:20126,city:'città'};
                    address.just_insert = true;
                    address.id = -1;
                    address.use = {use:'test'};
                    address.data.number = 16;
                    address.updated = true; // update combined with add
                    address.toDelete = true;
                    scope.customer.LIVES_IN.push(address);
                    var operations = scope.scrollList([],'LIVES_IN','address');
                    var expected = {'detail_type':'address','operation':'delete',id:123456};
                    expect(operations.length).toBe(0);
});
});