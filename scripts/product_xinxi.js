$(function () {

  var id = getUrlParam('id'),
    token = getUrlParam('token')
  // console.log(token);
  // console.log(id);

  var globKey = 'YjU5YTA3NzEtMDI2MS00YzhiLTljM2ItYzE2MTljZDQwNDNhNGExYjEzZTUtYmIx'

  var sign = MD5('id=' + id + '&token=' + token + '&key=' + globKey)

  $.ajax({
    url: 'https://mass.51zhongzi.com/api/article2/info',
    type: 'get',
    data: {
      id: id,
      token: token,
      sign: sign
    },
    dataType: 'json',
    beforeSend: function (res) {
      //alert('远程调用开始...');
      $(".tishi").html("加载中...");
    },
    success: function (res) {
      // console.log(res, 'res');
      var list = res.data;
      var html = `<div class="product_h3">${list.title}</div>
                  <div class="product_time">发布时间&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${timestampToTime(list.publishTime.time)}</div>
                  <div class="product_content">${list.contentStr}</div>
                  <div class="product_user">发布人：${list.publishPerson}</div>`
      $('#product').html(html)
      $(".tishi").empty();
    },
    complete: function (XMLHttpRequest, textStatus) {
      // alert('远程调用成功，状态文本值：'+textStatus);
      $(".tishi").empty();
    },
    error: function (err) {
      // console.log(err, 'err');
      $(".tishi").empty();
    }
  })
})