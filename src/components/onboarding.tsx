import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { 
  ChevronRight, 
  ChevronLeft, 
  X, 
  MessageSquare, 
  Ticket, 
  Users, 
  Settings,
  Search,
  Star,
  CheckCircle,
  Sparkles
} from 'lucide-react';
import { CajaLogo } from './ui/caja-logo';

interface OnboardingProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
}

const onboardingSteps = [
  {
    id: 1,
    title: 'Bem-vindo ao Cajá Talks! 🎉',
    description: 'Sua nova plataforma de comunicação inteligente para equipes',
    content: (
      <div className="text-center space-y-6">
        <CajaLogo 
          size="xl"
          variant="elevated"
          animated={true}
          className="mx-auto mb-4"
        />
        <div className="space-y-2">
          <h3 className="text-xl font-semibold">Cajá Talks</h3>
          <p className="text-[var(--muted-foreground)]">
            Conecte-se com sua equipe de forma mais eficiente e organizada
          </p>
        </div>
        <div className="flex items-center justify-center space-x-2 text-sm text-[var(--muted-foreground)]">
          <Sparkles className="h-4 w-4 text-[var(--caja-yellow)]" />
          <span>Vamos começar essa jornada juntos!</span>
          <Sparkles className="h-4 w-4 text-[var(--caja-green)]" />
        </div>
      </div>
    ),
    features: []
  },
  {
    id: 2,
    title: 'Dashboard Inteligente',
    description: 'Tenha uma visão completa da sua operação',
    content: (
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-[var(--caja-yellow-light)] p-4 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <MessageSquare className="h-5 w-5 text-[var(--caja-yellow)]" />
              <span className="font-medium">Conversas</span>
            </div>
            <p className="text-2xl font-bold">247</p>
            <p className="text-sm text-[var(--muted-foreground)]">Ativas hoje</p>
          </div>
          <div className="bg-[var(--caja-green-light)] p-4 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Ticket className="h-5 w-5 text-[var(--caja-green)]" />
              <span className="font-medium">Tickets</span>
            </div>
            <p className="text-2xl font-bold">32</p>
            <p className="text-sm text-[var(--muted-foreground)]">Em aberto</p>
          </div>
        </div>
      </div>
    ),
    features: [
      'Métricas em tempo real',
      'Gráficos interativos',
      'Alertas inteligentes'
    ]
  },
  {
    id: 3,
    title: 'Inbox Unificado',
    description: 'Todas as conversas em um só lugar',
    content: (
      <div className="space-y-4">
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-start space-x-3 mb-3">
            <div className="w-8 h-8 bg-[var(--caja-yellow)] rounded-full flex items-center justify-center text-sm font-medium">
              MS
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <span className="font-medium">Maria Santos</span>
                <Badge className="bg-[var(--caja-green)] text-white">Online</Badge>
              </div>
              <p className="text-sm text-[var(--muted-foreground)]">
                Preciso de ajuda com o pedido #12345
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-[var(--caja-brown)] rounded-full flex items-center justify-center text-sm font-medium text-white">
              JD
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <span className="font-medium">João Silva</span>
                <span className="text-xs text-[var(--muted-foreground)]">15 min</span>
              </div>
              <p className="text-sm text-[var(--muted-foreground)]">
                Obrigado pela ajuda!
              </p>
            </div>
          </div>
        </div>
      </div>
    ),
    features: [
      'Conversas organizadas',
      'Status em tempo real',
      'Busca instantânea'
    ]
  },
  {
    id: 4,
    title: 'Gestão de Tickets',
    description: 'Organize e acompanhe todos os atendimentos',
    content: (
      <div className="space-y-4">
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 border border-[var(--border)] rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              <div>
                <p className="font-medium">Produto chegou danificado</p>
                <p className="text-sm text-[var(--muted-foreground)]">TK-001 • Maria Santos</p>
              </div>
            </div>
            <Badge variant="destructive">Urgente</Badge>
          </div>
          <div className="flex items-center justify-between p-3 border border-[var(--border)] rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-[var(--caja-yellow)] rounded-full"></div>
              <div>
                <p className="font-medium">Dúvida sobre entrega</p>
                <p className="text-sm text-[var(--muted-foreground)]">TK-002 • João Silva</p>
              </div>
            </div>
            <Badge className="bg-[var(--caja-yellow)] text-[var(--caja-black)]">Médio</Badge>
          </div>
        </div>
      </div>
    ),
    features: [
      'Priorização automática',
      'SLA tracking',
      'Relatórios detalhados'
    ]
  },
  {
    id: 5,
    title: 'Busca Global',
    description: 'Encontre qualquer coisa rapidamente',
    content: (
      <div className="space-y-4">
        <div className="bg-[var(--caja-yellow-light)] border border-[var(--caja-yellow)] rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-3">
            <Search className="h-5 w-5 text-[var(--caja-yellow)]" />
            <span className="font-medium">Busca Inteligente</span>
          </div>
          <p className="text-sm text-[var(--muted-foreground)] mb-3">
            Use Cmd+K (Mac) ou Ctrl+K (Windows) para abrir a busca global
          </p>
          <div className="flex items-center space-x-2 text-xs">
            <kbd className="px-2 py-1 bg-white border rounded">⌘</kbd>
            <span>+</span>
            <kbd className="px-2 py-1 bg-white border rounded">K</kbd>
          </div>
        </div>
      </div>
    ),
    features: [
      'Busca instantânea',
      'Atalhos de teclado',
      'Resultados filtrados'
    ]
  },
  {
    id: 6,
    title: 'Pronto para começar! 🚀',
    description: 'Você está preparado para usar o Cajá Talks',
    content: (
      <div className="text-center space-y-6">
        <div className="w-16 h-16 mx-auto bg-[var(--caja-green)] rounded-full flex items-center justify-center">
          <CheckCircle className="h-8 w-8 text-white" />
        </div>
        <div className="space-y-2">
          <h3 className="text-xl font-semibold">Tudo configurado!</h3>
          <p className="text-[var(--muted-foreground)]">
            Agora você pode aproveitar todos os recursos do Cajá Talks
          </p>
        </div>
        <div className="bg-[var(--caja-green-light)] rounded-lg p-4">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <Star className="h-5 w-5 text-[var(--caja-green)]" />
            <span className="font-medium">Dica Pro</span>
          </div>
          <p className="text-sm text-[var(--muted-foreground)]">
            Explore as configurações para personalizar ainda mais sua experiência
          </p>
        </div>
      </div>
    ),
    features: []
  }
];

export function Onboarding({ isOpen, onClose, onComplete }: OnboardingProps) {
  const [currentStep, setCurrentStep] = useState(0);

  if (!isOpen) return null;

  const step = onboardingSteps[currentStep];
  const progress = ((currentStep + 1) / onboardingSteps.length) * 100;

  const handleNext = () => {
    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
      onClose();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSkip = () => {
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl shadow-2xl border-0 animate-in fade-in-0 slide-in-from-bottom-4 duration-300">
        <CardHeader className="relative">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <CajaLogo 
                size="sm"
                variant="default"
                animated={false}
              />
              <Badge variant="outline">
                {currentStep + 1} de {onboardingSteps.length}
              </Badge>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleSkip}
              className="text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          <Progress value={progress} className="mb-4" />
          
          <CardTitle className="text-2xl mb-2">{step.title}</CardTitle>
          <CardDescription className="text-base">{step.description}</CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {step.content}
          
          {step.features.length > 0 && (
            <div className="space-y-2">
              <h4 className="font-medium">Principais recursos:</h4>
              <ul className="space-y-1">
                {step.features.map((feature, index) => (
                  <li key={index} className="flex items-center space-x-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-[var(--caja-green)]" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          <div className="flex items-center justify-between pt-4 border-t border-[var(--border)]">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 0}
              className="flex items-center space-x-2"
            >
              <ChevronLeft className="h-4 w-4" />
              <span>Anterior</span>
            </Button>
            
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                onClick={handleSkip}
                className="text-[var(--muted-foreground)]"
              >
                Pular tutorial
              </Button>
              <Button
                onClick={handleNext}
                className="bg-[var(--caja-yellow)] hover:bg-[var(--caja-yellow)]/90 text-[var(--caja-black)] flex items-center space-x-2"
              >
                <span>{currentStep === onboardingSteps.length - 1 ? 'Finalizar' : 'Próximo'}</span>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}