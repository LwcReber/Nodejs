var Util = {
  /**
   * val - 提交表单验证
   *
   * @param  {String} formId   表单id名
   * @return {Object}          返回该表单是否验证结果 flag为true验证通过
   */
  vali (formId) {
    var msg = '', flag = true, vObj = $('.validate');
    if (formId) {
      vObj = $('#' + formId).find('.validate');
    }
    for (var i = 0; i < vObj.length; i++) {
        var t = vObj.eq(i);
        if (!t.val()) {
            msg = t.attr("placeholder");
            flag = false;
            break;
        }
    }
    return { msg: msg, flag: flag };
  }
}
