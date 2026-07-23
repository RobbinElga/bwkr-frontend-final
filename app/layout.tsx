import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/components/auth/AuthProvider";


const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-jakarta",
});

export const metadata: Metadata = {
  title: "BWKR | Platform Wakaf Digital",
  description:
    "Platform wakaf produktif yang amanah, transparan, dan berdampak nyata bagi umat.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id" className={jakarta.variable}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Ikon Material Symbols — dimuat NON-BLOCKING (media=print, lalu di-swap ke all) */}
        <link
          id="ms-icons"
          rel="stylesheet"
          media="print"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&icon_names=account_balance,account_circle,analytics,arrow_back,arrow_forward,article,badge,bookmark,calendar_today,call,check_circle,chevron_left,chevron_right,close,cloud_upload,content_copy,description,download,edit,error,expand_more,groups,home,image,info,key,lock,logout,mail,menu,person,photo_camera,play_arrow,progress_activity,receipt_long,save,schedule,search_off,send,share,star,thumb_up,verified,verified_user,volunteer_activism&display=block"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: "var l=document.getElementById('ms-icons');if(l)l.media='all';",
          }}
        />
        <noscript>
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&icon_names=account_balance,account_circle,analytics,arrow_back,arrow_forward,article,badge,bookmark,calendar_today,call,check_circle,chevron_left,chevron_right,close,cloud_upload,content_copy,description,download,edit,error,expand_more,groups,home,image,info,key,lock,logout,mail,menu,person,photo_camera,play_arrow,progress_activity,receipt_long,save,schedule,search_off,send,share,star,thumb_up,verified,verified_user,volunteer_activism&display=block"
          />
        </noscript>
      </head>
      <body className="font-sans"><AuthProvider>{children}</AuthProvider></body>
    </html>
  );
}