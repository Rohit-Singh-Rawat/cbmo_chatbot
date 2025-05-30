import React, { SVGProps } from "react";

export function SolarSun2LineDuotone(props: SVGProps<SVGSVGElement>) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="1em"
			height="1em"
			viewBox="0 0 24 24"
			{...props}
		>
			{/* Icon from Solar by 480 Design - https://creativecommons.org/licenses/by/4.0/ */}
			<g fill="none" stroke="#888888" strokeWidth="1.5">
				<circle cx="12" cy="12" r="5"></circle>
				<path strokeLinecap="round" d="M12 2v2m0 16v2M4 12H2m20 0h-2"></path>
				<path
					strokeLinecap="round"
					d="m19.778 4.223l-2.222 2.031M4.222 4.223l2.222 2.031m0 11.302l-2.222 2.222m15.556-.001l-2.222-2.222"
					opacity=".5"
				></path>
			</g>
		</svg>
	);
}
export default SolarSun2LineDuotone;
