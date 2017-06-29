(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
function Timer(alarm){
  this.alarm = alarm;
}
Timer.prototype.alarmTime = function () {
  // var currentTime = moment().format('hh:mm:ss:a');
};
exports.timeModule = Timer;

},{}],2:[function(require,module,exports){
function Timer(alarm){
  this.alarm = alarm;
}
Timer.prototype.alarmTime = function () {
  // var currentTime = moment().format('hh:mm:ss:a');
};
exports.timeModule = Timer;

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

},{"./../js/back-end.js":1}]},{},[2]);
