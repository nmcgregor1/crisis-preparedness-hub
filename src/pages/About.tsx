import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { Target, Users, Award } from 'lucide-react';

const About = () => {
  const { t } = useTranslation();

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-secondary py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-primary mb-6">
            {t('about.title')}
          </h1>
          <p className="text-lg text-muted-foreground">
            {t('about.description')}
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-primary mb-6">{t('about.missionTitle')}</h2>
              <p className="text-muted-foreground mb-4">
                {t('about.missionP1')}
              </p>
              <p className="text-muted-foreground mb-6">
                {t('about.missionP2')}
              </p>
              <Button asChild>
                <Link to="/contact">{t('about.learnHow')}</Link>
              </Button>
            </div>
            
            <div className="space-y-6">
              <Card>
                <CardHeader className="flex flex-row items-center space-y-0 pb-2">
                  <Target className="h-6 w-6 text-primary mr-3" />
                  <CardTitle className="text-lg">{t('about.purposeDriven.title')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    {t('about.purposeDriven.description')}
                  </CardDescription>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center space-y-0 pb-2">
                  <Users className="h-6 w-6 text-primary mr-3" />
                  <CardTitle className="text-lg">{t('about.expertTeam.title')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    {t('about.expertTeam.description')}
                  </CardDescription>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center space-y-0 pb-2">
                  <Award className="h-6 w-6 text-primary mr-3" />
                  <CardTitle className="text-lg">{t('about.provenResults.title')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    {t('about.provenResults.description')}
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
            {t('about.howItWorks')}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                1
              </div>
              <h3 className="text-xl font-semibold text-primary mb-4">{t('about.assessment.title')}</h3>
              <p className="text-muted-foreground">
                {t('about.assessment.description')}
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                2
              </div>
              <h3 className="text-xl font-semibold text-primary mb-4">{t('about.planning.title')}</h3>
              <p className="text-muted-foreground">
                {t('about.planning.description')}
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                3
              </div>
              <h3 className="text-xl font-semibold text-primary mb-4">{t('about.protection.title')}</h3>
              <p className="text-muted-foreground">
                {t('about.protection.description')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Credibility Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-primary mb-8">
            {t('about.trustedTitle')}
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            {t('about.trustedP1')}
          </p>
          <p className="text-muted-foreground mb-8">
            {t('about.trustedP2')}
          </p>
          <Button asChild size="lg" variant="accent">
            <Link to="/contact">{t('about.startProtection')}</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default About;
