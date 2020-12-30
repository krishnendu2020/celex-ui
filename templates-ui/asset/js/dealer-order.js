(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = global || self, factory(global.adminlte = {}));
}(this, (function (exports) { 'use strict';

$('#reservationdate').datepicker({
  uiLibrary: 'bootstrap4'
});

$('#trans-from').datepicker({
  uiLibrary: 'bootstrap4'
});

$('#trans-to').datepicker({
  uiLibrary: 'bootstrap4'
});

$('#hsrp-lid-from').datepicker({
  uiLibrary: 'bootstrap4'
});

$('#hsrp-lid-to').datepicker({
  uiLibrary: 'bootstrap4'
});

$('#hsrp-status-from').datepicker({
  uiLibrary: 'bootstrap4'
});

$('#hsrp-status-to').datepicker({
  uiLibrary: 'bootstrap4'
});

$('#print-invoice-from').datepicker({
  uiLibrary: 'bootstrap4'
});

$('#print-invoice-to').datepicker({
  uiLibrary: 'bootstrap4'
});

$('#shipment-from').datepicker({
  uiLibrary: 'bootstrap4'
});

$('#shipment-to').datepicker({
  uiLibrary: 'bootstrap4'
});

$('#apd-from').datepicker({
  uiLibrary: 'bootstrap4'
});

$('#apd-to').datepicker({
  uiLibrary: 'bootstrap4'
});

$('#wallet-main button').on('click', function() {
  $('#wallet-main').removeClass("show");
  $('#wallet-submit').addClass("show");
});

$('#wallet-submit button').on('click', function() {
  $('#wallet-main').addClass("show");
  $('#wallet-submit').removeClass("show");
});

$('#dealer-check-all').on('click', function() {
  $("#dealer-check-1").prop('checked', $('#dealer-check-all').is(":checked"));
});

$('#dealer-check-1').on('click', function() {
  if (!($('#dealer-check-1').is(":checked"))) {
    $("#dealer-check-all").prop('checked', false);
  }
});

$('#order-check-all').on('click', function() {
  $("#order-check-1").prop('checked', $('#order-check-all').is(":checked"));
});

$('#order-check-1').on('click', function() {
  if (!($('#order-check-1').is(":checked"))) {
    $("#order-check-all").prop('checked', false);
  }
});

})));