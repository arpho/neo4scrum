'use strict';

describe('Controller: CustomerCtrl', function () {

  // load the controller's module
  beforeEach(module('neo4ScrumApp'));

  var MainCtrl,
    scope,
    $httpBackend;

  // Initialize the controller and a mock scope
  beforeEach(inject(function (_$httpBackend_, $controller, $rootScope) {
      console.log('before each');
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

  }));

  it('should attach a list of customers with one only item', function () {
    //expect(scope.customers).toBeUndefined();
         // console.log('end test');
    console.log('flush');
    $httpBackend.flush();
     // console.log(scope.customers);
    expect(scope.customers.length).toBe(1);
  });
});