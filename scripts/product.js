$(function () {
  var id = getUrlParam('id'),
    token = getUrlParam('token'),
    userId = getUrlParam('userId')

  // var id = '89',
  // token = '9c60ac7b-00c9-4bea-bc3f-b27dcae54aca&userId=293'


  var globKey = 'YjU5YTA3NzEtMDI2MS00YzhiLTljM2ItYzE2MTljZDQwNDNhNGExYjEzZTUtYmIx'
  var sign = MD5('id=' + id + '&token=' + token + '&key=' + globKey)

  // 浏览
  $.ajax({
    url: 'https://mass.51zhongzi.com/api/article/read',
    type: 'POST',
    data: {
      articleId: id,
      userId: userId
    },
    dataType: 'json',
    success: function (res) {
      console.log('浏览' + res);
    }
  })
  //详情数据渲染
  $.ajax({
    url: 'https://mass.51zhongzi.com/api/article/info',
    type: 'get',
    data: {
      id: id,
      token: token,
      sign: sign
    },
    dataType: 'json',
    beforeSend: function (res) {
      $(".tishi").html("加载中...");
    },
    success: function (res) {
      var list = res.data;
      var html = ` <div class="product">
      <div class="product_h3">
        ${list.title}
      </div>
      <div class="product_time">来源：${list.source}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${timestampToTime(list.publishTime.time)}</div>
      <div class="zm_open">
        <div class="open_app" id="open_app">最新托管资讯 打开APP查看</div>
      </div>
      <div class="product_img">
        <div class="img_img">
          <img src="https://img.51zhongzi.com/${list.defaultImg}" alt="" id="imgs">
        </div>
      </div>
      <div id="reading">
        <div class="product_content">
            ${list.contentStr}
        </div>
        <div class="product_user">发布人：${list.publishPerson}</div>
      </div>
      <div class="readall_box">
            <div class="read_more_mask"></div>
            <a class="read_more_btn" target="_self"><i class="iconfont icon-jiantou"></i>查看全文</a>
      </div>
    </div>`
      $('#section').html(html)
      if (list.defaultImg == null) {
        $('.product_img').css('display', 'none')
      }
      $(".tishi").empty();

      var widHeight = $(window).height();
      var artHeight = $('#reading').height();
      if (artHeight > (widHeight * 0.5)) {
        $('#reading').height(widHeight * 0.5).css({
          'overflow': 'hidden'
        });
        var article_show = true;
        $('.read_more_btn').on('click', bindRead_more);
      } else {
        article_show = true;
        $('.readall_box').hide().addClass('readall_box_nobg');
      }

      function bindRead_more() {
        if (!article_show) {
          $('#reading').height(widHeight * 0.5).css({
            'overflow': 'hidden'
          });
          $('.readall_box').show().removeClass('readall_box_nobg');
          article_show = true;
        } else {
          $('#reading').height("").css({
            'overflow': 'hidden'
          });
          $('.readall_box').show().addClass('readall_box_nobg');
          $('.readall_box').hide().addClass('readall_box_nobg');
          article_show = false;
        }
      }


      var browser = {
        versions: function () {
          var u = window.navigator.userAgent;
          return { //移动终端浏览器版本信息   
            trident: u.indexOf('Trident') > -1, //IE内核
            presto: u.indexOf('Presto') > -1, //opera内核
            Alipay: u.indexOf('Alipay') > -1, //支付宝
            webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
            gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
            mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端  
            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
            android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
            iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, //是否为iPhone或者安卓QQ浏览器
            iPad: u.indexOf('iPad') > -1, //是否为iPad
            webApp: u.indexOf('Safari') == -1, //是否为web应用程序，没有头部与底部
            weixin: u.indexOf('MicroMessenger') > -1, //是否为微信浏览器
            qq: u.match(/\sQQ/i) !== null, //是否QQ
            Safari: u.indexOf('Safari') > -1, //Safari浏览器,
          };
        }(),
        language: (navigator.browserLanguage || navigator.language).toLowerCase()
      }

      var url_ios = "com.azhyun.mass:///" + 'https://mass.51zhongzi.com/mass/product-app.html?id=' + id + '&token=' + token;
      var url_ios_download = 'https://itunes.apple.com/cn/app/%E6%89%98%E7%AE%A1%E9%80%9A/id1435757243?mt=8'
      var url_android = "com.azhyun.mass://android/?data=" + 'https://mass.51zhongzi.com/mass/product-app.html?id=' + id + '&token=' + token;
      var url_android_download = 'https://a.app.qq.com/o/simple.jsp?pkgname=com.azhyun.mass#opened'


      var uaa = navigator.userAgent.toLowerCase(); //获取判断用的对象


      if (uaa.match(/MicroMessenger/i) == "micromessenger") {
        //在微信中打开
        $('#open_app').click(function () {
          $('#wx_tipsImg').show()
        })
        $('#wx_tipsImg').click(function () {
          $('#wx_tipsImg').hide()
        })
      }
      if (uaa.match(/QQ/i) == "qq") {
        // $('#open_app').click(function () {
        //   $('#wx_tipsImg').show()
        // })
        // $('#wx_tipsImg').click(function () {
        //   $('#wx_tipsImg').hide()
        // })
        $('#open_app').click(function () {
          window.location.href = url_ios;
        })
        $('#download_btn').click(function () {
          window.location.href = url_ios_download;
        })
      }
      if (browser.versions.ios) {
        $('#open_app').click(function () {
          window.location.href = url_ios;
        })
        $('#download_btn').click(function () {
          window.location.href = url_ios_download;
        })
      }
      if (browser.versions.android) {
        $('#open_app').click(function () {
          window.location.href = url_android;
        })
        $('#download_btn').click(function () {
          window.location.href = url_android_download;
        })
      }


     

      $.ajax({
        url: 'https://mass.51zhongzi.com/api/wx/ticket',
        type: 'POST',
        data: {
          appId: 'wx1a296a574fc54c0c',
          url: window.location.href.split('#')[0],
        },
        dataType: 'json',
        success: function (res) {
          var app_title = list.title; //分享的标题
          var app_getlink =location.href.split('#')[0];
          var app_desc = list.introduce; //分享的简介
          if ($('#imgs').attr('src').indexOf("https://img.51zhongzi.com/undefined") > -1) {
            var app_imgUrl ='https://mass.51zhongzi.com/mass/images/logo.png'; //分享图片地址
          }else {
            var app_imgUrl = 'https://img.51zhongzi.com/' + list.defaultImg; //分享图片地址
          } 
          console.log(app_imgUrl);
          var app_list = res.data;
          // 分享
          wx.config({
            "debug": false,
            "appId": 'wx1a296a574fc54c0c',
            "timestamp": app_list.timestamp,
            "nonceStr": app_list.noncestr,
            "signature": app_list.signature,
            "jsApiList": ['onMenuShareAppMessage','onMenuShareTimeline', 'onMenuShareQQ', 'onMenuShareQZone', 'onMenuShareWeibo']
          });
          wx.ready(function () {
            //获取“分享给朋友”按钮点击状态及自定义分享内容接口
            wx.onMenuShareAppMessage({
              title: app_title,
              desc: app_desc,
              link: app_getlink,
              imgUrl: app_imgUrl,
              success: function () {
                $(function () {
                  $.ajax({
                    url: 'https://mass.51zhongzi.com/api/article/share',
                    type: 'POST',
                    data: {
                      articleId: id,
                      types: '2',
                      userId: userId,
                    },
                    dataType: 'json',
                    success: function (res) {},
                    error: function (err) {}
                  })

                })
              }
            });
            //获取“分享给朋友圈”按钮点击状态及自定义分享内容接口
            wx.onMenuShareTimeline({
              title: app_title,
              link: app_getlink,
              imgUrl: app_imgUrl,
              success: function () {
                $(function () {
                  $.ajax({
                    url: 'https://mass.51zhongzi.com/api/article/share',
                    type: 'POST',
                    data: {
                      articleId: id,
                      types: '1',
                      userId: userId
                    },
                    dataType: 'json',
                    success: function (res) {},
                    error: function() {}
                  })
                })
              }
            });
            //获取“分享给QQ”按钮点击状态及自定义分享内容接口
            wx.onMenuShareQQ({
              title: app_title,
              desc: app_desc,
              link: app_getlink,
              imgUrl: app_imgUrl,
              success: function () {
                $(function () {
                  $.ajax({
                    url: 'https://mass.51zhongzi.com/api/article/share',
                    type: 'POST',
                    data: {
                      articleId: id,
                      types: '4',
                      userId: userId
                    },
                    dataType: 'json',
                    success: function (res) {
                      console.log(res);
                    }
                  })
                })
              }
            });
            //获取“分享到QQ空间”按钮点击状态及自定义分享内容接口
            wx.onMenuShareQZone({
              title: app_title,
              desc: app_desc,
              link: app_getlink,
              imgUrl: app_imgUrl,
              success: function () {

              }
            });
            //获取“分享到微博”按钮点击状态及自定义分享内容接口
            wx.onMenuShareWeibo({
              title: app_title,
              desc: app_desc,
              link: app_getlink,
              imgUrl: app_imgUrl,
              success: function () {
                $(function () {
                  $.ajax({
                    url: 'https://mass.51zhongzi.com/api/article/share',
                    type: 'POST',
                    data: {
                      articleId: id,
                      types: '3',
                      userId: userId
                    },
                    dataType: 'json',
                    success: function (res) {
                      console.log(res);
                    }
                  })
                })
              }
            });
            wx.error(function (res) {
              // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
              alert("No" + res);
            });
          })
        }
      });
    },
    complete: function (XMLHttpRequest, textStatus) {
      $(".tishi").empty();
    },
    error: function (err) {
      $(".tishi").empty();
    }
  })


})

// var loadTime = new Date();
// location.href = url_ios;
// setTimeout(function () {
//   var outTime = new Date()
//   if (outTime - loadTime > 800) {
//     location.href = url_ios_download;
//   }
// }, 1000)