import * as Constants from './constants'
import { Kora, Dynamic, MemoryStore } from '@ironbay/kora'

const kora = new Kora(Constants.URL, new MemoryStore())
kora.onLocalChange.add(() => console.dir(kora.local_path([])))

if (!localStorage.getItem('token'))
	kora.local_merge(['session', 'user'], false)

kora.before_mutation(['connection'], async (_path, mut) => {
	if (mut.merge.status !== 'ready') return
})

export default kora