import React, { useState } from 'react';
import { Star, BarChart3, Download, Copy, CheckCircle, AlertCircle } from 'lucide-react';
import type { ProfileData, SuggestionData } from '../App';
import { jsPDF } from 'jspdf';

interface SuggestionsPanelProps {
  suggestions: SuggestionData;
  originalData: ProfileData;
}

const SuggestionsPanel: React.FC<SuggestionsPanelProps> = ({ suggestions, originalData }) => {
  const [copySuccess, setCopySuccess] = useState<boolean>(false);

  const handleCopy = async () => {
    const content = `
Professional Headline:
${suggestions.optimizedHeadline}

Summary:
${suggestions.optimizedSummary}

Experience:
${suggestions.optimizedExperience}

Recommended Skills:
${suggestions.recommendedSkills.join(', ')}

Trending Keywords:
${suggestions.trendingKeywords.join(', ')}

Suggested Improvements:
${suggestions.improvements.map(imp => `- ${imp}`).join('\n')}
    `;
    
    try {
      await navigator.clipboard.writeText(content);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error('Failed to copy content:', err);
      alert('Failed to copy content. Please try again.');
    }
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    const lineHeight = 7;
    let yPos = 20;

    // Title
    doc.setFontSize(20);
    doc.text('LinkedIn Profile Optimization Results', 20, yPos);
    yPos += lineHeight * 2;

    // Profile Strength
    doc.setFontSize(16);
    doc.text(`Profile Strength: ${suggestions.profileStrength}/100`, 20, yPos);
    yPos += lineHeight * 2;

    // Original Profile
    doc.setFontSize(14);
    doc.text('Original Profile:', 20, yPos);
    yPos += lineHeight;

    doc.setFontSize(12);
    doc.text('Headline:', 20, yPos);
    yPos += lineHeight;
    doc.setFontSize(10);
    const headlineLines = doc.splitTextToSize(originalData.headline, 170);
    doc.text(headlineLines, 20, yPos);
    yPos += headlineLines.length * lineHeight;

    // Optimized Profile
    yPos += lineHeight;
    doc.setFontSize(14);
    doc.text('Optimized Profile:', 20, yPos);
    yPos += lineHeight;

    doc.setFontSize(12);
    doc.text('Headline:', 20, yPos);
    yPos += lineHeight;
    doc.setFontSize(10);
    const optHeadlineLines = doc.splitTextToSize(suggestions.optimizedHeadline, 170);
    doc.text(optHeadlineLines, 20, yPos);
    yPos += optHeadlineLines.length * lineHeight;

    // Add a new page if needed
    if (yPos > 250) {
      doc.addPage();
      yPos = 20;
    }

    // Recommended Skills
    yPos += lineHeight;
    doc.setFontSize(14);
    doc.text('Recommended Skills:', 20, yPos);
    yPos += lineHeight;
    doc.setFontSize(10);
    const skillsText = doc.splitTextToSize(suggestions.recommendedSkills.join(', '), 170);
    doc.text(skillsText, 20, yPos);
    yPos += skillsText.length * lineHeight;

    // Trending Keywords
    yPos += lineHeight;
    doc.setFontSize(14);
    doc.text('Trending Keywords:', 20, yPos);
    yPos += lineHeight;
    doc.setFontSize(10);
    const keywordsText = doc.splitTextToSize(suggestions.trendingKeywords.join(', '), 170);
    doc.text(keywordsText, 20, yPos);
    yPos += keywordsText.length * lineHeight;

    // Improvements
    if (yPos > 250) {
      doc.addPage();
      yPos = 20;
    }
    yPos += lineHeight;
    doc.setFontSize(14);
    doc.text('Suggested Improvements:', 20, yPos);
    yPos += lineHeight;
    doc.setFontSize(10);
    suggestions.improvements.forEach(improvement => {
      const improvementLines = doc.splitTextToSize(`• ${improvement}`, 170);
      doc.text(improvementLines, 20, yPos);
      yPos += improvementLines.length * lineHeight;
    });

    doc.save('linkedin-profile-optimization.pdf');
  };

  return (
    <section className="max-w-4xl mx-auto mt-12 space-y-8">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
        <div className="flex items-center gap-3 mb-6">
          <Star className="w-6 h-6 text-yellow-500" />
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Profile Strength
          </h2>
        </div>
        
        <div className="w-full h-4 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-yellow-400 to-yellow-500 transition-all duration-1000"
            style={{ width: `${suggestions.profileStrength}%` }}
          />
        </div>
        
        <p className="mt-4 text-gray-600 dark:text-gray-300">
          Your profile strength: <span className="font-semibold">{suggestions.profileStrength}/100</span>
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
        <div className="flex items-center gap-3 mb-6">
          <AlertCircle className="w-6 h-6 text-orange-500" />
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Suggested Improvements
          </h2>
        </div>
        
        <ul className="space-y-2">
          {suggestions.improvements.map((improvement, index) => (
            <li 
              key={index}
              className="flex items-start gap-2 text-gray-600 dark:text-gray-300"
            >
              <span className="text-orange-500">•</span>
              {improvement}
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
        <div className="flex items-center gap-3 mb-6">
          <BarChart3 className="w-6 h-6 text-indigo-500" />
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Trending Keywords
          </h2>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {suggestions.trendingKeywords.map((keyword) => (
            <span 
              key={keyword}
              className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 rounded-full text-sm"
            >
              {keyword}
            </span>
          ))}
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
        <div className="flex items-center gap-3 mb-6">
          <CheckCircle className="w-6 h-6 text-green-500" />
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Optimized Content
          </h2>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">Professional Headline</h3>
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <p className="text-gray-600 dark:text-gray-300">{suggestions.optimizedHeadline}</p>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">Summary</h3>
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <p className="text-gray-600 dark:text-gray-300">{suggestions.optimizedSummary}</p>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">Recommended Skills</h3>
            <div className="flex flex-wrap gap-2">
              {suggestions.recommendedSkills.map((skill) => (
                <span 
                  key={skill}
                  className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-4">
        <button
          onClick={handleCopy}
          className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 ${
            copySuccess 
              ? 'bg-green-600 hover:bg-green-700' 
              : 'bg-indigo-600 hover:bg-indigo-700'
          } text-white rounded-lg font-semibold transition-colors`}
        >
          <Copy className="w-5 h-5" />
          {copySuccess ? 'Copied!' : 'Copy Optimized Content'}
        </button>
        <button
          onClick={handleDownloadPDF}
          className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gray-600 text-white rounded-lg font-semibold hover:bg-gray-700 transition-colors"
        >
          <Download className="w-5 h-5" />
          Download as PDF
        </button>
      </div>
    </section>
  );
};

export default SuggestionsPanel;