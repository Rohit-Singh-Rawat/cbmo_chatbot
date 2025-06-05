import { FC } from 'react';

const WelcomeMessage: FC = () => {
	return (
		<section className='flex flex-col items-center justify-center p-4 text-center bg-background text-foreground flex-1'>
			<h1 className='text-2xl sm:text-3xl 3xl:text-4xl mb-2 font-medium'>Hey there 👋</h1>
			<p className='text-sm sm:text-base 3xl:text-lg text-muted-foreground font-light  '>
				Ready to chat! How can I help?
			</p>
		</section>
	);
};

export default WelcomeMessage;
