"use client";
import {
  ArrowRight,
  Play,
  Sparkles,
  Palette,
  Video,
  Cuboid,
} from "lucide-react";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="pt-20 pb-16 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-full px-4 py-2 mb-8">
            <Sparkles className="w-4 h-4 text-purple-500" />
            <span className="text-sm font-medium text-gray-700">
              World's First AI Design Agent
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            <span className="gradient-text">ThumbPic automates</span>
            <br />
            <span className="text-gray-900">the entire design journey</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            From concept to ready to use thumbnails. ThumbPic plans, explores,
            and creates like a real designer — bringing your creative vision to
            life.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 mb-16">
            <Link
              href={"/generate-thumbnail"}
              className="bg-red-300/20 text-gray-700 px-8 py-4 rounded-full font-semibold text-lg border border-red-300 hover:bg-red-200/50 transition-colors flex items-center space-x-2"
            >
              <span>Start Creating Free</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
            <button className="bg-white text-gray-700 px-8 py-4 rounded-full font-semibold text-lg border border-gray-300 hover:bg-gray-50 transition-colors flex items-center space-x-2">
              <Play className="w-5 h-5" />
              <span>Watch Demo</span>
            </button>
          </div>

          {/* Floating Icons */}
          <div className="relative">
            <div className="flex justify-center items-center space-x-8">
              <div className="animate-float">
                <div className="w-16 h-16 bg-white rounded-2xl shadow-lg flex items-center justify-center">
                  <Palette className="w-8 h-8 text-blue-500" />
                </div>
              </div>
              <div className="animate-float" style={{ animationDelay: "2s" }}>
                <div className="w-16 h-16 bg-white rounded-2xl shadow-lg flex items-center justify-center">
                  <Video className="w-8 h-8 text-purple-500" />
                </div>
              </div>
              <div className="animate-float" style={{ animationDelay: "4s" }}>
                <div className="w-16 h-16 bg-white rounded-2xl shadow-lg flex items-center justify-center">
                  <Cuboid className="w-8 h-8 text-pink-500" />
                </div>
              </div>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="mt-16 text-center">
            <p className="text-gray-500 mb-4">Trusted by designers at</p>
            <div className="flex justify-center items-center space-x-8 opacity-60">
              <div className="text-2xl font-bold text-gray-400">COMPANY</div>
              <div className="text-2xl font-bold text-gray-400">BRAND</div>
              <div className="text-2xl font-bold text-gray-400">STUDIO</div>
              <div className="text-2xl font-bold text-gray-400">AGENCY</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
