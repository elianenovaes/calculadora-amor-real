"use client";

import { useEffect, useState } from "react";
import { Heart, Sparkles, CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ThankYouPage() {
  const [showConfetti, setShowConfetti] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Marca que o usuário completou a compra
    localStorage.setItem("loveCalculatorPremium", "true");

    // Esconde o confetti após 3 segundos
    const timer = setTimeout(() => setShowConfetti(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleViewReading = () => {
    // Redireciona para a página principal onde a leitura está salva
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-950 via-emerald-900 to-teal-950 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Confetti Animation */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-fall"
              style={{
                left: `${Math.random() * 100}%`,
                top: `-${Math.random() * 20}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 2}s`,
              }}
            >
              {i % 3 === 0 ? "💕" : i % 3 === 1 ? "✨" : "🎉"}
            </div>
          ))}
        </div>
      )}

      <div className="max-w-2xl w-full">
        {/* Success Icon */}
        <div className="text-center mb-8 animate-bounce">
          <CheckCircle className="w-24 h-24 mx-auto text-green-400 mb-4" />
        </div>

        {/* Main Card */}
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 md:p-12 border border-white/20 shadow-2xl text-center">
          <Heart className="w-16 h-16 mx-auto text-pink-400 mb-6 animate-pulse" />
          
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            🎉 Muito Obrigado pela Compra!
          </h1>
          
          <p className="text-green-200 text-lg md:text-xl mb-8">
            Sua análise completa foi desbloqueada com sucesso!
          </p>

          <div className="bg-green-500/20 border-2 border-green-400/50 rounded-2xl p-6 mb-8">
            <Sparkles className="w-12 h-12 mx-auto text-yellow-400 mb-4" />
            <h2 className="text-white font-bold text-2xl mb-3">
              Sua Leitura Completa Está Pronta!
            </h2>
            <p className="text-green-100 mb-6">
              Agora você tem acesso total a todos os segredos do seu relacionamento:
            </p>
            <ul className="text-green-100 text-left space-y-2 mb-6 max-w-md mx-auto">
              <li className="flex items-start">
                <span className="text-green-400 mr-2">✓</span>
                <span>Análise completa dos obstáculos ocultos</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-400 mr-2">✓</span>
                <span>Previsão de futuro detalhada</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-400 mr-2">✓</span>
                <span>Taxa de fidelidade revelada</span>
              </li>
            </ul>

            <button
              onClick={handleViewReading}
              className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-bold py-5 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg text-lg"
            >
              📖 Ver Minha Leitura Completa
            </button>
          </div>

          <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
            <p className="text-white/90 text-sm mb-4">
              💡 <strong>Dica:</strong> Salve esta página nos favoritos para acessar sua leitura sempre que quiser!
            </p>
            <p className="text-white/70 text-xs">
              Caso tenha alguma dúvida, entre em contato com nosso suporte.
            </p>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-white/60 text-sm mt-6">
          ❤️ Obrigado por confiar na Calculadora Amor Real
        </p>
      </div>

      <style jsx>{`
        @keyframes fall {
          to {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
          }
        }
        .animate-fall {
          animation: fall linear forwards;
        }
      `}</style>
    </div>
  );
}
