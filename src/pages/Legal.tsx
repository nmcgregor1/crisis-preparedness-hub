import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { AlertTriangle, Shield, MapPin } from 'lucide-react';

const Legal = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-secondary py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-primary mb-6">
            Legal Information & Privacy
          </h1>
          <p className="text-lg text-muted-foreground">
            Important legal disclaimers, privacy policies, and consent information.
          </p>
        </div>
      </section>

      {/* Jurisdictional Notices */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <Card>
            <CardHeader className="flex flex-row items-center space-y-0 pb-2">
              <MapPin className="h-6 w-6 text-primary mr-3" />
              <CardTitle>Canada - Legal Disclaimers</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <CardDescription>
                For Canadian clients and operations:
              </CardDescription>
              <div className="text-sm space-y-2">
                <p>
                  <strong>Professional Services:</strong> Crisistance provides crisis management 
                  consulting services. We are not emergency responders, legal advisors, or 
                  insurance providers. Always contact appropriate emergency services (911) for 
                  immediate safety threats.
                </p>
                <p>
                  <strong>Limitation of Liability:</strong> Our services are advisory in nature. 
                  We cannot guarantee prevention of crises or specific outcomes. Clients remain 
                  responsible for all business decisions and their consequences.
                </p>
                <p>
                  <strong>Privacy Compliance:</strong> We comply with Canadian privacy legislation 
                  including PIPEDA. Client information is handled in accordance with our privacy 
                  policy and applicable Canadian privacy laws.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center space-y-0 pb-2">
              <MapPin className="h-6 w-6 text-primary mr-3" />
              <CardTitle>United States - Legal Disclaimers</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <CardDescription>
                For US clients and operations:
              </CardDescription>
              <div className="text-sm space-y-2">
                <p>
                  <strong>Professional Services:</strong> Crisistance provides business consulting 
                  services related to crisis management and business continuity planning. We are 
                  not licensed emergency responders, attorneys, or insurance agents.
                </p>
                <p>
                  <strong>No Guarantee of Outcomes:</strong> While our methods are evidence-based, 
                  we cannot guarantee specific results or prevention of business losses. Each 
                  crisis situation is unique and outcomes depend on many factors beyond our control.
                </p>
                <p>
                  <strong>State Compliance:</strong> Our services comply with applicable state and 
                  federal business consulting regulations. We recommend clients consult with 
                  local legal and insurance professionals for jurisdiction-specific advice.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center space-y-0 pb-2">
              <AlertTriangle className="h-6 w-6 text-accent mr-3" />
              <CardTitle>Global Operations - General Disclaimers</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <CardDescription>
                For clients in other jurisdictions:
              </CardDescription>
              <div className="text-sm space-y-2">
                <p>
                  <strong>Jurisdictional Compliance:</strong> Clients outside Canada and the US 
                  are responsible for ensuring our services comply with local laws and regulations. 
                  We recommend consulting with local legal counsel before engagement.
                </p>
                <p>
                  <strong>Cross-Border Services:</strong> Our services may involve cross-border 
                  data transfer and communications. By engaging our services, clients consent to 
                  such transfers as necessary for service delivery.
                </p>
                <p>
                  <strong>Local Emergency Services:</strong> Always contact your local emergency 
                  services for immediate safety threats. Our services supplement but never replace 
                  official emergency response systems.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <Separator className="my-8" />

      {/* Privacy & Consent */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card>
            <CardHeader className="flex flex-row items-center space-y-0 pb-2">
              <Shield className="h-6 w-6 text-primary mr-3" />
              <CardTitle>Privacy Policy & Consent</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-semibold text-primary mb-2">Information Collection</h3>
                <p className="text-sm text-muted-foreground">
                  We collect only the information necessary to provide our crisis management 
                  services, including business contact details, operational information, and 
                  crisis-related data shared during consultations.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-primary mb-2">Information Use</h3>
                <p className="text-sm text-muted-foreground">
                  Client information is used solely for service delivery, crisis response 
                  coordination, and business communication. We do not sell, rent, or share 
                  client information with third parties except as required for service 
                  delivery or by law.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-primary mb-2">Data Security</h3>
                <p className="text-sm text-muted-foreground">
                  We implement industry-standard security measures to protect client data. 
                  However, no electronic system is completely secure, and clients acknowledge 
                  the inherent risks of digital communication and data storage.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-primary mb-2">Consent</h3>
                <p className="text-sm text-muted-foreground">
                  By engaging our services, clients consent to our collection, use, and 
                  storage of information as described in this policy and as necessary for 
                  crisis management service delivery.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-primary mb-2">Contact for Privacy Matters</h3>
                <p className="text-sm text-muted-foreground">
                  For questions about our privacy practices or to exercise your privacy rights, 
                  contact us at{' '}
                  <a 
                    href="mailto:privacy@crisistance.com" 
                    className="text-primary hover:underline"
                  >
                    privacy@crisistance.com
                  </a>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Update Information */}
      <section className="bg-secondary py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm text-muted-foreground">
            Last updated: {new Date().toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            We may update these terms from time to time. Clients will be notified of 
            material changes via email or through our service platform.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Legal;