import { motion } from 'framer-motion';
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Code2,
  Rocket,
  Brain,
} from 'lucide-react';

export function Content() {
  return (
    <div className="absolute inset-0 overflow-y-auto">
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto px-6 py-24 md:py-16 text-white z-10"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
            Priyanshu Kumar
          </h1>
          <h2 className="text-2xl md:text-3xl mb-8 text-gray-300">
            Mechanical Engineering @IITBBS
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <Brain className="w-6 h-6 text-purple-400" />
                <h3 className="text-xl font-semibold">About Me</h3>
              </div>
              <p className="text-gray-300 leading-relaxed mb-4">
                I am a fresher at IIT Bhubaneshwar looking forward to
                collaborate and learn. A member of the Finance and Robotics and
                Intelligent Systems clubs at IIT Bhubaneshwar. As a passionate
                student, I’m eager to learn about emerging technologies and
                continuously explore new ideas.
              </p>
              <p className="text-gray-300 leading-relaxed"></p>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <Code2 className="w-6 h-6 text-purple-400" />
                <h3 className="text-xl font-semibold">Skills</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {['C', 'AutoCad'].map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 bg-white/20 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 mb-12">
            <div className="flex items-center gap-3 mb-4">
              <Rocket className="w-6 h-6 text-purple-400" />
              <h3 className="text-xl font-semibold">Featured Projects</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="group">
                  <h4 className="text-lg font-medium mb-2 flex items-center gap-2">
                    <span>Tic Tac Toe</span>
                    <ExternalLink href="https://github.com/priyanshu209006"  className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </h4>
                  <p className="text-gray-400 text-sm">
                    A Classic Game for Programming Practice using C.
                  </p>
                </div>
                {/* <div className="group">
                  <h4 className="text-lg font-medium mb-2 flex items-center gap-2">
                    <span>AI-Powered Analytics Dashboard</span>
                    <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </h4>
                  <p className="text-gray-400 text-sm">
                    Real-time analytics dashboard with AI-driven insights and
                    predictive modeling.
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="group">
                  <h4 className="text-lg font-medium mb-2 flex items-center gap-2">
                    <span>WebGL Game Engine</span>
                    <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </h4>
                  <p className="text-gray-400 text-sm">
                    A lightweight WebGL-based game engine for creating
                    browser-based 3D games.
                  </p>
                </div>
                <div className="group">
                  <h4 className="text-lg font-medium mb-2 flex items-center gap-2">
                    <span>Cloud Infrastructure Automation</span>
                    <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </h4>
                  <p className="text-gray-400 text-sm">
                    AWS infrastructure automation toolkit using TypeScript and
                    CDK.
                  </p>
                </div> */}
              </div>
            </div>
          </div>

          <div className="flex gap-6">
            <a
              href="https://github.com/priyanshu209006"
              className="text-white hover:text-purple-400 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="w-6 h-6" />
            </a>
            <a
              href="https://www.linkedin.com/in/priyanshu-kumar-2b2453322/"
              className="text-white hover:text-purple-400 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Linkedin className="w-6 h-6" />
            </a>
            <a
              href="mailto:24ME01075@iitbbs.ac.in"
              className="text-white hover:text-purple-400 transition-colors"
            >
              <Mail className="w-6 h-6" />
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
