import { MessageCircle, Brain, Rocket, Download } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      icon: MessageCircle,
      title: "Describe Your Vision",
      description:
        "Simply tell ThumbPic what you want to create. Use natural language to describe your design goals and requirements.",
    },
    {
      icon: Brain,
      title: "AI Processes & Plans",
      description:
        "ThumbPic analyzes your request, plans the design approach, and selects the right tools for your specific needs.",
    },
    {
      icon: Rocket,
      title: "Creates & Iterates",
      description:
        "Watch as ThumbPic generates your designs, refines them based on feedback, and delivers professional results.",
    },
    {
      icon: Download,
      title: "Download & Use",
      description: "Get your finished designs ready to use.",
    },
  ];

  return (
    <section
      id="how-it-works"
      className="py-20 bg-gradient-to-br from-gray-50 to-red-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            How <span className="gradient-text">ThumbPic</span> Works
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            From idea to reality in four simple steps. No design experience
            required.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center group">
              <div className="relative mb-6">
                {/* Connection Line */}
                {/* {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 left-full w-full h-0.5 bg-gradient-to-r from-gray-200 to-red-200 transform -translate-y-1/2 z-0"></div>
                )} */}

                {/* Step Icon */}
                <div className="relative z-10 w-20 h-20 gradient-bg rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                  <step.icon className="w-10 h-10 text-gray-500" />
                </div>

                {/* Step Number */}
                {/* <div className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full border-2 border-red-500 flex items-center justify-center text-red-500 font-bold text-sm">
                  {index + 1}
                </div> */}
              </div>

              <h3 className="text-xl font-semibold mb-4 text-gray-900">
                {step.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
