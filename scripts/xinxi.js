$(function () {

  var parentId = 2,
    page = 1,
    pagerow = 150,
    // region = "140105001001",
    // token = "9cb8b581-6294-43d5-92d1-fc40e59d2a4f",
    // index = 0,
     region = getUrlParam('region'),
     token = getUrlParam('token'),
     index = getUrlParam('index'),
    globKey = 'YjU5YTA3NzEtMDI2MS00YzhiLTljM2ItYzE2MTljZDQwNDNhNGExYjEzZTUtYmIx',
    sign = MD5('parentId=' + parentId + '&token=' + token + '&key=' + globKey)


  $(document).on('tap', '.tab_item', function () {
    var categoryId = $(this).attr('id')
    $(this).addClass('curr').siblings().removeClass('curr');
    $('#content_item').html('')
    ajax(categoryId)
  })

  $("#content_item").on("click", ".huiyi", function () {
    var id = $(this).attr('id')
    window.location.href = "product_xinxi.html?id=" + id + "&token=" + token
  });

  //分类接口
  $.ajax({
    url: 'https://mass.51zhongzi.com/api/article2/categorys',
    type: 'get',
    data: {
      parentId: parentId,
      token: token,
      sign: sign
    },
    dataType: 'json',
    success: function (res) {
      $('#tab').html('')
      for (var i = 0; i < res.data.rows.length; i++) {
        var html = `<div class="tab_item" id="${res.data.rows[i].id}">${res.data.rows[i].name}</div>`
        $('#tab').append(html)
      }
      $('.tab_item').eq(0).addClass('curr')
      var first = $('.tab_item').eq(0).attr('id')
      $('#content_item').html('')
      ajax(first)

      if (index == '0') {
        $('.tab_item').eq(index).addClass('curr').siblings().removeClass('curr')
        var categoryId = $('.tab_item').eq(index).attr('id')
        $('#content_item').html('')
        ajax(categoryId)
      } else if (index == '1') {
        $('.tab_item').eq(index).addClass('curr').siblings().removeClass('curr')
        var categoryId = $('.tab_item').eq(index).attr('id')
        $('#content_item').html('')
        ajax(categoryId)
      } else if (index == '2') {
        $('.tab_item').eq(index).addClass('curr').siblings().removeClass('curr')
        var categoryId = $('.tab_item').eq(index).attr('id')
        $('#content_item').html('')
        ajax(categoryId)
      }

    },
    error: function (err) {
      // console.log(err, 'err');
    }
  })

  //列表接口
  function ajax(categoryId) {
    let sign = MD5('categoryId=' + categoryId + '&page=' + page + '&pagerow=' + pagerow + '&region=' + region + '&token=' + token + '&key=' + globKey)
    $.ajax({
      url: 'https://mass.51zhongzi.com/api/article2/show',
      type: 'get',
      data: {
        categoryId: categoryId,
        page: page,
        pagerow: pagerow,
        region: region,
        token: token,
        sign: sign
      },
      dataType: 'json',
      beforeSend: function (res) {
        //alert('远程调用开始...');
        $(".tishi").html("加载中...");
      },
      success: function (res) {
        console.log(res, '列表')
        $('#content_item').html('')
        if(res.data.rows == '') {
          $('#content_item').html('暂无数据')
          $('#content_item').css({
            'display':'flex',
            'justify-content':'center',
            'font-size':'.4rem',
            'flex-direction': 'column'
          })
        }else {
          for (var i = 0; i < res.data.rows.length; i++) {
            var list = res.data.rows[i]
            console.log(list);
            var isHuiyi = `<div class="huiyi" id="${list.id}">
                              <div class="huiyi_h3">${list.title}</div>
                              <div class="huiyi_time">会议时间：${timestampToHuiTime(list.mettingTime)}</div>
                              <div class="huiyi_address">会议地点：${list.mettingAddress}</div>
                          </div>`
            var noHuiyi = `<div class="huiyi" id="${list.id}">
                              <div class="renwu_top">
                                <div class="renwu_top_h3 ellipsis1">${list.title}</div>
                                <div class="renwu_top_time">${timestampToHuiTime(list.publishTime)}</div>
                              </div>
                              <div class="renwu_content">
                                <p class="renwu_content_p ellipsis2">${list.introduce}</p>
                              </div>
                          </div>`
  
            if (list.mettingTime == null && list.mettingAddress == null) {
              $('#content_item').append(noHuiyi)
            } else {
              $('#content_item').append(isHuiyi)
            }
          }
        }
      
        
        $(".tishi").empty();
      },
      complete: function (XMLHttpRequest, textStatus) {
        // alert('远程调用成功，状态文本值：'+textStatus);
        $(".tishi").empty();
      },
      error: function (err) {
        // console.log(err);
        $(".tishi").empty();
      }
    })
  }
})