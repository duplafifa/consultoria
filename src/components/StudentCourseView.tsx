import React, { useState } from 'react';
import { ChevronDown, ChevronUp, FileText, Rocket, Check, Circle } from 'lucide-react';
import { Course, Lesson } from '../types';

interface Props {
  course: Course;
  completedLessons: string[];
  onLessonClick: (lesson: Lesson) => void;
  onBack: () => void;
}

export default function StudentCourseView({ course, completedLessons, onLessonClick, onBack }: Props) {
  const [expandedModules, setExpandedModules] = useState<string[]>(course.modules.map(m => m.id));

  const toggleModule = (moduleId: string) => {
    setExpandedModules(prev =>
      prev.includes(moduleId) ? prev.filter(id => id !== moduleId) : [...prev, moduleId]
    );
  };

  return (
    <div className="max-w-5xl mx-auto p-6 text-zinc-200">
      <button onClick={onBack} className="text-emerald-500 hover:text-emerald-400 mb-4 flex items-center gap-2">
         &larr; Voltar para Meus Cursos
      </button>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">{course.title}</h1>
        <button className="px-4 py-2 bg-zinc-800 text-zinc-300 rounded-lg text-sm border border-zinc-700 hover:bg-zinc-700">
          Ocultar todo
        </button>
      </div>
      
      <div className="space-y-4">
        {course.modules.map((module) => (
          <div key={module.id} className="border border-zinc-800 rounded-lg bg-zinc-900">
            <div className="flex items-center justify-between p-4 bg-zinc-900/50 border-b border-zinc-800">
              <button
                onClick={() => toggleModule(module.id)}
                className="flex items-center text-lg font-bold text-emerald-700 hover:text-emerald-600 transition-colors"
              >
                {expandedModules.includes(module.id) ? <ChevronUp className="w-5 h-5 mr-2" /> : <ChevronDown className="w-5 h-5 mr-2" />}
                {module.title}
              </button>
              <button className="text-xs text-emerald-700 border border-emerald-700 px-3 py-1 rounded-full hover:bg-emerald-950">
                Completa todos os itens
              </button>
            </div>
            
            {expandedModules.includes(module.id) && (
              <div className="divide-y divide-zinc-800">
                {module.lessons.map((lesson, index) => {
                  const isCompleted = completedLessons.includes(lesson.id);
                  // Simulate differentiating between lecture and activity based on index, as no type field exists
                  const isActivity = index >= 2; 
                  return (
                    <button
                      key={lesson.id}
                      onClick={() => onLessonClick(lesson)}
                      className="w-full flex items-center justify-between p-4 hover:bg-zinc-800/50 transition-colors text-left"
                    >
                      <div className="flex items-center gap-4">
                        {isActivity ? <Rocket className="w-5 h-5 text-emerald-700" /> : <FileText className="w-5 h-5 text-emerald-700" />}
                        <div>
                          <p className="font-medium text-emerald-800">{lesson.title}</p>
                          <p className="text-xs text-zinc-500">{isCompleted ? 'Visto' : '0 pontos'}</p>
                        </div>
                      </div>
                      {isCompleted ? <Check className="w-5 h-5 text-emerald-500" /> : <Circle className="w-5 h-5 text-zinc-600" />}
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
