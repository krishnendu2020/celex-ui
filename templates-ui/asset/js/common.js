(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = global || self, factory(global.adminlte = {}));
}(this, (function (exports) { 'use strict';

$('.sidebar .nav .nav-item a.nav-link').each(function () {
  $(this).on('click', function () {
    // Control sidebar content
    $('.sidebar .nav .nav-item a.nav-link').each(function() {
      $(this).removeClass('active');
    });
    $(this).addClass('active');

    // Display nav pan related to sidebar content
    let str_cur_id = $(this).attr("href");
    $('.nav-pans >.tab-pane').each(function() {
      let str_href = $(this).attr("id");
      if (str_href === str_cur_id.slice(1)) {
        // Set page content
        $(this).addClass('active');
      } else {
        $(this).removeClass('active');
      }
    });
  });
});

$("table thead th input[type='checkbox']").on('click', function() {
  let tbody = $(this).parent().parent().parent().parent().parent().find("tbody tr");
  let th_checked = this.checked;
  $.map(tbody, function(elem) {
    let inbox = $(elem).find("input[type='checkbox']");
    inbox[0].checked = th_checked;
    if (th_checked === true) {
      $(elem).addClass('bg-red');
    } else {
      $(elem).removeClass('bg-red');
    }
  });
});

// Check box
$("table tbody tr th input[type='checkbox']").on('change', function() {
  let head_tag = $(this).parent().parent().parent().parent();
  let tr_tag = $(this).parent().parent().parent();
  if (head_tag.prop('tagName') == "TBODY") {
    if (this.checked === true) {
      tr_tag.addClass('bg-red');
    } else {
      tr_tag.removeClass('bg-red');
    }
  }
});

})));