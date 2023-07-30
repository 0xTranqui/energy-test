import {useSetRegistry} from "./useSetRegistry"
import { Stack } from '@/components/base/Stack'

export default function SetRegistryPage() {

 const { writeSetRegistry } = useSetRegistry()

  return (
    <Stack className="items-center w-full gap-10 px-4 pt-40 lg:px-10">
      <button className="bg-black text-white p-2 w-fit hovercursor-pointer" onClick={writeSetRegistry}>
        set registry
      </button>
    </Stack>
  )
}
