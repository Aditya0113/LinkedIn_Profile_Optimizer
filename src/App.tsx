import React, { useState } from 'react';
import { ArrowRight, Sparkles, Star, BarChart3, Download, Copy, Moon } from 'lucide-react';
import Header from './components/Header';
import ProfileAnalyzer from './components/ProfileAnalyzer';
import SuggestionsPanel from './components/SuggestionsPanel';

export type ProfileData = {
  headline: string;
  summary: string;
  experience: string;
  skills: string;
};

export type SuggestionData = {
  optimizedHeadline: string;
  optimizedSummary: string;
  optimizedExperience: string;
  recommendedSkills: string[];
  profileStrength: number;
  trendingKeywords: string[];
  improvements: string[];
};

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [profileData, setProfileData] = useState<ProfileData>({
    headline: '',
    summary: '',
    experience: '',
    skills: ''
  });
  const [suggestions, setSuggestions] = useState<SuggestionData | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const analyzeProfile = (text: string): string => {
    if (!text) return '';
    
    // Enhanced optimization logic
    const weakWords = /\b(managed|responsible for|helped|did|made|worked on|good|great|handled|tried|attempted)\b/gi;
    const strongWords: { [key: string]: string } = {
      'managed': 'led',
      'responsible for': 'spearheaded',
      'helped': 'collaborated',
      'did': 'executed',
      'made': 'developed',
      'worked on': 'delivered',
      'good': 'exceptional',
      'great': 'outstanding',
      'handled': 'orchestrated',
      'tried': 'implemented',
      'attempted': 'pioneered'
    };

    return text.replace(weakWords, matched => strongWords[matched.toLowerCase()] || matched);
  };

  const extractSkills = (text: string): string[] => {
    if (!text) return [];

    const technicalSkills = [
      'JavaScript', 'React', 'Node.js', 'Python', 'AWS', 'Azure', 'GCP',
      'Machine Learning', 'Data Analysis', 'SQL', 'NoSQL', 'Docker', 'Kubernetes',
      'CI/CD', 'Git', 'REST API', 'GraphQL', 'TypeScript', 'Java', 'C#'
    ];
    
    const softSkills = [
      'Leadership', 'Communication', 'Problem Solving', 'Project Management',
      'Team Building', 'Strategic Planning', 'Agile', 'Scrum', 'Innovation',
      'Stakeholder Management', 'Cross-functional Collaboration'
    ];
    
    const allSkills = [...technicalSkills, ...softSkills];
    const foundSkills = allSkills.filter(skill => 
      new RegExp(`\\b${skill}\\b`, 'i').test(text)
    );
    
    return Array.from(new Set(foundSkills));
  };

  const calculateProfileStrength = (data: ProfileData): number => {
    let score = 0;
    const maxScore = 100;
    
    // Headline analysis (25 points)
    const headlineScore = (() => {
      let points = 0;
      if (data.headline.length >= 50) points += 10;
      if (data.headline.includes('|')) points += 5;
      if (/\b(lead|senior|manager|architect|expert)\b/i.test(data.headline)) points += 5;
      if (/\b(certified|award|recognized)\b/i.test(data.headline)) points += 5;
      return points;
    })();
    
    // Summary analysis (25 points)
    const summaryScore = (() => {
      let points = 0;
      if (data.summary.length >= 200) points += 10;
      if (/\b(achieved|delivered|improved|increased|reduced)\b/i.test(data.summary)) points += 5;
      if (/\b(\d+%|\$[0-9,]+)\b/i.test(data.summary)) points += 5;
      if (/\b(led|managed|developed|created)\b/i.test(data.summary)) points += 5;
      return points;
    })();
    
    // Experience analysis (25 points)
    const experienceScore = (() => {
      let points = 0;
      if (data.experience.length >= 300) points += 10;
      if (/\b(responsibility|achievement|project)\b/i.test(data.experience)) points += 5;
      if (/\b(\d+%|\$[0-9,]+)\b/i.test(data.experience)) points += 5;
      if (/\b(team|client|stakeholder)\b/i.test(data.experience)) points += 5;
      return points;
    })();
    
    // Skills analysis (25 points)
    const skillsScore = (() => {
      let points = 0;
      const skills = data.skills.split(/[,;]\s*/);
      points += Math.min(skills.length * 2, 15);
      if (skills.some(skill => /\b(certified|expert|advanced)\b/i.test(skill))) points += 5;
      if (skills.some(skill => /\b(lead|architect|manager)\b/i.test(skill))) points += 5;
      return points;
    })();
    
    score = headlineScore + summaryScore + experienceScore + skillsScore;
    return Math.min(score, maxScore);
  };

  const generateImprovements = (data: ProfileData, strength: number): string[] => {
    const improvements: string[] = [];
    
    if (strength < 90) {
      if (data.headline.length < 50) {
        improvements.push('Expand your headline with key achievements and specializations');
      }
      if (!data.headline.includes('|')) {
        improvements.push('Use vertical bars (|) to separate key roles or expertise areas in headline');
      }
      if (!/\b(\d+%|\$[0-9,]+)\b/i.test(data.summary + data.experience)) {
        improvements.push('Add quantifiable achievements (e.g., percentages, monetary values)');
      }
      if (!/\b(certified|certification)\b/i.test(data.summary + data.skills)) {
        improvements.push('Include relevant certifications or professional qualifications');
      }
      if (data.skills.split(/[,;]\s*/).length < 10) {
        improvements.push('List more relevant technical and soft skills (aim for 10-15 key skills)');
      }
    }
    
    return improvements.length > 0 ? improvements : ['Your profile is well-optimized! Consider keeping it updated with new achievements and skills.'];
  };

  const handleAnalyze = async (data: ProfileData) => {
    setIsAnalyzing(true);
    setProfileData(data);
    
    // Simulate API processing time
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const profileStrength = calculateProfileStrength(data);
    const optimizedHeadline = analyzeProfile(data.headline);
    const optimizedSummary = analyzeProfile(data.summary);
    const optimizedExperience = analyzeProfile(data.experience);
    const extractedSkills = extractSkills(data.experience + ' ' + data.summary + ' ' + data.skills);
    
    const suggestions: SuggestionData = {
      optimizedHeadline,
      optimizedSummary,
      optimizedExperience,
      recommendedSkills: [
        ...new Set([
          ...extractedSkills,
          'Strategic Planning',
          'Team Leadership',
          'Digital Transformation',
          'Agile Methodologies',
          'Stakeholder Management'
        ])
      ],
      profileStrength,
      trendingKeywords: [
        'Digital Transformation',
        'AI/ML',
        'Cloud Architecture',
        'Agile Leadership',
        'Innovation Strategy',
        'Data-Driven Decision Making'
      ],
      improvements: generateImprovements(data, profileStrength)
    };
    
    setSuggestions(suggestions);
    setIsAnalyzing(false);
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark bg-gray-900' : 'bg-gradient-to-br from-blue-50 to-indigo-50'}`}>
      <button
        onClick={() => setIsDarkMode(!isDarkMode)}
        className="fixed top-4 right-4 p-2 rounded-full bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all"
        aria-label="Toggle dark mode"
      >
        <Moon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
      </button>
      
      <div className="container mx-auto px-4 py-8">
        <Header onStartOptimization={() => {
          window.scrollTo({
            top: document.querySelector('#profile-analyzer')?.getBoundingClientRect().top,
            behavior: 'smooth'
          });
        }} />
        <main className="mt-12">
          <ProfileAnalyzer onAnalyze={handleAnalyze} isAnalyzing={isAnalyzing} />
          {suggestions && <SuggestionsPanel suggestions={suggestions} originalData={profileData} />}
        </main>
      </div>
    </div>
  );
}

export default App