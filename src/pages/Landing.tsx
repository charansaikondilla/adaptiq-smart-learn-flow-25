
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";

const Landing = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        <section className="py-20 bg-gradient-to-b from-adaptive-dark to-adaptive-secondary/90">
          <div className="container mx-auto px-6">
            <div className="flex flex-col lg:flex-row items-center">
              <motion.div 
                className="lg:w-1/2 mb-12 lg:mb-0"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
                  Personalized Learning <br />
                  <span className="text-adaptive-primary">For Every Student</span>
                </h2>
                <p className="text-lg text-gray-200 mb-8 max-w-lg">
                  Adaptive IQ creates a personalized learning experience that adapts to your unique needs, 
                  helping you master concepts at your own pace.
                </p>
                <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                  <Button 
                    size="lg"
                    className="bg-adaptive-primary hover:bg-adaptive-secondary text-white"
                    onClick={() => navigate("/signup")}
                  >
                    Get Started
                  </Button>
                  <Button 
                    size="lg"
                    variant="outline" 
                    className="bg-transparent border-white text-white hover:bg-white/10"
                    onClick={() => user ? navigate("/dashboard") : navigate("/login")}
                  >
                    {user ? "Go to Dashboard" : "Try Demo"}
                  </Button>
                </div>
              </motion.div>
              <motion.div 
                className="lg:w-1/2"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="relative">
                  <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 relative z-10">
                    <div className="flex items-center mb-6">
                      <div className="w-10 h-10 rounded-full bg-adaptive-accent flex items-center justify-center">
                        <svg className="w-6 h-6 text-adaptive-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                        </svg>
                      </div>
                      <h3 className="text-lg font-semibold ml-3">Smart Learning Path</h3>
                    </div>
                    <p className="text-gray-600 mb-4">
                      AI-powered system that adapts to your learning style and knowledge gaps.
                    </p>
                    <div className="bg-adaptive-accent p-4 rounded-lg mb-6">
                      <div className="h-2 bg-gray-200 rounded-full mb-3">
                        <div className="h-2 rounded-full bg-adaptive-primary w-3/4"></div>
                      </div>
                      <div className="flex justify-between text-sm text-gray-500">
                        <span>Current Progress</span>
                        <span>75%</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <div className="flex items-center mb-2">
                          <div className="w-8 h-8 rounded-full bg-adaptive-primary/20 flex items-center justify-center">
                            <svg className="w-4 h-4 text-adaptive-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>
                          </div>
                          <span className="ml-2 text-sm font-medium">Class Notes</span>
                        </div>
                        <span className="text-xs text-gray-500">12 Recent Updates</span>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <div className="flex items-center mb-2">
                          <div className="w-8 h-8 rounded-full bg-adaptive-primary/20 flex items-center justify-center">
                            <svg className="w-4 h-4 text-adaptive-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                          <span className="ml-2 text-sm font-medium">Quizzes</span>
                        </div>
                        <span className="text-xs text-gray-500">5 Pending</span>
                      </div>
                    </div>
                    <div className="bg-adaptive-accent p-4 rounded-lg flex items-center">
                      <div className="w-10 h-10 rounded-full bg-adaptive-primary/30 flex items-center justify-center mr-4">
                        <svg className="w-6 h-6 text-adaptive-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-semibold">Recommended Next</h4>
                        <p className="text-sm text-gray-600">Algebra: Polynomial Equations</p>
                      </div>
                    </div>
                  </div>
                  <div className="absolute -top-6 -right-6 w-32 h-32 bg-adaptive-primary/20 rounded-full blur-2xl"></div>
                  <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-adaptive-secondary/20 rounded-full blur-3xl"></div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">How Adaptive IQ Works</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Our platform uses advanced AI to create a personalized learning experience
                that adapts to your unique needs and learning style.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <motion.div 
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <div className="w-12 h-12 bg-adaptive-accent rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-adaptive-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Automated Class Notes</h3>
                <p className="text-gray-600">
                  Access detailed, organized notes that summarize key concepts from your classes.
                </p>
              </motion.div>

              <motion.div 
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <div className="w-12 h-12 bg-adaptive-accent rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-adaptive-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Adaptive Quizzes</h3>
                <p className="text-gray-600">
                  Personalized quizzes that adapt to your knowledge level and help identify areas for improvement.
                </p>
              </motion.div>

              <motion.div 
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <div className="w-12 h-12 bg-adaptive-accent rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-adaptive-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Progress Tracking</h3>
                <p className="text-gray-600">
                  Visual insights into your learning journey with detailed analytics and performance metrics.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-adaptive-accent/30">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Join Thousands of Students</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Improve your understanding, boost your confidence, and achieve better results with Adaptive IQ.
              </p>
            </div>

            <div className="flex flex-col md:flex-row justify-center items-center space-y-6 md:space-y-0 md:space-x-6">
              <Button 
                size="lg"
                className="bg-adaptive-primary hover:bg-adaptive-secondary text-white"
                onClick={() => navigate("/signup")}
              >
                Create Free Account
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="border-adaptive-primary text-adaptive-primary hover:bg-adaptive-primary/10"
                onClick={() => navigate("/login")}
              >
                Login to Your Account
              </Button>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-adaptive-dark text-white py-8">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h2 className="text-xl font-bold flex items-center">
                <span className="text-adaptive-primary">Adaptive</span>
                <span className="ml-1">IQ</span>
              </h2>
              <p className="text-sm text-gray-400 mt-1">Personalized learning for every student</p>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-300 hover:text-adaptive-primary">Terms</a>
              <a href="#" className="text-gray-300 hover:text-adaptive-primary">Privacy</a>
              <a href="#" className="text-gray-300 hover:text-adaptive-primary">Support</a>
            </div>
          </div>
          <div className="mt-8 text-center text-gray-400 text-sm">
            © {new Date().getFullYear()} Adaptive IQ. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
