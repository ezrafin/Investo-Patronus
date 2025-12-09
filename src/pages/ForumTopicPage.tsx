import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { fetchTopicById, fetchForumComments, ForumTopic, ForumComment } from '@/lib/api';
import { SkeletonCard } from '@/components/ui/skeleton-card';
import { ArrowLeft, ThumbsUp, ThumbsDown, MessageCircle, Calendar, Eye, Award, Star } from 'lucide-react';
import { cn } from '@/lib/utils';

const userLevels = [
  { min: 0, name: 'Newbie', color: 'bg-muted text-muted-foreground' },
  { min: 10, name: 'Member', color: 'bg-blue-100 text-blue-700' },
  { min: 50, name: 'Active', color: 'bg-green-100 text-green-700' },
  { min: 100, name: 'Expert', color: 'bg-purple-100 text-purple-700' },
  { min: 500, name: 'Guru', color: 'bg-amber-100 text-amber-700' },
];

function getUserLevel(rating: number) {
  return userLevels.reduce((acc, level) => (rating >= level.min ? level : acc), userLevels[0]);
}

export default function ForumTopicPage() {
  const { topicId } = useParams();
  const [topic, setTopic] = useState<ForumTopic | null>(null);
  const [comments, setComments] = useState<ForumComment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      if (topicId) {
        const [topicData, commentsData] = await Promise.all([
          fetchTopicById(topicId),
          fetchForumComments(topicId),
        ]);
        setTopic(topicData);
        setComments(commentsData);
        setLoading(false);
      }
    }

    loadData();
  }, [topicId]);

  if (loading) {
    return (
      <Layout>
        <div className="container-wide section-spacing">
          <div className="animate-pulse space-y-6">
            <div className="h-8 w-3/4 bg-muted rounded" />
            <div className="h-4 w-1/2 bg-muted rounded" />
            <div className="space-y-4 mt-8">
              {Array.from({ length: 3 }).map((_, i) => (
                <SkeletonCard key={i} lines={4} />
              ))}
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!topic) {
    return (
      <Layout>
        <div className="container-narrow section-spacing text-center">
          <h1 className="heading-lg mb-4">Topic not found</h1>
          <Link to="/forum" className="text-primary hover:underline">
            Return to forum
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Header */}
      <section className="border-b border-border">
        <div className="container-wide py-12 md:py-16">
          <Link
            to="/forum"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to forum
          </Link>

          <h1 className="heading-md mb-6">{topic.title}</h1>
          
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-3">
              <img
                src={topic.authorAvatar}
                alt={topic.author}
                className="w-8 h-8 rounded-full ring-2 ring-border"
              />
              <span className="font-medium text-foreground">{topic.author}</span>
            </div>
            <span className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4" />
              {new Date(topic.date).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}
            </span>
            <span className="flex items-center gap-1.5">
              <MessageCircle className="h-4 w-4" />
              {topic.replies} replies
            </span>
            <span className="flex items-center gap-1.5">
              <Eye className="h-4 w-4" />
              {topic.views.toLocaleString()} views
            </span>
          </div>
        </div>
      </section>

      {/* Comments */}
      <section className="section-spacing-sm">
        <div className="container-wide">
          <div className="space-y-4 md:space-y-6">
            {comments.map((comment, index) => {
              const level = getUserLevel(comment.rating);
              const mockReputation = Math.floor(Math.random() * 500) + comment.rating;
              
              return (
                <article
                  key={comment.id}
                  className="rounded-xl border border-border/60 bg-card overflow-hidden animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex flex-col md:flex-row">
                    {/* Author sidebar */}
                    <div className="md:w-48 p-4 md:p-6 bg-secondary/30 border-b md:border-b-0 md:border-r border-border/60">
                      <div className="flex md:flex-col items-center md:items-start gap-4">
                        <div className="relative">
                          <img
                            src={comment.authorAvatar}
                            alt={comment.author}
                            className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-muted ring-2 ring-background"
                          />
                          <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center ring-2 ring-background">
                            {Math.floor(mockReputation / 100) + 1}
                          </div>
                        </div>
                        <div className="md:mt-2 text-center md:text-left">
                          <span className="font-medium block">{comment.author}</span>
                          <span className={cn('inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full mt-1', level.color)}>
                            {level.name === 'Guru' && <Star className="h-3 w-3" />}
                            {level.name === 'Expert' && <Award className="h-3 w-3" />}
                            {level.name}
                          </span>
                          <div className="text-xs text-muted-foreground mt-2 hidden md:block">
                            <div>Reputation: {mockReputation}</div>
                            <div>Posts: {Math.floor(Math.random() * 200) + 10}</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 p-4 md:p-6">
                      <div className="flex items-center justify-between mb-4 text-xs text-muted-foreground">
                        <span>{comment.date}</span>
                        <span>#{index + 1}</span>
                      </div>
                      
                      <p className="text-foreground leading-relaxed mb-6">
                        {comment.content}
                      </p>
                      
                      {/* Actions */}
                      <div className="flex items-center gap-4 pt-4 border-t border-border/60">
                        <button className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-positive transition-colors">
                          <ThumbsUp className="h-4 w-4" />
                          <span className="tabular-nums">{comment.rating}</span>
                        </button>
                        <button className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-negative transition-colors">
                          <ThumbsDown className="h-4 w-4" />
                        </button>
                        <button className="text-sm text-muted-foreground hover:text-primary transition-colors ml-auto">
                          Reply
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          {/* Reply Form */}
          <div className="mt-8 md:mt-12 p-6 md:p-8 rounded-xl border border-border/60 bg-card">
            <h3 className="font-heading font-medium text-lg mb-4">Write a Reply</h3>
            <textarea
              placeholder="Share your thoughts..."
              className="w-full p-4 rounded-lg border border-border/60 bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none transition-all"
              rows={5}
            />
            <div className="flex items-center justify-between mt-4">
              <p className="text-xs text-muted-foreground">
                Be respectful and courteous to other members
              </p>
              <button className="btn-primary">
                Submit
              </button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}