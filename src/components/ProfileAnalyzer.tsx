import React, { useState } from 'react';
import { ArrowRight, Loader2 } from 'lucide-react';
import type { ProfileData } from '../App';

interface ProfileAnalyzerProps {
  onAnalyze: (data: ProfileData) => void;
  isAnalyzing: boolean;
}

const ProfileAnalyzer: React.FC<ProfileAnalyzerProps> = ({ onAnalyze, isAnalyzing }) => {
  const [formData, setFormData] = useState<ProfileData>({
    headline: '',
    summary: '',
    experience: '',
    skills: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAnalyze(formData);
  };

  return (
    <section id="profile-analyzer" className="max-w-4xl mx-auto mt-12 bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
      <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
        LinkedIn Analyzer
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="headline" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Professional Headline
          </label>
          <textarea
            id="headline"
            name="headline"
            rows={2}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            placeholder="e.g., Senior Software Engineer | AI Enthusiast | Tech Leader"
            value={formData.headline}
            onChange={handleChange}
            disabled={isAnalyzing}
            required
          />
        </div>

        <div>
          <label htmlFor="summary" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            About/Summary
          </label>
          <textarea
            id="summary"
            name="summary"
            rows={4}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            placeholder="Paste your current LinkedIn summary here..."
            value={formData.summary}
            onChange={handleChange}
            disabled={isAnalyzing}
            required
          />
        </div>

        <div>
          <label htmlFor="experience" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Experience
          </label>
          <textarea
            id="experience"
            name="experience"
            rows={6}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            placeholder="Paste your work experience here..."
            value={formData.experience}
            onChange={handleChange}
            disabled={isAnalyzing}
            required
          />
        </div>

        <div>
          <label htmlFor="skills" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Skills
          </label>
          <textarea
            id="skills"
            name="skills"
            rows={3}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            placeholder="List your current skills (comma-separated)..."
            value={formData.skills}
            onChange={handleChange}
            disabled={isAnalyzing}
            required
          />
        </div>

        <button
          type="submit"
          disabled={isAnalyzing}
          className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isAnalyzing ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Analyzing...
            </>
          ) : (
            <>
              Analyze Profile
              <ArrowRight className="w-5 h-5" />
            </>
          )}
        </button>
      </form>
    </section>
  );
};

export default ProfileAnalyzer;