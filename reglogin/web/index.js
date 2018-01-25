/**
 * reg - 用户注册
 *
 * @return {type}  无返回值
 */
function reg() {
    let checkFlag = Util.vali('regdata');
    if(!checkFlag.flag) {
      alert(checkFlag.msg);
      return;
    }
   // url 本地服务务必添加http：
   $.ajax({url: 'http://localhost:8081/register',
     data: {
       name: $('#regName').val(),
       password: $('#regPsw').val(),
       surePsw:  $('#surePsw').val(),
     },
     type: 'POST',
     success: function(res) {
       if(res.code == 200) {
         alert('注册成功')
         $('#regName').val('')
         $('#regPsw').val('');
         $('#surePsw').val('');
         $('.regForm').remove();
         $('.logForm').show();
       } else {
         alert(res.msg)
       }
     }
   });
  }

 /**
  * login - 登录
  *
  * @return {type}  description
  */
 function login() {
     let checkFlag = Util.vali('regdata');
     if(!checkFlag.flag) {
       alert(checkFlag.msg);
       return;
     }
    // url 本地服务务必添加http：
    $.ajax({url: 'http://localhost:8081/login',
      data: {
        name: $('#loginName').val(),
        password:$('#loginPsw').val(),
      },
      type: 'GET',
      success: function(res) {
        if(res.code == 200) {
          alert('登录成功')
          $('#regName').val('')
          $('#regPsw').val('');
          setTimeout(function() {
            location.href = 'home.html';
          }, 1000);
        } else {
          alert(res.msg)
        }
      }
    });
  }

 /**
  * showPsw - 密码输入框，眼镜显示隐藏密码效果
  *
  * @return {type}  无返回值
  */
 function showPsw (t) {
   var input = $(t).parent().prev('input');
   if($(input).attr('type') == 'password') {
     $(t).attr('src', 'img/visible.png');
     $(input).attr('type', 'text')
   } else {
     $(t).attr('src', 'img/invisible.png');
     $(input).attr('type', 'password')
   }

 }
