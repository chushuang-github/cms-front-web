type IFormType = 'input' | 'password' | 'select' | 'datapicker'
export interface IFormItem {
  type: IFormType
  label: string
  rules?: any[]
  placeholder?: any
  // 针对select
  options?: any[]
  // 针对其他属性
  otherOptions?: any
  field: string
  isHidden?: boolean
}

export interface IForm {
  formItems: IFormItem[]
  labelWidth?: string
  collLayout?: any
  itemStyle?: any
}
