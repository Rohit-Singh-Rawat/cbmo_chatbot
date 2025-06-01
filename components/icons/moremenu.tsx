import { SVGProps } from "react";

export function SolarMenuDotsBoldDuotone(props: SVGProps<SVGSVGElement>) {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			width='1em'
			height='1em'
			viewBox='0 0 24 24'
			{...props}
		>
			{/* Icon from Solar by 480 Design - https://creativecommons.org/licenses/by/4.0/ */}
			<path
				fill='#888888'
				d='M7 12a2 2 0 1 1-4 0a2 2 0 0 1 4 0m14 0a2 2 0 1 1-4 0a2 2 0 0 1 4 0'
			/>
			<path
				fill='#888888'
				d='M14 12a2 2 0 1 1-4 0a2 2 0 0 1 4 0'
				opacity='.5'
			/>
		</svg>
	);
}
