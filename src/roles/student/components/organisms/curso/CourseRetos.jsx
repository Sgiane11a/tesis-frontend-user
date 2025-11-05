import React, { useState, useMemo } from 'react';
import ChallengeForm from '../../molecules/curso/retos/ChallengeForm';
import RecentList from '../../molecules/curso/retos/RecentList';
import RightOptionCards from '../../molecules/curso/retos/RightOptionCards';
import { sampleModules } from '../../../data/staticData';

const CourseRetos = () => {
  const [type, setType] = useState('quiz');
  const [prompt, setPrompt] = useState('Historia del Perú - Independencia y sus protagonistas');
  const [difficulty, setDifficulty] = useState('normal');
  const [created, setCreated] = useState([]);
  const [generating, setGenerating] = useState(false);
  const [mapType, setMapType] = useState('mental');
  const [previewItem, setPreviewItem] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedTopics, setSelectedTopics] = useState([]);

  const generateChallenge = async () => {
    if (!prompt.trim()) return;
    setGenerating(true);
    await new Promise(r => setTimeout(r, 700));
    const id = `r_${Date.now()}`;
    const title = `${type === 'quiz' ? 'Quiz' : type === 'wordsearch' ? 'Sopa de letras' : 'Tarjetas'}: ${prompt.slice(0, 40)}`;
    const content = `Generado (${type}) — Dificultad: ${difficulty} — Tema: ${prompt} — Temas seleccionados: ${selectedTopics.join(', ')}`;
    const item = { id, type, title, content, createdAt: new Date().toISOString() };
    setCreated(prev => [item, ...prev]);
    setGenerating(false);
    setPreviewItem(item);
    // close the form overlay after creation
    setSelectedOption(null);

  };

  const generateMap = async () => {
    if (!prompt.trim()) return;
    setGenerating(true);
    await new Promise(r => setTimeout(r, 900));
    const id = `m_${Date.now()}`;
    const item = { id, type: 'map', mapType, title: `Mapa ${mapType} — ${prompt.slice(0,30)}`, content: `Mapa ${mapType} generado para: ${prompt} — Temas: ${selectedTopics.join(', ')}`, createdAt: new Date().toISOString() };
    setCreated(prev => [item, ...prev]);
    setGenerating(false);
    setPreviewItem(item);
    // close the form overlay after creation
    setSelectedOption(null);
  };

  const remove = (id) => setCreated(prev => prev.filter(p => p.id !== id));

  // simple completed list placeholder; in a real app this would come from server/state
  const [completed, setCompleted] = useState([]);

  // Mini options were removed; selection now happens from RightOptionCards

  const handleView = (it) => setPreviewItem(it);

  // No filtering: show full created list

  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 min-h-[60vh]">
        <div className="lg:col-span-3">
          <div className="flex flex-col lg:flex-row lg:items-start lg:gap-4">
            <div className="flex-1">
                {/* Mini options removed — use the tarjetas a la derecha */}
              </div>
          </div>
          <div className="mt-4 relative">
            {/* RecentList occupies left main area by default */}
            <RecentList itemsCreated={created} itemsCompleted={completed} onDelete={remove} onView={handleView} />

            {/* Overlay form appears over RecentList when an option is selected */}
            {selectedOption && (
              <div className="absolute inset-0 bg-black/30 flex items-start justify-center p-6">
                <div className="w-full max-w-md">
                  <div className="bg-white border rounded-lg shadow p-4 relative">
                    <button onClick={() => setSelectedOption(null)} className="absolute top-2 right-2 text-gray-500 hover:text-gray-800">✕</button>
                    <div className="mb-3 text-sm text-gray-600">Opción: <span className="font-medium">{selectedOption}</span></div>
                    <div>
                      <ChallengeForm
                        type={type}
                        prompt={prompt}
                        setType={setType}
                        setPrompt={setPrompt}
                        difficulty={difficulty}
                        setDifficulty={setDifficulty}
                        onGenerate={generateChallenge}
                        generating={generating}
                        modules={sampleModules}
                        selectedTopics={selectedTopics}
                        setSelectedTopics={setSelectedTopics}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="w-full lg:col-span-1 lg:w-auto flex-shrink-0">
          <div className="lg:w-45">
            <RightOptionCards onSelect={(k) => { setSelectedOption(k); setType(k); }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseRetos;
