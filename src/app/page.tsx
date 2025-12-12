"use client";

import { useState, useEffect } from "react";
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
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [showTerms, setShowTerms] = useState(true);
  const [name1, setName1] = useState("");
  const [name2, setName2] = useState("");
  const [result, setResult] = useState<Result | null>(null);
  const [showPremium, setShowPremium] = useState(false);
  const [isPremium, setIsPremium] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // Garantir que estamos no cliente antes de acessar localStorage
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Verificar se os termos já foram aceitos anteriormente (localStorage)
  useEffect(() => {
    if (isClient) {
      const termsAccepted = localStorage.getItem("loveCalcTermsAccepted");
      if (termsAccepted === "true") {
        setAcceptedTerms(true);
        setShowTerms(false);
      }
    }
  }, [isClient]);

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
    setShowPremium(false);
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

  const handleKirvanoPurchase = (type: 'single' | 'monthly') => {
    // Configuração do Kirvano
    const kirvanoConfig = {
      single: {
        amount: 0.99,
        description: "Análise Premium Completa - Calculadora do Amor Real",
        productId: "love-calc-single"
      },
      monthly: {
        amount: 19.90,
        description: "Assinatura Mensal - Calculadora do Amor Real",
        productId: "love-calc-monthly"
      }
    };

    const config = kirvanoConfig[type];

    // Em produção, aqui seria a integração real com Kirvano
    // Exemplo de URL de pagamento Kirvano (ajuste conforme documentação oficial)
    const kirvanoPaymentUrl = `https://pay.kirvano.com/checkout?amount=${config.amount}&description=${encodeURIComponent(config.description)}&product=${config.productId}`;

    // Simulação para desenvolvimento
    const confirmPurchase = window.confirm(
      `🔐 Você será redirecionado para o Kirvano para completar o pagamento de R$ ${config.amount.toFixed(2)}\n\n` +
      `Produto: ${config.description}\n\n` +
      `Continuar?`
    );

    if (confirmPurchase) {
      // Em produção, descomente a linha abaixo para redirecionar ao Kirvano
      // window.location.href = kirvanoPaymentUrl;
      
      // Simulação de sucesso (remover em produção)
      setTimeout(() => {
        setIsPremium(true);
        window.alert(
          `🎉 Pagamento aprovado via Kirvano!\n\n` +
          `Valor: R$ ${config.amount.toFixed(2)}\n` +
          `Análise Premium desbloqueada com sucesso!`
        );
      }, 1000);
    }
  };

  const handleAcceptTerms = () => {
    setAcceptedTerms(true);
    setShowTerms(false);
    // Salvar no localStorage para não mostrar novamente (apenas no cliente)
    if (isClient) {
      localStorage.setItem("loveCalcTermsAccepted", "true");
    }
  };

  // Renderizar loading state até cliente estar pronto
  if (!isClient) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-950 via-purple-950 to-rose-950 flex items-center justify-center">
        <Heart className="w-20 h-20 text-pink-400 animate-pulse" />
      </div>
    );
  }

  if (showTerms && !acceptedTerms) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-950 via-purple-950 to-rose-950 flex items-center justify-center p-4">
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 max-w-2xl w-full border border-white/20 shadow-2xl">
          <div className="text-center mb-6">
            <Heart className="w-16 h-16 mx-auto text-pink-400 mb-4" />
            <h1 className="text-3xl font-bold text-white mb-2">
              Calculadora do Amor Real
            </h1>
            <p className="text-pink-200">Entretenimento e Diversão</p>
          </div>

          <div className="bg-black/30 rounded-2xl p-6 max-h-96 overflow-y-auto text-sm text-gray-200 space-y-4">
            <h2 className="text-xl font-bold text-white mb-4">
              📜 Termos de Uso e Política de Privacidade
            </h2>
            <p className="text-xs text-gray-400">
              Última atualização: Dezembro de 2025
            </p>

            <div>
              <h3 className="font-bold text-white mb-2">
                1. Natureza do Serviço (Entretenimento)
              </h3>
              <p>
                O aplicativo Calculadora do Amor Real é um serviço desenvolvido
                exclusivamente para fins de entretenimento, diversão e
                recreação. O usuário reconhece e concorda que:
              </p>
              <ul className="list-disc ml-6 mt-2 space-y-1">
                <li>
                  Os resultados (porcentagens, previsões e análises) são
                  gerados por algoritmos aleatórios e simulações.
                </li>
                <li>
                  Este aplicativo NÃO possui base científica, psicológica ou
                  sensitiva.
                </li>
                <li>
                  Os resultados não devem ser interpretados como fatos,
                  diagnósticos ou previsões reais sobre o futuro do
                  relacionamento.
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-white mb-2">
                2. Isenção de Responsabilidade
              </h3>
              <p>
                Os desenvolvedores deste aplicativo não se responsabilizam por
                quaisquer decisões, ações, conflitos, términos de relacionamento
                ou danos emocionais que possam ocorrer decorrentes da
                interpretação dos resultados fornecidos. O uso das informações é
                de total responsabilidade do usuário. Recomendamos que não tome
                decisões importantes de vida baseadas em um aplicativo de
                jogos/entretenimento.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-white mb-2">
                3. Privacidade de Dados (LGPD)
              </h3>
              <p className="mb-2">Respeitamos a sua privacidade.</p>
              <ul className="list-disc ml-6 space-y-1">
                <li>
                  <strong>Dados Inseridos:</strong> Os nomes inseridos na
                  calculadora são processados localmente no seu dispositivo ou
                  temporariamente para gerar o resultado. Não armazenamos, não
                  vendemos e não compartilhamos os nomes dos casais com
                  terceiros.
                </li>
                <li>
                  <strong>Pagamentos:</strong> Todas as transações financeiras
                  para desbloqueio de conteúdo são processadas por plataformas
                  externas seguras (Gateway de Pagamento Kirvano). O aplicativo não tem
                  acesso aos seus dados bancários ou de cartão de crédito.
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-white mb-2">
                4. Compras e Conteúdo Premium
              </h3>
              <p>
                Ao adquirir a "Análise Completa" ou funcionalidades Premium:
              </p>
              <ul className="list-disc ml-6 mt-2 space-y-1">
                <li>
                  O usuário entende que está pagando pelo desbloqueio de uma
                  funcionalidade de software (entretenimento).
                </li>
                <li>
                  Por se tratar de um produto digital de consumo imediato, o
                  usuário concorda que o serviço é considerado prestado no
                  momento do desbloqueio.
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-white mb-2">5. Idade Mínima</h3>
              <p>
                Este aplicativo é recomendado para maiores de 16 anos ou menores
                com supervisão dos responsáveis, dado o contexto romântico das
                interações.
              </p>
            </div>
          </div>

          <button
            onClick={handleAcceptTerms}
            className="w-full mt-6 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-bold py-4 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            ✓ Aceito os Termos e Política de Privacidade
          </button>
        </div>
      </div>
    );
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
                      onClick={() => handleKirvanoPurchase('single')}
                      className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
                    >
                      💳 Comprar por R$ 0,99
                    </button>
                    <button
                      onClick={() => handleKirvanoPurchase('monthly')}
                      className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
                    >
                      ⭐ Mensal R$ 19,90
                    </button>
                  </div>
                  <p className="text-yellow-300 text-xs mt-3">
                    ⚡ Acesso instantâneo • 🔒 Pagamento seguro via Kirvano • ✓ Garantia de
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
