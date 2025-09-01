import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { Target, Users, Award } from 'lucide-react';

const About = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-secondary py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-primary mb-6">
            About Crisistance
          </h1>
          <p className="text-lg text-muted-foreground">
            We help small businesses prepare for, respond to, and recover from crises 
            with purpose-built solutions that fit your needs and budget.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-primary mb-6">Our Mission</h2>
              <p className="text-muted-foreground mb-4">
                Small businesses are the backbone of our economy, yet they often lack the resources 
                for comprehensive crisis management. We bridge that gap by providing enterprise-level 
                crisis preparedness and response capabilities at a scale and price point that works 
                for small business owners.
              </p>
              <p className="text-muted-foreground mb-6">
                Our approach combines proven methodologies with practical implementation, ensuring 
                your business can weather any storm and emerge stronger.
              </p>
              <Button asChild>
                <Link to="/contact">Learn How We Can Help</Link>
              </Button>
            </div>
            
            <div className="space-y-6">
              <Card>
                <CardHeader className="flex flex-row items-center space-y-0 pb-2">
                  <Target className="h-6 w-6 text-primary mr-3" />
                  <CardTitle className="text-lg">Purpose-Driven</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Every solution is designed with small business realities in mind.
                  </CardDescription>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center space-y-0 pb-2">
                  <Users className="h-6 w-6 text-primary mr-3" />
                  <CardTitle className="text-lg">Expert Team</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Crisis management professionals with real-world experience.
                  </CardDescription>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center space-y-0 pb-2">
                  <Award className="h-6 w-6 text-primary mr-3" />
                  <CardTitle className="text-lg">Proven Results</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Track record of helping businesses survive and thrive through crises.
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-secondary py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-primary text-center mb-12">
            How It Works
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                1
              </div>
              <h3 className="text-xl font-semibold text-primary mb-4">Assessment</h3>
              <p className="text-muted-foreground">
                We evaluate your business vulnerabilities, resources, and specific risk profile 
                to understand your unique needs.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                2
              </div>
              <h3 className="text-xl font-semibold text-primary mb-4">Planning</h3>
              <p className="text-muted-foreground">
                Together, we develop comprehensive crisis management plans tailored to your 
                business size, industry, and budget constraints.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                3
              </div>
              <h3 className="text-xl font-semibold text-primary mb-4">Protection</h3>
              <p className="text-muted-foreground">
                Your business is prepared with actionable plans, ongoing monitoring, and 
                rapid response capabilities when crises occur.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Credibility Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-primary mb-8">
            Trusted by Small Business Owners
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Our team brings decades of combined experience in crisis management, business continuity, 
            and small business operations. We understand both the theory and the practical realities 
            of keeping a small business running during turbulent times.
          </p>
          <p className="text-muted-foreground mb-8">
            From family-owned restaurants to growing tech startups, we've helped businesses across 
            industries prepare for and navigate through their most challenging moments.
          </p>
          <Button asChild size="lg" variant="accent">
            <Link to="/contact">Start Your Protection Today</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default About;