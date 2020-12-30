(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = global || self, factory(global.adminlte = {}));
}(this, (function (exports) { 'use strict';

$('#oem-manu-data-1').daterangepicker({ uiLibrary: 'bootstrap4' });
$('#oem-manu-data-2').daterangepicker({ uiLibrary: 'bootstrap4' });

$('#select-aluminium-dim').select2();
$('#select-aluminium-dim-1').select2();
$('#select-aluminium-dim-2').select2();
$('#select-aluminium-dim-3').select2();
$('#select-aluminium-dim-4').select2();
$('#select-aluminium-dim-5').select2();

})));