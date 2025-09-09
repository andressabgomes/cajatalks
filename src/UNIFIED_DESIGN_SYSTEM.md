# Sistema de Design Unificado - Cajá Talks

## Visão Geral

O sistema de design unificado do Cajá Talks foi criado para garantir consistência visual, tipografia, espaçamentos e comportamentos em todos os módulos da aplicação. Todos os componentes seguem a paleta de cores oficial e padrões de UX estabelecidos.

## Componentes Base Unificados

### CajaEntityCard
Componente de card padronizado para visualizar entidades (clientes, tickets, membros da equipe).

**Características:**
- Layout consistente com header, conteúdo e métricas
- Suporte a avatar com indicador de status
- Badges padronizadas para status, prioridade e categorias
- Métricas visuais com ícones
- Metadata estruturada (email, telefone, etc.)
- Tags com limite visual
- Animações suaves no hover
- Seleção visual com ring colorido

### CajaEntityList
Componente de lista que funciona tanto para visualização em grid quanto em lista.

**Características:**
- Troca automática entre layout de cards e lista
- Estados de loading e empty state
- Responsividade automática
- Suporte completo ao CajaListItem para modo lista

### CajaStatsCard
Componente padronizado para estatísticas.

**Características:**
- 4 variantes de cores (yellow, green, brown, default)
- Ícones padronizados
- Indicadores de mudança (positivo/negativo/neutro)
- Animações no hover
- Estado de loading

### CajaSearchBar
Barra de pesquisa padronizada.

**Características:**
- Ícone de busca integrado
- Estado de loading com spinner
- Suporte a Enter para busca
- Estilo consistente

### CajaHeader
Header padronizado para páginas.

**Características:**
- Breadcrumbs automáticos
- Título e descrição
- Área de ações
- Layout responsivo

## Hooks Utilitários

### useEntityData
Hook que contém transformadores para converter dados específicos de cada módulo para o formato unificado.

**Transformadores disponíveis:**
- `useClientData().transformClientToEntity()` - Para clientes
- `useTicketData().transformTicketToEntity()` - Para tickets  
- `useTeamData().transformMemberToEntity()` - Para membros da equipe

## Implementação

### 1. Estrutura Padrão de Componente

```tsx
import { CajaEntityList, CajaHeader, CajaStatsCard, CajaSearchBar } from './ui/design-system';
import { useClientData } from '../hooks/useEntityData';

export function MyComponent() {
  // Estados
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Transformador de dados
  const { transformClientToEntity } = useClientData();
  
  // Transformar dados para formato unificado
  const entityItems = myData.map(item => ({
    ...transformClientToEntity(item),
    selected: selectedItem === item.id,
    onClick: () => handleSelect(item.id),
    actions: <MyActions />
  }));

  return (
    <div className="flex flex-col h-full">
      {/* Header padronizado */}
      <CajaHeader
        title="Meu Módulo"
        description="Descrição do módulo"
        breadcrumbs={[{ label: 'Dashboard' }, { label: 'Meu Módulo' }]}
        actions={<MyHeaderActions />}
      />

      {/* Stats padronizadas */}
      <div className="grid grid-cols-4 gap-4">
        <CajaStatsCard
          title="Total"
          value="123"
          icon={MyIcon}
          variant="yellow"
        />
      </div>

      {/* Busca padronizada */}
      <CajaSearchBar
        placeholder="Buscar..."
        value={searchTerm}
        onChange={setSearchTerm}
      />

      {/* Lista/Grid unificado */}
      <CajaEntityList
        items={entityItems}
        viewMode={viewMode}
        emptyState={<MyEmptyState />}
      />
    </div>
  );
}
```

### 2. Definindo Transformador de Dados

```tsx
// Em useEntityData.ts
export function useMyEntityData() {
  const transformMyItemToEntity = (item: MyItem): CajaEntityCardProps => {
    return {
      id: item.id,
      title: item.name,
      subtitle: item.category,
      description: item.description,
      avatar: item.avatar,
      status: {
        type: item.status,
        label: getStatusLabel(item.status),
        icon: getStatusIcon(item.status)
      },
      badges: item.tags.map(tag => ({ text: tag, variant: 'default' })),
      metrics: [
        {
          label: 'Métrica 1',
          value: item.metric1,
          icon: MyIcon,
          color: 'text-green-500'
        }
      ],
      metadata: [
        {
          label: 'Campo',
          value: item.field,
          icon: MyIcon
        }
      ],
      tags: item.tags
    };
  };

  return { transformMyItemToEntity };
}
```

## Padrões de Cores

### Status
- **Ativo/Online**: `bg-[var(--caja-green)]/10 text-[var(--caja-green)]`
- **Inativo/Offline**: `bg-gray-100 text-gray-600`
- **Pendente/Away**: `bg-[var(--caja-yellow)]/10 text-[var(--caja-brown)]`
- **Aberto**: `bg-blue-50 text-blue-600`
- **Resolvido**: `bg-[var(--caja-green)]/10 text-[var(--caja-green)]`

### Prioridade
- **Baixa**: `bg-[var(--caja-green)]/10 text-[var(--caja-green)]`
- **Média**: `bg-[var(--caja-yellow)]/10 text-[var(--caja-brown)]`
- **Alta**: `bg-orange-50 text-orange-600`
- **Urgente**: `bg-red-50 text-red-600`

### Badges de Plano/Tipo
- **Básico**: `bg-blue-50 text-blue-600` (variant: blue)
- **Pro**: `bg-purple-50 text-purple-600` (variant: purple)
- **Enterprise**: `bg-orange-50 text-orange-600` (variant: orange)

## Vantagens

1. **Consistência Visual**: Todos os módulos seguem o mesmo padrão
2. **Manutenibilidade**: Mudanças no design system se propagam automaticamente
3. **Responsividade**: Componentes adaptam automaticamente ao tamanho da tela
4. **Acessibilidade**: Padrões de cores e contrastes consistentes
5. **Performance**: Componentes otimizados com animações suaves
6. **Tipografia**: Hierarchy consistente em todos os textos
7. **Espaçamentos**: Grid system padronizado
8. **Ícones**: Uso consistente da biblioteca Lucide React

## Módulos Atualizados

- ✅ **Clientes** - Migrado para usar CajaEntityCard/List
- ✅ **Tickets** - Migrado para usar CajaEntityCard/List  
- ✅ **Equipe** - Migrado para usar CajaEntityCard/List

Todos os módulos agora compartilham a mesma estrutura visual e comportamental, garantindo uma experiência uniforme em todo o sistema.