import { useState } from 'react';
import { useTranslation } from 'react-i18next';
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
  businessName: string;
  location: string;
  employees: string;
  industry: string;
  email: string;
  physicalLocation: string;
  sqft: string;
  ownRent: string;
  infrastructure: string[];
  criticalProducts: string;
  functions: string[];
  tools: string;
  records: string;
  hazards: string[];
  recentDisruption: string;
  insurance: string;
  backupStaff: string;
  notifyTime: string;
  commChannel: string;
  emergencyContacts: string;
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
  consent: false
};

const TOTAL_STEPS = 6;

const ChipSelect = ({
  options,
  selected,
  onChange,
  allowNone = false,
  noneLabel = "None of the above"
}: {
  options: { value: string; label: string }[];
  selected: string[];
  onChange: (values: string[]) => void;
  allowNone?: boolean;
  noneLabel?: string;
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
      {options.map(option => (
        <Badge 
          key={option.value} 
          variant={selected.includes(option.value) ? "default" : "outline"} 
          className="cursor-pointer px-3 py-2 text-sm hover:bg-primary/10 transition-colors" 
          onClick={() => handleClick(option.value)}
        >
          {option.label}
        </Badge>
      ))}
      {allowNone && (
        <Badge 
          variant={selected.includes('None') ? "default" : "outline"} 
          className="cursor-pointer px-3 py-2 text-sm hover:bg-primary/10 transition-colors" 
          onClick={() => handleClick('None')}
        >
          {noneLabel}
        </Badge>
      )}
    </div>
  );
};

const GetStarted = () => {
  const { t } = useTranslation();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const progress = (currentStep - 1) / (TOTAL_STEPS - 1) * 100;

  const updateField = <K extends keyof FormData>(field: K, value: FormData[K]) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
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
            title: t('getStarted.validEmail'),
            variant: "destructive"
          });
          return false;
        }
        return !!(formData.businessName && formData.location && formData.employees && formData.industry && formData.email);
      case 2:
        return !!(formData.physicalLocation && formData.ownRent);
      case 3:
        return !!formData.records;
      case 4:
        return !!formData.insurance;
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
          title: t('getStarted.requiredFields'),
          variant: "destructive"
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
        title: t('getStarted.requiredFields'),
        variant: "destructive"
      });
      return;
    }
    setIsSubmitting(true);
    try {
      const { data, error } = await supabase.functions.invoke('submit-free-plan', {
        body: formData
      });
      if (error) {
        throw error;
      }
      setIsSubmitted(true);
      toast({
        title: t('getStarted.thankYou'),
        description: t('getStarted.nextStepsDescription')
      });
    } catch (error: any) {
      console.error('Submission error:', error);
      toast({
        title: "Submission Failed",
        description: "Please try again or contact us at info@crisistance.com",
        variant: "destructive"
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
            <h2 className="text-xl font-semibold text-primary">{t('getStarted.section1Title')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="businessName">{t('getStarted.businessName')} *</Label>
                <Input 
                  id="businessName" 
                  value={formData.businessName} 
                  onChange={e => updateField('businessName', e.target.value)} 
                  placeholder={t('getStarted.businessNamePlaceholder')} 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">{t('getStarted.email')} *</Label>
                <Input 
                  id="email" 
                  type="email" 
                  value={formData.email} 
                  onChange={e => updateField('email', e.target.value)} 
                  placeholder={t('getStarted.emailPlaceholder')} 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">{t('getStarted.location')} *</Label>
                <Input 
                  id="location" 
                  value={formData.location} 
                  onChange={e => updateField('location', e.target.value)} 
                  placeholder={t('getStarted.locationPlaceholder')} 
                />
              </div>
              <div className="space-y-2">
                <Label>{t('getStarted.employees')} *</Label>
                <Select value={formData.employees} onValueChange={v => updateField('employees', v)}>
                  <SelectTrigger>
                    <SelectValue placeholder={t('getStarted.select')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1-5">{t('getStarted.employees1_5')}</SelectItem>
                    <SelectItem value="6-20">{t('getStarted.employees6_20')}</SelectItem>
                    <SelectItem value="21-50">{t('getStarted.employees21_50')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label>{t('getStarted.industry')} *</Label>
                <Select value={formData.industry} onValueChange={v => updateField('industry', v)}>
                  <SelectTrigger>
                    <SelectValue placeholder={t('getStarted.select')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Retail">{t('getStarted.industryRetail')}</SelectItem>
                    <SelectItem value="Professional services">{t('getStarted.industryProfessional')}</SelectItem>
                    <SelectItem value="Trades / Contracting">{t('getStarted.industryTrades')}</SelectItem>
                    <SelectItem value="Hospitality">{t('getStarted.industryHospitality')}</SelectItem>
                    <SelectItem value="Health & wellness">{t('getStarted.industryHealth')}</SelectItem>
                    <SelectItem value="Manufacturing / Light industrial">{t('getStarted.industryManufacturing')}</SelectItem>
                    <SelectItem value="Nonprofit">{t('getStarted.industryNonprofit')}</SelectItem>
                    <SelectItem value="Other">{t('getStarted.industryOther')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-primary">{t('getStarted.section2Title')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>{t('getStarted.physicalLocation')} *</Label>
                <Select value={formData.physicalLocation} onValueChange={v => updateField('physicalLocation', v)}>
                  <SelectTrigger>
                    <SelectValue placeholder={t('getStarted.select')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Yes — office">{t('getStarted.physicalOffice')}</SelectItem>
                    <SelectItem value="Yes — storefront">{t('getStarted.physicalStorefront')}</SelectItem>
                    <SelectItem value="Yes — warehouse / industrial">{t('getStarted.physicalWarehouse')}</SelectItem>
                    <SelectItem value="No — home-based">{t('getStarted.physicalHomeBased')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="sqft">{t('getStarted.sqft')}</Label>
                <Input 
                  id="sqft" 
                  value={formData.sqft} 
                  onChange={e => updateField('sqft', e.target.value)} 
                  placeholder={t('getStarted.sqftPlaceholder')} 
                />
              </div>
              <div className="space-y-2">
                <Label>{t('getStarted.ownRent')} *</Label>
                <Select value={formData.ownRent} onValueChange={v => updateField('ownRent', v)}>
                  <SelectTrigger>
                    <SelectValue placeholder={t('getStarted.select')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Own">{t('getStarted.own')}</SelectItem>
                    <SelectItem value="Rent">{t('getStarted.rent')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label>{t('getStarted.infrastructureLabel')}</Label>
              <ChipSelect 
                options={[
                  { value: 'Refrigeration', label: t('getStarted.infrastructureRefrigeration') },
                  { value: 'Specialized equipment', label: t('getStarted.infrastructureEquipment') },
                  { value: 'Hazardous materials', label: t('getStarted.infrastructureHazardous') },
                  { value: 'Server room/on-prem systems', label: t('getStarted.infrastructureServer') }
                ]} 
                selected={formData.infrastructure} 
                onChange={values => updateField('infrastructure', values)} 
                allowNone 
                noneLabel={t('getStarted.noneOfAbove')}
              />
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-primary">{t('getStarted.section3Title')}</h2>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="criticalProducts">{t('getStarted.criticalProducts')}</Label>
                <Textarea 
                  id="criticalProducts" 
                  value={formData.criticalProducts} 
                  onChange={e => updateField('criticalProducts', e.target.value)} 
                  placeholder={t('getStarted.criticalProductsPlaceholder')} 
                />
              </div>
              <div className="space-y-2">
                <Label>{t('getStarted.functionsLabel')}</Label>
                <ChipSelect 
                  options={[
                    { value: 'Payments', label: t('getStarted.functionPayments') },
                    { value: 'Sales/orders', label: t('getStarted.functionSales') },
                    { value: 'Communications', label: t('getStarted.functionCommunications') },
                    { value: 'Manufacturing/production', label: t('getStarted.functionManufacturing') },
                    { value: 'Delivery/fulfillment', label: t('getStarted.functionDelivery') }
                  ]} 
                  selected={formData.functions} 
                  onChange={values => updateField('functions', values)} 
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="tools">{t('getStarted.tools')}</Label>
                  <Input 
                    id="tools" 
                    value={formData.tools} 
                    onChange={e => updateField('tools', e.target.value)} 
                    placeholder={t('getStarted.toolsPlaceholder')} 
                  />
                </div>
                <div className="space-y-2">
                  <Label>{t('getStarted.records')} *</Label>
                  <Select value={formData.records} onValueChange={v => updateField('records', v)}>
                    <SelectTrigger>
                      <SelectValue placeholder={t('getStarted.select')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="The cloud">{t('getStarted.recordsCloud')}</SelectItem>
                      <SelectItem value="Local computers">{t('getStarted.recordsLocal')}</SelectItem>
                      <SelectItem value="Paper files">{t('getStarted.recordsPaper')}</SelectItem>
                      <SelectItem value="Combination">{t('getStarted.recordsCombination')}</SelectItem>
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
            <h2 className="text-xl font-semibold text-primary">{t('getStarted.section4Title')}</h2>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>{t('getStarted.hazardsLabel')}</Label>
                <ChipSelect 
                  options={[
                    { value: 'Flooding', label: t('getStarted.hazardFlooding') },
                    { value: 'Wildfire', label: t('getStarted.hazardWildfire') },
                    { value: 'Tornadoes', label: t('getStarted.hazardTornadoes') },
                    { value: 'Winter storms', label: t('getStarted.hazardWinter') },
                    { value: 'Heatwaves', label: t('getStarted.hazardHeatwaves') },
                    { value: 'Landslides', label: t('getStarted.hazardLandslides') },
                    { value: 'Earthquakes', label: t('getStarted.hazardEarthquakes') }
                  ]} 
                  selected={formData.hazards} 
                  onChange={values => updateField('hazards', values)} 
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>{t('getStarted.recentDisruption')}</Label>
                  <Select value={formData.recentDisruption} onValueChange={v => updateField('recentDisruption', v)}>
                    <SelectTrigger>
                      <SelectValue placeholder={t('getStarted.select')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Power outage">{t('getStarted.disruptionPower')}</SelectItem>
                      <SelectItem value="Water damage">{t('getStarted.disruptionWater')}</SelectItem>
                      <SelectItem value="Smoke / air-quality closure">{t('getStarted.disruptionSmoke')}</SelectItem>
                      <SelectItem value="Supply chain delay">{t('getStarted.disruptionSupply')}</SelectItem>
                      <SelectItem value="Technology outage">{t('getStarted.disruptionTech')}</SelectItem>
                      <SelectItem value="None">{t('getStarted.disruptionNone')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>{t('getStarted.insurance')} *</Label>
                  <Select value={formData.insurance} onValueChange={v => updateField('insurance', v)}>
                    <SelectTrigger>
                      <SelectValue placeholder={t('getStarted.select')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Yes, with Business Interruption (BI) coverage">{t('getStarted.insuranceWithBI')}</SelectItem>
                      <SelectItem value="Yes, without BI">{t('getStarted.insuranceWithoutBI')}</SelectItem>
                      <SelectItem value="No">{t('getStarted.insuranceNo')}</SelectItem>
                      <SelectItem value="Unsure">{t('getStarted.insuranceUnsure')}</SelectItem>
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
            <h2 className="text-xl font-semibold text-primary">{t('getStarted.section5Title')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>{t('getStarted.backupStaff')} *</Label>
                <Select value={formData.backupStaff} onValueChange={v => updateField('backupStaff', v)}>
                  <SelectTrigger>
                    <SelectValue placeholder={t('getStarted.select')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Yes">{t('getStarted.yes')}</SelectItem>
                    <SelectItem value="No">{t('getStarted.no')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>{t('getStarted.notifyTime')} *</Label>
                <Select value={formData.notifyTime} onValueChange={v => updateField('notifyTime', v)}>
                  <SelectTrigger>
                    <SelectValue placeholder={t('getStarted.select')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Immediately">{t('getStarted.notifyImmediately')}</SelectItem>
                    <SelectItem value="Within 1 hour">{t('getStarted.notifyWithin1Hour')}</SelectItem>
                    <SelectItem value="Same day">{t('getStarted.notifySameDay')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>{t('getStarted.commChannel')}</Label>
                <Select value={formData.commChannel} onValueChange={v => updateField('commChannel', v)}>
                  <SelectTrigger>
                    <SelectValue placeholder={t('getStarted.select')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="SMS">{t('getStarted.commSMS')}</SelectItem>
                    <SelectItem value="Email">{t('getStarted.commEmail')}</SelectItem>
                    <SelectItem value="Phone tree">{t('getStarted.commPhoneTree')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>{t('getStarted.emergencyContacts')} *</Label>
                <Select value={formData.emergencyContacts} onValueChange={v => updateField('emergencyContacts', v)}>
                  <SelectTrigger>
                    <SelectValue placeholder={t('getStarted.select')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Yes">{t('getStarted.yes')}</SelectItem>
                    <SelectItem value="No">{t('getStarted.no')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        );
      case 6:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-primary">{t('getStarted.section6Title')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>{t('getStarted.surviveTime')} *</Label>
                <Select value={formData.surviveTime} onValueChange={v => updateField('surviveTime', v)}>
                  <SelectTrigger>
                    <SelectValue placeholder={t('getStarted.select')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="<24 hours">{t('getStarted.survive24')}</SelectItem>
                    <SelectItem value="1–3 days">{t('getStarted.survive1_3')}</SelectItem>
                    <SelectItem value="4–7 days">{t('getStarted.survive4_7')}</SelectItem>
                    <SelectItem value="1–2 weeks">{t('getStarted.survive1_2weeks')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>{t('getStarted.priority')} *</Label>
                <Select value={formData.priority} onValueChange={v => updateField('priority', v)}>
                  <SelectTrigger>
                    <SelectValue placeholder={t('getStarted.select')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Protecting staff">{t('getStarted.priorityStaff')}</SelectItem>
                    <SelectItem value="Restoring operations">{t('getStarted.priorityOperations')}</SelectItem>
                    <SelectItem value="Protecting data & systems">{t('getStarted.priorityData')}</SelectItem>
                    <SelectItem value="Communicating with customers">{t('getStarted.priorityCustomers')}</SelectItem>
                    <SelectItem value="Financial stability">{t('getStarted.priorityFinancial')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label>{t('getStarted.support')}</Label>
              <Select value={formData.support} onValueChange={v => updateField('support', v)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="freeResources">{t('getStarted.supportFreeResources')}</SelectItem>
                  <SelectItem value="consulting">{t('getStarted.supportConsulting')}</SelectItem>
                  <SelectItem value="no">{t('getStarted.supportNo')}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-start space-x-3 p-4 bg-secondary rounded-lg">
              <Checkbox 
                id="consent" 
                checked={formData.consent} 
                onCheckedChange={checked => updateField('consent', checked as boolean)} 
              />
              <div className="space-y-1">
                <Label htmlFor="consent" className="font-semibold cursor-pointer">{t('getStarted.consentTitle')} *</Label>
                <p className="text-sm text-muted-foreground">
                  {t('getStarted.consentText')}
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
              <CardTitle className="text-2xl">{t('getStarted.thankYou')}</CardTitle>
              <CardDescription className="text-lg">
                {t('getStarted.receivedInfo', { businessName: formData.businessName })}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-secondary rounded-lg p-6 text-center">
                <h3 className="font-semibold text-lg mb-2">{t('getStarted.whatHappensNext')}</h3>
                <p className="text-muted-foreground mb-4">
                  {t('getStarted.nextStepsDescription')}
                </p>
                <p className="font-medium text-primary">{formData.email}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">{t('getStarted.immediateAssistance')}</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    {t('getStarted.immediateAssistanceDescription')}
                  </p>
                  <Button variant="outline" asChild className="gap-2 w-full">
                    <a href="mailto:info@crisistance.com">
                      <Mail className="h-4 w-4" />
                      {t('getStarted.contactUs')}
                    </a>
                  </Button>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">{t('getStarted.anotherSubmission')}</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    {t('getStarted.anotherSubmissionDescription')}
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
                    {t('getStarted.newSubmission')}
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
                  {t('getStarted.pageTitle')}
                </h1>
                <p className="text-muted-foreground">
                  {t('getStarted.pageDescription')}
                </p>
              </div>
              <div className="text-right">
                <Badge variant="secondary" className="mb-2 pl-0 mx-[10px]">{t('getStarted.freeLabel')}</Badge>
                <p className="text-xs text-muted-foreground">{t('getStarted.noPayment')}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between text-sm text-muted-foreground mb-2">
            <span>{t('getStarted.stepOf', { current: currentStep, total: TOTAL_STEPS })}</span>
            <span>{t('getStarted.complete', { percent: Math.round(progress) })}</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Form Card */}
        <Card>
          <CardContent className="p-6">
            {renderStep()}

            {/* Navigation */}
            <div className="flex justify-between mt-8 pt-6 border-t">
              <Button variant="outline" onClick={prevStep} disabled={currentStep === 1} className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                {t('getStarted.back')}
              </Button>
              
              {currentStep < TOTAL_STEPS ? (
                <Button onClick={nextStep} className="gap-2">
                  {t('getStarted.next')}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              ) : (
                <Button onClick={handleSubmit} disabled={isSubmitting} className="gap-2">
                  {isSubmitting ? t('getStarted.submitting') : t('getStarted.submit')}
                  <Send className="h-4 w-4" />
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="mt-6 text-center text-sm text-muted-foreground">
          <p>{t('getStarted.needHelp')} <a href="mailto:info@crisistance.com" className="text-primary hover:underline">info@crisistance.com</a></p>
        </div>
      </div>
    </div>
  );
};

export default GetStarted;
