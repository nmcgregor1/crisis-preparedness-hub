import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const ResourceLibrary = () => {
  const { t } = useTranslation();

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-secondary py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-primary mb-6">
            {t('resources.title')}
          </h1>
          <p className="text-lg text-muted-foreground mb-8">
            {t('resources.description')}
          </p>
          <Button asChild size="lg" variant="accent">
            <Link to="/contact">{t('resources.requestAccess')}</Link>
          </Button>
        </div>
      </section>

      {/* Quick Navigation */}
      <nav className="py-8 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-lg font-semibold text-primary mb-4">{t('resources.quickLinks')}</h2>
          <ul className="flex flex-wrap gap-4 text-sm">
            <li><a href="#household" className="text-primary hover:text-primary/80 underline">{t('resources.householdHazards')}</a></li>
            <li><a href="#cyber" className="text-primary hover:text-primary/80 underline">{t('resources.cyberSecurity')}</a></li>
            <li><a href="#financial" className="text-primary hover:text-primary/80 underline">{t('resources.financialResilience')}</a></li>
            <li><a href="#general" className="text-primary hover:text-primary/80 underline">{t('resources.general')}</a></li>
          </ul>
        </div>
      </nav>

      {/* Household & Environmental Hazards */}
      <section id="household" className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-primary mb-8">{t('resources.householdTitle')}</h2>
          <div className="space-y-8">
            <div className="border border-border rounded-lg p-6 bg-card">
              <h3 className="text-xl font-semibold text-primary mb-3">1. Canadian 72-hour Home Emergency Kit — Printable Checklist</h3>
              <p className="text-muted-foreground mb-4">
                Authoritative government checklist for building a 72-hour emergency kit (food, water, meds, documents, cash, pet supplies). Ideal as a printable single-page PDF for households.
              </p>
              <a href="https://www.canada.ca/en/services/policing/emergencies/preparedness/get-prepared/emergency-kits.html" target="_blank" rel="noopener" className="text-primary hover:text-primary/80 underline">
                Government of Canada — Emergency kits
              </a>
            </div>

            <div className="border border-border rounded-lg p-6 bg-card">
              <h3 className="text-xl font-semibold text-primary mb-3">2. Home Fire Prevention & Recovery Checklist</h3>
              <p className="text-muted-foreground mb-4">
                Prevention steps, monthly alarm checks, evacuation practice plus immediate recovery steps and insurance contact checklist (ready to link or convert into a printable action card).
              </p>
              <a href="https://www.redcross.ca/how-we-help/emergencies-and-disasters-in-canada/types-of-emergencies/home-fires" target="_blank" rel="noopener" className="text-primary hover:text-primary/80 underline">
                Canadian Red Cross — Home Fires
              </a>
            </div>

            <div className="border border-border rounded-lg p-6 bg-card">
              <h3 className="text-xl font-semibold text-primary mb-3">3. Wildfire Readiness & Evacuation Plan (Household + Small Business)</h3>
              <p className="text-muted-foreground mb-4">
                Evacuation checklist, what to pack, how to secure property, and re-entry conditions — suitable for a two-page guide + evacuation plan template.
              </p>
              <a href="https://www.redcross.ca/how-we-help/emergencies-and-disasters-in-canada/types-of-emergencies/wildfires" target="_blank" rel="noopener" className="text-primary hover:text-primary/80 underline">
                Canadian Red Cross — Wildfires
              </a>
            </div>

            <div className="border border-border rounded-lg p-6 bg-card">
              <h3 className="text-xl font-semibold text-primary mb-3">4. Flood Preparedness — Before / During / After Action Card</h3>
              <p className="text-muted-foreground mb-4">
                Short, foldable action card describing flood-proofing steps for interiors, shut-offs, sump pump notes and immediate post-flood recovery actions.
              </p>
              <a href="https://www.canada.ca/en/campaign/flood-ready.html" target="_blank" rel="noopener" className="text-primary hover:text-primary/80 underline">
                Government of Canada — Flood Ready
              </a>
            </div>

            <div className="border border-border rounded-lg p-6 bg-card">
              <h3 className="text-xl font-semibold text-primary mb-3">5. Earthquake — Home Retrofit & Family Plan Checklist</h3>
              <p className="text-muted-foreground mb-4">
                'Drop-cover-hold' training, securing heavy items, shut-off actions and a basic home-retrofit checklist (links to construction checklist resources and regional guidance).
              </p>
              <div className="space-y-2">
                <a href="https://www.canada.ca/en/services/policing/emergencies/preparedness/get-prepared/hazards-emergencies/earthquakes/how-prepare.html" target="_blank" rel="noopener" className="block text-primary hover:text-primary/80 underline">
                  Government of Canada — Earthquake preparedness
                </a>
                <a href="https://www.earthquakescanada.nrcan.gc.ca/info-gen/prepare-preparer/index-en.php" target="_blank" rel="noopener" className="block text-primary hover:text-primary/80 underline">
                  Earthquakes Canada (NRCan)
                </a>
              </div>
            </div>

            <div className="border border-border rounded-lg p-6 bg-card">
              <h3 className="text-xl font-semibold text-primary mb-3">6. Ice Storm & Severe Winter Weather Kit + Vehicle Checklist</h3>
              <p className="text-muted-foreground mb-4">
                Power outage survival, generator safety, roof / ice concerns and an in-vehicle winter emergency checklist.
              </p>
              <div className="space-y-2">
                <a href="https://www.canada.ca/en/services/policing/emergencies/preparedness/get-prepared/hazards-emergencies/winter-storms/how-prepare.html" target="_blank" rel="noopener" className="block text-primary hover:text-primary/80 underline">
                  Government of Canada — Winter storms
                </a>
                <a href="https://tc.canada.ca/en/road-transportation/stay-safe-when-driving/winter-driving/preparing-your-vehicle-winter" target="_blank" rel="noopener" className="block text-primary hover:text-primary/80 underline">
                  Transport Canada — winter vehicle preparedness
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cybersecurity & Ransomware */}
      <section id="cyber" className="py-16 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-primary mb-8">{t('resources.cyberTitle')}</h2>
          <div className="space-y-8">
            <div className="border border-border rounded-lg p-6 bg-card">
              <h3 className="text-xl font-semibold text-primary mb-3">7. Ransomware Prevention & Recovery Playbook — Small Business Summary</h3>
              <p className="text-muted-foreground mb-4">
                Condensed plain-language version of the Cyber Centre playbook — prevention, offline backups, containment steps and recovery checklist (suitable as a 2–4 page plain-language guide).
              </p>
              <a href="https://www.cyber.gc.ca/en/guidance/ransomware-playbook-itsm00099" target="_blank" rel="noopener" className="text-primary hover:text-primary/80 underline">
                Canadian Centre for Cyber Security — Ransomware Playbook
              </a>
            </div>

            <div className="border border-border rounded-lg p-6 bg-card">
              <h3 className="text-xl font-semibold text-primary mb-3">8. "Get Cyber Safe" Small Business Checklist (Printable Poster for Staff)</h3>
              <p className="text-muted-foreground mb-4">
                Practical employee quick-tips (phishing red flags, MFA, patching, password hygiene, safe USB policy) sized for a staff poster or internal memo.
              </p>
              <a href="https://www.getcybersafe.gc.ca/en/resources/get-cyber-safe-guide-small-and-medium-businesses" target="_blank" rel="noopener" className="text-primary hover:text-primary/80 underline">
                Get Cyber Safe — SMB guide
              </a>
            </div>

            <div className="border border-border rounded-lg p-6 bg-card">
              <h3 className="text-xl font-semibold text-primary mb-3">9. Foundational Cyber 10-Point Checklist for Small Organisations</h3>
              <p className="text-muted-foreground mb-4">
                Actionable baseline list: patching, backups, least privilege, endpoint protection, MFA, network segmentation — great as a one-page checklist for owners/IT managers.
              </p>
              <a href="https://www.getcybersafe.gc.ca/en/resources/get-cyber-safe-guide-small-and-medium-businesses" target="_blank" rel="noopener" className="text-primary hover:text-primary/80 underline">
                Get Cyber Safe / Cyber Centre resources
              </a>
            </div>

            <div className="border border-border rounded-lg p-6 bg-card">
              <h3 className="text-xl font-semibold text-primary mb-3">10. Incident Response Quick Card — Who to Call & How to Report (Canada)</h3>
              <p className="text-muted-foreground mb-4">
                One-page card with Canadian contacts (Cyber Centre reporting, Canadian Anti-Fraud Centre, RCMP / local police, banks & insurers) and immediate containment steps.
              </p>
              <a href="https://www.cyber.gc.ca/en/guidance/ransomware-playbook-itsm00099" target="_blank" rel="noopener" className="text-primary hover:text-primary/80 underline">
                Cyber Centre — reporting & response guidance
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Financial Resilience */}
      <section id="financial" className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-primary mb-8">{t('resources.financialTitle')}</h2>
          <div className="space-y-8">
            <div className="border border-border rounded-lg p-6 bg-card">
              <h3 className="text-xl font-semibold text-primary mb-3">11. Business Continuity Plan (BCP) Template for Canadian SMEs — 8-Step Guide + Download</h3>
              <p className="text-muted-foreground mb-4">
                Downloadable BDC template and an 8-step approach for SMEs: identify critical services, alternate suppliers, communications & recovery priorities.
              </p>
              <a href="https://www.bdc.ca/en/articles-tools/entrepreneur-toolkit/templates-business-guides/business-continuity-guide-templates-entrepreneurs" target="_blank" rel="noopener" className="text-primary hover:text-primary/80 underline">
                BDC — Business continuity plan templates & 8-step guide
              </a>
            </div>

            <div className="border border-border rounded-lg p-6 bg-card">
              <h3 className="text-xl font-semibold text-primary mb-3">12. Supplier Risk Mapping Worksheet + Diversification Checklist</h3>
              <p className="text-muted-foreground mb-4">
                Supplier criticality matrix, lead-time mapping and contract clause examples to reduce single-source exposure (downloadable spreadsheet templates recommended).
              </p>
              <p className="text-muted-foreground text-sm">
                Supplier templates & heatmaps (examples from Achilles, Smartsheet and open templates).
              </p>
            </div>

            <div className="border border-border rounded-lg p-6 bg-card">
              <h3 className="text-xl font-semibold text-primary mb-3">13. Cash-flow Stress-Test Template & Immediate Actions Playbook</h3>
              <p className="text-muted-foreground mb-4">
                Scenario-based stress test (e.g., 20% / 40% revenue loss), runway calculator, cost triage checklist, financing options (invoice finance, bank lines), and how to approach lenders.
              </p>
              <p className="text-muted-foreground text-sm">
                BDC cashflow templates and stress-test guidance for SMEs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* General Resources */}
      <section id="general" className="py-16 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-primary mb-8">{t('resources.generalTitle')}</h2>
          <div className="space-y-8">
            <div className="border border-border rounded-lg p-6 bg-card">
              <h3 className="text-xl font-semibold text-primary mb-3">Introduction to Risk Management</h3>
              <p className="text-muted-foreground mb-4">
                Every decision or investment comes with some level of risk, whether that's financial, reputational, operational, or any other kind of risk. What's key though is managing that risk — hence, risk management. Watch to learn the basics of risk management and why it's important for business.
              </p>
              <a href="https://youtu.be/EMaZFlwLVQI?si=a8VpRym2o5Jq3yHB" target="_blank" rel="noopener" className="text-primary hover:text-primary/80 underline">
                Watch: Risk Management Basics (YouTube)
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <section className="py-12 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-lg font-semibold text-primary mb-4">
            {t('resources.wantDownloads')}
          </p>
          <p className="text-sm text-muted-foreground">
            {t('resources.lastUpdated')}
          </p>
          <div className="mt-6">
            <Button asChild>
              <Link to="/contact">{t('resources.requestCustom')}</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ResourceLibrary;
