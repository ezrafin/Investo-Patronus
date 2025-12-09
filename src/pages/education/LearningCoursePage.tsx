import { Layout } from '@/components/layout/Layout';
import { Rocket, CheckCircle, Clock, Users, Star, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { toast } from 'sonner';

const courseModules = [
  { title: 'Introduction to Financial Markets', lessons: 8, duration: '2 hours' },
  { title: 'Understanding Asset Classes', lessons: 12, duration: '3 hours' },
  { title: 'Technical Analysis Fundamentals', lessons: 15, duration: '4 hours' },
  { title: 'Fundamental Analysis Deep Dive', lessons: 14, duration: '4 hours' },
  { title: 'Portfolio Construction & Management', lessons: 10, duration: '3 hours' },
  { title: 'Risk Management Strategies', lessons: 8, duration: '2 hours' },
  { title: 'Advanced Trading Strategies', lessons: 12, duration: '3.5 hours' },
  { title: 'Psychology of Investing', lessons: 6, duration: '1.5 hours' },
];

const features = [
  'Self-paced learning modules',
  'Interactive quizzes and assessments',
  'Real-world case studies',
  'Certificate upon completion',
  'Lifetime access to materials',
  'Community discussion forums',
];

export default function LearningCoursePage() {
  const [email, setEmail] = useState('');

  const handleNotify = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast.success('You will be notified when the course launches!');
      setEmail('');
    }
  };

  return (
    <Layout>
      <div className="pt-24 pb-16">
        <section className="container-wide section-spacing-sm">
          {/* Hero */}
          <div className="max-w-4xl mx-auto text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-6">
              <Rocket className="h-4 w-4" />
              <span className="text-sm font-medium">Coming Soon</span>
            </div>
            <h1 className="heading-hero mb-6">
              Master the Markets
              <span className="block gradient-text">Investment Course</span>
            </h1>
            <p className="body-xl max-w-2xl mx-auto mb-8">
              A comprehensive, structured learning program designed to take you from beginner to confident investor. Our expert-led curriculum covers everything you need to succeed.
            </p>

            {/* Notify Form */}
            <form onSubmit={handleNotify} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1"
              />
              <Button type="submit">
                <Bell className="h-4 w-4 mr-2" />
                Notify Me
              </Button>
            </form>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            <div className="glass-card p-6 text-center">
              <div className="heading-lg text-primary mb-2">85+</div>
              <div className="text-sm text-muted-foreground">Video Lessons</div>
            </div>
            <div className="glass-card p-6 text-center">
              <div className="heading-lg text-primary mb-2">23+</div>
              <div className="text-sm text-muted-foreground">Hours of Content</div>
            </div>
            <div className="glass-card p-6 text-center">
              <div className="heading-lg text-primary mb-2">8</div>
              <div className="text-sm text-muted-foreground">Comprehensive Modules</div>
            </div>
            <div className="glass-card p-6 text-center">
              <div className="heading-lg text-primary mb-2">1</div>
              <div className="text-sm text-muted-foreground">Certification</div>
            </div>
          </div>

          {/* Course Modules */}
          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            <div>
              <h2 className="heading-lg mb-6">Course Curriculum</h2>
              <div className="space-y-3">
                {courseModules.map((module, index) => (
                  <div key={module.title} className="glass-card p-4 flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-primary font-semibold">{index + 1}</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">{module.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {module.lessons} lessons • {module.duration}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="heading-lg mb-6">What You Will Get</h2>
              <div className="glass-card p-8">
                <ul className="space-y-4">
                  {features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8 pt-8 border-t border-border">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex -space-x-2">
                      {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="w-8 h-8 rounded-full bg-secondary border-2 border-background" />
                      ))}
                    </div>
                    <div className="text-sm">
                      <span className="font-medium">2,500+</span>
                      <span className="text-muted-foreground"> students waiting</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                    ))}
                    <span className="text-sm text-muted-foreground ml-2">Based on pilot program feedback</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="glass-card p-8 lg:p-12 text-center">
            <h2 className="heading-md mb-4">Be the First to Know</h2>
            <p className="body-lg mb-6 max-w-2xl mx-auto">
              Join our waitlist to get early access and exclusive launch pricing when the course becomes available.
            </p>
            <form onSubmit={handleNotify} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1"
              />
              <Button type="submit" size="lg">
                Join Waitlist
              </Button>
            </form>
          </div>
        </section>
      </div>
    </Layout>
  );
}
