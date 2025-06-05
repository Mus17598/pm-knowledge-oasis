import { ChatBot } from "@/components/ChatBot";

export default function Home() {
  return (
    <main className="container mx-auto py-8">
      <h1 className="text-4xl font-bold text-center mb-8">PM Knowledge Oasis</h1>
      <ChatBot />
    </main>
  );
} 