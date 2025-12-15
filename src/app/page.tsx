"use client";

import { useState } from "react";
import { Heart, Lock, Sparkles, TrendingUp, Shield } from "lucide-react";

type ScoreLevel = "low" | "medium" | "high";

interface Result {
  percentage: number;
  level: ScoreLevel;
  message: string;
  bgColor: string;
  textColor: string;
}

export default function LoveCalculator() {
  const [name1, setName1] = useState("");
  const [name2, setName2] = useState("");
  const [result, setResult] = useState<Result | null>(null);
  const [isPremium, setIsPremium] = useState(false);

  const getRandomPercentage = () => Math.floor(Math.random() * 101);

  const getResultData = (percentage: number): Result => {
    if (percentage <= 30) {
      const messages = [
        "⚠️ Alerta de Incompatibilidade",
        "🚨 Risco de conflito alto",
        "❌ Os opostos nem sempre se atraem",
        "⛔ Energias desalinhadas",
        "🔴 Química negativa detectada",
        "💔 Diferenças irreconciliáveis",
      ];
      return {
        percentage,
        level: "low",
        message: messages[Math.floor(Math.random() * messages.length)],
        bgColor: "from-red-950 via-red-900 to-red-950",
        textColor: "text-red-400",
      };
    } else if (percentage <= 69) {
      const messages = [
        "⚠️ Requer muito trabalho",
        "⚡ Química instável",
        "🤔 Depende só de vocês",
        "🔄 Relacionamento desafiador",
        "⚖️ Equilíbrio delicado",
        "🌀 Potencial de crescimento com esforço",
      ];
      return {
        percentage,
        level: "medium",
        message: messages[Math.floor(Math.random() * messages.length)],
        bgColor: "from-yellow-950 via-amber-900 to-yellow-950",
        textColor: "text-yellow-400",
      };
    } else {
      const messages = [
        "💕 Almas Gêmeas",
        "✨ Combinação Astral Perfeita",
        "💫 Conexão Divina",
        "🌟 Match Celestial",
        "❤️ Amor Verdadeiro",
        "🌈 Harmonia Completa",
      ];
      return {
        percentage,
        level: "high",
        message: messages[Math.floor(Math.random() * messages.length)],
        bgColor: "from-green-950 via-emerald-900 to-green-950",
        textColor: "text-green-400",
      };
    }
  };

  const calculateLove = () => {
    if (!name1.trim() || !name2.trim()) {
      alert("Por favor, insira os dois nomes!");
      return;
    }

    const percentage = getRandomPercentage();
    const resultData = getResultData(percentage);
    setResult(resultData);
  };

  const getPremiumContent = (level: ScoreLevel) => {
    if (level === "low") {
      return {
        obstacles:
          "Personalidades conflitantes. Um busca liberdade, o outro segurança. O ciúme pode se tornar um problema recorrente.",
        future:
          "Sem mudanças significativas, a relação tende a se desgastar em 6 meses. Conflitos sobre prioridades de vida serão frequentes.",
        fidelity:
          "Taxa de Fidelidade: 42%. Risco elevado de traição emocional. A falta de conexão profunda pode levar à busca de atenção externa.",
      };
    } else if (level === "medium") {
      return {
        obstacles:
          "Diferenças de comunicação e expectativas. Vocês precisam aprender a se ouvir verdadeiramente para evitar mal-entendidos.",
        future:
          "Com esforço mútuo, há 60% de chance de construir algo sólido. Terapia de casal pode ser decisiva nos próximos 12 meses.",
        fidelity:
          "Taxa de Fidelidade: 68%. Estável, mas requer atenção constante. Momentos de crise podem abalar a confiança.",
      };
    } else {
      return {
        obstacles:
          "Poucos obstáculos reais. Vibrações em sintonia. Vocês crescem juntos e se complementam naturalmente.",
        future:
          "Futuro promissor! 89% de chance de relacionamento duradouro. Casamento e família são caminhos naturais para vocês.",
        fidelity:
          "Taxa de Fidelidade: 94%. Conexão profunda e genuína. A lealdade é mútua e baseada em respeito e amor verdadeiro.",
      };
    }
  };

  const handlePurchase = (type: 'single' | 'monthly') => {
    const prices = {
      single: 0.99,
      monthly: 19.90
    };

    const confirmPurchase = window.confirm(
      `🔐 Pagamento de R$ ${prices[type].toFixed(2)}\n\n` +
      `${type === 'single' ? 'Análise Premium Completa' : 'Assinatura Mensal'}\n\n` +
      `Continuar?`
    );

    if (confirmPurchase) {
      setTimeout(() => {
        setIsPremium(true);
        alert(`🎉 Pagamento aprovado!\n\nAnálise Premium desbloqueada com sucesso!`);
      }, 1000);
    }
  };

  return (
    <div
      className={`min-h-screen bg-gradient-to-br ${
        result ? result.bgColor : "from-pink-950 via-purple-950 to-rose-950"
      } transition-all duration-1000 flex items-center justify-center p-4`}
    >
      <div className="max-w-2xl w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <Heart className="w-20 h-20 mx-auto text-pink-400 mb-4 animate-pulse" />
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
            Calculadora do Amor Real
          </h1>
          <p className="text-pink-200">Descubra a verdade sobre seu amor</p>
        </div>

        {/* Input Form */}
        {!result && (
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl">
            <div className="space-y-6">
              <div>
                <label className="block text-white font-semibold mb-2">
                  Primeiro Nome
                </label>
                <input
                  type="text"
                  value={name1}
                  onChange={(e) => setName1(e.target.value)}
                  placeholder="Digite o primeiro nome..."
                  className="w-full px-6 py-4 rounded-2xl bg-white/20 border border-white/30 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-pink-400 transition-all"
                />
              </div>

              <div className="flex justify-center">
                <Heart className="w-8 h-8 text-pink-400" />
              </div>

              <div>
                <label className="block text-white font-semibold mb-2">
                  Segundo Nome
                </label>
                <input
                  type="text"
                  value={name2}
                  onChange={(e) => setName2(e.target.value)}
                  placeholder="Digite o segundo nome..."
                  className="w-full px-6 py-4 rounded-2xl bg-white/20 border border-white/30 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-pink-400 transition-all"
                />
              </div>

              <button
                onClick={calculateLove}
                className="w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-bold py-5 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg text-lg"
              >
                💕 Calcular Compatibilidade
              </button>
            </div>
          </div>
        )}

        {/* Result */}
        {result && (
          <div className="space-y-6">
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl text-center">
              <div className="mb-6">
                <p className="text-white text-xl mb-2">
                  {name1} 💕 {name2}
                </p>
              </div>

              <div className="relative mb-6">
                <div className="text-8xl font-bold text-white mb-4 animate-bounce">
                  {result.percentage}%
                </div>
                <p className={`text-2xl font-bold ${result.textColor}`}>
                  {result.message}
                </p>
              </div>

              {/* Premium Cards */}
              <div className="grid md:grid-cols-3 gap-4 mt-8">
                {/* Card 1 */}
                <div className="bg-black/40 rounded-2xl p-6 border border-white/20 relative overflow-hidden">
                  <div className="absolute inset-0 backdrop-blur-xl bg-white/5"></div>
                  <div className="relative z-10">
                    <Lock className="w-8 h-8 mx-auto text-yellow-400 mb-3" />
                    <h3 className="text-white font-bold mb-2 text-sm">
                      Análise dos Obstáculos Ocultos
                    </h3>
                    {!isPremium ? (
                      <div className="blur-sm select-none text-gray-400 text-xs">
                        Conteúdo bloqueado. Desbloqueie para revelar os
                        verdadeiros desafios...
                      </div>
                    ) : (
                      <p className="text-gray-200 text-xs">
                        {getPremiumContent(result.level).obstacles}
                      </p>
                    )}
                  </div>
                </div>

                {/* Card 2 */}
                <div className="bg-black/40 rounded-2xl p-6 border border-white/20 relative overflow-hidden">
                  <div className="absolute inset-0 backdrop-blur-xl bg-white/5"></div>
                  <div className="relative z-10">
                    <Sparkles className="w-8 h-8 mx-auto text-purple-400 mb-3" />
                    <h3 className="text-white font-bold mb-2 text-sm">
                      Previsão de Futuro
                    </h3>
                    {!isPremium ? (
                      <div className="blur-sm select-none text-gray-400 text-xs">
                        Conteúdo bloqueado. Descubra o que o destino reserva
                        para vocês...
                      </div>
                    ) : (
                      <p className="text-gray-200 text-xs">
                        {getPremiumContent(result.level).future}
                      </p>
                    )}
                  </div>
                </div>

                {/* Card 3 */}
                <div className="bg-black/40 rounded-2xl p-6 border border-white/20 relative overflow-hidden">
                  <div className="absolute inset-0 backdrop-blur-xl bg-white/5"></div>
                  <div className="relative z-10">
                    <Shield className="w-8 h-8 mx-auto text-blue-400 mb-3" />
                    <h3 className="text-white font-bold mb-2 text-sm">
                      Taxa de Fidelidade
                    </h3>
                    {!isPremium ? (
                      <div className="blur-sm select-none text-gray-400 text-xs">
                        Conteúdo bloqueado. Veja a análise real de lealdade do
                        casal...
                      </div>
                    ) : (
                      <p className="text-gray-200 text-xs">
                        {getPremiumContent(result.level).fidelity}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Premium CTA */}
              {!isPremium && (
                <div className="mt-8 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border-2 border-yellow-400/50 rounded-2xl p-6">
                  <TrendingUp className="w-12 h-12 mx-auto text-yellow-400 mb-3" />
                  <h3 className="text-white font-bold text-xl mb-2">
                    🔓 Desbloqueie a Análise Completa
                  </h3>
                  <p className="text-yellow-200 mb-4 text-sm">
                    Descubra os segredos ocultos do seu relacionamento! Veja os
                    obstáculos reais, previsão de futuro e taxa de fidelidade.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <button
                      onClick={() => handlePurchase('single')}
                      className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
                    >
                      💳 Comprar por R$ 0,99
                    </button>
                    <button
                      onClick={() => handlePurchase('monthly')}
                      className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
                    >
                      ⭐ Mensal R$ 19,90
                    </button>
                  </div>
                  <p className="text-yellow-300 text-xs mt-3">
                    ⚡ Acesso instantâneo • 🔒 Pagamento seguro • ✓ Garantia de
                    satisfação
                  </p>
                </div>
              )}

              <button
                onClick={() => {
                  setResult(null);
                  setName1("");
                  setName2("");
                  setIsPremium(false);
                }}
                className="w-full mt-6 bg-white/20 hover:bg-white/30 text-white font-bold py-4 rounded-2xl transition-all duration-300 border border-white/30"
              >
                🔄 Calcular Novamente
              </button>
            </div>
          </div>
        )}

        {/* Footer */}
        <p className="text-center text-white/60 text-sm mt-6">
          ⚠️ Este é um aplicativo de entretenimento. Os resultados são
          aleatórios e não possuem base científica.
        </p>
      </div>
    </div>
  );
}
