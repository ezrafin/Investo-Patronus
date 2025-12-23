import React from 'react';
import { TickerTooltip } from './TickerTooltip';

const TICKER_PATTERN = /\$([A-Z]{1,5})\b/g;

interface TickerMatch {
  symbol: string;
  start: number;
  end: number;
}

/**
 * Parses text and automatically wraps ticker symbols (e.g., $AAPL, $BTC) 
 * with TickerTooltip components for interactive price display
 */
export function parseTickers(text: string, marketType?: string): React.ReactNode[] {
  if (!text) return [text];

  const parts: React.ReactNode[] = [];
  const matches: TickerMatch[] = [];
  let match;

  // Find all ticker matches
  while ((match = TICKER_PATTERN.exec(text)) !== null) {
    matches.push({
      symbol: match[1],
      start: match.index,
      end: match.index + match[0].length,
    });
  }

  // If no matches, return text as-is
  if (matches.length === 0) {
    return [text];
  }

  // Build React nodes
  let lastIndex = 0;
  let key = 0;

  matches.forEach((tickerMatch) => {
    // Add text before ticker
    if (tickerMatch.start > lastIndex) {
      parts.push(text.slice(lastIndex, tickerMatch.start));
    }

    // Add ticker with tooltip
    parts.push(
      <TickerTooltip key={key++} symbol={tickerMatch.symbol} marketType={marketType}>
        <span className="text-primary font-medium cursor-help hover:text-primary/80 transition-colors">
          ${tickerMatch.symbol}
        </span>
      </TickerTooltip>
    );

    lastIndex = tickerMatch.end;
  });

  // Add remaining text
  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts.length > 0 ? parts : [text];
}

/**
 * Checks if text contains ticker symbols
 */
export function hasTickers(text: string): boolean {
  return TICKER_PATTERN.test(text);
}

