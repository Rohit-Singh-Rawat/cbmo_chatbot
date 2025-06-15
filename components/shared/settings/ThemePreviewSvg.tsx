import PaperPlane2 from "@/components/icons/send";
import { cn } from "@/lib/utils";
import React from "react";

interface ThemePreviewSvgProps {
	themeType: "light" | "dark" | "system";
	className?: string;
}

const ThemePreviewSvg: React.FC<ThemePreviewSvgProps> = ({
	themeType,
	className,
}) => {
	const defsContent = (
		<defs>
			<linearGradient id="lightCardBg" x1="0%" y1="0%" x2="0%" y2="100%">
				<stop offset="0%" style={{ stopColor: "#ffffff", stopOpacity: 1 }} />
				<stop offset="100%" style={{ stopColor: "#fafafa", stopOpacity: 1 }} />
			</linearGradient>

			<linearGradient id="darkCardBg" x1="0%" y1="0%" x2="0%" y2="100%">
				<stop offset="0%" style={{ stopColor: "#1a1a1a", stopOpacity: 1 }} />
				<stop offset="100%" style={{ stopColor: "#1A1A1A", stopOpacity: 1 }} />
			</linearGradient>

			<linearGradient id="lightInputBg" x1="0%" y1="0%" x2="0%" y2="100%">
				<stop offset="0%" style={{ stopColor: "#ffffff", stopOpacity: 1 }} />
				<stop
					offset="100%"
					style={{ stopColor: "#ffffff", stopOpacity: 0.95 }}
				/>
			</linearGradient>

			<linearGradient id="darkInputBg" x1="0%" y1="0%" x2="0%" y2="100%">
				<stop offset="0%" style={{ stopColor: "#262626", stopOpacity: 1 }} />
				<stop offset="100%" style={{ stopColor: "#1f1f1f", stopOpacity: 1 }} />
			</linearGradient>

			<filter id="cardShadow" x="-20%" y="-20%" width="140%" height="140%">
				<feDropShadow
					dx="0"
					dy="4"
					stdDeviation="8"
					floodColor="#000000"
					floodOpacity="0.08"
				/>
			</filter>

			<filter id="inputShadow" x="-20%" y="-20%" width="140%" height="140%">
				<feDropShadow
					dx="0"
					dy="2"
					stdDeviation="6"
					floodColor="#000000"
					floodOpacity="0.1"
				/>
			</filter>

			<filter id="darkInputShadow" x="-20%" y="-20%" width="140%" height="140%">
				<feDropShadow
					dx="0"
					dy="2"
					stdDeviation="6"
					floodColor="#000000"
					floodOpacity="0.3"
				/>
			</filter>

			{/* Clipping paths for the split view */}
			<clipPath id="leftHalf">
				<rect x="0" y="0" width="200" height="200" />
			</clipPath>
			<clipPath id="rightHalf">
				<rect x="200" y="0" width="200" height="200" />
			</clipPath>
		</defs>
	);

	const lightCardContent = (
		<g id="lightCard">
			<rect
				x="20"
				y="20"
				width="360"
				height="160"
				rx="18"
				fill="url(#lightCardBg)"
				stroke="#e5e5e5"
				strokeWidth="1"
				filter="url(#cardShadow)"
			/>
			<rect
				x="40"
				y="50"
				width="320"
				height="100"
				rx="20"
				fill="url(#lightInputBg)"
				stroke="#e5e5e5"
				strokeWidth="1"
				filter="url(#inputShadow)"
			/>
			<rect x="70" y="80" width="220" height="40" rx="18" fill="transparent" />
			<text
				x="85"
				y="105"
				fontFamily="system-ui, -apple-system, 'Segoe UI', sans-serif"
				fontSize="18"
				fill="#737373"
				fontWeight="400"
			>
				Ask me anything...
			</text>
			<circle cx="320" cy="100" r="20" fill="#1a1a1a" />
			<g transform="translate(311, 91)">
				<PaperPlane2 fill="white" />
			</g>
		</g>
	);

	const darkCardContent = (
		<g id="darkCard">
			<rect
				x="20"
				y="20"
				width="360"
				height="160"
				rx="18"
				fill="url(#darkCardBg)"
				stroke="#404040"
				strokeWidth="1"
				filter="url(#cardShadow)"
			/>
			<rect
				x="40"
				y="50"
				width="320"
				height="100"
				rx="20"
				fill="url(#darkInputBg)"
				stroke="#404040"
				strokeWidth="1"
				filter="url(#darkInputShadow)"
			/>
			<rect x="70" y="80" width="220" height="40" rx="18" fill="transparent" />
			<text
				x="85"
				y="105"
				fontFamily="system-ui, -apple-system, 'Segoe UI', sans-serif"
				fontSize="18"
				fill="#a3a3a3"
				fontWeight="400"
			>
				Ask me anything...
			</text>
			<circle cx="320" cy="100" r="20" fill="#e5e5e5" />
			<g transform="translate(311, 91)">
				<PaperPlane2 />
			</g>
		</g>
	);

	const autoCardContent = (
		<g id="autoCard">
			{/* Left half - Light theme */}
			<g clipPath="url(#leftHalf)">{lightCardContent}</g>
			{/* Right half - Dark theme */}
			<g clipPath="url(#rightHalf)">{darkCardContent}</g>
			{/* Divider line */}
			<line
				x1="200"
				y1="20"
				x2="200"
				y2="180"
				stroke="#d1d5db"
				strokeWidth="1"
				opacity="0.5"
			/>
		</g>
	);

	return (
		<svg viewBox="0 0 400 200" className={cn(className, "w-[160px] h-[80px]")}>
			{defsContent}
			{themeType === "light" && lightCardContent}
			{themeType === "system" && autoCardContent}
			{themeType === "dark" && darkCardContent}
		</svg>
	);
};

export default ThemePreviewSvg;
