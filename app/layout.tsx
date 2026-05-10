import { cn } from "@/lib/utils";
import { ClerkProvider, Show, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({
	subsets: ["latin"],
	variable: "--font-inter",
});

const outfit = Outfit({
	variable: "--font-outfit",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Meetsy",
	description:
		"Meetsy is a AI platform for connecting people with similar interests.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html
			lang="en"
			className={cn("h-full antialiased", inter.variable, outfit.variable)}
		>
			<ClerkProvider>
				<body className="min-h-full flex flex-col">
					<header className="flex justify-end items-center p-4 gap-4 h-16">
						<Show when="signed-out">
							<SignInButton />
							<SignUpButton>
								<button className="bg-purple-700 text-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
									Sign Up
								</button>
							</SignUpButton>
						</Show>
						<Show when="signed-in">
							<UserButton />
						</Show>
					</header>
					{children}
				</body>
			</ClerkProvider>
		</html>
	);
}
