import React, { useState } from 'react';
import { ChevronDown, ChevronUp, FileText, Rocket, Check } from 'lucide-react';
import { Course, Lesson, Module } from '../types';

interface Props {
  course: Course;
  completedLessons: string[];
  onLessonClick: (lesson: Lesson) => void;
}

export default function StudentCourseView({ course, completedLessons, onLessonClick }: Props) {
  const [expandedModules, setExpandedModules] = useState<string[]>(course.modules.map(m => m.id));

  const toggleModule = (moduleId: string) => {
    setExpandedModules(prev =>
      prev.includes(moduleId) ? prev.filter(id => id !== moduleId) : [...prev, moduleId]
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-6 text-zinc-200">
      <h1 className="text-3xl font-bold mb-8 text-white">{course.title}</h1>
      
      <div className="space-y-4">
        {course.modules.map((module) => (
          <div key={module.id} className="border border-zinc-800 rounded-xl bg-zinc-900/50">
            <button
              onClick={() => toggleModule(module.id)}
              className="w-full flex items-center justify-between p-4 bg-zinc-900 rounded-t-xl hover:bg-zinc-800 transition-colors"
            >
              <h2 className="text-lg font-bold text-emerald-400">{module.title}</h2>
              {expandedModules.includes(module.id) ? <ChevronUp /> : <ChevronDown />}
            </button>
            
            {expandedModules.includes(module.id) && (
              <div className="divide-y divide-zinc-800">
                {module.lessons.map((lesson) => {
                  const isCompleted = completedLessons.includes(lesson.id);
                  return (
                    <button
                      key={lesson.id}
                      onClick={() => onLessonClick(lesson)}
                      className="w-full flex items-center justify-between p-4 hover:bg-zinc-800 transition-colors text-left"
                    >
                      <div className="flex items-center gap-4">
                        {isCompleted ? <Check className="w-5 h-5 text-emerald-500" /> : <FileText className="w-5 h-5 text-zinc-500" />}
                        <div>
                          <p className="font-medium text-white">{lesson.title}</p>
                          <p className="text-xs text-zinc-400">{isCompleted ? 'Visto' : 'Não visto'}</p>
                        </div>
                      </div>
                      {isCompleted && <Check className="w-5 h-5 text-emerald-500" />}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
