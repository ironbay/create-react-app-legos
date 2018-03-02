import '@ironbay/legos/dist/legos.min.css'
import * as React from 'react'
import { Container } from '../components/container'
import Kora from '../data/kora'

export default class Root extends React.Component<any, any> {
	componentDidMount() {
		Kora.onLocalChange.add(() => this.forceUpdate())
	}
	render() {
		return (
			<Container>
			{
				React.cloneElement(this.props.children as any)
			}
			</Container>
		)
	}
}
