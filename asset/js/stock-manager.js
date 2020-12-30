(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = global || self, factory(global.adminlte = {}));
}(this, (function (exports) { 'use strict';

$('#dashboard .content .card .card-header a').each(function () {
  $(this).on('click', function () {
    let str_cur_id = $(this).attr("href").slice(1);

    // Control sidebar content
    $('.sidebar .nav .nav-item a.nav-link').each(function() {
      let nav_item_href = $(this).attr("href").slice(1);
      if (nav_item_href === str_cur_id) {
        $(this).addClass('active');
      } else {
        $(this).removeClass('active');
      }
    });

    // Display nav pan related to sidebar content
    $('.nav-pans >.tab-pane').each(function() {
      let str_href = $(this).attr("id");
      if (str_href === str_cur_id) {
        // Set page content
        $(this).addClass('active');
      } else {
        $(this).removeClass('active');
      }
    });
  });
});

})));