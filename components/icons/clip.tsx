import React, { type SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & {
	secondaryfill?: string;
	strokewidth?: number;
	title?: string;
};

function Paperclip({ title = "badge 13", ...props }: IconProps) {
	return (
		<svg
			height="20"
			width="20"
			viewBox="0 0 20 20"
			xmlns="http://www.w3.org/2000/svg"
			{...props}
		>
			<title>{title}</title>
			<g fill="#212121">
				<path
					d="m8,7v4c0,1.105.895,2,2,2h0c1.105,0,2-.895,2-2v-4c0-2.209-1.791-4-4-4h0c-2.209,0-4,1.791-4,4v4c0,3.314,2.686,6,6,6h0c3.314,0,6-2.686,6-6v-4"
					fill="none"
					stroke="#212121"
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth="1.5"
				/>
			</g>
		</svg>
	);
}

export default Paperclip;
