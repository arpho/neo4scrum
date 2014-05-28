'use strict';

angular.module('neo4ScrumApp').factory('utility', function() {
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
    return {updater:function(familyParameter,customer,parameter){
        /*cerca il parametro con id = parameter.id e lo sostituisce con il parametro passato
        @param:string tipo del nome della lista di parametri<'LIVES_IS','ANSWERS_TO','RECEIVES'>
        @param: oggetto customer ottenuto dal controller
        @param:{} parametro ritornato dalla form di inserimento*/
        var index = indexOfId(customer[familyParameter],parameter.id);
        customer[familyParameter][index] = parameter;
    }};
 });