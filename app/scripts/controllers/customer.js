'use strict';
angular.module('neo4ScrumApp').controller('CustomerCtrl',['$scope','$http','$routeParams','createDialog','$rootScope', function($scope,$http,$routeParams,createDialogService,$rootScope) {
    var customerId = $routeParams.customerId; 
    var  indexOfId = function(l,id){
        /* cerca la posizione dell'elemento con id specificato in una lista
        @param []::[{id:object}]: lista in esame
        @param object: id ricercato
        @return int:-1 se non trova, altrimenti la posizione
        */
        for (var i=0;i<l.length;i++){
            if (l[i].id==id){
                return i;
            }
        }
        return -1;
    };
    if (typeof customerId != 'undefined') {
        $scope.pageTitle = "Customer's view";
        $http.get('/api/customer/:'+customerId).success(function(customer) {
            $rootScope.customer = customer.data[0].data;
            $scope.addressToDelete = function(a){
                a.toDelete = true;
            };
            $scope.telephoneToDelete = function(a){
                a.toDelete = true;
            };
            $scope.mailToDelete = function(a){
                a.toDelete = true;
            };
            //aggiungo i campi dei dettagli
            $scope.customer.LIVES_IN = [];
            $scope.customer.ANSWERS_TO = [];
            $scope.customer.RECEIVES = [];
            $scope.customer.id = customer.data[0].id;
            $rootScope.customer.mails = {added:[],toDelete:[],modified:[]};
            $rootScope.customer.phones = {added:[],toDelete:[],modified:[]};
            $rootScope.customer.address = {added:[],toDelete:[],modified:[]};
            $rootScope.customer.mails = {added:[],toDelete:[],modified:[]};
            $scope.action = 'update';
            $scope.updateAction = function(){
                console.log('updating')
                $http.put('/api/mail/post',{data:{a:1,b:2,c:32},mailId:123456}).success(function(data){
                    console.log('news from server');
                })
                                            };
            $scope.updatePhone = function(p){
                $rootScope.updatingPhone = p;
                createDialogService('templates/updateTelephone.html',{
                    title: 'Update Mail',
                    id:'updatePhoneDialog',
                    backdrop:true,
                    controller:'UpdatePhoneCtrl',
                    success: {label: 'updatePhone',enabled:false, fn: function() {
                        var phone = p;
                             phone.updated = true;
                                                          phone.mail = document.getElementById('newMail').form[0].value;
                             phone.use.use = document.getElementById('newUse').form[2].value;
                             phone.data.note = document.getElementById('newNote').form[1].value;
                             phone.data.number = document.getElementById('newMail').form[0].value;
                             var index = indexOfId($rootScope.customer.ANSWERS_TO,p.id); // cerco la posizione del telefono modificato nella lista                   
                             $rootScope.customer.ANSWERS_TO[index] = phone;
                                                               }
                             },
                    
                });
            };
            $scope.updateMail = function(m){
                $rootScope.updatingMail = m;
                createDialogService('templates/updateMail.html',{
                    title: 'Update Mail',
                    id:'updateMailDialog',
                    backdrop:true,
                    controller:'UpdateMailCtrl',
                    success: {label: 'updateMail',enabled:false, fn: function() {
                        var mail = m;
                             mail.updated = true;
                                                          mail.mail = document.getElementById('newMail').form[0].value;
                             mail.use.use = document.getElementById('newUse').form[2].value;
                             mail.data.note = document.getElementById('newNote').form[1].value;
                             mail.data.mail = document.getElementById('newMail').form[0].value;
                             var index = indexOfId($rootScope.customer.RECEIVES,m.id); // cerco la posizione dell'indirizzo modificato nella lista                   
                             $rootScope.customer.RECEIVES[index] = mail;
                                                               }
                             },
                    
                });
            };
            $scope.updateAddress = function(a){
                $rootScope.updatingAddress = a;
                                                createDialogService('templates/updateAddress.html',{
                    title: 'Update address',
                    id:'updateAddressDialog',
                    backdrop:true,
                    controller:'UpdateAddressCtrl',
                    success: {label: 'updateAddress',enabled:false, fn: function() {
                        var address = a;
                             address.updated = true;
                             address.data.street = document.getElementById('newStreet').form[0].value;
                             address.data.city = document.getElementById('newStreet').form[1].value;
                             address.data.cap = document.getElementById('newStreet').form[2].value;
                             address.data.number = document.getElementById('newStreet').form[3].value;
                             address.use.use = document.getElementById('newStreet').form[4].value;
                             var index = indexOfId($rootScope.customer.LIVES_IN,a.id); // cerco la posizione dell'indirizzo modificato nella lista                   
                             $rootScope.customer.LIVES_IN[index] = address;
                                                               }
                             },
                    
                });
                                              };
            $scope.addTelephone = function(){
                createDialogService('templates/addTelephone.html',{
                    title: 'Add a Telephone number',
                    id:'addTelephoneDialog',
                    backdrop:true,
                    controller:'AddTelephoneCtrl',
                    success: {label: 'addTelephone',enabled:false, fn: function() {
                        var telephone = {};
                             telephone.just_insert = true;
                             telephone.number = document.getElementById('newNumber').form[0].value;
                             telephone.note = document.getElementById('newNote').form[1].value;
                             telephone.use = document.getElementById('newUse').form[2].value;
                             $rootScope.customer.ANSWERS_TO.push({data:telephone,use:{use:telephone.use,id:-1}});                    
                                                               
                                                               }
                             },
                    
                });
            };
            $scope.addAddress = function(){
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
                             $rootScope.customer.LIVES_IN.push({data:address,use:{use:address.use,id:-1}});
                        console.log('Complex modal closed');
                        
                                                               
                                                               }
                             },
                    cancel: {label: 'Cancel', fn: function() {console.log('addAddress window closed');}}
                });
            };
            $scope.addMail = function(){
                createDialogService('templates/addMail.html',{
                    title: 'Add an E-mail',
                    id:'addMailDialog',
                    backdrop:true,
                    controller:'AddMailCtrl',
                    success: {label: 'addMail',enabled:false, fn: function() {
                        console.log('inside success');
                        var mail = {};
                             mail.just_insert = true;
                             mail.mail = document.getElementById('newMail').form[0].value;
                             mail.use = document.getElementById('newUse').form[1].value;
                             mail.note = document.getElementById('newNote').form[2].value;
                             $rootScope.customer.RECEIVES.push({data:mail,use:{use:mail.use,id:-1}});
                        
                                                               
                                                               }
                             },
                    cancel: {label: 'Cancel', fn: function() {console.log('addAddress window closed');}}
                });
            };
            
             /* i dati in arrivo dal server sono organizzabili in triplette [customer,relazione,item]
             customer è sempre lo stesso di data[0].data definisco una funzione che interpreta i valori di relazione
             e quiundi il significato di item e lo aggiunge allo array relativo di customer*/
            var add2customer = function(triplet) {
                //console.log(triplet[1].type);
                $scope.customer[triplet[1].type].push({data:triplet[2].data,use:triplet[1].data,id:triplet[2].id});
            };
            var details = customer.data.length/3; // ottengo il numero dettagli afferenti al cliente
            //aggiungo i dettagli a $scope.customer
            for (var i=0;i<details;i++) {
                add2customer([customer.data[i*3],customer.data[i*3+1],customer.data[i*3+2]]);
            }
            
        });
    }
    else {
            $scope.customer = {};
            $scope.action = 'save';
            $scope.updateAction = function(){console.log('saving')};
            $scope.customer.LIVES_IN = [];
            $scope.customer.ANSWERS_TO = [];
            $scope.customer.RECEIVES = [];
    }
}])