import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const IncidentMonitoring = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-secondary py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-primary mb-6">
            Incident Monitoring & Early Warning
          </h1>
          <p className="text-lg text-muted-foreground mb-8">
            Proactive monitoring systems to detect potential crises before they impact 
            your business operations.
          </p>
          <Button asChild size="lg" variant="accent">
            <Link to="/contact">Learn About Our Monitoring</Link>
          </Button>
        </div>
      </section>

      {/* Coming Soon Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-primary mb-6">
            Monitoring Service Details Coming Soon
          </h2>
          <p className="text-muted-foreground mb-8">
            We're developing advanced monitoring capabilities that will help small businesses 
            detect and prepare for potential crises before they occur. This page will soon 
            detail our monitoring systems, alert protocols, and integration options.
          </p>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Contact us to discuss your monitoring needs and learn about our current 
              early warning capabilities.
            </p>
            <Button asChild>
              <Link to="/contact">Discuss Monitoring Options</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default IncidentMonitoring;