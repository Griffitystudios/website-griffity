"use client"

import { FaFacebook, FaTwitter, FaLinkedin, FaLink, FaEnvelope } from "react-icons/fa"

interface SocialShareProps {
  url: string
  title: string
  description: string
}

export default function SocialShare({ url, title, description }: SocialShareProps) {
  const encodedUrl = encodeURIComponent(url)
  const encodedTitle = encodeURIComponent(title)
  const encodedDescription = encodeURIComponent(description)

  const shareLinks = [
    {
      name: "Twitter",
      icon: FaTwitter,
      href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      color: "hover:text-blue-400",
    },
    {
      name: "Facebook",
      icon: FaFacebook,
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      color: "hover:text-blue-600",
    },
    {
      name: "LinkedIn",
      icon: FaLinkedin,
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      color: "hover:text-blue-500",
    },
    {
      name: "Email",
      icon: FaEnvelope,
      href: `mailto:?subject=${encodedTitle}&body=${encodedDescription}%0A%0A${encodedUrl}`,
      color: "hover:text-green-500",
    },
  ]

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url)
      // You could add a toast notification here
    } catch (err) {
      console.error("Failed to copy: ", err)
    }
  }

  return (
    <div className="flex items-center space-x-4">
      <span className="text-slate-400 font-poppins text-sm font-medium">Share:</span>
      <div className="flex items-center space-x-3">
        {shareLinks.map((link) => (
          <a
            key={link.name}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`text-slate-400 ${link.color} transition-colors p-2 hover:bg-slate-700/50 rounded-lg`}
            aria-label={`Share on ${link.name}`}
          >
            <link.icon className="w-5 h-5" />
          </a>
        ))}
        <button
          onClick={copyToClipboard}
          className="text-slate-400 hover:text-amber-300 transition-colors p-2 hover:bg-slate-700/50 rounded-lg"
          aria-label="Copy link"
        >
          <FaLink className="w-5 h-5" />
        </button>
      </div>
    </div>
  )
}
