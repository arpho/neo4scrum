'use strict';
angular.module('neo4ScrumApp').service('updateMailService',['createDialog','utility', function(createDialogService,utility,$scope) {
    var Mail = null,
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
    var mailUpdater = function(mail,customer){
            var index = indexOfId(customer.LIVES_IN,mail.id);
            customer.RECEIVES[index] = mail;
        };
    
    return {
        setItem: function(v){
            Mail = v;
        },
        getItem: function(){
            return Mail;
        },
        updaterDialog:function(customer){
            createDialogService('templates/updateMail.html',{
                        title: 'Update a mail',
                        id:'updateMailDialog',
                        backdrop:true,
                        controller:'UpdateMailCtrl',
                        success: {label: 'UpdateMail', fn: function() {
                                 var mail = {};
                                 mail.data = {};
                                 mail.use = {};
                                 mail.updated = true;
                                 mail.updated = true;
                                 mail.mail = document.getElementById('newMail').form[0].value;
                                 mail.use.use = document.getElementById('newUse').form[2].value;
                                 mail.data.note = document.getElementById('newNote').form[1].value;
                                 mail.data.mail = document.getElementById('newMail').form[0].value;
                                 mail.id = Mail.id;
                                // scope.customer.LIVES_IN.push({data:mail,use:{use:mail.use,id:-1}});
                            //cerco la posizione dell'oggetto nella lista
                            //sostituisco l'indirizzo aggiornato
                         //   mailUpdater(mail,customer);
                            utility.updater('RECEIVES',customer,mail);
                        }
                                 },
                        cancel: {label: 'Cancel', fn: function() {}}
                 });
        }
    };
}]);
