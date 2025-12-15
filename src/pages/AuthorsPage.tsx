import { Layout } from '@/components/layout/Layout';
import { Link } from 'react-router-dom';
import { authors } from '@/data/authors';

export default function AuthorsPage() {
  return (
    <Layout>
      <div className="pt-24 pb-16">
        <section className="container-wide section-spacing-sm">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <span className="badge-primary mb-4">Authors</span>
            <h1 className="heading-xl mb-6">Meet Our Experts</h1>
            <p className="body-xl">
              Our team of experienced analysts and writers bring you the insights you need to make informed investment decisions.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {authors.map((author) => (
              <div key={author.id} className="glass-card-hover p-6 text-center">
                <img
                  src={author.avatar_url ?? undefined}
                  alt={author.display_name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-2 border-border"
                />
                <h3 className="heading-xs mb-1">{author.display_name}</h3>
                <p className="text-sm text-primary mb-3">{author.bio}</p>
                <div className="text-sm text-muted-foreground">
                  {author.post_count} articles published
                </div>
              </div>
            ))}
          </div>

          {/* Become an Author */}
          <div className="mt-16 glass-card p-8 lg:p-12 text-center">
            <h2 className="heading-md mb-4">Want to Contribute?</h2>
            <p className="body-lg mb-6 max-w-2xl mx-auto">
              We are always looking for knowledgeable writers to join our team. Share your expertise with our audience.
            </p>
            <Link to="/contact" className="btn-primary">
              Apply to Write
            </Link>
          </div>
        </section>
      </div>
    </Layout>
  );
}
