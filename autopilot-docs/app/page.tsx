import Link from 'next/link';
import { ArrowRight, Shield, Zap, GitCommit, Terminal } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)]">
      {/* Hero */}
      <section className="py-20 px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
          Git automation with safety rails
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
          Intelligent Git automation that commits and pushes your code, so you can focus on building.
        </p>
        
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-12">
          <Link 
            href="/docs/quick-start"
            className="px-8 py-3 rounded-full bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            Get Started <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/docs"
            className="px-8 py-3 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 font-semibold hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            Read the Docs
          </Link>
        </div>

        <div className="max-w-md mx-auto bg-gray-900 rounded-lg p-4 text-left shadow-xl overflow-x-auto">
          <div className="flex gap-2 mb-4">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          <code className="font-mono text-sm text-gray-300">
            <span className="text-green-400">$</span> npm install -g @traisetech/autopilot
          </code>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Autopilot?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard 
              icon={<GitCommit className="h-8 w-8 text-blue-500" />}
              title="Smart Commits"
              description="Generates professional conventional commit messages automatically based on your changes."
            />
            <FeatureCard 
              icon={<Zap className="h-8 w-8 text-yellow-500" />}
              title="File Watcher"
              description="Real-time file monitoring with smart debouncing using chokidar to catch every save."
            />
            <FeatureCard 
              icon={<Shield className="h-8 w-8 text-green-500" />}
              title="Safety First"
              description="Blocks commits on protected branches and checks remote status to prevent conflicts."
            />
            <FeatureCard 
              icon={<Terminal className="h-8 w-8 text-purple-500" />}
              title="Zero Config"
              description="Works out of the box, but fully configurable via .autopilotrc.json if needed."
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-gray-200 dark:border-gray-800 mt-auto">
        <div className="container mx-auto px-4 text-center text-gray-500">
          <p>Built by <a href="https://github.com/PraiseTechzw" className="hover:text-blue-500 underline decoration-dotted">Praise Masunga (PraiseTechzw)</a></p>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 dark:text-gray-400">{description}</p>
    </div>
  );
}
