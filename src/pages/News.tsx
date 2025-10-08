import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";

const News = () => {
  const newsItems = [
    {
      date: "October 8, 2025",
      category: "Cyber Security",
      categoryColor: "bg-blue-500",
      headline: "New Ransomware Variant Targets Small Businesses",
      content: "Security researchers have identified a new ransomware strain specifically targeting small and medium-sized businesses. The malware exploits common vulnerabilities in outdated software. Business owners are urged to update all systems immediately and implement robust backup procedures.",
      link: null
    },
    {
      date: "October 5, 2025",
      category: "Natural Disaster",
      categoryColor: "bg-red-500",
      headline: "Hurricane Season Preparedness Checklist Released",
      content: "FEMA has released an updated hurricane preparedness guide for businesses in coastal regions. Key recommendations include establishing evacuation procedures, securing important documents in waterproof containers, and maintaining emergency supply kits. The Atlantic hurricane season is expected to be more active than average this year.",
      link: "https://www.ready.gov/hurricanes"
    },
    {
      date: "September 28, 2025",
      category: "Business Continuity",
      categoryColor: "bg-green-500",
      headline: "Study Shows 60% of Small Businesses Lack Crisis Plans",
      content: "A recent survey reveals that only 40% of small businesses have documented crisis management plans. Companies without plans are three times more likely to close permanently after a major disruption. Industry experts recommend starting with basic emergency contact lists and gradually building comprehensive response procedures.",
      link: null
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-primary/5 py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Crisis Management News</h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            Stay informed with the latest updates on crisis management, disaster preparedness, 
            and business continuity. Updated regularly with relevant news for small businesses.
          </p>
        </div>
      </section>

      {/* News Feed */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="space-y-6">
            {newsItems.map((item, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-sm text-muted-foreground">{item.date}</span>
                    <Badge className={`${item.categoryColor} text-white border-0`}>
                      {item.category}
                    </Badge>
                  </div>
                  <h2 className="text-2xl font-semibold">{item.headline}</h2>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    {item.content}
                  </p>
                  {item.link && (
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-primary hover:underline"
                    >
                      Read full article
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Footer Note */}
          <div className="mt-12 p-6 bg-muted/50 rounded-lg">
            <p className="text-sm text-muted-foreground">
              <strong>Add new items:</strong> To add news articles, simply add new objects to the newsItems array 
              at the top of this component. Place the newest items first to maintain reverse-chronological order.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default News;
