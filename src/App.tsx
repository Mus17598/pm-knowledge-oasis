import { ChatBot } from "@/components/ChatBot";
import { ResourceList } from "@/components/ResourceList";
import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";
import Navigation from "@/components/Navigation";
import { ThemeProvider } from "@/components/ThemeProvider";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30">
        <Navigation />
        <main className="pt-16">
          <div className="container relative mx-auto px-4 py-12">
            <div className="text-center mb-12">
              <h1 className="text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary/80 to-primary/60 mb-4">
                PM Knowledge Oasis
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
                Your comprehensive resource hub for product management excellence
              </p>
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary/90 text-white cursor-pointer"
                onClick={() => {
                  const chatbotSection = document.getElementById('chatbot-section');
                  chatbotSection?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <MessageSquare className="mr-2 h-5 w-5" />
                Chat with PM Assistant
              </Button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
              <div className="space-y-6 bg-card/50 rounded-2xl shadow-xl p-8 border border-border/50 backdrop-blur-sm hover:shadow-2xl transition-all duration-300">
                <h2 className="text-3xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
                  Learning Resources
                </h2>
                <ResourceList />
              </div>
              
              <div id="chatbot-section" className="space-y-6 bg-card/50 rounded-2xl shadow-xl p-8 border border-border/50 backdrop-blur-sm hover:shadow-2xl transition-all duration-300">
                <h2 className="text-3xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
                  PM Assistant
                </h2>
                <div className="w-full">
                  <ChatBot />
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;
