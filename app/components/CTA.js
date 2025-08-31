import { ArrowRight, Sparkles } from "lucide-react";

export default function CTA() {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-red-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-white shadow-xl rounded-3xl p-12 border border-red-100">
          <Sparkles className="w-16 h-16 text-red-500 mx-auto mb-6" />

          <h2 className="text-3xl md:text-5xl font-bold text-gray-800 mb-6">
            Ready to Transform Your Design Process?
          </h2>

          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Experience the world's first AI design agent—no wait, no limits.
            Sign up and bring your ideas to life today.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <button className="bg-red-500 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-red-600 transition-colors flex items-center space-x-2">
              <span>Start Creating Free</span>
              <ArrowRight className="w-5 h-5 ml-2" />
            </button>
            <button className="bg-white text-red-500 px-8 py-4 rounded-full font-semibold text-lg border border-red-200 hover:bg-rose-50 transition-colors">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
