import { QuoteIcon } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import type { Quote } from "@/types/quote"

interface QuoteCardProps {
  quote: Quote
  index: number
}

export function QuoteCard({ quote, index }: QuoteCardProps) {
  return (
    <Card className="h-full hover:shadow-lg transition-all duration-300 border-l-4 border-l-blue-500 hover:border-l-blue-600 group">
      <CardContent className="p-6 h-full flex flex-col">
        <div className="flex-1 space-y-4">
          <div className="flex items-start gap-3">
            <QuoteIcon className="h-6 w-6 text-blue-500 mt-1 flex-shrink-0 group-hover:text-blue-600 transition-colors" />
            <blockquote className="text-lg leading-relaxed text-gray-700 flex-1">{`"${quote.text}"`}</blockquote>
          </div>
        </div>

        <div className="mt-6 pt-4">
          <Separator className="mb-4" />
          <div className="flex items-center justify-between">
            <cite className="text-sm font-medium text-gray-600 not-italic">— {quote.author}</cite>
            <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded-full">#{index + 1}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
