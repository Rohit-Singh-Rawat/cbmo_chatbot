import React, { type SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & {
	title?: string;
};

function ChatBot({ title = "badge 13", ...props }: IconProps) {
	return (
		<svg
			height="20"
			width="20"
			viewBox="0 0 20 20"
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			stroke="currentColor"
			{...props}
		>
			<title>{title}</title>
			<g>
				<line
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth="2"
					x1="7"
					x2="7"
					y1="4"
					y2="7"
				/>
				<circle
					cx="7"
					cy="3"
					r="1"
					fill="currentColor"
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth="2"
				/>
				<circle
					cx="14.5"
					cy="5"
					r="3"
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth="2"
				/>
				<circle cx="7" cy="11.5" r="1" fill="currentColor" stroke="none" />
				<circle cx="13" cy="11.5" r="1" fill="currentColor" stroke="none" />
				<path
					fill="currentColor"stroke="none"
					d="m13.475,7.439l-1.414-1.414c-.122-.123-.3-.172-.468-.133-.169.04-.305.164-.359.329l-.707,2.121c-.06.18-.013.378.121.512.095.095.223.146.354.146.053,0,.106-.008.158-.026l2.121-.707c.165-.055.289-.19.329-.359.04-.168-.011-.346-.133-.468Z"
				/>
				<path
					d="m8.328,7.028c-.003-.009-.504-.019-.507-.028h-1.822c-1.657,0-3,1.343-3,3v4c0,1.657,1.343,3,3,3h8c1.657,0,3-1.343,3-3v-3.24"
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth="2"
				/>
				<path
					fill="currentColor"
					stroke="none"
					d="m9,13h2c.276,0,.5.224.5.5h0c0,.828-.672,1.5-1.5,1.5h0c-.828,0-1.5-.672-1.5-1.5h0c0-.276.224-.5.5-.5Z"
				/>
			</g>
		</svg>
	);
}

export default ChatBot;
