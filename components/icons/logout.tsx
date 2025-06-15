import { SVGProps } from "react";

export function SolarLogout2LineDuotone(props: SVGProps<SVGSVGElement>) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="1em"
			height="1em"
			viewBox="0 0 24 24"
			{...props}
		>
			{/* Icon from Solar by 480 Design - https://creativecommons.org/licenses/by/4.0/ */}
			<g fill="none" stroke="#888888" strokeLinecap="round" strokeWidth="1.5">
				<path
					d="M9.002 7c.012-2.175.109-3.353.877-4.121C10.758 2 12.172 2 15 2h1c2.829 0 4.243 0 5.122.879C22 3.757 22 5.172 22 8v8c0 2.828 0 4.243-.878 5.121C20.242 22 18.829 22 16 22h-1c-2.828 0-4.242 0-5.121-.879c-.768-.768-.865-1.946-.877-4.121"
					opacity=".5"
				/>
				<path
					strokeLinejoin="round"
					className="group-hover:-translate-x-0.5 transition-transform duration-300"
					d="M15 12H2m0 0l3.5-3M2 12l3.5 3"
				/>
			</g>
		</svg>
	);
}
