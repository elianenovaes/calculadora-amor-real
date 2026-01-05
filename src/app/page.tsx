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
      const obstacles = [
        "Personalidades conflitantes. Um busca liberdade, o outro segurança. O ciúme pode se tornar um problema recorrente.",
        "Valores fundamentais opostos. Enquanto um prioriza carreira, o outro valoriza família. Conflitos constantes sobre prioridades.",
        "Estilos de comunicação incompatíveis. Um é direto e explosivo, o outro evita confrontos. Mal-entendidos frequentes.",
        "Diferenças culturais ou religiosas profundas. Dificuldade em encontrar terreno comum para construir o relacionamento.",
        "Ritmos de vida completamente diferentes. Um é noturno e aventureiro, o outro é matinal e caseiro. Pouco tempo de qualidade juntos.",
        "Histórico de traumas não resolvidos. Bagagens emocionais pesadas que afetam a capacidade de confiar e se entregar.",
        "Expectativas irrealistas sobre o relacionamento. Um idealiza demais, o outro é cético. Frustração constante.",
        "Dependência emocional excessiva de um dos lados. Relacionamento desequilibrado que sufoca e gera ressentimento.",
        "Falta de atração física genuína. Tentam forçar algo que não existe naturalmente. Intimidade forçada e desconfortável.",
        "Objetivos de vida incompatíveis. Um quer filhos e estabilidade, o outro quer viajar e liberdade. Impasse inevitável.",
        "Ciúme patológico e possessividade. Insegurança extrema que destrói a confiança e sufoca o parceiro.",
        "Falta de respeito mútuo. Críticas constantes, desvalorização e falta de admiração genuína pelo outro.",
      ];
      
      const futures = [
        "Sem mudanças significativas, a relação tende a se desgastar em 6 meses. Conflitos sobre prioridades de vida serão frequentes.",
        "Alta probabilidade de término nos próximos 3-4 meses. A tensão acumulada chegará ao ponto de ruptura.",
        "Relacionamento insustentável a longo prazo. Máximo de 8 meses antes de um dos dois desistir completamente.",
        "Ciclo tóxico de idas e vindas pelos próximos 12 meses. Término e reconciliação repetidos até exaustão emocional.",
        "Futuro nebuloso com 85% de chance de separação. Apenas terapia intensiva poderia reverter o quadro.",
        "Caminho para um relacionamento abusivo se não houver mudanças imediatas. Sinais de alerta evidentes.",
        "Tendência a se tornarem apenas colegas de quarto em 4-5 meses. Amor se transformará em conveniência.",
        "Probabilidade de traição emocional ou física nos próximos 6 meses. Falta de conexão abrirá espaço para terceiros.",
        "Desgaste emocional severo para ambos. Relacionamento se tornará fonte de ansiedade e infelicidade.",
        "Separação inevitável dentro de 1 ano. Quanto mais demorar, mais doloroso será o processo.",
        "Risco de co-dependência tóxica. Relacionamento que prejudica o crescimento individual de ambos.",
        "Futuro marcado por arrependimentos. Tempo investido que poderia ter sido usado para encontrar alguém compatível.",
      ];
      
      const fidelities = [
        "Taxa de Fidelidade: 42%. Risco elevado de traição emocional. A falta de conexão profunda pode levar à busca de atenção externa.",
        "Taxa de Fidelidade: 38%. Vulnerabilidade alta a tentações externas. Insatisfação no relacionamento abre portas perigosas.",
        "Taxa de Fidelidade: 35%. Histórico ou tendência a buscar validação fora do relacionamento. Sinais de alerta claros.",
        "Taxa de Fidelidade: 40%. Falta de intimidade emocional aumenta risco de infidelidade. Conexão superficial é perigosa.",
        "Taxa de Fidelidade: 33%. Um ou ambos têm perfil de risco para traição. Padrões comportamentais preocupantes.",
        "Taxa de Fidelidade: 45%. Relacionamento não satisfaz necessidades emocionais básicas. Busca por preenchimento externo é provável.",
        "Taxa de Fidelidade: 37%. Falta de compromisso genuíno. Relacionamento visto como temporário ou descartável.",
        "Taxa de Fidelidade: 41%. Comunicação falha cria distância emocional. Espaço perfeito para interferências externas.",
        "Taxa de Fidelidade: 36%. Histórico de relacionamentos instáveis. Padrão de comportamento difícil de quebrar.",
        "Taxa de Fidelidade: 39%. Falta de respeito mútuo facilita traição. Desvalorização do parceiro é porta aberta.",
        "Taxa de Fidelidade: 34%. Imaturidade emocional de um ou ambos. Incapacidade de lidar com compromisso sério.",
        "Taxa de Fidelidade: 43%. Relacionamento baseado em conveniência, não amor. Fidelidade por obrigação, não escolha.",
      ];
      
      return {
        obstacles: obstacles[Math.floor(Math.random() * obstacles.length)],
        future: futures[Math.floor(Math.random() * futures.length)],
        fidelity: fidelities[Math.floor(Math.random() * fidelities.length)],
      };
    } else if (level === "medium") {
      const obstacles = [
        "Diferenças de comunicação e expectativas. Vocês precisam aprender a se ouvir verdadeiramente para evitar mal-entendidos.",
        "Ritmos diferentes de amadurecimento emocional. Um está pronto para compromisso, o outro ainda está se descobrindo.",
        "Famílias com dinâmicas complicadas. Interferências externas que testam a solidez do relacionamento.",
        "Diferenças financeiras ou de gestão de dinheiro. Conflitos sobre gastos, investimentos e prioridades econômicas.",
        "Falta de tempo de qualidade juntos. Rotinas corridas que deixam o relacionamento em segundo plano.",
        "Inseguranças pessoais não resolvidas. Medos e traumas que afetam a capacidade de se entregar completamente.",
        "Diferenças no nível de demonstração de afeto. Um é mais expressivo, o outro mais reservado. Necessidade de equilíbrio.",
        "Expectativas diferentes sobre o futuro. Planos de vida que precisam ser alinhados para funcionar.",
        "Dificuldade em resolver conflitos de forma saudável. Tendência a evitar ou escalar discussões.",
        "Falta de hobbies ou interesses em comum. Necessidade de construir mais pontos de conexão.",
        "Diferenças no círculo social. Amigos que não se misturam bem, criando mundos separados.",
        "Desafios de intimidade física ou emocional. Necessidade de trabalhar a conexão em níveis mais profundos.",
      ];
      
      const futures = [
        "Com esforço mútuo, há 60% de chance de construir algo sólido. Terapia de casal pode ser decisiva nos próximos 12 meses.",
        "Relacionamento com potencial, mas requer trabalho consciente. Próximos 6 meses serão cruciais para definir o rumo.",
        "Futuro depende da disposição de ambos em crescer juntos. 55% de chance de sucesso com comunicação aberta.",
        "Possibilidade de evolução para relacionamento maduro e estável. Necessário investimento emocional nos próximos 8-10 meses.",
        "Caminho incerto, mas não impossível. 50% de chance de superar obstáculos se houver compromisso real.",
        "Relacionamento que pode surpreender positivamente. Com ajustes, há 65% de chance de futuro promissor.",
        "Próximos 12 meses definirão tudo. Período de testes que mostrará se vale a pena continuar investindo.",
        "Potencial para relacionamento duradouro se ambos amadurecerem juntos. 58% de probabilidade de sucesso.",
        "Futuro moderadamente positivo. Requer paciência e disposição para trabalhar diferenças.",
        "Relacionamento que pode se fortalecer com o tempo. 62% de chance se superarem fase atual de ajustes.",
        "Possibilidade de construir algo bonito, mas não será fácil. Esforço conjunto é fundamental.",
        "Futuro depende de decisões conscientes nos próximos meses. 57% de chance com escolhas certas.",
      ];
      
      const fidelities = [
        "Taxa de Fidelidade: 68%. Estável, mas requer atenção constante. Momentos de crise podem abalar a confiança.",
        "Taxa de Fidelidade: 72%. Comprometimento moderado. Necessário cultivar conexão para manter fidelidade sólida.",
        "Taxa de Fidelidade: 65%. Base razoável, mas vulnerável em períodos de distância ou conflito.",
        "Taxa de Fidelidade: 70%. Lealdade presente, mas não inquestionável. Trabalho contínuo é necessário.",
        "Taxa de Fidelidade: 67%. Fidelidade dependente da qualidade da comunicação e resolução de conflitos.",
        "Taxa de Fidelidade: 73%. Comprometimento bom, mas pode ser testado em momentos de estresse.",
        "Taxa de Fidelidade: 69%. Estabilidade moderada. Atenção às necessidades do parceiro é crucial.",
        "Taxa de Fidelidade: 71%. Base sólida que precisa ser nutrida constantemente para se manter forte.",
        "Taxa de Fidelidade: 66%. Fidelidade razoável, mas suscetível a influências externas em momentos fracos.",
        "Taxa de Fidelidade: 74%. Comprometimento acima da média. Manutenção da intimidade é chave.",
        "Taxa de Fidelidade: 68%. Lealdade presente, mas requer investimento emocional contínuo.",
        "Taxa de Fidelidade: 70%. Estabilidade boa que pode melhorar com fortalecimento do vínculo.",
      ];
      
      return {
        obstacles: obstacles[Math.floor(Math.random() * obstacles.length)],
        future: futures[Math.floor(Math.random() * futures.length)],
        fidelity: fidelities[Math.floor(Math.random() * fidelities.length)],
      };
    } else {
      const obstacles = [
        "Poucos obstáculos reais. Vibrações em sintonia. Vocês crescem juntos e se complementam naturalmente.",
        "Desafios mínimos e facilmente superáveis. Comunicação fluida e respeito mútuo são a base sólida.",
        "Obstáculos externos podem surgir, mas a união de vocês é forte o suficiente para enfrentar qualquer tempestade.",
        "Diferenças existem, mas são vistas como complementares, não conflitantes. Equilíbrio perfeito.",
        "Pouquíssimos pontos de atrito. Quando surgem, são resolvidos com maturidade e amor.",
        "Conexão tão profunda que obstáculos se tornam oportunidades de crescimento conjunto.",
        "Harmonia natural que facilita a superação de qualquer desafio. Vocês são um time imbatível.",
        "Obstáculos praticamente inexistentes. Relacionamento flui com leveza e naturalidade.",
        "Desafios são raros e, quando aparecem, fortalecem ainda mais o vínculo entre vocês.",
        "Sintonia tão grande que problemas são resolvidos antes mesmo de se tornarem obstáculos reais.",
        "Poucos desafios significativos. Vocês têm a química e a maturidade para lidar com tudo.",
        "Obstáculos mínimos. Relacionamento baseado em confiança, respeito e amor genuíno.",
      ];
      
      const futures = [
        "Futuro promissor! 89% de chance de relacionamento duradouro. Casamento e família são caminhos naturais para vocês.",
        "Previsão extremamente positiva. 92% de probabilidade de construírem uma vida feliz juntos.",
        "Futuro brilhante pela frente. Vocês têm tudo para serem aquele casal que inspira os outros.",
        "Relacionamento com potencial para durar décadas. 90% de chance de envelhecerem juntos e felizes.",
        "Caminho claro para compromisso sério. 88% de probabilidade de casamento nos próximos 2-3 anos.",
        "Futuro repleto de amor, cumplicidade e realizações conjuntas. 91% de chance de sucesso a longo prazo.",
        "Vocês têm o que poucos encontram: amor verdadeiro e compatibilidade real. 93% de chance de felicidade duradoura.",
        "Previsão de relacionamento sólido e feliz. 87% de probabilidade de construírem família e legado juntos.",
        "Futuro promissor com crescimento mútuo constante. 90% de chance de parceria para a vida toda.",
        "Relacionamento destinado ao sucesso. 89% de probabilidade de superarem todos os desafios juntos.",
        "Futuro radiante. Vocês são a prova de que almas gêmeas existem. 94% de chance de felicidade eterna.",
        "Previsão de vida compartilhada cheia de amor e conquistas. 91% de probabilidade de relacionamento exemplar.",
      ];
      
      const fidelities = [
        "Taxa de Fidelidade: 94%. Conexão profunda e genuína. A lealdade é mútua e baseada em respeito e amor verdadeiro.",
        "Taxa de Fidelidade: 96%. Comprometimento inabalável. Vocês são exemplo de fidelidade e devoção.",
        "Taxa de Fidelidade: 93%. Lealdade sólida como rocha. Confiança plena e merecida entre vocês.",
        "Taxa de Fidelidade: 95%. Fidelidade natural e sem esforço. Vocês só têm olhos um para o outro.",
        "Taxa de Fidelidade: 97%. Nível excepcional de comprometimento. Relacionamento blindado contra tentações.",
        "Taxa de Fidelidade: 92%. Lealdade profunda baseada em amor genuíno e respeito mútuo.",
        "Taxa de Fidelidade: 94%. Fidelidade inquestionável. Vocês construíram uma base de confiança absoluta.",
        "Taxa de Fidelidade: 96%. Comprometimento exemplar. Outros casais deveriam se inspirar em vocês.",
        "Taxa de Fidelidade: 93%. Lealdade que vem do coração, não da obrigação. Amor verdadeiro e puro.",
        "Taxa de Fidelidade: 95%. Fidelidade natural e espontânea. Vocês são verdadeiramente um para o outro.",
        "Taxa de Fidelidade: 98%. Nível raro de comprometimento. Relacionamento praticamente à prova de traição.",
        "Taxa de Fidelidade: 94%. Lealdade inabalável. Confiança mútua que é a inveja de muitos casais.",
      ];
      
      return {
        obstacles: obstacles[Math.floor(Math.random() * obstacles.length)],
        future: futures[Math.floor(Math.random() * futures.length)],
        fidelity: fidelities[Math.floor(Math.random() * fidelities.length)],
      };
    }
  };

  const handlePaymentClick = () => {
    // Abre o link de pagamento em nova aba
    window.open('https://pay.kirvano.com/728cfb8d-06c5-4fea-ae4e-694ce2ea0fd6', '_blank');
    
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
        <div className="bg-gradient-to-br from-purple-900 to-pink-900 rounded-3xl p-8 max-w-xl w-full border-2 border-pink-400/50 shadow-2xl relative max-h-[90vh] overflow-y-auto">
          <button
            onClick={() => setShowPaymentModal(false)}
            className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="text-center mb-8">
            <TrendingUp className="w-16 h-16 mx-auto text-yellow-400 mb-4" />
            <h2 className="text-3xl font-bold text-white mb-2">
              Desbloqueie Sua Análise Completa
            </h2>
            <p className="text-pink-200">Descubra todos os segredos do seu relacionamento</p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border-2 border-yellow-400/50 mb-6">
            <div className="text-center mb-6">
              <div className="mb-4">
                <p className="text-white/60 text-sm">Pagamento único</p>
                <p className="text-6xl font-bold text-yellow-400 my-2">R$ 4,99</p>
                <p className="text-white/80 text-sm">Uma leitura completa</p>
              </div>
              <div className="bg-green-500/20 border border-green-400/50 rounded-lg py-2 px-4 inline-block">
                <p className="text-green-300 font-bold text-sm">🎉 Acesso instantâneo!</p>
              </div>
            </div>

            <ul className="text-white/90 text-sm space-y-3 mb-6">
              <li className="flex items-start">
                <span className="text-green-400 mr-2">✓</span>
                <span>Análise completa dos obstáculos ocultos</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-400 mr-2">✓</span>
                <span>Previsão de futuro detalhada e personalizada</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-400 mr-2">✓</span>
                <span>Taxa de fidelidade revelada com precisão</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-400 mr-2">✓</span>
                <span>Acesso imediato após pagamento</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-400 mr-2">✓</span>
                <span>Pagamento único, sem mensalidades</span>
              </li>
            </ul>

            <button
              onClick={handlePaymentClick}
              className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-bold py-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg text-lg"
            >
              🔓 Comprar Análise Completa
            </button>
          </div>

          <div className="bg-white/5 rounded-2xl p-6 border border-white/10 mb-6">
            <h4 className="text-white font-bold text-center mb-4">O que você vai receber:</h4>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <Lock className="w-8 h-8 mx-auto text-yellow-400 mb-2" />
                <p className="text-white/90 text-xs font-semibold">Análise dos Obstáculos</p>
                <p className="text-white/60 text-xs mt-1">Descubra os desafios ocultos</p>
              </div>
              <div className="text-center">
                <Sparkles className="w-8 h-8 mx-auto text-purple-400 mb-2" />
                <p className="text-white/90 text-xs font-semibold">Previsão de Futuro</p>
                <p className="text-white/60 text-xs mt-1">Veja o que o destino reserva</p>
              </div>
              <div className="text-center">
                <Shield className="w-8 h-8 mx-auto text-blue-400 mb-2" />
                <p className="text-white/90 text-xs font-semibold">Taxa de Fidelidade</p>
                <p className="text-white/60 text-xs mt-1">Análise real de lealdade</p>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
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
                  <div className="mb-4">
                    <p className="text-yellow-100 text-2xl font-bold">
                      Apenas R$ 4,99
                    </p>
                    <p className="text-yellow-200 text-xs">Pagamento único • Acesso instantâneo</p>
                  </div>
                  <button
                    onClick={openPaymentModal}
                    className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
                  >
                    🔓 Comprar Análise Completa
                  </button>
                  <p className="text-yellow-300 text-xs mt-3">
                    ⚡ Acesso instantâneo • 🔒 100% Seguro • ✓ Satisfação garantida
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
