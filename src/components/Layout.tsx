import { Link, useLocation, Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import LanguageSwitcher from '@/components/LanguageSwitcher';

const Layout = () => {
  const location = useLocation();
  const { user } = useAuth();
  const { t } = useTranslation();
  const isActive = (path: string) => location.pathname === path;
  
  const allNavigation = [{
    name: t('nav.home'),
    href: '/'
  }, {
    name: t('nav.about'),
    href: '/about'
  }, {
    name: t('nav.managedService'),
    href: '/managed-service'
  }, {
    name: t('nav.incidentMonitoring'),
    href: '/incident-monitoring'
  }, {
    name: t('nav.resources'),
    href: '/resource-library'
  }, {
    name: t('nav.news'),
    href: '/news'
  }, {
    name: t('nav.admin'),
    href: '/admin'
  }, {
    name: t('nav.contact'),
    href: '/contact'
  }];
  
  // Filter out Admin link if user is not authenticated
  const navigation = allNavigation.filter(item => 
    item.href !== '/admin' || user !== null
  );
  
  return <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-background border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header row: Logo, Navigation, and CTA */}
          <div className="flex justify-between items-center py-3">
            <Link to="/" className="flex items-center">
              <img src="/lovable-uploads/7d859f52-bc78-47ff-a223-56d823390198.png" alt="Crisistance - Crisis Management for Small Business" className="h-20 w-auto" />
              <span className="text-xl font-bold text-primary -ml-2">Crisistance</span>
            </Link>
            
            <nav className="hidden md:flex space-x-8">
              {navigation.map(item => <Link key={item.href} to={item.href} className={`text-sm font-medium transition-colors hover:text-primary ${isActive(item.href) ? 'text-primary border-b-2 border-primary' : 'text-muted-foreground'}`}>
                  {item.name}
                </Link>)}
            </nav>
            
            <div className="flex items-center gap-2">
              <LanguageSwitcher />
              <Button asChild variant="default">
                <Link to="/get-started">{t('nav.freePlan')}</Link>
              </Button>
            </div>
          </div>
          
          {/* Mobile navigation */}
          <div className="md:hidden pb-4">
            <nav className="flex justify-center space-x-4 flex-wrap">
              {navigation.map(item => <Link key={item.href} to={item.href} className={`text-sm font-medium transition-colors hover:text-primary ${isActive(item.href) ? 'text-primary border-b-2 border-primary' : 'text-muted-foreground'}`}>
                  {item.name}
                </Link>)}
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Background Section */}
      <section className="relative h-80 md:h-96 bg-cover bg-no-repeat" style={{
      backgroundImage: `url('/lovable-uploads/waves-crashing-hero.png')`,
      backgroundPosition: 'center center'
    }}>
        <div className="absolute inset-0 bg-primary/30"></div>
        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl font-bold mb-4 md:text-5xl">{t('hero.title')}</h1>
            <p className="text-xl md:text-2xl">{t('hero.subtitle')}</p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-secondary border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <Link to="/" className="flex items-center space-x-1">
                <img src="/lovable-uploads/7d859f52-bc78-47ff-a223-56d823390198.png" alt="Crisistance Logo" className="h-12 w-auto" />
                <span className="text-lg font-bold text-primary">Crisistance</span>
              </Link>
              <p className="text-sm text-muted-foreground">
                {t('footer.tagline')}
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-primary mb-4">{t('footer.services')}</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/managed-service" className="hover:text-primary">{t('nav.managedService')}</Link></li>
                <li><Link to="/incident-monitoring" className="hover:text-primary">{t('nav.incidentMonitoring')}</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-primary mb-4">{t('footer.company')}</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/about" className="hover:text-primary">{t('nav.about')}</Link></li>
                <li><Link to="/contact" className="hover:text-primary">{t('nav.contact')}</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-primary mb-4">{t('footer.legal')}</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/legal" className="hover:text-primary">{t('footer.legalPrivacy')}</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>{t('footer.copyright', { year: new Date().getFullYear() })}</p>
          </div>
        </div>
      </footer>
    </div>;
};
export default Layout;
