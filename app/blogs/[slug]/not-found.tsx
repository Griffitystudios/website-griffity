import Link from "next/link"
import { FaArrowLeft, FaExclamationTriangle } from "react-icons/fa"

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-body">
      <div className="text-center space-y-6 max-w-md mx-auto px-4">
        <div className="flex justify-center">
          <FaExclamationTriangle className="w-24 h-24 text-slate-600" />
        </div>

        <div className="space-y-3">
          <h1 className="font-cormorantGaramond text-4xl font-bold text-amber-100">Article Not Found</h1>
          <p className="text-slate-300 font-poppins">
            The article you're looking for doesn't exist or may have been moved.
          </p>
        </div>

        <div className="space-y-4">
          <Link
            href="/blogs"
            className="inline-flex items-center gap-2 px-6 py-3 bg-amber-700 hover:bg-amber-600 text-white font-poppins font-medium rounded-lg transition-colors duration-200"
          >
            <FaArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>

          <div>
            <Link href="/" className="text-slate-400 hover:text-amber-300 font-poppins transition-colors">
              Go to Homepage
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
