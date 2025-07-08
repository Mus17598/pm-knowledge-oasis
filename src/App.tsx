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
        {/* Removed hero/intro section */}
        <main className="pt-0 pb-16"> {/* Added pb-16 for more bottom padding */}
          <div className="container relative mx-auto px-4 py-2"> {/* Reduced py-4 to py-2 */}
            <div className="text-center mb-2"> {/* Reduced mb-4 to mb-2 */}
              <h1 className="text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary/80 to-primary/60 mb-2">
                PM Knowledge Oasis
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-0">
                Your comprehensive resource hub for product management excellence
              </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-7xl mx-auto"> {/* Reduced gap-8 to gap-6 */}
              <div id="resources" className="space-y-4 bg-card/50 rounded-2xl shadow-xl p-6 border border-border/50 backdrop-blur-sm hover:shadow-2xl transition-all duration-300"> {/* Reduced p-8 to p-6 and space-y-6 to space-y-4 */}
                <h2 className="text-3xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
                  Learning Resources
                </h2>
                <ResourceList />
              </div>
              <div id="chatbot-section" className="space-y-4 bg-card/50 rounded-2xl shadow-xl p-6 border border-border/50 backdrop-blur-sm hover:shadow-2xl transition-all duration-300"> {/* Reduced p-8 to p-6 and space-y-6 to space-y-4 */}
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
