import {
  Sparkles,
  MessageSquare,
  Wand2,
  Zap,
  Palette,
  Globe,
} from "lucide-react";

export default function Features() {
  const features = [
    {
      icon: Sparkles,
      title: "AI Design Agent",
      description:
        "Lovart plans, explores, and creates like a real designer — calling the right tools and mapping out creative directions.",
      color: "text-blue-500",
    },
    {
      icon: MessageSquare,
      title: "ChatCanvas Interface",
      description:
        "Your ideas speak — and design responds. Mark what matters, leave notes, sketch frames. Lovart reads your intent.",
      color: "text-purple-500",
    },
    {
      icon: Wand2,
      title: "Multi-Format Creation",
      description:
        "From images to videos, audio to 3D. Every format you need, ready in an instant with professional quality.",
      color: "text-pink-500",
    },
    {
      icon: Zap,
      title: "Instant Generation",
      description:
        "No wait, no limits. Transform your concepts into stunning visuals with lightning-fast AI processing.",
      color: "text-yellow-500",
    },
    {
      icon: Palette,
      title: "Smart Design Tools",
      description:
        "Intelligent suggestions for layouts, color palettes, typography, and imagery to overcome creative blocks.",
      color: "text-green-500",
    },
    {
      icon: Globe,
      title: "Community Gallery",
      description:
        "Discover inspiring projects and designs from our vibrant community of creators and designers.",
      color: "text-indigo-500",
    },
  ];

  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            <span className="gradient-text">Revolutionary</span> Design Features
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience the future of design with AI-powered tools that
            understand your creative vision
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group p-8 rounded-2xl bg-gray-50 hover:bg-white hover:shadow-xl transition-all duration-300 border border-gray-100"
            >
              <div
                className={`w-12 h-12 rounded-xl bg-gray-100 group-hover:bg-white flex items-center justify-center mb-6 transition-colors ${feature.color}`}
              >
                <feature.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
