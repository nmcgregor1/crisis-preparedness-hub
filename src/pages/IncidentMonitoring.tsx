import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const IncidentMonitoring = () => {
  const { t } = useTranslation();

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-secondary py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-primary mb-6">
            {t('incidentMonitoring.title')}
          </h1>
          <p className="text-lg text-muted-foreground mb-8">
            {t('incidentMonitoring.description')}
          </p>
          <Button asChild size="lg" variant="accent">
            <Link to="/contact">{t('incidentMonitoring.learnMore')}</Link>
          </Button>
        </div>
      </section>

      {/* Coming Soon Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-primary mb-6">
            {t('incidentMonitoring.comingSoonTitle')}
          </h2>
          <p className="text-muted-foreground mb-8">
            {t('incidentMonitoring.comingSoonDescription')}
          </p>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              {t('incidentMonitoring.contactPrompt')}
            </p>
            <Button asChild>
              <Link to="/contact">{t('incidentMonitoring.discussOptions')}</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default IncidentMonitoring;
