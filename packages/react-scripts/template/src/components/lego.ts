import * as React from 'react'
import * as cs from 'classnames'
import legos from '@ironbay/legos/dist/classes'

type Extra = {
	[key: string]: any
}

export default function Lego<P>(type: string | React.StatelessComponent<P>, props = (p: P & Extra) => p) {
	return function(input: P & Extra) {
		const { children, className, ...rest } = props(input) as any
		const classes = {}
		for (let key of Object.keys(rest)) {
			if (legos[key]) {
				classes[key] = rest[key]
				delete rest[key]
			}
		}
		const combined = cs(className, classes)
		return React.createElement<P & Extra>(type, {
			...rest,
			className: combined,
		}, children)
	}
}