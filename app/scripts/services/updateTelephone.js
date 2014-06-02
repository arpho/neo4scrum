'use strict';
angular.module('neo4ScrumApp').service('updateTelephoneService',['createDialog','utility', function(createDialogService,utility,$scope) {
    var Telephone = null,
        indexOfId = function(l,id){
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
    var telephoneUpdater = function(telephone,customer){
            var index = indexOfId(customer.LIVES_IN,telephone.id);
            customer.ANSWERS_TO[index] = telephone;
        };
    
    return {
        setItem: function(v){
            Telephone = v;
        },
        getItem: function(){
            return Telephone;
        },
        updaterDialog:function(customer){
            createDialogService('templates/updateTelephone.html',{
                        title: 'Updating telephone',
                        id:'updateTelephoneDialog',
                        backdrop:true,
                        controller:'UpdateTelephoneCtrl',
                        success: {label: 'UpdateTelephone', fn: function() {
                                 var telephone = {};
                                 telephone.data = {};
                                 telephone.use = {};
                                 telephone.updated = true;
                                 telephone.data.number = document.getElementById('newNumber').form[0].value;
                                 telephone.data.note = document.getElementById('newNote').form[1].value;
                                 telephone.use.use = document.getElementById('newUse').form[2].value;
                                 telephone.id = Telephone.id;
                                // scope.customer.LIVES_IN.push({data:telephone,use:{use:telephone.use,id:-1}});
                            //cerco la posizione dell'oggetto nella lista
                            //sostituisco l'indirizzo aggiornato
                         //   telephoneUpdater(telephone,customer);
                            utility.updater('ANSWERS_TO',customer,telephone);
                        }
                                 },
                        cancel: {label: 'Cancel', fn: function() {}}
                 });
        }
    };
}]);
