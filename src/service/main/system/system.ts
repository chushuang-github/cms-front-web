import hyRequest from '../../index'
import type { IDataType } from '../../type'

// 获取用户列表
export function getPageListData(url: string, queryInfo: any) {
  return hyRequest.post<IDataType>({
    url,
    data: queryInfo
  })
}

// 删除：url: /users/id
export function deletePageData(url: string) {
  return hyRequest.delete<IDataType>({
    url
  })
}

// 新增
export function createPageData(url: string, newData: any) {
  return hyRequest.post<IDataType>({
    url,
    data: newData
  })
}

// 编辑
export function editPageData(url: string, editData: any) {
  return hyRequest.patch<IDataType>({
    url,
    data: editData
  })
}
