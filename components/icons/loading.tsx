'use client';
import { SVGProps } from 'react';
import { motion } from 'framer-motion';

interface LoadingProps extends SVGProps<SVGSVGElement> {
  color?: string;
  size?: number;
  speed?: number;
  strokeWidth?: number;
  opacity?: number;
}

export default function Loading({
  color = '#888888',
  size = 24,
  speed = 1.5,
  strokeWidth = 2,
  opacity = 0.3,
  ...props
}: LoadingProps) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={size}
      height={size}
      viewBox='0 0 24 24'
      {...props}
    >
      {/* Icon from Material Line Icons by Vjacheslav Trushkin - https://github.com/cyberalien/line-md/blob/master/license.txt */}
      <motion.g
        animate={{ rotate: 360 }}
        transition={{ duration: speed, repeat: Infinity, ease: 'linear' }}
        fill='none'
        stroke={color}
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={strokeWidth}
      >
        <motion.path
          strokeDasharray='16'
          strokeDashoffset='16'
          d='M12 3c4.97 0 9 4.03 9 9'
          animate={{ strokeDashoffset: 0 }}
          transition={{ duration: speed * 0.2 }}
        />
        <motion.path
          strokeDasharray='64'
          strokeDashoffset='64'
          strokeOpacity={opacity}
          d='M12 3c4.97 0 9 4.03 9 9c0 4.97 -4.03 9 -9 9c-4.97 0 -9 -4.03 -9 -9c0 -4.97 4.03 -9 9 -9Z'
          animate={{ strokeDashoffset: 0 }}
          transition={{ duration: speed * 0.8 }}
        />
      </motion.g>
    </svg>
  );
}
