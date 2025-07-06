"use client"

import { useState, useCallback } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { RefreshCw, Sparkles, BookOpen } from "lucide-react"
import { QuoteCard } from "./quote-card"
import { quoteService } from "@/lib/quote-service"
import type { Quote, QuoteCategory } from "@/types/quote"

const QUOTE_CATEGORIES: QuoteCategory[] = [
  {
    value: "inspirational",
    label: "Inspirational",
    description: "Motivating quotes to inspire and uplift your spirit",
  },
  {
    value: "funny",
    label: "Funny",
    description: "Humorous quotes to brighten your day with laughter",
  },
  {
    value: "life",
    label: "Life",
    description: "Profound insights about life and human experience",
  },
  {
    value: "wisdom",
    label: "Wisdom",
    description: "Timeless wisdom from great thinkers and philosophers",
  },
  {
    value: "success",
    label: "Success",
    description: "Motivational quotes about achieving success and goals",
  },
]

export function QuoteGenerator() {
  const [selectedCategory, setSelectedCategory] = useState<string>("")
  const [displayedQuotes, setDisplayedQuotes] = useState<Quote[]>([])
  const [previousQuoteIds, setPreviousQuoteIds] = useState<number[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const fetchQuotes = useCallback(
    async (category: string, isRefresh = false) => {
      setIsLoading(true)

      try {
        const excludeIds = isRefresh ? previousQuoteIds : []
        const response = await quoteService.getQuotesByCategory(category, 3, excludeIds)

        if (response.success && response.quotes) {
          setDisplayedQuotes(response.quotes)
          setPreviousQuoteIds(response.quotes.map((quote) => quote.id))
        } else {
          
          setDisplayedQuotes([])
        }
      } finally {
        setIsLoading(false)
      }
    },
    [previousQuoteIds],
  )

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category)
    setPreviousQuoteIds([]) // Reset previous quotes when changing category
    fetchQuotes(category)
  }

  const handleRefresh = () => {
    if (selectedCategory) {
      fetchQuotes(selectedCategory, true)
    }
  }

  const selectedCategoryInfo = QUOTE_CATEGORIES.find((cat) => cat.value === selectedCategory)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header Section */}
        <div className="text-center space-y-6 mb-12">
          <div className="flex items-center justify-center gap-3">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full">
              <Sparkles className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Quote Generator
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover inspiring quotes from various categories. Select a topic below to get three carefully curated
            quotes to motivate, inspire, or entertain you throughout your day.
          </p>
          <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
            <BookOpen className="h-4 w-4" />
            <span>Over 35 quotes across 5 categories</span>
          </div>
        </div>

        {/* Category Selection Form */}
        <Card className="mx-auto max-w-lg mb-8 shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Choose Your Category</CardTitle>
            <CardDescription className="text-base">
              Select a category to generate three inspiring quotes
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="category-select" className="text-sm font-medium text-gray-700">
                Quote Category
              </label>
              <Select value={selectedCategory} onValueChange={handleCategorySelect}>
                <SelectTrigger id="category-select" className="w-full h-12">
                  <SelectValue placeholder="Select a category..." />
                </SelectTrigger>
                <SelectContent>
                  {QUOTE_CATEGORIES.map((category) => (
                    <SelectItem key={category.value} value={category.value} className="py-3">
                      <div className="flex flex-col items-start">
                        <span className="font-medium">{category.label}</span>
                        <span className="text-xs text-gray-500">{category.description}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {selectedCategory && (
              <Button
                onClick={handleRefresh}
                variant="outline"
                className="w-full h-12 bg-gradient-to-r from-blue-50 to-purple-50 hover:from-blue-100 hover:to-purple-100 border-blue-200"
                disabled={isLoading}
              >
                <RefreshCw className={`h-5 w-5 mr-2 ${isLoading ? "animate-spin" : ""}`} />
                {isLoading ? "Loading New Quotes..." : "Get New Quotes"}
              </Button>
            )}
          </CardContent>
        </Card>

        {/* Selected Category Display */}
        {selectedCategoryInfo && (
          <div className="text-center mb-8">
            <Badge
              variant="secondary"
              className="text-lg px-6 py-3 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800"
            >
              {selectedCategoryInfo.label} Quotes
            </Badge>
            <p className="text-gray-600 mt-2 max-w-md mx-auto">{selectedCategoryInfo.description}</p>
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="animate-pulse border-l-4 border-l-gray-300">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="h-6 w-6 bg-gray-300 rounded mt-1"></div>
                      <div className="flex-1 space-y-2">
                        <div className="h-4 bg-gray-300 rounded w-full"></div>
                        <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                        <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                      </div>
                    </div>
                    <div className="pt-4">
                      <div className="h-px bg-gray-300 mb-4"></div>
                      <div className="flex justify-between items-center">
                        <div className="h-3 bg-gray-300 rounded w-1/3"></div>
                        <div className="h-5 w-8 bg-gray-300 rounded-full"></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Quotes Display */}
        {!isLoading && displayedQuotes.length > 0 && (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
            {displayedQuotes.map((quote, index) => (
              <QuoteCard key={quote.id} quote={quote} index={index} />
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="text-center mt-16 pt-8 border-t border-gray-200">
          <p className="text-gray-500 text-sm">
            Built with Next.js 15 & Shadcn UI • Refresh quotes to discover new inspiration
          </p>
        </div>
      </div>
    </div>
  )
}
