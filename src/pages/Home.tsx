import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { Shield, Users, AlertTriangle, CheckCircle } from 'lucide-react';

const Home = () => {
  const { t } = useTranslation();

  return <div>
      {/* Service Cards */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold text-primary text-center mb-4">
            {t('home.mainHeading')}
          </h1>
          <h2 className="text-2xl font-semibold text-primary text-center mb-12">
            {t('home.servicesHeading')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <CheckCircle className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>{t('home.planning.title')}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  {t('home.planning.description')}
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>{t('home.managedService.title')}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  {t('home.managedService.description')}
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>{t('home.disasterRecovery.title')}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  {t('home.disasterRecovery.description')}
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
            {t('home.whyChoose')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <h3 className="font-semibold text-primary mb-2">{t('home.smallBusinessFocus.title')}</h3>
              <p className="text-sm text-muted-foreground">
                {t('home.smallBusinessFocus.description')}
              </p>
            </div>
            <div className="text-center">
              <h3 className="font-semibold text-primary mb-2">{t('home.provenMethods.title')}</h3>
              <p className="text-sm text-muted-foreground">
                {t('home.provenMethods.description')}
              </p>
            </div>
            <div className="text-center">
              <h3 className="font-semibold text-primary mb-2">{t('home.rapidResponse.title')}</h3>
              <p className="text-sm text-muted-foreground">
                {t('home.rapidResponse.description')}
              </p>
            </div>
            <div className="text-center">
              <h3 className="font-semibold text-primary mb-2">{t('home.affordableProtection.title')}</h3>
              <p className="text-sm text-muted-foreground">
                {t('home.affordableProtection.description')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Risk Types Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-primary text-center mb-12">
            {t('home.crisisTypes')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                <AlertTriangle className="h-5 w-5 text-accent" />
              </div>
              <div>
                <h3 className="font-semibold text-primary mb-2">{t('home.operational.title')}</h3>
                <p className="text-muted-foreground">
                  {t('home.operational.description')}
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                <AlertTriangle className="h-5 w-5 text-accent" />
              </div>
              <div>
                <h3 className="font-semibold text-primary mb-2">{t('home.financial.title')}</h3>
                <p className="text-muted-foreground">
                  {t('home.financial.description')}
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                <AlertTriangle className="h-5 w-5 text-accent" />
              </div>
              <div>
                <h3 className="font-semibold text-primary mb-2">{t('home.reputational.title')}</h3>
                <p className="text-muted-foreground">
                  {t('home.reputational.description')}
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                <AlertTriangle className="h-5 w-5 text-accent" />
              </div>
              <div>
                <h3 className="font-semibold text-primary mb-2">{t('home.natural.title')}</h3>
                <p className="text-muted-foreground">
                  {t('home.natural.description')}
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
            {t('home.ctaTitle')}
          </h2>
          <p className="text-lg text-primary-foreground/90 mb-8">
            {t('home.ctaDescription')}
          </p>
          <Button asChild size="lg" variant="accent">
            <Link to="/contact">{t('home.ctaButton')}</Link>
          </Button>
        </div>
      </section>
    </div>;
};
export default Home;
