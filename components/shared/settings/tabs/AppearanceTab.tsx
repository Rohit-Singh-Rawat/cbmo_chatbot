import React, { useId } from 'react';
import { CheckIcon, MinusIcon } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useTheme } from 'next-themes';
import ThemePreviewSvg from '../ThemePreviewSvg';

const items = [
	{ value: 'light', label: 'Light' },
	{ value: 'system', label: 'System' },
	{ value: 'dark', label: 'Dark' },
];

const AppearanceTab: React.FC = () => {
	const id = useId();
	const { theme, setTheme } = useTheme();

	return (
		<div className='space-y-6 px-2'>
			<div>
				<h2 className='text-xl mb-2'>Appearance Settings</h2>
				<p className='text-sm text-muted-foreground'>
					Customize the look and feel of the app.
				</p>
			</div>

			<fieldset className='space-y-4'>
				<legend className='text-foreground text-sm leading-none font-medium'>
					Choose a theme
				</legend>
				<RadioGroup
					className='flex gap-3'
					defaultValue={theme}
					onValueChange={(value) => setTheme(value)}
				>
					{items.map((item) => (
						<label
							key={`${id}-${item.value}`}
							className='relative p-2   '
						>
							<RadioGroupItem
								id={`${id}-${item.value}`}
								value={item.value}
								className='peer sr-only after:absolute after:inset-0'
							/>
							<div className='group'>
								<ThemePreviewSvg
									themeType={item.value as 'light' | 'dark' | 'system'}
									className='border border-border hover:border-primary/50 rounded-2xl active:border-primary/30 transition-colors duration-200'
								/>
								<span className='group peer-data-[state=unchecked]:text-muted-foreground/70 mt-2 flex items-center gap-1'>
									<CheckIcon
										size={16}
										className='group-peer-data-[state=unchecked]:hidden'
										aria-hidden='true'
									/>
									<MinusIcon
										size={16}
										className='group-peer-data-[state=checked]:hidden'
										aria-hidden='true'
									/>
									<span className='text-xs font-medium'>{item.label}</span>
								</span>
							</div>
						</label>
					))}
				</RadioGroup>
			</fieldset>
		</div>
	);
};

export default AppearanceTab;
