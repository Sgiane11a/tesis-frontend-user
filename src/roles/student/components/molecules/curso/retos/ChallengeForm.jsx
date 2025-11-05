import React from 'react';

const ChallengeForm = ({
  type,
  prompt,
  setType,
  setPrompt,
  difficulty,
  setDifficulty,
  onGenerate,
  generating,
  modules = [],
  selectedTopics = [],
  setSelectedTopics = () => {}
}) => {

  const toggleTopic = (id) => {
    if (selectedTopics.includes(id)) setSelectedTopics(selectedTopics.filter(t => t !== id));
    else setSelectedTopics([...selectedTopics, id]);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 w-full">
      <h4 className="text-md font-semibold mb-3">Formulario de creación</h4>

      <label className="block mb-2 text-sm text-gray-600">Tipo</label>
      <select value={type} onChange={(e) => setType(e.target.value)} className="w-full border rounded px-3 py-2 mb-3">
        <option value="quiz">Quiz</option>
        <option value="wordsearch">Sopa de letras</option>
        <option value="flashcards">Tarjetas de estudio</option>
      </select>

      <label className="block mb-2 text-sm text-gray-600">Dificultad</label>
      <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)} className="w-full border rounded px-3 py-2 mb-3">
        <option value="easy">Fácil</option>
        <option value="normal">Normal</option>
        <option value="hard">Difícil</option>
      </select>

      <label className="block mb-2 text-sm text-gray-600">Tema / Instrucción</label>
      <input value={prompt} onChange={(e) => setPrompt(e.target.value)} className="w-full border rounded px-3 py-2 mb-3" />

      <label className="block mb-2 text-sm text-gray-600">Seleccionar temas (puedes elegir más de uno)</label>
      <div className="max-h-36 overflow-auto border rounded p-2 mb-3 bg-gray-50">
        {modules.map(m => (
          <div key={m.id} className="flex items-center gap-3 py-1">
            <input type="checkbox" id={`mod_${m.id}`} checked={selectedTopics.includes(m.id)} onChange={() => toggleTopic(m.id)} />
            <label htmlFor={`mod_${m.id}`} className="text-sm text-gray-700">{m.title}</label>
          </div>
        ))}
        {modules.length === 0 && <div className="text-sm text-gray-500">No hay temas disponibles.</div>}
      </div>

      <div className="flex items-center gap-3">
        <button onClick={onGenerate} disabled={generating} className="px-4 py-2 bg-sky-600 text-white rounded">Generar</button>
        <button onClick={() => { setPrompt(''); setType('quiz'); setDifficulty('normal'); setSelectedTopics([]); }} className="px-3 py-2 border rounded">Limpiar</button>
      </div>
    </div>
  );
};

export default ChallengeForm;
