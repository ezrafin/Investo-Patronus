import { Layout } from '@/components/layout/Layout';
import { Calendar, Clock, MapPin, Video, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';

const upcomingEvents = [
  {
    title: '2025 Market Outlook Webinar',
    date: 'January 15, 2025',
    time: '2:00 PM EST',
    type: 'Webinar',
    speaker: 'Michael Chen, Senior Market Analyst',
    description: 'Join us for an in-depth analysis of what to expect in the markets for 2025.',
    attendees: 1250,
  },
  {
    title: 'Cryptocurrency Trading Masterclass',
    date: 'January 22, 2025',
    time: '11:00 AM EST',
    type: 'Online Workshop',
    speaker: 'Sarah Johnson, Crypto Expert',
    description: 'Learn advanced cryptocurrency trading strategies and risk management.',
    attendees: 890,
  },
  {
    title: 'Annual Investment Conference',
    date: 'February 10-11, 2025',
    time: '9:00 AM - 5:00 PM EST',
    type: 'In-Person',
    location: 'New York Marriott Marquis',
    description: 'Our flagship annual conference featuring top industry speakers and networking.',
    attendees: 2500,
  },
];

const pastEvents = [
  {
    title: 'Q4 2024 Earnings Preview',
    date: 'December 1, 2024',
    type: 'Webinar',
    recording: true,
  },
  {
    title: 'Fixed Income Strategies Workshop',
    date: 'November 15, 2024',
    type: 'Online Workshop',
    recording: true,
  },
  {
    title: 'ETF Investing 101',
    date: 'November 1, 2024',
    type: 'Webinar',
    recording: true,
  },
];

export default function EventsPage() {
  return (
    <Layout>
      <div className="pt-24 pb-16">
        <section className="container-wide section-spacing-sm">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <span className="badge-primary mb-4">Events</span>
            <h1 className="heading-xl mb-6">Upcoming Events</h1>
            <p className="body-xl">
              Join our webinars, workshops, and conferences to learn from industry experts.
            </p>
          </div>

          {/* Upcoming Events */}
          <div className="space-y-6 mb-16">
            {upcomingEvents.map((event) => (
              <div key={event.title} className="glass-card-hover p-6 lg:p-8">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="badge-primary">{event.type}</span>
                      {event.attendees && (
                        <span className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Users className="h-4 w-4" />
                          {event.attendees} registered
                        </span>
                      )}
                    </div>
                    <h3 className="heading-sm mb-2">{event.title}</h3>
                    <p className="body-md mb-4">{event.description}</p>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {event.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {event.time}
                      </span>
                      {event.location && (
                        <span className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {event.location}
                        </span>
                      )}
                    </div>
                    <p className="text-sm mt-2">
                      <span className="text-muted-foreground">Speaker: </span>
                      <span className="font-medium">{event.speaker}</span>
                    </p>
                  </div>
                  <Button size="lg" className="flex-shrink-0">
                    Register Now
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* Past Events */}
          <div>
            <h2 className="heading-md mb-6">Past Events</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {pastEvents.map((event) => (
                <div key={event.title} className="glass-card p-6">
                  <span className="badge-secondary mb-3">{event.type}</span>
                  <h3 className="font-semibold mb-2">{event.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{event.date}</p>
                  {event.recording && (
                    <Button variant="outline" size="sm" className="w-full">
                      <Video className="h-4 w-4 mr-2" />
                      Watch Recording
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
