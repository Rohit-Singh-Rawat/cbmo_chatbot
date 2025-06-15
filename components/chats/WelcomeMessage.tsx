import { FC } from "react";

const WelcomeMessage: FC = () => {
	return (
		<section className='flex flex-col items-center justify-center p-4 text-center bg-background text-foreground flex-1'>
			<p className='text-xl sm:text-2xl mb-2 text-muted-foreground font-light'>
				Good to See You !
			</p>
			<h1 className='text-xl sm:text-2xl mb-2 '>
				How can I be of Assistance?
			</h1>
		</section>
	);
};

export default WelcomeMessage;

