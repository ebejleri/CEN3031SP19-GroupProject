$(document).ready(() => {
  $.get('/account/siteinfo', (data) => {
    Object.entries(data).map(e => {
      var data_type = e[0];
      var container = e[1];
      Object.entries(container).map(e2 => {
        var data_item = e2[0];
        var data_value = e2[1];
        var str = "";
        for (var i = 0; i < data_value.length; i++) {
          if (data_value[i].length > 0) {
            str = str + "<li><h4>" + data_value[i] + "</li></h4>";
          }
        }
        console.log(`#${data_type}-${data_item}-info` + " IS NOW " + str);
        $(`#${data_type}-${data_item}-info`).html(str);
      })
    })
  });
});