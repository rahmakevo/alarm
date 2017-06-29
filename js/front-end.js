var Timer = require('./../js/back-end.js').timeModule;

$(document).ready(function() {

  setInterval(function clock() {
    $('#time').text(moment().format('hh:mm:ss a'));
    return clock;
  }(), 1000);

  $('#alarm_set_form').submit(function() {
    event.preventDefault();

    var alarmSet = $('#alarm_set').val();
    console.log(alarmSet);
    var alarmDisplay = new Timer(alarmSet);
    alarmDisplay.alarmTime();
    $('#alarm_output').text('You set the alarm for ' + alarmSet + '. Time displays in Military Time.');
  });
});
