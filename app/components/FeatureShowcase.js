"use client";
import { useState } from "react";
import { Play, Pause, RotateCcw, Download } from "lucide-react";

export default function FeatureShowcase() {
  const [activeTab, setActiveTab] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const showcases = [
    {
      title: "Image Generation",
      description: "Create stunning visuals from simple text descriptions",
      preview: "bg-gradient-to-br from-blue-400 to-purple-600",
    },
    {
      title: "Video Creation",
      description: "Generate dynamic videos with smooth animations",
      preview: "bg-gradient-to-br from-pink-400 to-red-500",
    },
    {
      title: "3D Modeling",
      description: "Build complex 3D models and scenes effortlessly",
      preview: "bg-gradient-to-br from-green-400 to-blue-500",
    },
    {
      title: "Brand Design",
      description:
        "Complete brand identities with logos, colors, and guidelines",
      preview: "bg-gradient-to-br from-yellow-400 to-orange-500",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            <span className="gradient-text">See Lovart</span> in Action
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Watch how our AI design agent transforms ideas into reality across
            multiple formats
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Tab Navigation */}
          <div className="space-y-4">
            {showcases.map((showcase, index) => (
              <div
                key={index}
                className={`p-6 rounded-xl cursor-pointer transition-all duration-300 ${
                  activeTab === index
                    ? "bg-red-50 border-2 border-red-200"
                    : "bg-gray-50 border-2 border-transparent hover:bg-gray-100"
                }`}
                onClick={() => setActiveTab(index)}
              >
                <h3
                  className={`text-xl font-semibold mb-2 ${
                    activeTab === index ? "text-red-400" : "text-gray-900"
                  }`}
                >
                  {showcase.title}
                </h3>
                <p className="text-gray-600">{showcase.description}</p>
              </div>
            ))}
          </div>

          {/* Preview Area */}
          <div className="relative">
            <div
              className={`aspect-video rounded-2xl ${showcases[activeTab].preview} relative overflow-hidden shadow-2xl`}
            >
              {/* Overlay Controls */}
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                <div className="flex space-x-4">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                  >
                    {isPlaying ? (
                      <Pause className="w-6 h-6" />
                    ) : (
                      <Play className="w-6 h-6 ml-1" />
                    )}
                  </button>
                  <button className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors">
                    <RotateCcw className="w-6 h-6" />
                  </button>
                  <button className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors">
                    <Download className="w-6 h-6" />
                  </button>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="absolute bottom-4 left-4 right-4">
                <div className="w-full h-1 bg-white/30 rounded-full overflow-hidden">
                  <div className="h-full bg-white rounded-full w-1/3 transition-all duration-300"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
