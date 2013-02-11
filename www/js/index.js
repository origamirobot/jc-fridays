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
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
        this.loadCalendar();
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
    // function, we must explicity call 'app.receivedEvent(...);'
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
    },
    
    calendar: null,
    selectedId: null,
    loadCalendar: function () {


        $.ajax({
            url: 'https://www.google.com/calendar/feeds/8otjiavcmms4i4i1bddmf78h58%40group.calendar.google.com/public/full',
            dataType: 'xml',
            success: function(xml){
               app.calendar = xml;
               
               $(xml).find('entry').each( function() {
                    var id = $(this).find('id').text();
                    var title = $(this).find('title').text();
                    var descr = $(this).find('content').text();
                    var html = '<li data-wrapperels="div" data-icon="arrow-r" data-iconpos="right">';
                    html += '<a href="#detail" data-calid="' +  id + '" class="ui-link-inherit" data-transition="slide">';
                    html += '<h3 class="ui-li-heading">' + title + '</h3>';
                    html += '<p class="ui-li-desc">' + descr + '</p>';
                    html += '</a></li>';
                    $(html).appendTo($('#event-list'));
               });
               $('#event-list').listview('refresh');
               $('#event-list a').click(function(){
                    app.selectedId = $(this).data('calid');
                    $(app.calendar).find('entry').each( function() {
                        if($(this).find('id').text() == app.selectedId){
                            var title = $(this).find('title').text();
                            var descr = $(this).find('content').text();
                            var where = $(this).find('where').attr('valueString');
                            var when = $(this).find('when').attr('startTime');
                            when = new Date(when).toLocaleString();

                            $('#detail-title').text(title);
                            $('#detail-descr').text(descr);
                            $('#detail-when span').text(when);
                            $('#detail-where span').text(where);
                            $('#get-directions').attr('href', 'maps:q=' + where);
                        }
                    });
              });
            }
        });
    }
    
    
    
    
    
    
};



$(document).ready(function () {

});