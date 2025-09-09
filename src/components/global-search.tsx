import { useState, useEffect, useCallback } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { 
  Search, 
  MessageSquare, 
  Users, 
  Ticket, 
  FileText, 
  Clock,
  ArrowRight,
  X
} from 'lucide-react';

interface SearchResult {
  id: string;
  type: 'conversation' | 'ticket' | 'client' | 'document';
  title: string;
  description: string;
  metadata?: string;
  priority?: 'high' | 'medium' | 'low';
  status?: string;
}

interface GlobalSearchProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (type: string, id: string) => void;
}

export function GlobalSearch({ isOpen, onClose, onNavigate }: GlobalSearchProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Mock search data
  const mockResults: SearchResult[] = [
    {
      id: '1',
      type: 'conversation',
      title: 'Maria Santos',
      description: 'Preciso de ajuda com o pedido #12345',
      metadata: '2 min atrás',
      priority: 'high'
    },
    {
      id: '2',
      type: 'ticket',
      title: 'Produto chegou danificado',
      description: 'Cliente recebeu produto com avarias na embalagem',
      metadata: 'TK-001',
      status: 'open',
      priority: 'high'
    },
    {
      id: '3',
      type: 'client',
      title: 'Tech Solutions Ltda',
      description: 'maria@techsolutions.com',
      metadata: 'Plano Pro'
    },
    {
      id: '4',
      type: 'article',
      title: 'Manual de Atendimento',
      description: 'Guia completo para atendimento ao cliente',
      metadata: 'Atualizado em 10/01/2024'
    },
    {
      id: '5',
      type: 'profile',
      title: 'Meu Perfil',
      description: 'Visualizar e editar informações do perfil',
      metadata: 'Configurações pessoais'
    },
    {
      id: '6',
      type: 'team',
      title: 'Equipe',
      description: 'Gerenciar membros da equipe e permissões',
      metadata: '5 membros ativos'
    },
    {
      id: '7',
      type: 'report',
      title: 'Relatórios de Performance',
      description: 'Análises detalhadas de métricas e KPIs',
      metadata: 'Dashboard executivo'
    },
    {
      id: '8',
      type: 'integration',
      title: 'WhatsApp Business',
      description: 'Integração com WhatsApp Business API',
      metadata: 'Conectado e ativo'
    },
    {
      id: '9',
      type: 'activity',
      title: 'Log de Atividades',
      description: 'Histórico de ações e eventos do sistema',
      metadata: 'Últimas 24h'
    }
  ];

  const performSearch = useCallback((searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    setIsSearching(true);
    
    // Simulate API call
    setTimeout(() => {
      const filtered = mockResults.filter(result =>
        result.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        result.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setResults(filtered);
      setIsSearching(false);
      setSelectedIndex(0);
    }, 300);
  }, []);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      performSearch(query);
    }, 200);

    return () => clearTimeout(debounceTimer);
  }, [query, performSearch]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      switch (e.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowDown':
          e.preventDefault();
          setSelectedIndex(prev => Math.min(prev + 1, results.length - 1));
          break;
        case 'ArrowUp':
          e.preventDefault();
          setSelectedIndex(prev => Math.max(prev - 1, 0));
          break;
        case 'Enter':
          e.preventDefault();
          if (results[selectedIndex]) {
            handleResultClick(results[selectedIndex]);
          }
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, results, selectedIndex, onClose]);

  const getIcon = (type: string) => {
    switch (type) {
      case 'conversation':
        return <MessageSquare className="h-4 w-4 text-[var(--caja-yellow)]" />;
      case 'ticket':
        return <Ticket className="h-4 w-4 text-[var(--caja-green)]" />;
      case 'client':
        return <Users className="h-4 w-4 text-[var(--caja-brown)]" />;
      case 'document':
        return <FileText className="h-4 w-4 text-blue-500" />;
      default:
        return <Search className="h-4 w-4" />;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'conversation':
        return 'Conversa';
      case 'ticket':
        return 'Ticket';
      case 'client':
        return 'Cliente';
      case 'document':
        return 'Documento';
      default:
        return type;
    }
  };

  const handleResultClick = (result: SearchResult) => {
    onNavigate(result.type, result.id);
    onClose();
    setQuery('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center pt-20">
      <div className="w-full max-w-2xl mx-4 animate-in fade-in-0 slide-in-from-top-4 duration-200">
        <Card className="shadow-2xl border-0">
          <CardContent className="p-0">
            {/* Search Input */}
            <div className="flex items-center p-4 border-b border-[var(--border)]">
              <Search className="h-5 w-5 text-[var(--muted-foreground)] mr-3" />
              <Input
                placeholder="Buscar conversas, tickets, clientes..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="border-0 focus-visible:ring-0 text-lg"
                autoFocus
              />
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="ml-2"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Search Results */}
            <div className="max-h-96 overflow-y-auto">
              {isSearching ? (
                <div className="p-8 text-center">
                  <div className="inline-flex items-center space-x-2 text-[var(--muted-foreground)]">
                    <div className="w-4 h-4 border-2 border-[var(--caja-yellow)] border-t-transparent rounded-full animate-spin"></div>
                    <span>Buscando...</span>
                  </div>
                </div>
              ) : results.length > 0 ? (
                <div className="py-2">
                  {results.map((result, index) => (
                    <button
                      key={result.id}
                      onClick={() => handleResultClick(result)}
                      className={`w-full flex items-center space-x-3 p-3 hover:bg-[var(--muted)] transition-colors text-left ${
                        index === selectedIndex ? 'bg-[var(--muted)]' : ''
                      }`}
                    >
                      <div className="flex-shrink-0">
                        {getIcon(result.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-1">
                          <p className="font-medium truncate">{result.title}</p>
                          <Badge variant="outline" className="text-xs">
                            {getTypeLabel(result.type)}
                          </Badge>
                          {result.priority === 'high' && (
                            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                          )}
                        </div>
                        <p className="text-sm text-[var(--muted-foreground)] truncate">
                          {result.description}
                        </p>
                        {result.metadata && (
                          <div className="flex items-center space-x-1 mt-1">
                            <Clock className="h-3 w-3 text-[var(--muted-foreground)]" />
                            <span className="text-xs text-[var(--muted-foreground)]">
                              {result.metadata}
                            </span>
                          </div>
                        )}
                      </div>
                      <ArrowRight className="h-4 w-4 text-[var(--muted-foreground)]" />
                    </button>
                  ))}
                </div>
              ) : query.trim() ? (
                <div className="p-8 text-center text-[var(--muted-foreground)]">
                  <Search className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p>Nenhum resultado encontrado para "{query}"</p>
                </div>
              ) : (
                <div className="p-8 text-center text-[var(--muted-foreground)]">
                  <Search className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p>Digite para buscar conversas, tickets, clientes...</p>
                  <div className="mt-4 space-y-2 text-xs">
                    <p>Dicas:</p>
                    <p>• Use ↑↓ para navegar</p>
                    <p>• Enter para selecionar</p>
                    <p>• Esc para fechar</p>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}