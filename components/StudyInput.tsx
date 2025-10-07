import React, { useState } from 'react';
import { WandSparklesIcon } from './IconComponents';

// Dummy icon for the file upload button
const PaperclipIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
  </svg>
);


interface StudyInputProps {
  onGenerate: (goal: string) => void;
  isLoading: boolean;
}

const StudyInput: React.FC<StudyInputProps> = ({ onGenerate, isLoading }) => {
  const [goal, setGoal] = useState<string>('');
  // State for the dummy file list
  const [files, setFiles] = useState<File[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (goal.trim() && !isLoading) {
      // The 'files' state is not passed here, as it's for UI only
      onGenerate(goal);
    }
  };

  // Dummy handler to update the list of selected file names
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  return (
    <div className="bg-white dark:bg-slate-800/50 rounded-xl p-6 shadow-lg border border-slate-200 dark:border-slate-700">
      <form onSubmit={handleSubmit}>
        <label htmlFor="study-goal" className="block text-lg font-medium text-slate-700 dark:text-slate-300 mb-2">
          What's your learning objective?
        </label>
        <textarea
          id="study-goal"
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          placeholder="e.g., 'Master React Hooks in one week' or 'Prepare for my Calculus II final in 10 days'"
          className="w-full h-28 p-3 bg-slate-50 dark:bg-slate-900/80 border border-slate-300 dark:border-slate-600 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 resize-none placeholder-slate-400 dark:placeholder-slate-500 text-slate-800 dark:text-slate-200"
          disabled={isLoading}
        />

        {/* --- DUMMY FILE UPLOAD SECTION (START) --- */}
        <div className="mt-4">
          <label className="block text-sm font-medium text-slate-600 dark:text-slate-400">
            Upload supplementary materials (optional)
          </label>
          <div className="mt-2 flex items-center gap-4">
            <input
              id="file-upload"
              type="file"
              multiple
              className="hidden"
              onChange={handleFileChange}
              disabled={isLoading}
            />
            {/* This label acts as the visible button */}
            <label
              htmlFor="file-upload"
              className={`flex items-center gap-2 cursor-pointer bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-medium py-2 px-4 rounded-md hover:bg-slate-200 dark:hover:bg-slate-600 transition duration-200 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <PaperclipIcon className="w-4 h-4" />
              <span>Attach Files</span>
            </label>
          </div>
          {/* Display names of selected files */}
          {files.length > 0 && (
            <div className="mt-3 p-3 bg-slate-50 dark:bg-slate-900/50 rounded-md border border-slate-200 dark:border-slate-700">
              <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Selected files:</p>
              <ul className="mt-1 list-disc list-inside text-sm text-slate-500 dark:text-slate-400 space-y-1">
                {files.map((file, index) => (
                  <li key={index} className="truncate">
                    {file.name}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        {/* --- DUMMY FILE UPLOAD SECTION (END) --- */}

        <button
          type="submit"
          disabled={isLoading || !goal.trim()}
          className="mt-6 w-full flex items-center justify-center gap-2 bg-indigo-600 text-white font-semibold py-3 px-6 rounded-md hover:bg-indigo-700 disabled:bg-slate-400 dark:disabled:bg-slate-600 disabled:cursor-not-allowed transition duration-200"
        >
          {isLoading ? (
            <>
              <div className="w-5 h-5 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
              <span>Generating Plan...</span>
            </>
          ) : (
            <>
              <WandSparklesIcon className="w-5 h-5" />
              <span>Create My Plan</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default StudyInput;