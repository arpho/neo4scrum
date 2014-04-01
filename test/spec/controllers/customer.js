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
      }

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

  it('should attach a list of customers with one only item', function () {
    //expect(scope.customers).toBeUndefined();
         // console.log('end test');
    console.log('flush');
    //$httpBackend.flush();
      //console.log(scope.customers);
  //  expect(scope.customers.length).toBe(1);
  });
                    
  it('testing scrollList',function(){
                    var address = {};
                    address.data = {street:'via',number:15,cap:20126,city:'città'};
                    address.just_insert = true;
                    address.id = 123456;
                    address.use = {use:'test'};
                    scope.customer.LIVES_IN.push(address);
                    var operations = scope.scrollList('LIVES_IN','address');
                    expect(operations.length).toBe(1);
                    //console.log({'detail_type':'address','operation':'add','data':{street:'via',number:15,cap:20126,city:'città'},'use':{'use':'test'}});                                                                            // console.log(operations);
                    var expected = {'detail_type':'address','operation':'update','data':{street:'via',number:15,cap:20126,city:'città'},id:123456,use:{use:'test'}};
                    expect(operations[0]).toBeSimilarTo(expected)
                    //console.log(scope.customer.LIVES_IN[0]);
                    // segnsamo l'indirizzo di test  come modificato
                    delete scope.customer.LIVES_IN[0].just_insert; // ottenuto dal server
                    scope.customer.LIVES_IN[0].updated = true; // modificato
                    operations = scope.scrollList('LIVES_IN','address');
                    expect(operations[0]).toBeSimilarTo(expected);
                    console.log('expected');
                    console.log(expected);
                    console.log('out');
                    console.log(operations[0]);
                    console.log('test done');
                    })
});