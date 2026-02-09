export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ToastProvider } from "@/contexts/ToastContext";
import ToastContainer from "@/components/main-components/tissue/ToastContainer/ToastContainer";
import { UserProvider } from "../providers/UserProvider";

import { ShowCommentsProvider } from "../providers/ShowCommentsProvider";
import { ModalProvider } from "@/contexts/ModalContext";
import SignInPopUp from "@/components/landing-page/organ/popups/signin-popup/SignInPopUp";
import SignUpPopUp from "@/components/landing-page/organ/popups/signup-popup/SignUpPopUp";
import ConfirmDeletePopUp from "@/components/main-components/organ/popups/confirm-delete-popup/ConfirmDeletePopUp";
import CommentPopUp from "@/components/main-components/organ/comment-popup/CommentPopUp";
import EditProfilePopUp from "@/components/main-components/organ/popups/edit-profile-popup/EditProfilePopUp";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

import { frontendBaseUrl } from "@/utils";

export const metadata: Metadata = {
  metadataBase: new URL(frontendBaseUrl),
  title: {
    default: "Postra - Share Your Stories",
    template: "%s | Postra",
  },
  description: "Postra is a community for readers and writers. Share your stories, connect with others, and find your audience.",
  keywords: ["blog", "writing", "stories", "community", "postra", "articles"],
  twitter: {
    card: "summary_large_image",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: frontendBaseUrl,
    siteName: "Postra",
    images: [
      {
        url: "/postra-banner.jpg",
        width: 1200,
        height: 630,
        alt: "Postra - Share Your Stories",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="google-site-verification" content="jjegQ2Hi3U5KA2rTXyOj3vbCCzWUGW-cTwBSKUaWz3c" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <ModalProvider>
          <UserProvider>
            <ToastProvider>
              <ShowCommentsProvider>
                {children}
                <SignInPopUp />
                <SignUpPopUp />
                <ConfirmDeletePopUp />
                <CommentPopUp />
                <EditProfilePopUp />
              </ShowCommentsProvider>
              <ToastContainer />
            </ToastProvider>
          </UserProvider>
        </ModalProvider>
      </body>
    </html>
  );
}
