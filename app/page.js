'use client';

import { useMemo, useState } from 'react';
import questionsData from './data/questions.ultimate.json';

export default function Home() {
  const questions = questionsData;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const currentQuestion = useMemo(() => questions[currentIndex], [questions, currentIndex]);

  const handleAnswer = (optionIndex) => {
    if (answered || !currentQuestion) return;
    setSelectedOption(optionIndex);
    setAnswered(true);
    if (optionIndex === currentQuestion.answer) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex === questions.length - 1) {
      setShowResult(true);
      return;
    }
    setCurrentIndex((prev) => prev + 1);
    setSelectedOption(null);
    setAnswered(false);
  };

  const restartQuiz = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setScore(0);
    setAnswered(false);
    setShowResult(false);
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 px-4 py-8">
      <div className="w-full max-w-3xl rounded-3xl border border-white/10 bg-white/10 p-4 shadow-2xl backdrop-blur md:p-8">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-300">Drone Quiz</p>
            <h1 className="mt-1 text-2xl font-bold text-white sm:text-3xl">二等無人航空機操縦士 学科試験練習</h1>
          </div>
          <div className="rounded-full bg-emerald-500/20 px-3 py-1 text-sm text-emerald-200">
            {currentIndex + 1}/{questions.length}
          </div>
        </div>

        {!showResult ? (
          <>
            <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-4 sm:p-6">
              <p className="mb-4 text-lg font-semibold text-white">{currentQuestion.question}</p>
              <div className="space-y-3">
                {currentQuestion.options.map((option, index) => {
                  const isCorrect = index === currentQuestion.answer;
                  const isSelected = index === selectedOption;
                  const showCorrect = answered && isCorrect;
                  const showWrong = answered && isSelected && !isCorrect;

                  return (
                    <button
                      key={option}
                      onClick={() => handleAnswer(index)}
                      className={`w-full rounded-xl border px-4 py-3 text-left text-sm transition ${
                        showCorrect
                          ? 'border-emerald-400 bg-emerald-500/20 text-emerald-100'
                          : showWrong
                            ? 'border-rose-400 bg-rose-500/20 text-rose-100'
                            : isSelected
                              ? 'border-sky-400 bg-sky-500/20 text-sky-100'
                              : 'border-white/10 bg-slate-800/70 text-slate-200 hover:border-emerald-400/50 hover:bg-slate-700'
                      }`}
                    >
                      <span className="mr-2 font-semibold">{String.fromCharCode(65 + index)}.</span>
                      {option}
                    </button>
                  );
                })}
              </div>
            </div>

            {answered && (
              <div className="mt-4 rounded-2xl border border-emerald-400/30 bg-emerald-500/10 p-4 text-sm text-emerald-100">
                <p className="font-semibold">{selectedOption === currentQuestion.answer ? '正解です！' : '不正解です。'}</p>
                <p className="mt-1">{currentQuestion.explanation}</p>
              </div>
            )}

            <div className="mt-6 flex items-center justify-between">
              <p className="text-sm text-slate-300">正答数: {score} / {questions.length}</p>
              <button
                onClick={handleNext}
                disabled={!answered}
                className="rounded-full bg-emerald-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:bg-slate-600"
              >
                {currentIndex === questions.length - 1 ? '結果を見る' : '次の問題へ'}
              </button>
            </div>
          </>
        ) : (
          <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-6 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-300">お疲れさまでした</p>
            <h2 className="mt-2 text-2xl font-bold text-white">正答数: {score}/{questions.length}</h2>
            <p className="mt-3 text-sm text-slate-300">{score >= 15 ? '素晴らしいです。十分に理解できています。' : 'もう一度挑戦して理解を深めましょう。'}</p>
            <button
              onClick={restartQuiz}
              className="mt-6 rounded-full bg-emerald-500 px-5 py-2.5 font-semibold text-white transition hover:bg-emerald-400"
            >
              もう一度挑戦する
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
