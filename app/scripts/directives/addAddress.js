'use strict';

angular.module('neo4ScrumApp').
directive('scrumAddAddress',['createDialog',function(createDialogService){
    return {
        template: '<img ng-src="img/add.png"  ng-click="nuovo()"',
    restrict: 'E',
        replace:true,
        link: function(scope,createDialog){
            scope.nuovo = function(){
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