  
  
  

  var APP_URL = 'https://mass.51zhongzi.com'  //正式
  // var APP_URL = ''  //测试
  function getUrlParam(params) {
    var reg = new RegExp("(^|&)" + params + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r !== null) {
      return unescape(r[2])
    }
    return null;
  }

  function timestampToTime(timestamp) {
    var date = new Date(timestamp); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
    var Y = date.getFullYear() + '-'
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
    var D = date.getDate() + ' '
    var h = date.getHours() + ':'
    var m = (date.getMinutes() < 10 ? '0' + (date.getMinutes()) : date.getMinutes()) + ':'
    var s = (date.getSeconds() < 10 ? '0' + (date.getSeconds()) : date.getSeconds())
    return Y + M + D + h + m + s
  }

  function timestampToHuiTime(timestamp) {
    var date = new Date(timestamp); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
    var Y = date.getFullYear() + '-'
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
    var D = date.getDate() + ' '

    return Y + M + D
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

  $(function() {
    function getBack() {
      if (browser.versions.ios || browser.versions.iPhone || browser.versions.iPad) {
        // $('#open').hide()
        back()
      } else if (browser.versions.android) {
        // $('#open').hide()
        mobile.back()
      }
    }
    $('.app_back').click(function() {
      getBack()
    })
  })