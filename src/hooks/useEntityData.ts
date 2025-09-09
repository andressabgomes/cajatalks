import { CajaEntityCardProps } from '../components/ui/design-system';
import { 
  Mail, 
  Phone, 
  Building, 
  MapPin, 
  Globe, 
  TrendingUp, 
  Ticket, 
  Star, 
  DollarSign, 
  Activity, 
  MessageSquare,
  Calendar,
  User,
  Clock,
  ExternalLink,
  Users
} from 'lucide-react';

// Interfaces para diferentes tipos de entidades
export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  avatar: string;
  status: 'active' | 'inactive' | 'pending';
  plan: 'basic' | 'pro' | 'enterprise';
  joinDate: string;
  lastContact: string;
  totalTickets: number;
  openTickets: number;
  satisfaction: number;
  location: string;
  website: string;
  tags: string[];
  revenue: number;
  lastActivity: string;
  priority: 'low' | 'medium' | 'high';
}

export interface TicketData {
  id: string;
  title: string;
  description: string;
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  client: string;
  assignee: string;
  created: string;
  updated: string;
  category: string;
  tags: string[];
  messages: number;
}

export interface TeamMember {
  id: string | number;
  name: string;
  email: string;
  role: 'admin' | 'supervisor' | 'agent';
  department: string;
  status: 'online' | 'away' | 'offline';
  avatar?: string | null;
  joinDate: string;
  lastActive: string;
  stats: { 
    tickets: number; 
    conversations: number; 
    rating: number; 
  };
}

// Hook para transformar dados de clientes
export function useClientData() {
  const transformClientToEntity = (client: Client): CajaEntityCardProps => {
    const statusLabels = {
      active: 'Ativo',
      inactive: 'Inativo', 
      pending: 'Pendente'
    };

    const planLabels = {
      basic: 'Básico',
      pro: 'Pro',
      enterprise: 'Enterprise'
    };

    const planVariants = {
      basic: 'blue' as const,
      pro: 'purple' as const,
      enterprise: 'orange' as const
    };

    const priorityLabels = {
      low: 'Baixa',
      medium: 'Média',
      high: 'Alta'
    };

    return {
      id: client.id,
      title: client.name,
      subtitle: client.company,
      description: `Cliente desde ${new Date(client.joinDate).toLocaleDateString('pt-BR')}`,
      avatar: client.avatar,
      status: {
        type: client.status,
        label: statusLabels[client.status],
        icon: Activity
      },
      priority: {
        type: client.priority,
        label: priorityLabels[client.priority]
      },
      badges: [
        {
          text: planLabels[client.plan],
          variant: planVariants[client.plan]
        },
        ...client.tags.slice(0, 2).map(tag => ({
          text: tag,
          variant: 'default' as const
        }))
      ],
      metrics: [
        {
          label: 'Receita',
          value: `R$ ${(client.revenue / 1000).toFixed(1)}k`,
          icon: TrendingUp,
          color: 'text-[var(--caja-green)]'
        },
        {
          label: 'Tickets',
          value: client.totalTickets,
          icon: Ticket,
          color: 'text-orange-600'
        },
        {
          label: 'Satisfação',
          value: `${client.satisfaction}%`,
          icon: Star,
          color: 'text-[var(--caja-yellow)]'
        }
      ],
      metadata: [
        {
          label: 'Email',
          value: client.email,
          icon: Mail
        },
        {
          label: 'Telefone', 
          value: client.phone,
          icon: Phone
        },
        {
          label: 'Localização',
          value: client.location,
          icon: MapPin
        },
        {
          label: 'Website',
          value: client.website,
          icon: Globe
        }
      ],
      tags: client.tags
    };
  };

  return { transformClientToEntity };
}

// Hook para transformar dados de tickets
export function useTicketData() {
  const transformTicketToEntity = (ticket: TicketData): CajaEntityCardProps => {
    const statusLabels = {
      open: 'Aberto',
      in_progress: 'Em Andamento',
      resolved: 'Resolvido',
      closed: 'Fechado'
    };

    const statusIcons = {
      open: Activity,
      in_progress: Clock,
      resolved: Activity,
      closed: Activity
    };

    const priorityLabels = {
      low: 'Baixa',
      medium: 'Média', 
      high: 'Alta',
      urgent: 'Urgente'
    };

    return {
      id: ticket.id,
      title: ticket.title,
      subtitle: `Cliente: ${ticket.client}`,
      description: ticket.description,
      status: {
        type: ticket.status,
        label: statusLabels[ticket.status],
        icon: statusIcons[ticket.status]
      },
      priority: {
        type: ticket.priority,
        label: priorityLabels[ticket.priority]
      },
      badges: [
        {
          text: ticket.category,
          variant: 'blue' as const
        },
        ...ticket.tags.slice(0, 2).map(tag => ({
          text: tag,
          variant: 'default' as const
        }))
      ],
      metrics: [
        {
          label: 'Mensagens',
          value: ticket.messages,
          icon: MessageSquare,
          color: 'text-blue-600'
        },
        {
          label: 'Criado',
          value: new Date(ticket.created).toLocaleDateString('pt-BR'),
          icon: Calendar,
          color: 'text-[var(--muted-foreground)]'
        },
        {
          label: 'Responsável',
          value: ticket.assignee,
          icon: User,
          color: 'text-[var(--caja-brown)]'
        }
      ],
      tags: ticket.tags
    };
  };

  return { transformTicketToEntity };
}

// Hook para transformar dados de membros da equipe
export function useTeamData() {
  const transformMemberToEntity = (member: TeamMember): CajaEntityCardProps => {
    const statusLabels = {
      online: 'Online',
      away: 'Ausente',
      offline: 'Offline'
    };

    const roleLabels = {
      admin: 'Administrador',
      supervisor: 'Supervisor',
      agent: 'Agente'
    };

    const roleVariants = {
      admin: 'yellow' as const,
      supervisor: 'green' as const, 
      agent: 'blue' as const
    };

    return {
      id: member.id.toString(),
      title: member.name,
      subtitle: member.department,
      description: `Membro desde ${new Date(member.joinDate).toLocaleDateString('pt-BR')}`,
      avatar: member.avatar || undefined,
      status: {
        type: member.status,
        label: statusLabels[member.status],
        icon: Activity
      },
      badges: [
        {
          text: roleLabels[member.role],
          variant: roleVariants[member.role]
        }
      ],
      metrics: [
        {
          label: 'Tickets',
          value: member.stats.tickets,
          icon: Ticket,
          color: 'text-orange-600'
        },
        {
          label: 'Conversas',
          value: member.stats.conversations,
          icon: MessageSquare,
          color: 'text-blue-600'
        },
        {
          label: 'Avaliação',
          value: `${member.stats.rating.toFixed(1)}/5`,
          icon: Star,
          color: 'text-[var(--caja-yellow)]'
        }
      ],
      metadata: [
        {
          label: 'Email',
          value: member.email,
          icon: Mail
        },
        {
          label: 'Última atividade',
          value: member.lastActive,
          icon: Clock
        }
      ],
      tags: [member.role, member.status]
    };
  };

  return { transformMemberToEntity };
}