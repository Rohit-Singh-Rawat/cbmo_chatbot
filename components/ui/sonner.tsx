"use client"

import { useTheme } from "next-themes"
import { Toaster as Sonner, ToasterProps } from "sonner"

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      position="top-center"
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      style={
        {
          "--normal-bg": theme === "dark" ? "#121212" : "#ffffff",
          "--normal-text": theme === "dark" ? "#ffffff" : "#121212", 
          "--normal-border": theme === "dark" ? "#1f1f1f" : "#e5e5e5",
          "--success-bg": theme === "dark" ? "#166534" : "#4ade80",
          "--success-text": "#ffffff",
          "--success-border": theme === "dark" ? "#166534" : "#4ade80",
          "--error-bg": theme === "dark" ? "#991b1b" : "#f87171",
          "--error-text": "#ffffff",
          "--error-border": theme === "dark" ? "#991b1b" : "#f87171",
          "--loading-bg": theme === "dark" ? "#121212" : "#ffffff",
          "--loading-text": theme === "dark" ? "#ffffff" : "#121212",
          "--loading-border": theme === "dark" ? "#1f1f1f" : "#e5e5e5"
        } as React.CSSProperties
      }
      {...props}
    />
  )
}

export { Toaster }
