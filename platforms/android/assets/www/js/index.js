/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

 // hakee tiedot ja tulostaa
        $('#hae').click(function() {
          var db = indexedDB.open('sarjat', 1);
          db.onsuccess= (event) => {

             var res = event.target.result;
             var transaction = res.transaction(['sarjat'], "readwrite");
             var objStore = transaction.objectStore('sarjat');

             objStore.getAll().onsuccess = (event) => {
                 var rows = event.target.result.length;
                 var htmlData = "<div id='data'>";
                 for (var i = 0; i < rows; i++) {
                     htmlData += "<li>" + "Liike: " + event.target.result[i].Liike + " Paino: " + event.target.result[i].Paino + "kg" + " Sarjatoistot: " + event.target.result[i].Sarjatoistot + "</li>";
                 }
                 htmlData += "</div>";
                 $('#data').html(htmlData);
             }
           }
            console.log("naa");
        });

 // Tallentaa tiedot ja tulostaa
         $('#save').click(function() {

             var sarja = {Liike : $('#liike').val(), Paino : $('#paino').val(), Sarjatoistot : $('#sarjatoistot').val()};
             var db = indexedDB.open('sarjat', 1);

             db.onupgradeneeded = (event) => {
                 var res = event.target.result;
                 var objStore = res.createObjectStore('sarjat', {autoIncrement: true});
             }

             db.onsuccess = (event) => {

                 var res = event.target.result;
                 var transaction = res.transaction(['sarjat'], "readwrite");
                 var objStore = transaction.objectStore('sarjat');
                 objStore.add(sarja);

                 objStore.getAll().onsuccess = (event) => {
                     var rows = event.target.result.length;
                     var htmlData = "<div id='data'>";
                     for (var i = 0; i < rows; i++) {
                         htmlData += "<li>" + "Liike: " + event.target.result[i].Liike + " Paino: " + event.target.result[i].Paino + "kg" + " Sarjatoistot: " + event.target.result[i].Sarjatoistot + "</li>";
                     }
                     htmlData += "</div>";
                     $('#data').html(htmlData);
                 }
             }
         });

         // Tyhjentää tiedot ja tulostaa

            $('#clear').click(function() {
                 var db = indexedDB.open('sarjat', 1);
                db.onsuccess= (event) => {

			     var res = event.target.result;
                    var transaction = res.transaction(['sarjat'], "readwrite");
                    var objStore = transaction.objectStore('sarjat');
                    objStore.clear();
                    res.close();
                }
                 $('#data').html('');
            });


    $('document').ready(function () {

    });

var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};
