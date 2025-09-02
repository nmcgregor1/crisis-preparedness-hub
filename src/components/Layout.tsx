import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
const logo = '/lovable-uploads/c7c09069-d57a-4209-a10c-1174209dc535.png';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Managed Service', href: '/managed-service' },
    { name: 'Resource Library', href: '/resource-library' },
    { name: 'Incident Monitoring', href: '/incident-monitoring' },
    { name: 'Legal', href: '/legal' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-background border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top row: Logo and CTA */}
          <div className="flex justify-between items-center py-4">
            <Link to="/" className="flex items-center space-x-3">
              <img 
                src={logo} 
                alt="Crisistance - Crisis Management for Small Business" 
                className="h-16 w-auto"
              />
              <span className="text-xl font-bold text-primary">Crisistance</span>
            </Link>
            
            <Button asChild variant="default">
              <Link to="/contact">Get Started</Link>
            </Button>
          </div>
          
          {/* Bottom row: Navigation */}
          <div className="pb-4">
            <nav className="flex justify-center md:justify-start space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    isActive(item.href) 
                      ? 'text-primary border-b-2 border-primary' 
                      : 'text-muted-foreground'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Background Section */}
      <section 
        className="relative h-96 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('/lovable-uploads/3593295a-a77f-4453-9f02-3c7451e405fa.png')` }}
      >
        <div className="absolute inset-0 bg-primary/60"></div>
        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Be Prepared...Respond with Purpose</h1>
            <p className="text-xl md:text-2xl">Crisis Management for Small Business</p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-secondary border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <Link to="/" className="flex items-center space-x-3">
                <img 
                  src={logo} 
                  alt="Crisistance Logo" 
                  className="h-12 w-auto"
                />
                <span className="text-lg font-bold text-primary">Crisistance</span>
              </Link>
              <p className="text-sm text-muted-foreground">
                Crisis Management for Small Business
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-primary mb-4">Services</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/managed-service" className="hover:text-primary">Managed Service</Link></li>
                <li><Link to="/incident-monitoring" className="hover:text-primary">Incident Monitoring</Link></li>
                <li><Link to="/resource-library" className="hover:text-primary">Resource Library</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-primary mb-4">Company</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/about" className="hover:text-primary">About</Link></li>
                <li><Link to="/contact" className="hover:text-primary">Contact</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-primary mb-4">Legal</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/legal" className="hover:text-primary">Legal & Privacy</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} Crisistance. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;