import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Container } from '../container'
import Lego from '../lego'

export { default as Editor } from './editor'
export { default as Time } from './time'
export { default as Date } from './date'
export { default as Autocomplete } from './autocomplete'
import * as validators from './validators'
export const Validators = validators

export const Input = Lego<React.InputHTMLAttributes<HTMLInputElement>>('input', props => ({
	'size-3-5': true,
	...props,
	className: 'input',
}))

export const Select = Lego<React.InputHTMLAttributes<HTMLSelectElement>>('select', props => ({
	...props,
	className: 'input',
}))

export const TextArea = Lego<React.InputHTMLAttributes<HTMLSelectElement>>('textarea', props => ({
	...props,
	className: 'input',
}))

export const Block = Lego<React.HTMLAttributes<HTMLDivElement>>(Container, props => ({
	'flex': true,
	'flex-column': true,
	'pad-4': true,
	...props,
}))

export const Row = Lego<React.HTMLAttributes<HTMLDivElement>>(Container)

export const Label = Lego<React.HTMLAttributes<HTMLDivElement>>(Container, props => ({
	uppercase: true,
	'size-3': true,
	'weight-6': true,
	'fg-black-40': true,
	'mgn-b2': true,
	...props,
}))

export class Address extends React.Component<any, any> {
	private ac: google.maps.places.Autocomplete
	render() {
		const { value, onChange, ...rest } = this.props
		return <Input value={value.format} onChange={e => this.change({ format: e.target.value })} {...rest} />
	}
	componentDidMount() {
		const input = ReactDOM.findDOMNode(this) as HTMLInputElement
		const ac = new google.maps.places.Autocomplete(input)
		ac.addListener('place_changed', () => {
			const place = ac.getPlace()
			const payload = {
				format: input.value,
				raw: place.formatted_address,
				name: place.name,
				lat: place.geometry.location.lat(),
				lng: place.geometry.location.lng(),
			}
			this.change(payload)
		})
		this.ac = ac
	}
	componentWillUnmount() {
		this.ac.unbindAll()
	}
	private change(obj) {
		this.props.onChange({
			target: {
				value: obj
			}
		})
	}
}

interface CheckboxProps {
	value: boolean
	big?: boolean
}
export const Checkbox = (props: CheckboxProps) => {
	const {value, big, ...rest} = props
	return (
		<Container
			border-1
			radius-3
			fg-white
			style={{
				width: big ? '28px' : '14px',
				height: big ? '28px' : '14px',
				borderColor: props.value ? 'transparent' : '#7f8fa4',
				backgroundColor: props.value ? '#4fc356' : 'transparent',
				color: 'white',
				MozUserSelect: 'none',
				WebkitUserSelect: 'none',
				msUserSelect: 'none'
			}}
			flex
			align-center
			justify-center
			cursor-pointer
			{...rest}
			>
			{
				props.value &&
				<img width={props.big ? 12 : 9} height={props.big ? 12 : 9} src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTYuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjE2cHgiIGhlaWdodD0iMTZweCIgdmlld0JveD0iMCAwIDQ0OC44IDQ0OC44IiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA0NDguOCA0NDguODsiIHhtbDpzcGFjZT0icHJlc2VydmUiPgo8Zz4KCTxnIGlkPSJkb25lIj4KCQk8cG9seWdvbiBwb2ludHM9IjE0Mi44LDMyMy44NSAzNS43LDIxNi43NSAwLDI1Mi40NSAxNDIuOCwzOTUuMjUgNDQ4LjgsODkuMjUgNDEzLjEsNTMuNTUgICAiIGZpbGw9IiNGRkZGRkYiLz4KCTwvZz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8L3N2Zz4K" />
			}
		</Container>
	)
}
