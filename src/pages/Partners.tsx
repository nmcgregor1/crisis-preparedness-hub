import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Partners = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-secondary py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-primary mb-6">
            Strategic Partners & Alliances
          </h1>
          <p className="text-lg text-muted-foreground mb-8">
            Collaborating with industry leaders to deliver comprehensive crisis management 
            solutions for small businesses.
          </p>
          <Button asChild size="lg" variant="accent">
            <Link to="/contact">Explore Partnership Opportunities</Link>
          </Button>
        </div>
      </section>

      {/* Coming Soon Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-primary mb-6">
            Partner Information Coming Soon
          </h2>
          <p className="text-muted-foreground mb-8">
            We're building strategic partnerships with technology providers, emergency services, 
            business consultants, and industry specialists to enhance our crisis management 
            capabilities. This page will soon showcase our partner network and collaboration opportunities.
          </p>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Interested in partnering with Crisistance or learning about our current partnerships? 
              Contact us to explore opportunities.
            </p>
            <Button asChild>
              <Link to="/contact">Discuss Partnerships</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Partners;