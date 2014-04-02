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
    $rootScope.customer = {};
    $scope.scrollList = function(operations,listName,id){
                /*esamina una lista di dettagli e costruisce la lista delle operazioni relativa
                @param string: nome della lista <LIVES_IN,ANSWERS_TO,RECEIVES>
                param string: genere del dettaglio<mail,address,telephone,project>*/
                //var operations = [];
                for (var i=0;i<$scope.customer[listName].length;i++){
                    if ($scope.customer[listName][i].data.toDelete){
                            if ($scope.customer[listName][i].id!=-1){ /* se è appena stato aggiunto, ma non ancora committato 
                            non ha id e produrebbe un errore nel server cercare di cancellare qualcosa ,che non è sul db*/
                                 operations.push({detail_type:id,operation:'delete',id:$scope.customer[listName][i].id});
                            }
                            continue; //non serve controllare se è appena stato inserito o modificato
                                        }
                             if ($scope.customer[listName][i].data.just_insert){
                                //faccio pulizia
                                //delete $scope.customer[listName][i].data.just_insert;
                                //delete $scope.customer[listName][i].data.updated;
                                operations.push({detail_type:id,operation:'add',data:$scope.customer[listName][i].data,use:$scope.customer[listName][i].use});
                                continue; // non  importa se è stato pure modificato

                            }
                            if($scope.customer[listName][i].data.updated){
                                //non pulisco il dettaglio adesso, ma appena prima di inviarlo al server
                                //delete $scope.customer[listName][i].data.updated;
                                //delete $scope.customer[listName][i].data.updateAddress;
                                // non serve controllare se ha id per chè se fosse  appena inserito scatterebbe il precedente if e non arriveremmo qui
                                    operations.push({detail_type:id,operation:'update',data:$scope.customer[listName][i].data,id:$scope.customer[listName][i].id,use:$scope.customer[listName][i].use});
                            }
                    }                 
                return operations;
    };
    $scope.generateOperations = function() {
                /* wrapper di scrollList, scorre le liste dei dettagli alla ricerca di elementi nuovi, modificati o da cancellare, appoggiandosi a scrollList*/
               var operations = $scope.scrollList([],'LIVES_IN','address'); // get operations for address
               operations = $scope.scrollList(operations,'RECEIVES','mail'); //get operations for telephone
               operations = $scope.scrollList(operations,'ANSWERS_TO','telephone');
               return operations;
            };
    if (typeof customerId != 'undefined') {
        $scope.pageTitle = "Customer's view";
        $http.get('/api/customer/:'+customerId).success(function(customer) {
            $scope.customer = customer.data[0].data;
		    //aggiungo i campi dei dettagli
		    $scope.customer.LIVES_IN = [];
		    $scope.customer.ANSWERS_TO = [];
		    $scope.customer.RECEIVES = [];
            $scope.customer.data = customer.data;
            /* i dati in arrivo dal server sono organizzabili in triplette [customer,relazione,item]
             customer è sempre lo stesso di data[0].data definisco una funzione che interpreta i valori di relazione
             e quiundi il significato di item e lo aggiunge allo array relativo di customer*/
            var add2customer = function(triplet) {
                //console.log(triplet[1].type);
                $scope.customer[triplet[1].type].push({data:triplet[2].data,use:triplet[1].data,id:triplet[2].id});
            };
            var details = $scope.customer.data.length/3; // ottengo il numero dettagli afferenti al cliente
            //aggiungo i dettagli a $scope.customer
            for (var i=0;i<details;i++) {
                add2customer([$scope.customer.data[i*3],$scope.customer.data[i*3+1],$scope.customer.data[i*3+2]]);
            }
            $scope.addressToDelete = function(a){
                a.toDelete = true;
            };
            $scope.telephoneToDelete = function(a){
                a.toDelete = true;
            };
            $scope.mailToDelete = function(a){
                a.toDelete = true;
            };
            
            
            $scope.customer.id = customer.data[0].id;
            });// eof get.success
        
            /*
            $rootScope.customer.mails = {added:[],toDelete:[],modified:[]};
            $rootScope.customer.phones = {added:[],toDelete:[],modified:[]};
            $rootScope.customer.address = {added:[],toDelete:[],modified:[]};
            $rootScope.customer.mails = {added:[],toDelete:[],modified:[]};*/
            $scope.action = 'update';
            $scope.updateAction = function(){
            	var operations = $scope.generateOperations();
            	console.debug(operations);
                /*$http.put('/api/mail/post',{data:{a:1,b:2,c:32},mailId:123456}).success(function(data){
                   // console.log('news from server');
                });*/
            };
            $scope.updatePhone = function(p){
                $rootScope.updatingPhone = p;
                createDialogService('templates/updateTelephone.html',{
                    title: 'Update Mail',
                    id:'updateTelephoneDialog',
                    backdrop:true,
                    controller:'UpdatePhoneCtrl',
                    success: {label: 'updatePhone',enabled:false, fn: function() {
                        var phone = p;
                             phone.updated = true;
                                                          phone.data.number = document.getElementById('newNumber').form[0].value;
                             phone.use.use = document.getElementById('newUse').form[2].value;
                             phone.data.note = document.getElementById('newNote').form[1].value;
                             //phone.data.number = document.getElementById('newTelephone').form[0].value;
                             var index = indexOfId($rootScope.customer.ANSWERS_TO,p.id); // cerco la posizione del telefono modificato nella lista                   
                             $scope.customer.ANSWERS_TO[index] = phone;
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
                             $scope.customer.RECEIVES[index] = mail;
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
                             $scope.customer.LIVES_IN[index] = address;
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
                             $scope.customer.ANSWERS_TO.push({data:telephone,use:{use:telephone.use,id:-1}});                    
                                                               
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
                             $scope.customer.LIVES_IN.push({data:address,use:{use:address.use,id:-1}});
                        //console.log('Complex modal closed');
                        
                                                               
                                                               }
                             },
                    cancel: {label: 'Cancel', fn: function() {}}
                });
            };
            $scope.addMail = function(){
                createDialogService('templates/addMail.html',{
                    title: 'Add an E-mail',
                    id:'addMailDialog',
                    backdrop:true,
                    controller:'AddMailCtrl',
                    success: {label: 'addMail',enabled:false, fn: function() {
                        var mail = {};
                             mail.just_insert = true;
                             mail.mail = document.getElementById('newMail').form[0].value;
                             mail.use = document.getElementById('newUse').form[1].value;
                             mail.note = document.getElementById('newNote').form[2].value;
                             $scope.customer.RECEIVES.push({data:mail,use:{use:mail.use,id:-1}});
                        
                                                               
                                                               }
                             },
                    cancel: {label: 'Cancel', fn: function() {//console.log('addAddress window closed');
                    }}
                });
            };
            
             
            
        
    }
    else {
            $scope.customer = {};
            $scope.action = 'save';
            $scope.updateAction = function(){
               // console.log('saving');
                                            };
            $scope.customer.LIVES_IN = [];
            $scope.customer.ANSWERS_TO = [];
            $scope.customer.RECEIVES = [];
    }
}]);