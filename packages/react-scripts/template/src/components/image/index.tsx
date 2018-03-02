import './styles.css'
import * as React from 'react'
import { Container } from '../container'
import Lego from '../lego'

export const Image = Lego<React.ImgHTMLAttributes<HTMLImageElement>>('img', props => ({
	...props,
	style: {
		height: 'auto',
		...props.style,
	}
}))

export function Icon(props) {
	const { src, ...rest } = props
	return (
		<Container cursor-pointer {...rest}>
			<Image
				style={{verticalAlign: 'top'}}
				width={18}
				src={`https://storage.googleapis.com/ridehealth-public/feather/${src}.svg`} />
		</Container>
	)
}