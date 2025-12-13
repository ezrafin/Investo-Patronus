import React from 'react';

interface MarkdownContentProps {
  content: string;
  className?: string;
}

export function MarkdownContent({ content, className = '' }: MarkdownContentProps) {
  // Split content into blocks (paragraphs, lists, etc.)
  const blocks = content.split(/\n\n+/).filter(p => p.trim());

  const renderBlock = (block: string, index: number) => {
    const lines = block.split('\n').filter(l => l.trim());
    
    // Check if all lines are list items
    const allListItems = lines.every(line => /^[-*]\s+/.test(line.trim()) || /^\d+\.\s+/.test(line.trim()));
    
    if (allListItems && lines.length > 0) {
      // Render as list
      const isNumbered = /^\d+\.\s+/.test(lines[0].trim());
      const ListTag = isNumbered ? 'ol' : 'ul';
      
      return (
        <ListTag 
          key={index} 
          className={`mb-6 space-y-2 ${isNumbered ? 'list-decimal' : 'list-disc'} ml-6`}
        >
          {lines.map((line, lineIndex) => {
            const trimmedLine = line.trim();
            const listContent = trimmedLine.replace(/^[-*]\d+\.\s+/, '').replace(/^[-*]\s+/, '');
            return (
              <li key={lineIndex} className="text-foreground/90 leading-relaxed pl-2">
                {renderInlineMarkdown(listContent)}
              </li>
            );
          })}
        </ListTag>
      );
    }

    // Render as paragraphs
    return (
      <div key={index} className="mb-6">
        {lines.map((line, lineIndex) => {
          const trimmedLine = line.trim();
          if (!trimmedLine) return null;
          
          // Skip if it's a markdown header (##)
          if (trimmedLine.startsWith('##')) return null;
          
          return (
            <p key={lineIndex} className="mb-4 leading-relaxed text-foreground/90 text-base">
              {renderInlineMarkdown(trimmedLine)}
            </p>
          );
        })}
      </div>
    );
  };

  const renderInlineMarkdown = (text: string): React.ReactNode[] => {
    const parts: React.ReactNode[] = [];
    let lastIndex = 0;
    let key = 0;

    // Pattern for **bold** text (must be **, not single *)
    const boldPattern = /\*\*([^*]+)\*\*/g;
    // Pattern for *italic* text (single * not part of **)
    const italicPattern = /(?<!\*)\*([^*\n]+?)\*(?!\*)/g;
    // Pattern for `code`
    const codePattern = /`([^`]+)`/g;

    // Collect all matches
    const matches: Array<{ type: 'bold' | 'italic' | 'code'; start: number; end: number; content: string }> = [];

    let match;
    while ((match = boldPattern.exec(text)) !== null) {
      matches.push({
        type: 'bold',
        start: match.index,
        end: match.index + match[0].length,
        content: match[1],
      });
    }

    while ((match = italicPattern.exec(text)) !== null) {
      matches.push({
        type: 'italic',
        start: match.index,
        end: match.index + match[0].length,
        content: match[1],
      });
    }

    while ((match = codePattern.exec(text)) !== null) {
      matches.push({
        type: 'code',
        start: match.index,
        end: match.index + match[0].length,
        content: match[1],
      });
    }

    // Sort matches by start position
    matches.sort((a, b) => a.start - b.start);

    // Remove overlapping matches (prioritize: bold > code > italic)
    const filteredMatches: typeof matches = [];
    for (let i = 0; i < matches.length; i++) {
      const current = matches[i];
      const overlaps = filteredMatches.some((m) => {
        return !(current.end <= m.start || current.start >= m.end);
      });
      if (!overlaps) {
        filteredMatches.push(current);
      }
    }

    // Build React nodes
    filteredMatches.forEach((match) => {
      // Add text before match
      if (match.start > lastIndex) {
        const beforeText = text.substring(lastIndex, match.start);
        if (beforeText) {
          parts.push(beforeText);
        }
      }

      // Add formatted content
      if (match.type === 'bold') {
        parts.push(
          <strong key={key++} className="font-semibold text-foreground">
            {match.content}
          </strong>
        );
      } else if (match.type === 'italic') {
        parts.push(
          <em key={key++} className="italic text-foreground/95">
            {match.content}
          </em>
        );
      } else if (match.type === 'code') {
        parts.push(
          <code key={key++} className="px-1.5 py-0.5 bg-muted/80 rounded text-sm font-mono text-foreground border border-border/50">
            {match.content}
          </code>
        );
      }

      lastIndex = match.end;
    });

    // Add remaining text
    if (lastIndex < text.length) {
      const remainingText = text.substring(lastIndex);
      if (remainingText) {
        parts.push(remainingText);
      }
    }

    return parts.length > 0 ? parts : [text];
  };

  return (
    <div className={`max-w-none ${className}`}>
      {blocks.map((block, index) => renderBlock(block, index))}
    </div>
  );
}

