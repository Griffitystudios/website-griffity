import Link from "next/link"
import { FaChevronRight, FaHome } from "react-icons/fa"

interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[]
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center space-x-2 text-sm font-poppins">
      <Link href="/" className="flex items-center text-slate-400 hover:text-amber-300 transition-colors">
        <FaHome className="w-4 h-4" />
        <span className="sr-only">Home</span>
      </Link>

      {items.map((item, index) => (
        <div key={index} className="flex items-center space-x-2">
          <FaChevronRight className="w-4 h-4 text-slate-500" />
          {item.href ? (
            <Link href={item.href} className="text-slate-400 hover:text-amber-300 transition-colors">
              {item.label}
            </Link>
          ) : (
            <span className="text-amber-300 font-medium">{item.label}</span>
          )}
        </div>
      ))}
    </nav>
  )
}
