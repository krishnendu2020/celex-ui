(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = global || self, factory(global.adminlte = {}));
}(this, (function (exports) { 'use strict';

  $('#reprint-four-challan-from').datepicker({ uiLibrary: 'bootstrap4' });
  $('#reprint-four-challan-to').datepicker({ uiLibrary: 'bootstrap4' });

  $('#delivery-four-despatch-from').datepicker({ uiLibrary: 'bootstrap4' });
  $('#delivery-four-despatch-to').datepicker({ uiLibrary: 'bootstrap4' });

  $('#delivery-four-edit-from').datepicker({ uiLibrary: 'bootstrap4' });
  $('#delivery-four-edit-to').datepicker({ uiLibrary: 'bootstrap4' });

  $('#delivery-four-excel-from').datepicker({ uiLibrary: 'bootstrap4' });
  $('#delivery-four-excel-to').datepicker({ uiLibrary: 'bootstrap4' });

  $('#reprint-four-edit-from').datepicker({ uiLibrary: 'bootstrap4' });
  $('#reprint-four-edit-to').datepicker({ uiLibrary: 'bootstrap4' });

  $('#reprint-four-excel-from').datepicker({ uiLibrary: 'bootstrap4' });
  $('#reprint-four-excel-to').datepicker({ uiLibrary: 'bootstrap4' });

  $('#report-six-stock-from').datepicker({ uiLibrary: 'bootstrap4' });
  $('#report-six-stock-to').datepicker({ uiLibrary: 'bootstrap4' });

  $('#report-six-loose-from').datepicker({ uiLibrary: 'bootstrap4' });
  $('#report-six-loose-to').datepicker({ uiLibrary: 'bootstrap4' });

  $('#report-six-order-from').datepicker({ uiLibrary: 'bootstrap4' });
  $('#report-six-order-to').datepicker({ uiLibrary: 'bootstrap4' });

  $('#report-six-dealer-from').datepicker({ uiLibrary: 'bootstrap4' });
  $('#report-six-dealer-to').datepicker({ uiLibrary: 'bootstrap4' });

  $('#report-six-dispatch-from').datepicker({ uiLibrary: 'bootstrap4' });
  $('#report-six-dispatch-to').datepicker({ uiLibrary: 'bootstrap4' });

  $('#stock-plate-date').datepicker({ uiLibrary: 'bootstrap4' });
  $('#stock-recon-date').datepicker({ uiLibrary: 'bootstrap4' });

  $('#dealer-report-main button#view').on('click', function() {
    $('#dealer-report-main').removeClass('show');
    $('#dealer-report-detail').addClass('show');
  });

  $('#dealer-report-detail button#submit').on('click', function() {
    $('#dealer-report-main').addClass('show');
    $('#dealer-report-detail').removeClass('show');
  });

  // Stock In
  $('#stock-action-main button').on('click', function() {
    $('#stock-action-main').removeClass('show');
    $('#stock-action-detail').addClass('show');
  });

  $('#stock-action-detail button').on('click', function() {
    $('#stock-action-main').addClass('show');
    $('#stock-action-detail').removeClass('show');
  });

  // Make Jobsheet
  $('#make-main button').on('click', function() {
    $('#make-main').removeClass('show');
    $('#make-submit').addClass('show');
    $('#make-detail').removeClass('show');
  });

  $('#make-submit button').on('click', function() {
    $('#make-main').removeClass('show');
    $('#make-submit').removeClass('show');
    $('#make-detail').addClass('show');
  });

  $('#make-detail button').on('click', function() {
    $('#make-main').addClass('show');
    $('#make-submit').removeClass('show');
    $('#make-detail').removeClass('show');
  });

  // Block JS
  $('#block-js-main button').on('click', function() {
    $('#block-js-main').removeClass('show');
    $('#block-js-order').addClass('show');
  });

  $('#block-js-order button').on('click', function() {
    $('#block-js-main').addClass('show');
    $('#block-js-order').removeClass('show');
  });

  // Unblock JS
  $('#unblock-js-main button').on('click', function() {
    $('#unblock-js-main').removeClass('show');
    $('#unblock-js-order').addClass('show');
  });

  $('#unblock-js-order button').on('click', function() {
    $('#unblock-js-main').addClass('show');
    $('#unblock-js-order').removeClass('show');
  });

  // Quality Checking
  $('#quality-main button').on('click', function() {
    $('#quality-main').removeClass('show');
    $('#quality-detail').addClass('show');
  });

  $('#quality-detail button').on('click', function() {
    $('#quality-main').addClass('show');
    $('#quality-detail').removeClass('show');
  });

  // Dispatch
  $('#dispatch-main button').on('click', function() {
    $('#dispatch-main').removeClass('show');
    $('#dispatch-detail').addClass('show');
  });

  $('#dispatch-detail button').on('click', function() {
    $('#dispatch-main').addClass('show');
    $('#dispatch-detail').removeClass('show');
  });

  // OEM Wise
  $('#oem-wise-main button').on('click', function() {
    $('#oem-wise-main').removeClass('show');
    $('#oem-wise-detail').addClass('show');
  });

  $('#oem-wise-detail button').on('click', function() {
    $('#oem-wise-main').addClass('show');
    $('#oem-wise-detail').removeClass('show');
  });


  // TLP Reprint
  $('#tlp-print-reprint-tab').on('click', function () {
    let str_cur_id = "reprint";

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

    // Display specified tab - reprint-four-tlp
    let str_tab = "reprint-four-tlp";
    $('#reprint-four-tab>.nav-item a.nav-link').each(function() {
      let str_href = $(this).attr("id");
      if (str_href === (str_tab+'-tab')) {
        // Set page content
        $(this).addClass('active');
      } else {
        $(this).removeClass('active');
      }
    });
  });

  // Reprint JS
  $('#jobsheet-seven-reprint-tab').on('click', function () {
    let str_cur_id = "reprint";

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

    // Display specified tab - reprint-four-js
    let str_tab = "reprint-four-js";
    $('#reprint-four-tab>.nav-item a.nav-link').each(function() {
      let str_href = $(this).attr("id");
      if (str_href === (str_tab+'-tab')) {
        // Set page content
        $(this).addClass('active');
      } else {
        $(this).removeClass('active');
      }
    });
  });

  // Chart in Dashboard
  var areaChartData = {
    labels  : ['', '', '', '', ''],
    datasets: [
      {
        label               : '',
        backgroundColor     : 'rgba(60,141,188,0.9)',
        borderColor         : 'rgba(60,141,188,0.8)',
        pointRadius          : false,
        pointColor          : '#3b8bba',
        pointStrokeColor    : 'rgba(60,141,188,1)',
        pointHighlightFill  : '#fff',
        pointHighlightStroke: 'rgba(60,141,188,1)',
        data                : [8, 10, 9, 6, 11],
        datatip             : ['LASER-G-285x45', 'LASER-W-285x45', '', '', '']
      },
    ],

  }

  var areaChartOptions = {
    maintainAspectRatio : false,
    responsive : true,
    legend: {
      display: false
    },
    scales: {
      showXAxisLabel: false,
      xAxes: [{
        gridLines : {
          display : false,
        },
      }],
      yAxes: [{
        gridLines : {
          display : false,
        }
      }]
    }
  }

  //-------------
  //- BAR CHART -
  //-------------
  var barChartCanvas = $('#barChart').get(0).getContext('2d')
  var barChartData = jQuery.extend(true, {}, areaChartData)

  barChartData.datasets[0] = areaChartData.datasets[0];

  var barChartOptions = {
    responsive              : true,
    maintainAspectRatio     : false,
    datasetFill             : false,
    legend: false,
    scales: {
      yAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'Days',
        },
        ticks: {
          suggestedMin: 0,
          suggestedMax: 11,
        }
      }],
      xAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'Plate Types',
        },
      }],
    }
  }

  var barChart = new Chart(barChartCanvas, {
    type: 'bar',
    data: barChartData,
    options: barChartOptions
  });

  Chart.plugins.register({
    afterDatasetsDraw: function(chart, easing) {
      // To only draw at the end of animation, check for easing === 1
      var ctx = chart.ctx;

      chart.data.datasets.forEach(function (dataset, i) {
        var meta = chart.getDatasetMeta(i);
        if (!meta.hidden) {
          meta.data.forEach(function(element, index) {
            // Just naively convert to string for now
            var dataString = dataset.datatip[index];

            // Draw the text in black, with the specified font
            ctx.fillStyle = 'rgba(20, 20, 20, 30)';

            var fontSize = 14;
            var fontStyle = '400';
            var fontFamily = 'Source Sans Pro';
            ctx.font = Chart.helpers.fontString(fontSize, fontStyle, fontFamily);

            ctx.save();
            ctx.rotate(-0.5 * Math.PI);

            // Make sure alignment settings are correct
            ctx.textAlign = 'right';
            ctx.textBaseline = 'middle';

            var padding = 2;
            var position = element.tooltipPosition();
            ctx.fillText(dataString, - position.y - (fontSize / 2) - padding, position.x);
            ctx.restore();
          });
        }
      });
    }
  });

})));