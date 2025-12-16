import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Phone, Clock, Loader2, CheckCircle2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

const contactFormSchema = z.object({
  firstName: z.string()
    .min(2, 'First name must be at least 2 characters')
    .max(100, 'First name must be less than 100 characters')
    .regex(/^[a-zA-Z\s\-]+$/, 'First name can only contain letters, spaces, and hyphens'),
  lastName: z.string()
    .min(2, 'Last name must be at least 2 characters')
    .max(100, 'Last name must be less than 100 characters')
    .regex(/^[a-zA-Z\s\-]+$/, 'Last name can only contain letters, spaces, and hyphens'),
  email: z.string()
    .email('Invalid email address')
    .max(255, 'Email must be less than 255 characters'),
  company: z.string()
    .min(2, 'Company name must be at least 2 characters')
    .max(200, 'Company name must be less than 200 characters'),
  phone: z.string()
    .regex(/^[\d\s\-\+\(\)]*$/, 'Invalid phone number format')
    .min(10, 'Phone number must be at least 10 digits')
    .max(20, 'Phone number must be less than 20 characters')
    .optional()
    .or(z.literal('')),
  message: z.string()
    .min(10, 'Message must be at least 10 characters')
    .max(2000, 'Message must be less than 2000 characters'),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

const Contact = () => {
  const { t } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setIsSuccess(false);

    try {
      const { data: result, error } = await supabase.functions.invoke('submit-contact-form', {
        body: data,
      });

      if (error) throw error;

      if (result.error) {
        throw new Error(result.error);
      }

      setIsSuccess(true);
      reset();
      toast({
        title: "Success!",
        description: result.message || t('contact.successMessage'),
      });
    } catch (error: any) {
      console.error('Contact form error:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to submit form. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return <div>
      {/* Hero Section */}
      <section className="bg-secondary py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-primary mb-6">
            {t('contact.title')}
          </h1>
          <p className="text-lg text-muted-foreground">
            {t('contact.description')}
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
                <CardTitle>{t('contact.formTitle')}</CardTitle>
                <CardDescription>
                  {t('contact.formDescription')}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {isSuccess && (
                  <div className="flex items-center gap-2 p-4 bg-green-50 dark:bg-green-950 text-green-800 dark:text-green-200 rounded-lg">
                    <CheckCircle2 className="h-5 w-5" />
                    <p className="text-sm font-medium">{t('contact.successMessage')}</p>
                  </div>
                )}
                
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">{t('contact.firstName')} {t('contact.required')}</Label>
                      <Input
                        id="firstName"
                        placeholder="John"
                        {...register('firstName')}
                        disabled={isSubmitting}
                        className={errors.firstName ? 'border-destructive' : ''}
                      />
                      {errors.firstName && (
                        <p className="text-sm text-destructive mt-1">{errors.firstName.message}</p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="lastName">{t('contact.lastName')} {t('contact.required')}</Label>
                      <Input
                        id="lastName"
                        placeholder="Smith"
                        {...register('lastName')}
                        disabled={isSubmitting}
                        className={errors.lastName ? 'border-destructive' : ''}
                      />
                      {errors.lastName && (
                        <p className="text-sm text-destructive mt-1">{errors.lastName.message}</p>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="email">{t('contact.email')} {t('contact.required')}</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@company.com"
                      {...register('email')}
                      disabled={isSubmitting}
                      className={errors.email ? 'border-destructive' : ''}
                    />
                    {errors.email && (
                      <p className="text-sm text-destructive mt-1">{errors.email.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <Label htmlFor="company">{t('contact.company')} {t('contact.required')}</Label>
                    <Input
                      id="company"
                      placeholder="Your Company"
                      {...register('company')}
                      disabled={isSubmitting}
                      className={errors.company ? 'border-destructive' : ''}
                    />
                    {errors.company && (
                      <p className="text-sm text-destructive mt-1">{errors.company.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <Label htmlFor="phone">{t('contact.phone')}</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="(555) 123-4567"
                      {...register('phone')}
                      disabled={isSubmitting}
                      className={errors.phone ? 'border-destructive' : ''}
                    />
                    {errors.phone && (
                      <p className="text-sm text-destructive mt-1">{errors.phone.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <Label htmlFor="message">{t('contact.message')} {t('contact.required')}</Label>
                    <Textarea
                      id="message"
                      placeholder={t('contact.messagePlaceholder')}
                      className={`min-h-[120px] ${errors.message ? 'border-destructive' : ''}`}
                      {...register('message')}
                      disabled={isSubmitting}
                    />
                    {errors.message && (
                      <p className="text-sm text-destructive mt-1">{errors.message.message}</p>
                    )}
                  </div>
                  
                  <Button
                    type="submit"
                    size="lg"
                    variant="accent"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        {t('contact.submitting')}
                      </>
                    ) : (
                      t('contact.submit')
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <div className="space-y-8">
              <Card>
                <CardHeader className="flex flex-row items-center space-y-0 pb-2">
                  <Mail className="h-6 w-6 text-primary mr-3" />
                  <CardTitle className="text-lg">{t('contact.emailSupport')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="mb-2">
                    {t('contact.emailDescription')}
                  </CardDescription>
                  <a href="mailto:support@crisistance.com" className="text-primary hover:underline font-medium">
                    support@crisistance.com
                  </a>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center space-y-0 pb-2">
                  <Phone className="h-6 w-6 text-primary mr-3" />
                  <CardTitle className="text-lg">{t('contact.emergencyHotline')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="mb-2">
                    {t('contact.emergencyDescription')}
                  </CardDescription>
                  <a href="tel:1-647-600-5210" className="text-primary hover:underline font-medium text-lg">1-647-600-5210</a>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center space-y-0 pb-2">
                  <Clock className="h-6 w-6 text-primary mr-3" />
                  <CardTitle className="text-lg">{t('contact.responseTimes')}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{t('contact.generalInquiries')}</span>
                    <span className="font-medium">{t('common.24hours')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{t('contact.crisisSupport')}</span>
                    <span className="font-medium">{t('contact.immediate')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{t('contact.consultationBooking')}</span>
                    <span className="font-medium">{t('contact.sameDay')}</span>
                  </div>
                </CardContent>
              </Card>

              <div className="bg-secondary p-6 rounded-lg">
                <h3 className="font-semibold text-primary mb-3">{t('contact.whatHappensNext')}</h3>
                <ol className="space-y-2 text-sm text-muted-foreground">
                  <li>1. {t('contact.step1')}</li>
                  <li>2. {t('contact.step2')}</li>
                  <li>3. {t('contact.step3')}</li>
                  <li>4. {t('contact.step4')}</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>;
};
export default Contact;
