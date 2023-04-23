// form表单规则校验，规则不需要是响应式的，写死就可以了
export const rules = {
  name: [
    {
      required: true, //必传的属性
      message: '用户名不能为空', //验证失败的提示文字
      //trigger表示什么时候触发验证
      trigger: 'blur' //blur:失去焦点时进行验证(change:修改过程持续验证符不符合规则)
    },
    {
      pattern: /^[a-z0-9]{5,10}$/, //输入的符合这个正则表达式
      message: '用户名必须是5-10个字母或数字',
      tirgger: 'blur'
    }
  ],
  password: [
    {
      required: true, //必传的属性
      message: '密码不能为空', //验证失败的提示文字
      //trigger表示什么时候触发验证
      trigger: 'blur'
    },
    {
      pattern: /^[a-z0-9]{3,}$/, //输入的符合这个正则表达式
      message: '密码必须是3位以上的字母或数字',
      tirgger: 'blur'
    }
  ]
}
