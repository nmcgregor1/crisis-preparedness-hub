import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Phone, Clock } from 'lucide-react';

const Contact = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-secondary py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-primary mb-6">
            Contact & Support
          </h1>
          <p className="text-lg text-muted-foreground">
            Ready to protect your business? Get in touch with our crisis management experts.
          </p>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card>
              <CardHeader>
                <CardTitle>Get Started Today</CardTitle>
                <CardDescription>
                  Fill out the form below and we'll contact you within 24 hours to discuss 
                  your crisis management needs.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <form className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" placeholder="John" />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" placeholder="Smith" />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="email">Business Email</Label>
                    <Input id="email" type="email" placeholder="john@company.com" />
                  </div>
                  
                  <div>
                    <Label htmlFor="company">Company Name</Label>
                    <Input id="company" placeholder="Your Company" />
                  </div>
                  
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" type="tel" placeholder="(555) 123-4567" />
                  </div>
                  
                  <div>
                    <Label htmlFor="message">Tell us about your business and crisis management needs</Label>
                    <Textarea 
                      id="message" 
                      placeholder="Describe your business, current challenges, and what type of crisis management support you're looking for..."
                      className="min-h-[120px]"
                    />
                  </div>
                  
          <Button 
            type="submit" 
            size="lg" 
            variant="accent"
            className="w-full"
          >
            Contact us to get started
          </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <div className="space-y-8">
              <Card>
                <CardHeader className="flex flex-row items-center space-y-0 pb-2">
                  <Mail className="h-6 w-6 text-primary mr-3" />
                  <CardTitle className="text-lg">Email Support</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="mb-2">
                    For general inquiries and support:
                  </CardDescription>
                  <a 
                    href="mailto:support@crisistance.com" 
                    className="text-primary hover:underline font-medium"
                  >
                    support@crisistance.com
                  </a>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center space-y-0 pb-2">
                  <Phone className="h-6 w-6 text-primary mr-3" />
                  <CardTitle className="text-lg">Emergency Hotline</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="mb-2">
                    24/7 crisis response for existing clients:
                  </CardDescription>
                  <a 
                    href="tel:1-800-CRISIS-1" 
                    className="text-primary hover:underline font-medium text-lg"
                  >
                    1-800-CRISIS-1
                  </a>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center space-y-0 pb-2">
                  <Clock className="h-6 w-6 text-primary mr-3" />
                  <CardTitle className="text-lg">Response Times</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">General Inquiries:</span>
                    <span className="font-medium">24 hours</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Crisis Support:</span>
                    <span className="font-medium">Immediate</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Consultation Booking:</span>
                    <span className="font-medium">Same day</span>
                  </div>
                </CardContent>
              </Card>

              <div className="bg-secondary p-6 rounded-lg">
                <h3 className="font-semibold text-primary mb-3">What Happens Next?</h3>
                <ol className="space-y-2 text-sm text-muted-foreground">
                  <li>1. We'll review your submission and contact you within 24 hours</li>
                  <li>2. Schedule a free 30-minute consultation to assess your needs</li>
                  <li>3. Receive a customized crisis management proposal</li>
                  <li>4. Begin implementing your protection plan immediately</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;