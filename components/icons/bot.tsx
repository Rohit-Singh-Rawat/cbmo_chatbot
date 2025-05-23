import React, { SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement> & {
	secondaryfill?: string;
	strokewidth?: number;
	title?: string;
};

function ChatBot({ title = 'badge 13', ...props }: IconProps) {
	return (
		<svg
			height='20'
			width='20'
			viewBox='0 0 20 20'
			xmlns='http://www.w3.org/2000/svg'
			{...props}
		>
			<title>{title}</title>
			<g>
				<line
					fill='none'
					stroke='#0F172A'
					strokeLinecap='round'
					strokeLinejoin='round'
					strokeWidth='2'
					x1='7'
					x2='7'
					y1='4'
					y2='7'
				/>
				<circle
					cx='7'
					cy='3'
					fill='none'
					r='1'
					stroke='#1E293B'
					strokeLinecap='round'
					strokeLinejoin='round'
					strokeWidth='2'
				/>
				<circle
					cx='14.5'
					cy='5'
					fill='#334155'
					r='3'
					stroke='#0F172A'
					strokeLinecap='round'
					strokeLinejoin='round'
					strokeWidth='2'
				/>
				<circle
					cx='7'
					cy='11.5'
					fill='#1E293B'
					r='1'
					strokeWidth='0'
				/>
				<circle
					cx='13'
					cy='11.5'
					fill='#1E293B'
					r='1'
					strokeWidth='0'
				/>
				<path
					d='m13.475,7.439l-1.414-1.414c-.122-.123-.3-.172-.468-.133-.169.04-.305.164-.359.329l-.707,2.121c-.06.18-.013.378.121.512.095.095.223.146.354.146.053,0,.106-.008.158-.026l2.121-.707c.165-.055.289-.19.329-.359.04-.168-.011-.346-.133-.468Z'
					fill='#334155'
					strokeWidth='0'
				/>
				<path
					d='m8.328,7.028c-.003-.009-.504-.019-.507-.028h-1.822c-1.657,0-3,1.343-3,3v4c0,1.657,1.343,3,3,3h8c1.657,0,3-1.343,3-3v-3.24'
					fill='none'
					stroke='#0F172A'
					strokeLinecap='round'
					strokeLinejoin='round'
					strokeWidth='2'
				/>
				<path
					d='m9,13h2c.276,0,.5.224.5.5h0c0,.828-.672,1.5-1.5,1.5h0c-.828,0-1.5-.672-1.5-1.5h0c0-.276.224-.5.5-.5Z'
					fill='#1E293B'
					strokeWidth='0'
				/>
			</g>
		</svg>
	);
}

export default ChatBot;
