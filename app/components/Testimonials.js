import { Star, Quote } from "lucide-react";

export default function Testimonials() {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Creative Director",
      company: "Design Studio Pro",
      content:
        "Lovart has revolutionized our design process. What used to take days now takes minutes, and the quality is consistently outstanding.",
      rating: 5,
      avatar: "bg-gradient-to-br from-blue-400 to-purple-500",
    },
    {
      name: "Michael Chen",
      role: "Brand Designer",
      company: "Tech Innovations Inc",
      content:
        "The AI understands context like no other tool. It's like having a senior designer who never sleeps and always delivers.",
      rating: 5,
      avatar: "bg-gradient-to-br from-green-400 to-blue-500",
    },
    {
      name: "Emily Rodriguez",
      role: "Marketing Manager",
      company: "Growth Agency",
      content:
        "From social media graphics to full campaigns, Lovart handles everything. Our productivity has increased by 300%.",
      rating: 5,
      avatar: "bg-gradient-to-br from-pink-400 to-red-500",
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-purple-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            What <span className="gradient-text">Designers</span> Say
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            See what the community is saying about Lovart's revolutionary design
            capabilities
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              {/* Quote Icon */}
              <Quote className="w-8 h-8 text-gray-300 mb-4" />

              {/* Rating */}
              <div className="flex space-x-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>

              {/* Testimonial Content */}
              <p className="text-gray-700 mb-6 leading-relaxed">
                "{testimonial.content}"
              </p>

              {/* Author Info */}
              <div className="flex items-center space-x-4">
                <div
                  className={`w-12 h-12 rounded-full ${testimonial.avatar} flex items-center justify-center`}
                >
                  <span className="text-white font-semibold text-lg">
                    {testimonial.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </span>
                </div>
                <div>
                  <div className="font-semibold text-gray-900">
                    {testimonial.name}
                  </div>
                  <div className="text-gray-600 text-sm">
                    {testimonial.role}
                  </div>
                  <div className="text-gray-500 text-sm">
                    {testimonial.company}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
