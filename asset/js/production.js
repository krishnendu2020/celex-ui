(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = global || self, factory(global.adminlte = {}));
}(this, (function (exports) { 'use strict';

$('#stock-update-blank-from').datepicker({ uiLibrary: 'bootstrap4' });
$('#stock-update-blank-to').datepicker({ uiLibrary: 'bootstrap4' });

$('#stock-update-holo-from').datepicker({ uiLibrary: 'bootstrap4' });
$('#stock-update-holo-to').datepicker({ uiLibrary: 'bootstrap4' });

$('#stock-update-lid-from').datepicker({ uiLibrary: 'bootstrap4' });
$('#stock-update-lid-to').datepicker({ uiLibrary: 'bootstrap4' });

})));