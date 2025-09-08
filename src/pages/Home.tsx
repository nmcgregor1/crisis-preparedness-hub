import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { Shield, Users, AlertTriangle, CheckCircle } from 'lucide-react';
const Home = () => {
  return <div>
      {/* Hero Section */}
      

      {/* Service Cards */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <CheckCircle className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Planning</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Comprehensive crisis preparation strategies tailored to your business needs.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Managed Service</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Expert-led crisis management support when you need it most.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Disaster Recovery</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Rapid recovery solutions to get your business back on track quickly.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-secondary py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-primary text-center mb-12">
            Why Choose Crisistance?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <h3 className="font-semibold text-primary mb-2">Small Business Focus</h3>
              <p className="text-sm text-muted-foreground">
                Tailored solutions for small business constraints and resources.
              </p>
            </div>
            <div className="text-center">
              <h3 className="font-semibold text-primary mb-2">Proven Methods</h3>
              <p className="text-sm text-muted-foreground">
                Evidence-based crisis management frameworks that work.
              </p>
            </div>
            <div className="text-center">
              <h3 className="font-semibold text-primary mb-2">Rapid Response</h3>
              <p className="text-sm text-muted-foreground">
                Quick deployment when crisis strikes your business.
              </p>
            </div>
            <div className="text-center">
              <h3 className="font-semibold text-primary mb-2">Affordable Protection</h3>
              <p className="text-sm text-muted-foreground">
                Enterprise-level crisis management at small business prices.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Risk Types Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-primary text-center mb-12">
            Crisis Types We Handle
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                <AlertTriangle className="h-5 w-5 text-accent" />
              </div>
              <div>
                <h3 className="font-semibold text-primary mb-2">Operational Crises</h3>
                <p className="text-muted-foreground">
                  Supply chain disruptions, system failures, and operational breakdowns.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                <AlertTriangle className="h-5 w-5 text-accent" />
              </div>
              <div>
                <h3 className="font-semibold text-primary mb-2">Financial Emergencies</h3>
                <p className="text-muted-foreground">
                  Cash flow crises, unexpected expenses, and financial market volatility.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                <AlertTriangle className="h-5 w-5 text-accent" />
              </div>
              <div>
                <h3 className="font-semibold text-primary mb-2">Reputational Threats</h3>
                <p className="text-muted-foreground">
                  Public relations crises, social media incidents, and brand damage control.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                <AlertTriangle className="h-5 w-5 text-accent" />
              </div>
              <div>
                <h3 className="font-semibold text-primary mb-2">Natural Disasters</h3>
                <p className="text-muted-foreground">
                  Weather events, earthquakes, floods, and other natural catastrophes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-primary-foreground mb-6">
            Ready to Protect Your Business?
          </h2>
          <p className="text-lg text-primary-foreground/90 mb-8">
            Don't wait for crisis to strike. Get prepared today with Crisistance.
          </p>
          <Button asChild size="lg" variant="accent">
            <Link to="/contact">Contact us to get started</Link>
          </Button>
        </div>
      </section>
    </div>;
};
export default Home;