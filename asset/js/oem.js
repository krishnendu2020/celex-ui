(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = global || self, factory(global.adminlte = {}));
}(this, (function (exports) { 'use strict';

$('#report-from').datepicker({
  uiLibrary: 'bootstrap4'
});

$('#report-to').datepicker({
  uiLibrary: 'bootstrap4'
});

})));