$(function () {

  var id = getUrlParam('id'),
    token = getUrlParam('token')

  var globKey = 'YjU5YTA3NzEtMDI2MS00YzhiLTljM2ItYzE2MTljZDQwNDNhNGExYjEzZTUtYmIx'

  var sign = MD5('id=' + id + '&token=' + token + '&key=' + globKey)

  $.ajax({
    url:'https://mass.51zhongzi.com/api/article/info',
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
      var introduce = list.introduce;
      console.log(introduce);
      var html = ` <div class="product">
      <div class="product_h3">
        ${list.title}
      </div>
      <div class="product_time">来源：${list.source}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${timestampToTime(list.publishTime.time)}</div>
      <div class="product_img">
        <div class="img_img">
          <img src="https://img.51zhongzi.com/${list.defaultImg}" alt="">
        </div>
      </div>
      <div class="product_content">
          ${list.contentStr}
      </div>
      <div class="product_user">发布人：${list.publishPerson}</div>
    </div>`
      $('#section').html(html)
      if (list.defaultImg == null) {
        $('.product_img').css('display', 'none')
      }
      $(".tishi").empty();
    
      var imgPath = $(".img_img img").attr('src');
      var namePath = $('.product_h3').text()
      // var shareString ='http://lsm.51zhongzi:7086/land/mass/product.html?id='+ id + '&token=' + token  + '&img=' + imgPath + '&name=' + namePath + '&desc=' + introduce + '&isLogin=1'
      var shareString ='https://mass.51zhongzi.com/mass/product.html?id='+ id + '&token=' + token  + '&img=' + imgPath + '&name=' + namePath + '&desc=' + introduce + '&isLogin=1'

      $('#share').click(function () {
        getShare(shareString)
      })

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

     
      //调用浏览器版本信息判断是IOS还是Android  
      function getShare(string) {
        if (browser.versions.ios || browser.versions.iPhone || browser.versions.iPad) {
          share(string)
        } else if (browser.versions.android) {
          mobile.androidShare(string)
        }
      }
    },
    complete: function (XMLHttpRequest, textStatus) {
      $(".tishi").empty();
    },
    error: function (err) {
      $(".tishi").empty();
    }
  })



})
