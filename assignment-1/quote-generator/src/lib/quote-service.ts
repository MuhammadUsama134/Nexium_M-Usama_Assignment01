import type { Quote, QuoteResponse } from "@/types/quote"
import quotesData from "@/data/quotes.json"

export class QuoteService {
  private static instance: QuoteService
  private quotesCache: Record<string, Quote[]> = {}

  private constructor() {
    this.quotesCache = quotesData
  }

  public static getInstance(): QuoteService {
    if (!QuoteService.instance) {
      QuoteService.instance = new QuoteService()
    }
    return QuoteService.instance
  }

  /**
   * Get random quotes for a specific category
   * @param category - The category to fetch quotes from
   * @param count - Number of quotes to return (default: 3)
   * @param excludeIds - Array of quote IDs to exclude (for preventing consecutive duplicates)
   * @returns Promise<QuoteResponse>
   */
  public async getQuotesByCategory(category: string, count = 3, excludeIds: number[] = []): Promise<QuoteResponse> {
    try {
      // Simulate API delay for realistic loading experience
      await new Promise((resolve) => setTimeout(resolve, 500))

      const categoryQuotes = this.quotesCache[category]

      if (!categoryQuotes || categoryQuotes.length === 0) {
        return {
          success: false,
          error: `No quotes found for category: ${category}`,
        }
      }

      // Filter out excluded quotes to prevent consecutive duplicates
      let availableQuotes = categoryQuotes.filter((quote) => !excludeIds.includes(quote.id))

      // If we've excluded too many quotes, reset and use all quotes
      if (availableQuotes.length < count) {
        availableQuotes = categoryQuotes
      }

      // Shuffle quotes and select the requested count
      const shuffledQuotes = this.shuffleArray([...availableQuotes])
      const selectedQuotes = shuffledQuotes.slice(0, Math.min(count, shuffledQuotes.length))

      return {
        success: true,
        quotes: selectedQuotes,
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Failed to fetch quotes",
      }
    }
  }

  /**
   * Get all available categories
   * @returns Array of category keys
   */
  public getAvailableCategories(): string[] {
    return Object.keys(this.quotesCache)
  }

  /**
   * Get quote count for a specific category
   * @param category - The category to count quotes for
   * @returns Number of quotes in the category
   */
  public getQuoteCount(category: string): number {
    return this.quotesCache[category]?.length || 0
  }

  /**
   * Shuffle array using Fisher-Yates algorithm
   * @param array - Array to shuffle
   * @returns Shuffled array
   */
  private shuffleArray<T>(array: T[]): T[] {
    const shuffled = [...array]
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    return shuffled
  }
}

// Export singleton instance
export const quoteService = QuoteService.getInstance()
