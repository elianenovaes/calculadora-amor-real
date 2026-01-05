"use client";

import { useState, useEffect } from "react";
import { Heart, Lock, Sparkles, TrendingUp, Shield, X, ArrowLeft, Home } from "lucide-react";

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
  const [showTerms, setShowTerms] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  // Verificar se é a primeira vez que o usuário acessa
  useEffect(() => {
    const hasAcceptedTerms = localStorage.getItem("loveCalculatorTermsAccepted");
    if (!hasAcceptedTerms) {
      setShowTerms(true);
    } else {
      setTermsAccepted(true);
    }
  }, []);

  const acceptTerms = () => {
    localStorage.setItem("loveCalculatorTermsAccepted", "true");
    setTermsAccepted(true);
    setShowTerms(false);
  };

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

  const handlePaymentClick = (plan: 'monthly' | 'annual') => {
    // Abre o link de pagamento em nova aba
    window.open('https://pay.kirvano.com/9b7ef0c7-fbe3-4121-81e3-098403e5a506', '_blank');
    
    // Simula o desbloqueio premium após alguns segundos (em produção, isso seria feito via webhook)
    setTimeout(() => {
      setIsPremium(true);
      setShowPaymentModal(false);
      alert('🎉 Bem-vindo ao Premium! Sua análise completa foi desbloqueada.');
    }, 3000);
  };

  const openPaymentModal = () => {
    setShowPaymentModal(true);
  };

  const goBack = () => {
    if (result) {
      setResult(null);
      setName1("");
      setName2("");
      setIsPremium(false);
    }
  };

  const goHome = () => {
    setResult(null);
    setName1("");
    setName2("");
    setIsPremium(false);
  };

  // Modal de Termos de Uso
  if (showTerms) {
    return (
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
        <div className="bg-gradient-to-br from-purple-900 to-pink-900 rounded-3xl p-8 max-w-2xl w-full border-2 border-pink-400/50 shadow-2xl max-h-[90vh] overflow-y-auto">
          <div className="text-center mb-6">
            <Heart className="w-16 h-16 mx-auto text-pink-400 mb-4 animate-pulse" />
            <h2 className="text-3xl font-bold text-white mb-2">
              Bem-vindo à Calculadora Amor Real
            </h2>
            <p className="text-pink-200">Por favor, leia e aceite os termos para continuar</p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 mb-6 border border-white/20 max-h-64 overflow-y-auto">
            <h3 className="text-white font-bold text-lg mb-3">Termos de Uso</h3>
            <div className="text-white/90 text-sm space-y-3">
              <p>
                <strong>1. Natureza do Aplicativo:</strong> Este é um aplicativo de entretenimento. 
                Os resultados são gerados aleatoriamente e não possuem base científica, psicológica ou astrológica.
              </p>
              <p>
                <strong>2. Uso Responsável:</strong> Não tome decisões importantes sobre relacionamentos 
                baseando-se exclusivamente nos resultados desta calculadora.
              </p>
              <p>
                <strong>3. Privacidade:</strong> Os nomes inseridos não são armazenados em nossos servidores. 
                Apenas salvamos localmente que você aceitou estes termos.
              </p>
              <p>
                <strong>4. Conteúdo Premium:</strong> O acesso premium desbloqueia análises fictícias 
                adicionais para fins de entretenimento.
              </p>
              <p>
                <strong>5. Idade Mínima:</strong> Este aplicativo é destinado a maiores de 13 anos.
              </p>
              <p>
                <strong>6. Isenção de Responsabilidade:</strong> Não nos responsabilizamos por 
                quaisquer decisões tomadas com base nos resultados fornecidos.
              </p>
            </div>
          </div>

          <button
            onClick={acceptTerms}
            className="w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-bold py-4 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg text-lg"
          >
            ✓ Aceito os Termos de Uso
          </button>
        </div>
      </div>
    );
  }

  // Modal de Pagamento
  if (showPaymentModal) {
    return (
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
        <div className="bg-gradient-to-br from-purple-900 to-pink-900 rounded-3xl p-8 max-w-2xl w-full border-2 border-pink-400/50 shadow-2xl relative max-h-[90vh] overflow-y-auto">
          <button
            onClick={() => setShowPaymentModal(false)}
            className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="text-center mb-8">
            <TrendingUp className="w-16 h-16 mx-auto text-yellow-400 mb-4" />
            <h2 className="text-3xl font-bold text-white mb-2">
              Escolha Seu Plano Premium
            </h2>
            <p className="text-pink-200">Desbloqueie todos os segredos do seu relacionamento</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Plano Mensal */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border-2 border-white/20 hover:border-yellow-400/50 transition-all duration-300 transform hover:scale-105">
              <div className="text-center mb-4">
                <h3 className="text-2xl font-bold text-white mb-2">Plano Mensal</h3>
                <div className="mb-4">
                  <p className="text-white/60 text-sm line-through">De R$ 19,90</p>
                  <p className="text-5xl font-bold text-yellow-400">R$ 9,90</p>
                  <p className="text-white/80 text-sm mt-1">/mês</p>
                </div>
                <div className="bg-green-500/20 border border-green-400/50 rounded-lg py-2 px-4 inline-block">
                  <p className="text-green-300 font-bold text-sm">🎉 50% de desconto!</p>
                </div>
              </div>

              <ul className="text-white/90 text-sm space-y-3 mb-6">
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">✓</span>
                  <span>Análise completa de obstáculos</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">✓</span>
                  <span>Previsão de futuro detalhada</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">✓</span>
                  <span>Taxa de fidelidade revelada</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">✓</span>
                  <span>Acesso ilimitado por 30 dias</span>
                </li>
              </ul>

              <button
                onClick={() => handlePaymentClick('monthly')}
                className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-bold py-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Assinar Mensal
              </button>
            </div>

            {/* Plano Anual */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border-2 border-yellow-400/50 hover:border-yellow-400 transition-all duration-300 transform hover:scale-105 relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs font-bold py-1 px-4 rounded-bl-lg">
                MAIS POPULAR
              </div>

              <div className="text-center mb-4 mt-4">
                <h3 className="text-2xl font-bold text-white mb-2">Plano Anual</h3>
                <div className="mb-4">
                  <p className="text-white/60 text-sm line-through">De R$ 238,80</p>
                  <p className="text-5xl font-bold text-yellow-400">R$ 108,00</p>
                  <p className="text-white/80 text-sm mt-1">/ano</p>
                  <p className="text-green-300 text-xs mt-2">Apenas R$ 9,00/mês</p>
                </div>
                <div className="bg-green-500/20 border border-green-400/50 rounded-lg py-2 px-4 inline-block">
                  <p className="text-green-300 font-bold text-sm">🔥 Economize 55%!</p>
                </div>
              </div>

              <ul className="text-white/90 text-sm space-y-3 mb-6">
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">✓</span>
                  <span>Tudo do plano mensal</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">✓</span>
                  <span>Acesso ilimitado por 12 meses</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">✓</span>
                  <span>Economia de R$ 10,80</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">✓</span>
                  <span>Melhor custo-benefício</span>
                </li>
              </ul>

              <button
                onClick={() => handlePaymentClick('annual')}
                className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-bold py-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Assinar Anual
              </button>
            </div>
          </div>

          <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
            <h4 className="text-white font-bold text-center mb-4">O que você vai receber:</h4>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center">
                <Lock className="w-8 h-8 mx-auto text-yellow-400 mb-2" />
                <p className="text-white/90 text-sm font-semibold">Análise dos Obstáculos</p>
                <p className="text-white/60 text-xs mt-1">Descubra os desafios ocultos</p>
              </div>
              <div className="text-center">
                <Sparkles className="w-8 h-8 mx-auto text-purple-400 mb-2" />
                <p className="text-white/90 text-sm font-semibold">Previsão de Futuro</p>
                <p className="text-white/60 text-xs mt-1">Veja o que o destino reserva</p>
              </div>
              <div className="text-center">
                <Shield className="w-8 h-8 mx-auto text-blue-400 mb-2" />
                <p className="text-white/90 text-sm font-semibold">Taxa de Fidelidade</p>
                <p className="text-white/60 text-xs mt-1">Análise real de lealdade</p>
              </div>
            </div>
          </div>

          <div className="mt-6 flex gap-3">
            <button
              onClick={goBack}
              className="flex-1 bg-white/10 hover:bg-white/20 text-white font-semibold py-3 rounded-xl transition-all duration-300 border border-white/20 flex items-center justify-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Voltar
            </button>
            <button
              onClick={goHome}
              className="flex-1 bg-white/10 hover:bg-white/20 text-white font-semibold py-3 rounded-xl transition-all duration-300 border border-white/20 flex items-center justify-center gap-2"
            >
              <Home className="w-4 h-4" />
              Início
            </button>
          </div>

          <p className="text-yellow-300 text-xs text-center mt-4">
            ⚡ Acesso instantâneo • 🔒 Pagamento 100% Seguro • ✓ Satisfação garantida
          </p>
        </div>
      </div>
    );
  }

  if (!termsAccepted) {
    return null;
  }

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
            Calculadora Amor Real
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
                  <button
                    onClick={openPaymentModal}
                    className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
                  >
                    🔓 Fazer Upgrade para Premium
                  </button>
                  <p className="text-yellow-300 text-xs mt-3">
                    ⚡ A partir de R$ 9,90/mês • 🔒 100% Seguro • ✓ Satisfação garantida
                  </p>
                </div>
              )}

              <div className="flex gap-3 mt-6">
                <button
                  onClick={goBack}
                  className="flex-1 bg-white/10 hover:bg-white/20 text-white font-semibold py-3 rounded-xl transition-all duration-300 border border-white/20 flex items-center justify-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Voltar
                </button>
                <button
                  onClick={goHome}
                  className="flex-1 bg-white/10 hover:bg-white/20 text-white font-semibold py-3 rounded-xl transition-all duration-300 border border-white/20 flex items-center justify-center gap-2"
                >
                  <Home className="w-4 h-4" />
                  Início
                </button>
              </div>
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
