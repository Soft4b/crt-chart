var $ = require('jquery/src/core');
require('jquery/src/ajax');
require('jquery/src/ajax/xhr');

$.get({
  url: "https://crptb.s4b.ee/api/stats",
  success(res) {
    console.log(res);
    let r = res.map((el) => ({
      ...el,
      Time: new Date(el.Time),
      BalanceP: el.BalanceP * 100,
    }));
    r.sort((a, b) => a.Time - b.Time);
    console.log(r);

    setChartLine1($('#chart1')[0], r);
    setChartLine2($('#chart2')[0], r);
  }
});

function setChartLine1(id, data) {
  var chart = AmCharts.makeChart(id, {
    type: 'serial',
    theme: 'dark',
    hideCredits: true,
    zoomOutText: '',
    autoMarginOffset: 0,
    mouseWheelZoomEnabled: false,
    dataDateFormat: 'YYYY-MM-DD',
    valueAxes: [
      {
        id: 'v1',
        axisAlpha: 0,
        position: 'left',
        ignoreAxisWidth: true,
        labelFunction: function (value, valueString, axis) { return valueString + " $"; },
        inside: true,
        color: '#FFFFFF'
      }
    ],
    graphs: [
      {
        id: 'g1',
        bulletBorderAlpha: 1,
        bulletColor: '#FFFFFF',
        bulletSize: 2,
        hideBulletsCount: 50,
        lineThickness: 2,
        useLineColorForBulletBorder: true,
        valueField: 'Balance',
        precision: 2,
        balloonText: "<span style='font-size:12px;'>[[value]] $</span>",
        lineColor: '#6ac7e3'
      }
    ],
    chartCursor: {
      pan: true,
      valueLineEnabled: true,
      valueLineBalloonEnabled: true,
      cursorAlpha: 1,
      cursorColor: '#ffffff',
      limitToGraph: 'Time',
      valueLineAlpha: 0.2,
      valueZoomable: true
    },
    categoryField: 'Time',
    categoryAxis: {
      parseDates: true,
      dashLength: 1,
      maxSeries: 30,
      minPeriod: 'ss',
      minorGridEnabled: true
    },
    dataProvider: data
  });
}


function setChartLine2(id, data) {
  var chart = AmCharts.makeChart(id, {
    type: 'serial',
    theme: 'dark',
    hideCredits: true,
    zoomOutText: '',
    autoMarginOffset: 0,
    mouseWheelZoomEnabled: false,
    dataDateFormat: 'YYYY-MM-DD',
    valueAxes: [
      {
        id: 'v1',
        axisAlpha: 0,
        position: 'left',
        ignoreAxisWidth: true,
        labelFunction: function (value, valueString, axis) { return valueString + " %"; },
        inside: true,
        color: '#FFFFFF'
      }
    ],
    balloon: {
      borderThickness: 1,
      shadowAlpha: 0,
      color: '#000000'
    },
    graphs: [
      {
        id: 'g1',
        bulletBorderAlpha: 1,
        bulletColor: '#FFFFFF',
        bulletSize: 2,
        hideBulletsCount: 50,
        lineThickness: 2,
        useLineColorForBulletBorder: true,
        valueField: 'BalanceP',
        precision: 2,
        balloonText: "<span style='font-size:12px;'>[[value]]%</span>",
        lineColor: '#6ac7e3'
      }
    ],
    chartCursor: {
      pan: true,
      valueLineEnabled: true,
      valueLineBalloonEnabled: true,
      cursorAlpha: 1,
      cursorColor: '#ffffff',
      limitToGraph: 'Time',
      valueLineAlpha: 0.2,
      valueZoomable: true
    },
    categoryField: 'Time',
    categoryAxis: {
      parseDates: true,
      dashLength: 1,
      maxSeries: 30,
      minPeriod: 'ss',
      minorGridEnabled: true
    },
    dataProvider: data
  });
}
