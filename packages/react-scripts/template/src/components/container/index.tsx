import * as React from 'react'
import Lego from '../lego'

export const Container = Lego<React.HTMLAttributes<HTMLDivElement>>('div')

export const Card = Lego<React.HTMLAttributes<HTMLDivElement>>(Container, props => ({
	'bg-white': true,
	'radius-4': true,
	'pad-6': true,
	...props,
	'style': {
		boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.08)',
		...props.style,
	},
}))

export function Wrap(props) {
	return (
		<Container justify-center flex>
			<Container pad-h4 style={{
				width: '68rem',
				maxWidth: '100%',
			}}>
			{props.children}
			</Container>
		</Container>
	)
}

interface GridProps {
	columns: number
	flush?: boolean
	responsive?: boolean
}

export class Grid extends React.Component<{[key: string]: any} & GridProps, any> {
	private static chunk<T>(input: T[], chunk: number) {
		const result = []
		for (let i = 0; i < input.length; i += chunk) {
			const current = []
			for (let n = 0; n < chunk; n++) {
				current[n] = input[n + i]
			}
			result.push(current)
		}
		return result
	}

	render() {
		const { columns, children, responsive, flush, ...rest } = this.props
		return (
			<Container {...rest} style={flush ? {} : {margin: '-1rem 0 0 -1rem'}}>
			{
				Grid
				.chunk([].concat(children), columns)
				.map((items, index: number) => {
					return (
						<Container key={index}>
						{
							items.map((item, inner: number) => (
								<Container
									key={inner}
									style={{
										display: 'inline-block',
										padding: flush ? 'initial' : '1rem 0 0 1rem',
										width: 100 / columns + '%',
									}}>
									{item}
								</Container>
							))
						}
						</Container>
					)
				})
			}
			</Container>
		)
	}

}