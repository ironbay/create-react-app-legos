import '@ironbay/legos/dist/legos.css'
import * as React from 'react'
import * as cs from 'classnames'
import legos from '@ironbay/legos/dist/classes'

export function component<T>(element: any, base_class: string, forced_props = {}): (props: T) => React.SFCElement<T> {
	return function(props: T & {[key: string]: boolean}): any {
		const classes = {}
		const { children, className, ...rest} = props as any
		for (let key of Object.keys(rest)) {
			if (legos[key]) {
				classes[key] = rest[key]
				delete rest[key]
			}
		}
		const combined = cs(base_class, className, classes)
		return React.createElement<T>(element, {
			className: combined,
			...rest,
			...forced_props
		}, children)
	}
}
