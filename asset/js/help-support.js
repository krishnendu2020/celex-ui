(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = global || self, factory(global.adminlte = {}));
}(this, (function (exports) { 'use strict';

$('.subtitlebar').each(function () {
  $(this).on('click', function () {
    // Control sidebar content
    $('.subtitlebar.active').each(function() {
      $(this).removeClass('active');
    });
    $(this).addClass('active');
  });
});

$('#to-main').on('click', function() {
  console.log('to-main');
  $('#ticket-main').addClass('show');
  $('#ticket-detail').removeClass('show');
});

$('#to-sub').on('click', function() {
  $('#ticket-main').removeClass('show');
  $('#ticket-detail').addClass('show');
});

})));