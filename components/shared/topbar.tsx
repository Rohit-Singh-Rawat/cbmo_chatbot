
import ThemeToggle from "./themeToogle";
import Logo from "./Logo";
import UserMenu from "./user/userMenu";
export default function Topbar() {
	return (
		<header className="fixed top-0 left-0 right-0 sm:bg-transparent bg-background z-50 px-2 sm:px-5">
			<div className="flex items-center justify-between h-14 sm:h-16 px-2 sm:px-4">
				<div className="flex items-center gap-1.5 sm:gap-2">
					<Logo size="sm" />
				</div>
				<div className="flex items-center gap-1.5 sm:gap-2">
					<ThemeToggle />
					<UserMenu />
				</div>
			</div>
		</header>
	)
}
