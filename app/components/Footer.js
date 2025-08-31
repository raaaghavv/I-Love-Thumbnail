import { Sparkles, Twitter, Linkedin, Github, Mail } from "lucide-react";

export default function Footer() {
  const footerLinks = {
    Product: ["Features", "Pricing"],
    // Company: ["About", "Blog", "Careers", "Press"],
    // Resources: ["Help Center", "Community", "Tutorials", "Templates"],
    Legal: ["Privacy Policy", "Terms of Service"],
  };

  return (
    <footer className="bg-red-50 text-gray-800 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-3">
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-red-500 rounded-lg flex items-center justify-center w-8 h-8">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">ThumbPic</span>
            </div>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Transform your ideas into stunning visuals with the power of
              artificial intelligence.
            </p>
            <div className="flex space-x-4">
              <Twitter className="w-5 h-5 text-gray-500 hover:text-gray-600 cursor-pointer transition-colors" />
              <Linkedin className="w-5 h-5 text-gray-500 hover:text-gray-600 cursor-pointer transition-colors" />
              <Github className="w-5 h-5 text-gray-500 hover:text-gray-600 cursor-pointer transition-colors" />
              <Mail className="w-5 h-5 text-gray-500 hover:text-gray-600 cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Footer Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="font-semibold text-gray-900 mb-4">{category}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-gray-600 hover:text-gray-800 transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-red-100 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-600 text-sm">
            © 2025 ThumbPic. All rights reserved.
          </div>
          <div className="text-gray-600 text-sm mt-4 md:mt-0">
            Made with ❤️ for designers worldwide
          </div>
        </div>
      </div>
    </footer>
  );
}
