$(function () {
  // 页数
  // var page = 0;
  // // 每页展示10个
  // var size = 5;

  var categoryId = 1,
    page = 0,
    pagerow = 10,
    region = getUrlParam('region'),
    token = getUrlParam('token')
  // region = '140105001001',
  // token = 'd5022cb4-bb1e-4d24-8732-926c6388935c'

  var globKey = 'YjU5YTA3NzEtMDI2MS00YzhiLTljM2ItYzE2MTljZDQwNDNhNGExYjEzZTUtYmIx'

  var sign = MD5('categoryId=' + categoryId + '&page=' + page + '&pagerow=' + pagerow + '&region=' + region +
    '&token=' + token + '&key=' + globKey)

  // dropload
  $('.content').dropload({
    scrollArea: window,
    domUp: {
      domClass: 'dropload-up',
      domRefresh: '<div class="dropload-refresh">↓下拉刷新...</div>',
      domUpdate: '<div class="dropload-update">↑释放更新...</div>',
      domLoad: '<div class="dropload-load"><span class="loading"></span>加载中...</div>'
    },
    domDown: {
      domClass: 'dropload-down',
      domRefresh: '<div class="dropload-refresh">↑上拉加载更多...</div>',
      domLoad: '<div class="dropload-load"><span class="loading"></span>加载中...</div>',
      domNoData: '<div class="dropload-noData">已加载全部数据</div>'
    },

    loadDownFn: function (me) {
      page++;
      // 拼接HTML
      var result = '';
      $.ajax({
        type: 'post',
        url:'https://mass.51zhongzi.com/api/article/show',
        data: {
          categoryId: categoryId,
          page: page,
          pagerow: pagerow,
          region: region,
          token: token,
          sign: sign
        },
        dataType: 'json',
        success: function (res) {
          console.log(res);
          console.log(res.data.totalrows);
          var arrLen = res.data.rows.length;
          var data = res.data.rows
          // console.log(res.data.rows);
          if (arrLen > 0) {
            for (var i = 0; i < arrLen; i++) {
              result = `<li class="container" id="${data[i].id}">
                    <div class="con_bt">
                      <div class="con_bt_h3">
                        <em class="haha"></em>${data[i].title}
                      </div>
                    </div>
                    <div class="con_content">
                      <div class="con_content_left ">
                        <div class="con_content_left_h3 ellipsis2">${data[i].introduce}</div>
                        <div class="con_content_left_bottom">
                          <div class="biaoqian">${data[i].categoryName}</div>
                          <div class="date">${timestampToHuiTime(data[i].publishTime)}</div>
                        </div>
                      </div>
                      <div class="con_content_right">
                        <img src="https://img.51zhongzi.com/${data[i].defaultImg}" alt="加载中...">
                      </div>
                    </div>
                </li>`;
              $('#section').append(result);
              if (data[i].isTop == 1) {
                $('.haha').html('<span class="con_bt_tj">推荐</span>')
              }
            }
            $(".con_content_right img").each(function () {
              console.log($(this).attr('src'));
              if ($(this).attr('src').indexOf("https://img.51zhongzi.com/null") > -1) {
                $(this).parent().css('display', 'none')
              } else {
                $(this).parent().css('display', 'block')
              }
            })
            $(".biaoqian").each(function () {
              if ($(this).text() == '模式解析') {
                $(this).addClass('moshi')
              } else if ($(this).text() == '媒体报道') {
                $(this).addClass('meiti')
              } else if ($(this).text() == '经典案例') {
                $(this).addClass('jingdian')
              }
            });
          } else {
            // 锁定
            me.lock();
            // 无数据
            me.noData();
          }
          // 每次数据插入，必须重置
          me.resetload();
        },
        error: function (xhr, type) {
          // alert('Ajax error!');
          // console.log('出错了');
          // 即使加载出错，也得重置
          me.resetload();
        }
      });
    },
    threshold: 50
  });
  $("#section").on("click", ".container", function () {
    var id = $(this).attr('id')
    window.location.href = "product-app.html?id=" + id + "&token=" + token
  });
});