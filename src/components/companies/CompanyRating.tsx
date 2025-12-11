import { useState, useEffect } from 'react';
import { Star, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useUser } from '@/context/UserContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

interface CompanyRatingProps {
  companySlug: string;
  className?: string;
}

interface Evaluation {
  id: string;
  user_id: string;
  rating: number;
  comment: string | null;
  created_at: string;
  profiles?: {
    display_name: string | null;
    avatar_url: string | null;
  };
}

export function CompanyRating({ companySlug, className }: CompanyRatingProps) {
  const { user } = useUser();
  const [evaluations, setEvaluations] = useState<Evaluation[]>([]);
  const [userRating, setUserRating] = useState<number>(0);
  const [userComment, setUserComment] = useState('');
  const [hoveredStar, setHoveredStar] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showCommentForm, setShowCommentForm] = useState(false);
  const [existingEvaluation, setExistingEvaluation] = useState<Evaluation | null>(null);

  useEffect(() => {
    loadEvaluations();
  }, [companySlug, user]);

  const loadEvaluations = async () => {
    try {
      // Fetch all evaluations for this company
      const { data: evals, error } = await supabase
        .from('company_evaluations')
        .select('*')
        .eq('company_slug', companySlug)
        .order('created_at', { ascending: false });

      if (error) throw error;

      setEvaluations(evals || []);

      // Check if current user has an evaluation
      if (user) {
        const userEval = evals?.find(e => e.user_id === user.id);
        if (userEval) {
          setExistingEvaluation(userEval);
          setUserRating(userEval.rating);
          setUserComment(userEval.comment || '');
        }
      }
    } catch (error) {
      console.error('Error loading evaluations:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!user) {
      toast.error('Please sign in to rate companies');
      return;
    }

    if (userRating === 0) {
      toast.error('Please select a rating');
      return;
    }

    setSubmitting(true);
    try {
      if (existingEvaluation) {
        // Update existing evaluation
        const { error } = await supabase
          .from('company_evaluations')
          .update({
            rating: userRating,
            comment: userComment.trim() || null,
          })
          .eq('id', existingEvaluation.id);

        if (error) throw error;
        toast.success('Your evaluation has been updated');
      } else {
        // Create new evaluation
        const { error } = await supabase
          .from('company_evaluations')
          .insert({
            user_id: user.id,
            company_slug: companySlug,
            rating: userRating,
            comment: userComment.trim() || null,
          });

        if (error) throw error;
        toast.success('Thank you for your evaluation!');
      }

      setShowCommentForm(false);
      loadEvaluations();
    } catch (error: any) {
      toast.error(error.message || 'Failed to submit evaluation');
    } finally {
      setSubmitting(false);
    }
  };

  const renderStars = (rating: number, interactive = false, size = 'md') => {
    const sizeClasses = size === 'sm' ? 'h-4 w-4' : 'h-5 w-5';
    
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={cn(
              sizeClasses,
              interactive && 'cursor-pointer transition-colors',
              (interactive ? (hoveredStar || userRating) >= star : rating >= star)
                ? 'fill-yellow-400 text-yellow-400'
                : 'text-muted-foreground/30'
            )}
            onMouseEnter={() => interactive && setHoveredStar(star)}
            onMouseLeave={() => interactive && setHoveredStar(0)}
            onClick={() => interactive && setUserRating(star)}
          />
        ))}
      </div>
    );
  };

  if (loading) {
    return (
      <div className={cn('animate-pulse space-y-4', className)}>
        <div className="h-8 bg-muted rounded w-1/3" />
        <div className="h-20 bg-muted rounded" />
      </div>
    );
  }

  return (
    <div className={cn('space-y-6', className)}>
      <h3 className="font-heading font-semibold text-lg flex items-center gap-2">
        <MessageSquare className="h-5 w-5 text-primary" />
        Community Evaluations ({evaluations.length})
      </h3>

      {/* User Rating Section */}
      {user ? (
        <div className="p-4 rounded-lg border border-border bg-secondary/30">
          <p className="text-sm text-muted-foreground mb-3">
            {existingEvaluation ? 'Update your rating:' : 'Rate this organization:'}
          </p>
          <div className="flex items-center gap-4 mb-3">
            {renderStars(userRating, true)}
            {userRating > 0 && (
              <span className="text-sm text-muted-foreground">
                {userRating}/5 stars
              </span>
            )}
          </div>
          
          {!showCommentForm && userRating > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowCommentForm(true)}
            >
              {existingEvaluation ? 'Update Comment' : 'Add Comment'}
            </Button>
          )}

          {showCommentForm && (
            <div className="space-y-3 mt-3">
              <Textarea
                placeholder="Share your experience with this organization (optional)..."
                value={userComment}
                onChange={(e) => setUserComment(e.target.value)}
                rows={3}
              />
              <div className="flex gap-2">
                <Button
                  size="sm"
                  onClick={handleSubmit}
                  disabled={submitting || userRating === 0}
                >
                  {submitting ? 'Submitting...' : existingEvaluation ? 'Update' : 'Submit'}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowCommentForm(false)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}

          {!showCommentForm && userRating > 0 && !existingEvaluation && (
            <Button
              size="sm"
              className="ml-2"
              onClick={handleSubmit}
              disabled={submitting}
            >
              {submitting ? 'Submitting...' : 'Submit Rating'}
            </Button>
          )}
        </div>
      ) : (
        <div className="p-4 rounded-lg border border-border bg-secondary/30 text-center">
          <p className="text-sm text-muted-foreground mb-2">
            Sign in to rate this organization
          </p>
          <Link to="/auth/login">
            <Button size="sm">Sign In</Button>
          </Link>
        </div>
      )}

      {/* Evaluations List */}
      {evaluations.length > 0 ? (
        <div className="space-y-4">
          {evaluations.slice(0, 5).map((evaluation) => (
            <div
              key={evaluation.id}
              className="p-4 rounded-lg border border-border/50 bg-card"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    {renderStars(evaluation.rating, false, 'sm')}
                    <span className="text-xs text-muted-foreground">
                      {new Date(evaluation.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  {evaluation.comment && (
                    <p className="text-sm text-foreground">{evaluation.comment}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
          
          {evaluations.length > 5 && (
            <p className="text-sm text-muted-foreground text-center">
              +{evaluations.length - 5} more evaluations
            </p>
          )}
        </div>
      ) : (
        <p className="text-sm text-muted-foreground text-center py-4">
          No evaluations yet. Be the first to rate!
        </p>
      )}
    </div>
  );
}