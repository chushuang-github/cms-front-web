import { ref } from 'vue'
import PageModal from '@/components/page-modal'

type CallbackFn = (item?: any) => void

export function usePageModal(
  newCallback?: CallbackFn,
  editCallback?: CallbackFn
) {
  const pageModalRef = ref<InstanceType<typeof PageModal>>()
  const defaultInfo = ref({})
  const handleNewData = () => {
    defaultInfo.value = {}
    if (pageModalRef.value) {
      pageModalRef.value.dialogVisible = true
    }
    newCallback && newCallback()
  }
  const handleEditData = (item: any) => {
    if (pageModalRef.value) {
      pageModalRef.value.dialogVisible = true
      defaultInfo.value = { ...item }
    }
    editCallback && editCallback(item)
  }
  return [defaultInfo, pageModalRef, handleNewData, handleEditData]
}
