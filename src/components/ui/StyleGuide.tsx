import React from 'react';
import { 
  CajaCard, 
  CajaListItem, 
  CajaSearchBar, 
  CajaHeader, 
  CajaStatsCard, 
  CajaButton,
  CajaIcon
} from './design-system';
import { Badge } from './badge';
import { Separator } from './separator';
import { 
  MessageSquare, 
  Users, 
  Ticket, 
  TrendingUp,
  Star,
  Settings,
  Plus,
  Search
} from 'lucide-react';

/**
 * Guia de Estilo do Cajá Talks Design System
 * 
 * Este componente demonstra todos os componentes padronizados
 * e suas variações para manter consistência visual.
 */
export function StyleGuide() {
  return (
    <div className="p-6 space-y-8 max-w-6xl mx-auto">
      {/* Header */}
      <CajaHeader
        title="Cajá Talks Design System"
        description="Componentes padronizados para web e mobile"
      />

      {/* Cores */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Paleta de Cores</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="w-20 h-20 bg-[var(--caja-yellow)] rounded-lg mx-auto mb-2"></div>
            <p className="text-sm font-medium">Amarelo Cajá</p>
            <p className="text-xs text-[var(--muted-foreground)]">#F4D03F</p>
          </div>
          <div className="text-center">
            <div className="w-20 h-20 bg-[var(--caja-green)] rounded-lg mx-auto mb-2"></div>
            <p className="text-sm font-medium">Verde Cajá</p>
            <p className="text-xs text-[var(--muted-foreground)]">#27AE60</p>
          </div>
          <div className="text-center">
            <div className="w-20 h-20 bg-[var(--caja-brown)] rounded-lg mx-auto mb-2"></div>
            <p className="text-sm font-medium">Marrom Cajá</p>
            <p className="text-xs text-[var(--muted-foreground)]">#8B4513</p>
          </div>
          <div className="text-center">
            <div className="w-20 h-20 bg-[var(--caja-black)] rounded-lg mx-auto mb-2"></div>
            <p className="text-sm font-medium">Preto Cajá</p>
            <p className="text-xs text-[var(--muted-foreground)]">#1C1C1C</p>
          </div>
        </div>
      </section>

      <Separator />

      {/* Botões */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Botões</h2>
        <div className="space-y-4">
          <div className="flex flex-wrap gap-3">
            <CajaButton variant="yellow">Amarelo</CajaButton>
            <CajaButton variant="green">Verde</CajaButton>
            <CajaButton variant="brown">Marrom</CajaButton>
            <CajaButton variant="outline">Outline</CajaButton>
            <CajaButton variant="ghost">Ghost</CajaButton>
          </div>
          <div className="flex flex-wrap gap-3">
            <CajaButton variant="yellow" size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Com Ícone
            </CajaButton>
            <CajaButton variant="green" disabled>Desabilitado</CajaButton>
          </div>
        </div>
      </section>

      <Separator />

      {/* Cards de Estatísticas */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Cards de Estatísticas</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <CajaStatsCard
            title="Conversas Ativas"
            value="247"
            change="+12%"
            changeType="positive"
            icon={MessageSquare}
            variant="yellow"
            animated={true}
          />
          <CajaStatsCard
            title="Tickets Abertos"
            value="32"
            change="-8%"
            changeType="positive"
            icon={Ticket}
            variant="green"
            animated={true}
          />
          <CajaStatsCard
            title="Clientes Ativos"
            value="1,235"
            change="+18%"
            changeType="positive"
            icon={Users}
            variant="brown"
            animated={true}
          />
          <CajaStatsCard
            title="Satisfação"
            value="94%"
            change="+2%"
            changeType="positive"
            icon={Star}
            variant="default"
            animated={true}
          />
        </div>
      </section>

      <Separator />

      {/* Cards */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Cards</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <CajaCard variant="default" title="Card Padrão" hoverable>
            <p>Conteúdo do card padrão com hover effect.</p>
          </CajaCard>
          <CajaCard variant="stats" title="Card Stats" animated>
            <p>Card otimizado para exibição de estatísticas.</p>
          </CajaCard>
          <CajaCard variant="feature" title="Card Feature">
            <p>Card com gradiente para destacar funcionalidades.</p>
          </CajaCard>
        </div>
      </section>

      <Separator />

      {/* Lista de Itens */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Lista de Itens</h2>
        <div className="space-y-2">
          <CajaListItem
            title="Maria Santos"
            description="Preciso de ajuda com o pedido #12345"
            subtitle="Cliente VIP"
            avatar={<span className="text-xl">👩‍💼</span>}
            timestamp="2 min"
            status="online"
            priority="high"
            unread={3}
            badges={[
              { text: 'VIP', variant: 'yellow' },
              { text: 'E-commerce', variant: 'blue' }
            ]}
            hoverable={true}
            animated={true}
          />
          <CajaListItem
            title="João Silva"
            description="Obrigado pela ajuda!"
            icon={MessageSquare}
            timestamp="15 min"
            status="offline"
            priority="low"
            badges={[{ text: 'Novo', variant: 'green' }]}
            hoverable={true}
            animated={true}
          />
        </div>
      </section>

      <Separator />

      {/* Barra de Pesquisa */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Barra de Pesquisa</h2>
        <div className="space-y-4 max-w-md">
          <CajaSearchBar
            placeholder="Buscar conversas..."
            value=""
            onChange={() => {}}
          />
          <CajaSearchBar
            placeholder="Carregando..."
            value=""
            onChange={() => {}}
            loading={true}
          />
        </div>
      </section>

      <Separator />

      {/* Ícones */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Ícones</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <CajaIcon icon={MessageSquare} variant="yellow" size="xl" className="mx-auto mb-2" />
            <p className="text-sm">Amarelo</p>
          </div>
          <div className="text-center">
            <CajaIcon icon={Users} variant="green" size="xl" className="mx-auto mb-2" />
            <p className="text-sm">Verde</p>
          </div>
          <div className="text-center">
            <CajaIcon icon={Ticket} variant="brown" size="xl" className="mx-auto mb-2" />
            <p className="text-sm">Marrom</p>
          </div>
          <div className="text-center">
            <CajaIcon icon={Settings} variant="muted" size="xl" className="mx-auto mb-2" />
            <p className="text-sm">Neutro</p>
          </div>
        </div>
      </section>

      <Separator />

      {/* Badges */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Badges</h2>
        <div className="flex flex-wrap gap-2">
          <Badge variant="default">Padrão</Badge>
          <Badge variant="secondary">Secundário</Badge>
          <Badge variant="destructive">Destrutivo</Badge>
          <Badge variant="outline">Contorno</Badge>
          <Badge className="bg-[var(--caja-yellow)] text-[var(--caja-black)]">Amarelo</Badge>
          <Badge className="bg-[var(--caja-green)] text-white">Verde</Badge>
          <Badge className="bg-[var(--caja-brown)] text-white">Marrom</Badge>
        </div>
      </section>

      <Separator />

      {/* Status de Conexão */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Status de Conexão</h2>
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-[var(--caja-green)] rounded-full"></div>
            <span className="text-sm">Online</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-[var(--caja-yellow)] rounded-full"></div>
            <span className="text-sm">Ausente</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
            <span className="text-sm">Offline</span>
          </div>
        </div>
      </section>

      <Separator />

      {/* Diretrizes de Uso */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Diretrizes de Uso</h2>
        <CajaCard title="Boas Práticas" variant="feature">
          <ul className="space-y-2 text-sm">
            <li>• Use cores consistentes em todo o sistema</li>
            <li>• Prefira componentes do design system aos elementos básicos</li>
            <li>• Mantenha espaçamentos uniformes (4px, 8px, 16px, 24px, 32px)</li>
            <li>• Use animações sutis para melhorar a UX</li>
            <li>• Garanta acessibilidade em todos os componentes</li>
            <li>• Teste responsividade em diferentes tamanhos de tela</li>
          </ul>
        </CajaCard>
      </section>

      {/* Estrutura de Import */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Como Importar</h2>
        <CajaCard title="Exemplos de Import" variant="default">
          <pre className="bg-[var(--muted)] p-4 rounded-lg text-sm overflow-x-auto">
{`// Componentes do Design System
import { 
  CajaCard, 
  CajaListItem, 
  CajaButton, 
  CajaSearchBar,
  CajaStatsCard 
} from './ui/design-system';

// Hooks utilitários
import { 
  useViewState, 
  useResponsive,
  getStatusColor 
} from '../hooks/useDesignSystem';

// Layout padronizado
import { PageLayout } from './layout/PageLayout';`}
          </pre>
        </CajaCard>
      </section>
    </div>
  );
}

export default StyleGuide;