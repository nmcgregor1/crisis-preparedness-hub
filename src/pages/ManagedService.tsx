import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const ManagedService = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-secondary py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-primary mb-6">
            Managed Crisis Response Service
          </h1>
          <p className="text-lg text-muted-foreground mb-8">
            Expert-led crisis management support when you need it most. Our managed service 
            provides 24/7 crisis response capabilities tailored for small businesses.
          </p>
          <Button asChild size="lg" variant="accent">
            <Link to="/contact">Learn More About Our Service</Link>
          </Button>
        </div>
      </section>

      {/* Coming Soon Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-primary mb-6">
            Comprehensive Service Details Coming Soon
          </h2>
          <p className="text-muted-foreground mb-8">
            We're finalizing the details of our managed service offering. This page will soon 
            include detailed information about our crisis response protocols, service levels, 
            pricing, and case studies.
          </p>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              In the meantime, contact us to discuss your specific crisis management needs.
            </p>
            <Button asChild>
              <Link to="/contact">Contact Our Team</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ManagedService;