import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { FileText, Mail, ArrowLeft, ArrowRight, CheckCircle, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface FormData {
  // Section 1
  businessName: string;
  location: string;
  employees: string;
  industry: string;
  email: string;
  // Section 2
  physicalLocation: string;
  sqft: string;
  ownRent: string;
  infrastructure: string[];
  // Section 3
  criticalProducts: string;
  functions: string[];
  tools: string;
  records: string;
  // Section 4
  hazards: string[];
  recentDisruption: string;
  insurance: string;
  // Section 5
  backupStaff: string;
  notifyTime: string;
  commChannel: string;
  emergencyContacts: string;
  // Section 6
  surviveTime: string;
  priority: string;
  support: string;
  consent: boolean;
}

const initialFormData: FormData = {
  businessName: '',
  location: '',
  employees: '',
  industry: '',
  email: '',
  physicalLocation: '',
  sqft: '',
  ownRent: '',
  infrastructure: [],
  criticalProducts: '',
  functions: [],
  tools: '',
  records: '',
  hazards: [],
  recentDisruption: '',
  insurance: '',
  backupStaff: '',
  notifyTime: '',
  commChannel: '',
  emergencyContacts: '',
  surviveTime: '',
  priority: '',
  support: 'freeResources',
  consent: false,
};

const TOTAL_STEPS = 6;

const ChipSelect = ({ 
  options, 
  selected, 
  onChange,
  allowNone = false 
}: { 
  options: string[]; 
  selected: string[]; 
  onChange: (values: string[]) => void;
  allowNone?: boolean;
}) => {
  const handleClick = (value: string) => {
    if (value === 'None' || value === 'None of the above') {
      onChange([value]);
    } else {
      const newSelected = selected.filter(s => s !== 'None' && s !== 'None of the above');
      if (selected.includes(value)) {
        onChange(newSelected.filter(s => s !== value));
      } else {
        onChange([...newSelected, value]);
      }
    }
  };

  return (
    <div className="flex flex-wrap gap-2">
      {options.map((option) => (
        <Badge
          key={option}
          variant={selected.includes(option) ? "default" : "outline"}
          className="cursor-pointer px-3 py-2 text-sm hover:bg-primary/10 transition-colors"
          onClick={() => handleClick(option)}
        >
          {option}
        </Badge>
      ))}
      {allowNone && (
        <Badge
          variant={selected.includes('None') ? "default" : "outline"}
          className="cursor-pointer px-3 py-2 text-sm hover:bg-primary/10 transition-colors"
          onClick={() => handleClick('None')}
        >
          None of the above
        </Badge>
      )}
    </div>
  );
};

const GetStarted = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const progress = ((currentStep - 1) / (TOTAL_STEPS - 1)) * 100;

  const updateField = <K extends keyof FormData>(field: K, value: FormData[K]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        if (!formData.email || !validateEmail(formData.email)) {
          toast({
            title: "Please enter a valid email address",
            variant: "destructive",
          });
          return false;
        }
        return !!(formData.businessName && formData.location && formData.employees && formData.industry && formData.email);
      case 2:
        return !!(formData.physicalLocation && formData.ownRent);
      case 3:
        return !!(formData.records);
      case 4:
        return !!(formData.insurance);
      case 5:
        return !!(formData.backupStaff && formData.notifyTime && formData.emergencyContacts);
      case 6:
        return !!(formData.surviveTime && formData.priority && formData.consent);
      default:
        return true;
    }
  };

  const nextStep = () => {
    if (!validateStep(currentStep)) {
      if (currentStep !== 1 || (formData.email && validateEmail(formData.email))) {
        toast({
          title: "Please complete all required fields",
          variant: "destructive",
        });
      }
      return;
    }
    if (currentStep < TOTAL_STEPS) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    if (!validateStep(currentStep)) {
      toast({
        title: "Please complete all required fields",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { data, error } = await supabase.functions.invoke('submit-free-plan', {
        body: formData,
      });

      if (error) {
        throw error;
      }

      setIsSubmitted(true);
      toast({
        title: "Submission Received!",
        description: "We'll review your information and send your customized plan to your email.",
      });
    } catch (error: any) {
      console.error('Submission error:', error);
      toast({
        title: "Submission Failed",
        description: "Please try again or contact us at info@crisistance.com",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-primary">Section 1 — Basic Company Info</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="businessName">Business name *</Label>
                <Input
                  id="businessName"
                  value={formData.businessName}
                  onChange={(e) => updateField('businessName', e.target.value)}
                  placeholder="ACME Bakery Inc."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Your email address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => updateField('email', e.target.value)}
                  placeholder="you@company.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">City, Province *</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => updateField('location', e.target.value)}
                  placeholder="Ottawa, ON"
                />
              </div>
              <div className="space-y-2">
                <Label>How many employees? *</Label>
                <Select value={formData.employees} onValueChange={(v) => updateField('employees', v)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1-5">1–5</SelectItem>
                    <SelectItem value="6-20">6–20</SelectItem>
                    <SelectItem value="21-50">21–50</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label>Industry *</Label>
                <Select value={formData.industry} onValueChange={(v) => updateField('industry', v)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Retail">Retail</SelectItem>
                    <SelectItem value="Professional services">Professional services</SelectItem>
                    <SelectItem value="Trades / Contracting">Trades / Contracting</SelectItem>
                    <SelectItem value="Hospitality">Hospitality</SelectItem>
                    <SelectItem value="Health & wellness">Health & wellness</SelectItem>
                    <SelectItem value="Manufacturing / Light industrial">Manufacturing / Light industrial</SelectItem>
                    <SelectItem value="Nonprofit">Nonprofit</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-primary">Section 2 — Physical Location & Infrastructure</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Physical location type *</Label>
                <Select value={formData.physicalLocation} onValueChange={(v) => updateField('physicalLocation', v)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Yes — office">Yes — office</SelectItem>
                    <SelectItem value="Yes — storefront">Yes — storefront</SelectItem>
                    <SelectItem value="Yes — warehouse / industrial">Yes — warehouse / industrial</SelectItem>
                    <SelectItem value="No — home-based">No — home-based</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="sqft">Square footage (approx.)</Label>
                <Input
                  id="sqft"
                  value={formData.sqft}
                  onChange={(e) => updateField('sqft', e.target.value)}
                  placeholder="e.g. 1200"
                />
              </div>
              <div className="space-y-2">
                <Label>Own or rent? *</Label>
                <Select value={formData.ownRent} onValueChange={(v) => updateField('ownRent', v)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Own">Own</SelectItem>
                    <SelectItem value="Rent">Rent</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Does your location rely on any of the following? (select all)</Label>
              <ChipSelect
                options={['Refrigeration', 'Specialized equipment', 'Hazardous materials', 'Server room/on-prem systems']}
                selected={formData.infrastructure}
                onChange={(values) => updateField('infrastructure', values)}
                allowNone
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-primary">Section 3 — Key Business Operations</h2>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="criticalProducts">What products/services are most critical for revenue?</Label>
                <Textarea
                  id="criticalProducts"
                  value={formData.criticalProducts}
                  onChange={(e) => updateField('criticalProducts', e.target.value)}
                  placeholder="Describe your most important products or services..."
                />
              </div>
              <div className="space-y-2">
                <Label>Which functions must stay operational within 24–72 hours?</Label>
                <ChipSelect
                  options={['Payments', 'Sales/orders', 'Communications', 'Manufacturing/production', 'Delivery/fulfillment']}
                  selected={formData.functions}
                  onChange={(values) => updateField('functions', values)}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="tools">Tools/platforms you rely on</Label>
                  <Input
                    id="tools"
                    value={formData.tools}
                    onChange={(e) => updateField('tools', e.target.value)}
                    placeholder="e.g. Square, Shopify, Google Workspace"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Where are customer records stored? *</Label>
                  <Select value={formData.records} onValueChange={(v) => updateField('records', v)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="The cloud">The cloud</SelectItem>
                      <SelectItem value="Local computers">Local computers</SelectItem>
                      <SelectItem value="Paper files">Paper files</SelectItem>
                      <SelectItem value="Combination">Combination</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-primary">Section 4 — Risk Exposure</h2>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Which natural hazards are relevant to your region? (select all)</Label>
                <ChipSelect
                  options={['Flooding', 'Wildfire', 'Tornadoes', 'Winter storms', 'Heatwaves', 'Landslides', 'Earthquakes']}
                  selected={formData.hazards}
                  onChange={(values) => updateField('hazards', values)}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Have you experienced a disruption in the last 5 years?</Label>
                  <Select value={formData.recentDisruption} onValueChange={(v) => updateField('recentDisruption', v)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Power outage">Power outage</SelectItem>
                      <SelectItem value="Water damage">Water damage</SelectItem>
                      <SelectItem value="Smoke / air-quality closure">Smoke / air-quality closure</SelectItem>
                      <SelectItem value="Supply chain delay">Supply chain delay</SelectItem>
                      <SelectItem value="Technology outage">Technology outage</SelectItem>
                      <SelectItem value="None">None</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Insurance that covers interruptions? *</Label>
                  <Select value={formData.insurance} onValueChange={(v) => updateField('insurance', v)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Yes, with Business Interruption (BI) coverage">Yes, with BI coverage</SelectItem>
                      <SelectItem value="Yes, without BI">Yes, without BI</SelectItem>
                      <SelectItem value="No">No</SelectItem>
                      <SelectItem value="Unsure">Unsure</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-primary">Section 5 — People & Continuity</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Backup staff for critical roles? *</Label>
                <Select value={formData.backupStaff} onValueChange={(v) => updateField('backupStaff', v)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Yes">Yes</SelectItem>
                    <SelectItem value="No">No</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Staff notification speed needed? *</Label>
                <Select value={formData.notifyTime} onValueChange={(v) => updateField('notifyTime', v)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Immediately">Immediately</SelectItem>
                    <SelectItem value="Within 1 hour">Within 1 hour</SelectItem>
                    <SelectItem value="Same day">Same day</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Preferred communication channel</Label>
                <Select value={formData.commChannel} onValueChange={(v) => updateField('commChannel', v)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="SMS">SMS</SelectItem>
                    <SelectItem value="Email">Email</SelectItem>
                    <SelectItem value="Phone tree">Phone tree</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Documented emergency contacts? *</Label>
                <Select value={formData.emergencyContacts} onValueChange={(v) => updateField('emergencyContacts', v)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Yes">Yes</SelectItem>
                    <SelectItem value="No">No</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-primary">Section 6 — Recovery Priorities</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Survival time during full outage? *</Label>
                <Select value={formData.surviveTime} onValueChange={(v) => updateField('surviveTime', v)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="<24 hours">&lt;24 hours</SelectItem>
                    <SelectItem value="1–3 days">1–3 days</SelectItem>
                    <SelectItem value="4–7 days">4–7 days</SelectItem>
                    <SelectItem value="1–2 weeks">1–2 weeks</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Most important recovery? *</Label>
                <Select value={formData.priority} onValueChange={(v) => updateField('priority', v)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Protecting staff">Protecting staff</SelectItem>
                    <SelectItem value="Restoring operations">Restoring operations</SelectItem>
                    <SelectItem value="Protecting data & systems">Protecting data & systems</SelectItem>
                    <SelectItem value="Communicating with customers">Communicating with customers</SelectItem>
                    <SelectItem value="Financial stability">Financial stability</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Would you like additional support or training?</Label>
              <Select value={formData.support} onValueChange={(v) => updateField('support', v)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="freeResources">Yes — free resources</SelectItem>
                  <SelectItem value="consulting">Yes — consulting options</SelectItem>
                  <SelectItem value="no">No</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-start space-x-3 p-4 bg-secondary rounded-lg">
              <Checkbox
                id="consent"
                checked={formData.consent}
                onCheckedChange={(checked) => updateField('consent', checked as boolean)}
              />
              <div className="space-y-1">
                <Label htmlFor="consent" className="font-semibold cursor-pointer">Consent & Privacy *</Label>
                <p className="text-sm text-muted-foreground">
                  By checking this box you consent to Crisistance using your answers to create a customized recovery plan. 
                  We will not sell your data. For details, see our privacy policy.
                </p>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  if (isSubmitted) {
    return (
      <div className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card>
            <CardHeader className="text-center">
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <CardTitle className="text-2xl">Thank You!</CardTitle>
              <CardDescription className="text-lg">
                We've received your information for {formData.businessName}.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-secondary rounded-lg p-6 text-center">
                <h3 className="font-semibold text-lg mb-2">What happens next?</h3>
                <p className="text-muted-foreground mb-4">
                  Our team will review your responses and create a customized disaster recovery plan 
                  tailored to your business needs. You'll receive your plan via email at:
                </p>
                <p className="font-medium text-primary">{formData.email}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">Need immediate assistance?</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Contact us directly for urgent inquiries or consulting services.
                  </p>
                  <Button variant="outline" asChild className="gap-2 w-full">
                    <a href="mailto:info@crisistance.com">
                      <Mail className="h-4 w-4" />
                      Contact Us
                    </a>
                  </Button>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">Start another submission?</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Have another business location that needs a recovery plan?
                  </p>
                  <Button 
                    variant="outline" 
                    onClick={() => { 
                      setIsSubmitted(false); 
                      setCurrentStep(1); 
                      setFormData(initialFormData); 
                    }}
                    className="w-full"
                  >
                    New Submission
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Intro Card */}
        <Card className="mb-8 bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row justify-between gap-4">
              <div className="space-y-2">
                <h1 className="text-2xl font-bold text-primary flex items-center gap-2">
                  <FileText className="h-6 w-6" />
                  Free Natural Disaster Recovery Plan
                </h1>
                <p className="text-muted-foreground">
                  Complete this form and we'll create a customized disaster recovery plan 
                  with 24-hr, 72-hr, and 7-day actions tailored to your business.
                </p>
              </div>
              <div className="text-right">
                <Badge variant="secondary" className="mb-2">Free for ≤50 employees</Badge>
                <p className="text-xs text-muted-foreground">No payment, no ads.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between text-sm text-muted-foreground mb-2">
            <span>Step {currentStep} of {TOTAL_STEPS}</span>
            <span>{Math.round(progress)}% complete</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Form Card */}
        <Card>
          <CardContent className="p-6">
            {renderStep()}

            {/* Navigation */}
            <div className="flex justify-between mt-8 pt-6 border-t">
              <Button
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 1}
                className="gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </Button>
              
              {currentStep < TOTAL_STEPS ? (
                <Button onClick={nextStep} className="gap-2">
                  Next
                  <ArrowRight className="h-4 w-4" />
                </Button>
              ) : (
                <Button onClick={handleSubmit} disabled={isSubmitting} className="gap-2">
                  {isSubmitting ? 'Submitting...' : 'Submit Request'}
                  <Send className="h-4 w-4" />
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="mt-6 text-center text-sm text-muted-foreground">
          <p>Need help? <a href="mailto:info@crisistance.com" className="text-primary hover:underline">info@crisistance.com</a></p>
        </div>
      </div>
    </div>
  );
};

export default GetStarted;
