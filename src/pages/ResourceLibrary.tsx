import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const ResourceLibrary = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-secondary py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-primary mb-6">
            Crisis Management Resource Library
          </h1>
          <p className="text-lg text-muted-foreground mb-8">
            Essential tools, templates, and guides for small business crisis preparedness 
            and response planning.
          </p>
          <Button asChild size="lg" variant="accent">
            <Link to="/contact">Request Access to Resources</Link>
          </Button>
        </div>
      </section>

      {/* Coming Soon Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-primary mb-6">
            Resource Library Coming Soon
          </h2>
          <p className="text-muted-foreground mb-8">
            We're building a comprehensive library of crisis management resources specifically 
            designed for small businesses. This will include templates, checklists, planning 
            guides, and educational materials.
          </p>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Contact us to be notified when our resource library launches and to access 
              our preliminary planning materials.
            </p>
            <Button asChild>
              <Link to="/contact">Get Early Access</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ResourceLibrary;