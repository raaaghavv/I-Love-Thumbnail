import { Heart, Eye, Share2, TrendingUp } from "lucide-react";

export default function Community() {
  const projects = [
    {
      title: "Brand Identity Design",
      author: "Sarah Chen",
      views: "12.4k",
      likes: "1.2k",
      image: "bg-gradient-to-br from-blue-400 to-purple-600",
    },
    {
      title: "Product Visualization",
      author: "Mike Rodriguez",
      views: "8.7k",
      likes: "956",
      image: "bg-gradient-to-br from-pink-400 to-red-500",
    },
    {
      title: "Social Media Campaign",
      author: "Emma Thompson",
      views: "15.2k",
      likes: "2.1k",
      image: "bg-gradient-to-br from-green-400 to-blue-500",
    },
    {
      title: "3D Product Mockup",
      author: "Alex Kumar",
      views: "9.1k",
      likes: "1.5k",
      image: "bg-gradient-to-br from-purple-400 to-pink-500",
    },
    {
      title: "Logo Animation",
      author: "Lisa Wang",
      views: "11.8k",
      likes: "1.8k",
      image: "bg-gradient-to-br from-yellow-400 to-orange-500",
    },
    {
      title: "Package Design",
      author: "David Park",
      views: "7.3k",
      likes: "892",
      image: "bg-gradient-to-br from-indigo-400 to-purple-600",
    },
  ];

  return (
    <section id="community" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            <span className="gradient-text">Community</span> Creations
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover inspiring projects, artwork, and designs made by our
            vibrant community of creators
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              50K+
            </div>
            <div className="text-gray-600">Designers</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              1M+
            </div>
            <div className="text-gray-600">Designs Created</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              24/7
            </div>
            <div className="text-gray-600">AI Assistant</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              99%
            </div>
            <div className="text-gray-600">Satisfaction</div>
          </div>
        </div>

        {/* Project Gallery */}
        {/* <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <div key={index} className="group cursor-pointer">
              <div className="relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-xl transition-shadow duration-300"> */}
        {/* Project Image */}
        {/* <div className={`aspect-video ${project.image} relative`}>
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="text-white text-lg font-semibold">
                      View Project
                    </div>
                  </div>
                </div> */}

        {/* Project Info */}
        {/* <div className="p-6">
                  <h3 className="font-semibold text-lg mb-2 text-gray-900">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 mb-4">by {project.author}</p>

                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <Eye className="w-4 h-4" />
                        <span>{project.views}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Heart className="w-4 h-4" />
                        <span>{project.likes}</span>
                      </div>
                    </div>
                    <Share2 className="w-4 h-4 hover:text-gray-700 cursor-pointer" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div> */}

        {/* View More Button */}
        {/* <div className="text-center mt-12">
          <button className="gradient-bg text-white px-8 py-3 rounded-full font-semibold hover:opacity-90 transition-opacity flex items-center space-x-2 mx-auto">
            <span>Explore More Projects</span>
            <TrendingUp className="w-5 h-5" />
          </button>
        </div> */}
      </div>
    </section>
  );
}
