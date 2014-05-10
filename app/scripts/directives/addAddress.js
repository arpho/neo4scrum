'use strict';

angular.module('neo4ScrumApp').
directive('scrumAddAddress',['createDialog',function(createDialogService,updateAddressService){
    return {
        template: '<img ng-src="img/add.png"  ng-click="newAddress()"',
    restrict: 'E',
        replace:true,
        scope: {
        item: '='
      },
        link: function(scope,createDialog){
            scope.newAddress = function(){
                console.debug('link');
                createDialogService('templates/addAddress.html',{
                    title: 'Add an address',
                    id:'addAddressDialog',
                    backdrop:true,
                    controller:'AddAddressCtrl',
                    success: {label: 'addAddress', fn: function() {
                        var address = {};
                             address.just_insert = true;
                             address.street = document.getElementById('newStreet').form[0].value;
                             address.city = document.getElementById('newStreet').form[1].value;
                             address.cap = document.getElementById('newStreet').form[2].value;
                             address.number = document.getElementById('newStreet').form[3].value;
                             address.use = document.getElementById('newStreet').form[4].value;
                             scope.customer.LIVES_IN.push({data:address,use:{use:address.use,id:-1}});
                        //console.log('Complex modal closed');
                        
                                                               
                                                               }
                             },
                    cancel: {label: 'Cancel', fn: function() {}}
                });}
            
            }
        }
    }]);