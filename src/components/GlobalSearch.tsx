import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Building2, Newspaper, MessageSquare, X } from 'lucide-react';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { organizations } from '@/lib/organizations';
import { supabase } from '@/integrations/supabase/client';

interface SearchResult {
  type: 'company' | 'news' | 'forum';
  id: string;
  title: string;
  subtitle?: string;
}

export function GlobalSearch() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Keyboard shortcut
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  const searchAll = useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    setLoading(true);
    const searchLower = searchQuery.toLowerCase();
    const allResults: SearchResult[] = [];

    // Search companies (local)
    const companyResults = organizations
      .filter(org => org.name.toLowerCase().includes(searchLower))
      .slice(0, 5)
      .map(org => ({
        type: 'company' as const,
        id: org.id,
        title: org.name,
        subtitle: org.type.replace('_', ' '),
      }));
    allResults.push(...companyResults);

    // Search news articles (database)
    try {
      const { data: newsData } = await supabase
        .from('news_articles')
        .select('id, title, source_name')
        .ilike('title', `%${searchQuery}%`)
        .limit(5);
      
      if (newsData) {
        allResults.push(...newsData.map(article => ({
          type: 'news' as const,
          id: article.id,
          title: article.title,
          subtitle: article.source_name,
        })));
      }
    } catch (error) {
      console.error('News search error:', error);
    }

    // Search forum discussions (database)
    try {
      const { data: forumData } = await supabase
        .from('forum_discussions')
        .select('id, title, category')
        .ilike('title', `%${searchQuery}%`)
        .limit(5);
      
      if (forumData) {
        allResults.push(...forumData.map(discussion => ({
          type: 'forum' as const,
          id: discussion.id,
          title: discussion.title,
          subtitle: discussion.category,
        })));
      }
    } catch (error) {
      console.error('Forum search error:', error);
    }

    setResults(allResults);
    setLoading(false);
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      searchAll(query);
    }, 300);
    return () => clearTimeout(timeoutId);
  }, [query, searchAll]);

  const handleSelect = (result: SearchResult) => {
    setOpen(false);
    setQuery('');
    
    switch (result.type) {
      case 'company':
        navigate(`/companies/${result.id}`);
        break;
      case 'news':
        navigate(`/news/${result.id}`);
        break;
      case 'forum':
        navigate(`/forum/${result.id}`);
        break;
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'company':
        return <Building2 className="h-4 w-4 text-muted-foreground" />;
      case 'news':
        return <Newspaper className="h-4 w-4 text-muted-foreground" />;
      case 'forum':
        return <MessageSquare className="h-4 w-4 text-muted-foreground" />;
      default:
        return null;
    }
  };

  const groupedResults = {
    company: results.filter(r => r.type === 'company'),
    news: results.filter(r => r.type === 'news'),
    forum: results.filter(r => r.type === 'forum'),
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 px-3 py-1.5 text-sm text-muted-foreground bg-secondary/50 border border-border/50 rounded-lg hover:bg-secondary hover:border-border transition-colors"
      >
        <Search className="h-4 w-4" />
        <span className="hidden sm:inline">Search...</span>
        <kbd className="hidden md:inline-flex h-5 select-none items-center gap-1 rounded border border-border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
          <span className="text-xs">⌘</span>K
        </kbd>
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="overflow-hidden p-0 shadow-lg max-w-lg">
          <Command className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5">
            <div className="flex items-center border-b px-3">
              <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
              <input
                className="flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Search companies, news, forum..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              {query && (
                <button onClick={() => setQuery('')} className="p-1 hover:bg-secondary rounded">
                  <X className="h-4 w-4 text-muted-foreground" />
                </button>
              )}
            </div>
            <CommandList className="max-h-[300px] overflow-y-auto p-2">
              {loading && (
                <div className="py-6 text-center text-sm text-muted-foreground">
                  Searching...
                </div>
              )}
              
              {!loading && query && results.length === 0 && (
                <CommandEmpty>No results found.</CommandEmpty>
              )}

              {!loading && groupedResults.company.length > 0 && (
                <CommandGroup heading="Companies">
                  {groupedResults.company.map((result) => (
                    <CommandItem
                      key={`company-${result.id}`}
                      onSelect={() => handleSelect(result)}
                      className="flex items-center gap-3 cursor-pointer"
                    >
                      {getIcon(result.type)}
                      <div className="flex flex-col">
                        <span className="font-medium">{result.title}</span>
                        {result.subtitle && (
                          <span className="text-xs text-muted-foreground capitalize">{result.subtitle}</span>
                        )}
                      </div>
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}

              {!loading && groupedResults.news.length > 0 && (
                <CommandGroup heading="News">
                  {groupedResults.news.map((result) => (
                    <CommandItem
                      key={`news-${result.id}`}
                      onSelect={() => handleSelect(result)}
                      className="flex items-center gap-3 cursor-pointer"
                    >
                      {getIcon(result.type)}
                      <div className="flex flex-col">
                        <span className="font-medium line-clamp-1">{result.title}</span>
                        {result.subtitle && (
                          <span className="text-xs text-muted-foreground">{result.subtitle}</span>
                        )}
                      </div>
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}

              {!loading && groupedResults.forum.length > 0 && (
                <CommandGroup heading="Forum">
                  {groupedResults.forum.map((result) => (
                    <CommandItem
                      key={`forum-${result.id}`}
                      onSelect={() => handleSelect(result)}
                      className="flex items-center gap-3 cursor-pointer"
                    >
                      {getIcon(result.type)}
                      <div className="flex flex-col">
                        <span className="font-medium line-clamp-1">{result.title}</span>
                        {result.subtitle && (
                          <span className="text-xs text-muted-foreground capitalize">{result.subtitle}</span>
                        )}
                      </div>
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}

              {!query && (
                <div className="py-6 text-center text-sm text-muted-foreground">
                  Type to search companies, news, and forum discussions...
                </div>
              )}
            </CommandList>
          </Command>
        </DialogContent>
      </Dialog>
    </>
  );
}
