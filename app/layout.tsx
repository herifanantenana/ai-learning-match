import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { cn } from "@/lib/utils";
import { ClerkProvider } from "@clerk/nextjs";
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
				<body className="min-h-full">
					<Header />
					{children}
					<Footer />
				</body>
			</ClerkProvider>
		</html>
	);
}
