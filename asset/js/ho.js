(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = global || self, factory(global.adminlte = {}));
}(this, (function (exports) { 'use strict';

$('#stock-in-from').datepicker({ uiLibrary: 'bootstrap4' });
$('#stock-in-to').datepicker({ uiLibrary: 'bootstrap4' });

$('#invoice-dealer-from').datepicker({ uiLibrary: 'bootstrap4' });
$('#invoice-dealer-to').datepicker({ uiLibrary: 'bootstrap4' });
$('#invoice-tvs-from').datepicker({ uiLibrary: 'bootstrap4' });
$('#invoice-tvs-to').datepicker({ uiLibrary: 'bootstrap4' });
$('#invoice-honda-from').datepicker({ uiLibrary: 'bootstrap4' });
$('#invoice-honda-to').datepicker({ uiLibrary: 'bootstrap4' });
$('#invoice-bmw-from').datepicker({ uiLibrary: 'bootstrap4' });
$('#invoice-bmw-to').datepicker({ uiLibrary: 'bootstrap4' });
$('#invoice-other-from').datepicker({ uiLibrary: 'bootstrap4' });
$('#invoice-other-to').datepicker({ uiLibrary: 'bootstrap4' });

$('#out-main #stock-action').on('click', function() {
  $('#out-main').removeClass('show');
  $('#out-subcontent').addClass('show');
});

$('#out-subcontent #stock-add').on('click', function() {
  $('#out-main').addClass('show');
  $('#out-subcontent').removeClass('show');
});

$('#report-pay-from').datepicker({ uiLibrary: 'bootstrap4' });
$('#report-pay-to').datepicker({ uiLibrary: 'bootstrap4' });
$('#report-emboss-from').datepicker({ uiLibrary: 'bootstrap4' });
$('#report-emboss-to').datepicker({ uiLibrary: 'bootstrap4' });
$('#report-dealer-from').datepicker({ uiLibrary: 'bootstrap4' });
$('#report-dealer-to').datepicker({ uiLibrary: 'bootstrap4' });
$('#report-job-from').datepicker({ uiLibrary: 'bootstrap4' });
$('#report-job-to').datepicker({ uiLibrary: 'bootstrap4' });
$('#report-dispatch-from').datepicker({ uiLibrary: 'bootstrap4' });
$('#report-dispatch-to').datepicker({ uiLibrary: 'bootstrap4' });
$('#report-stock-from').datepicker({ uiLibrary: 'bootstrap4' });
$('#report-stock-to').datepicker({ uiLibrary: 'bootstrap4' });

})));