import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CajaListItem, CajaSearchBar } from './design-system';
import { Badge } from './badge';
import { Button } from './button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './tooltip';
import { Filter, Plus } from 'lucide-react';

export interface ConversationItem {
  id: string | number;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unread: number;
  status: 'online' | 'offline' | 'away';
  priority: 'high' | 'medium' | 'low';
  tags?: string[];
}

export interface ConversationListProps {
  conversations: ConversationItem[];
  selectedId?: string | number;
  onSelect: (id: string | number) => void;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  loading?: boolean;
  onNewConversation?: () => void;
  onFilter?: () => void;
  className?: string;
}

export function ConversationList({
  conversations,
  selectedId,
  onSelect,
  searchValue = '',
  onSearchChange,
  loading = false,
  onNewConversation,
  onFilter,
  className
}: ConversationListProps) {
  return (
    <TooltipProvider>
      <div className={`w-full lg:w-96 border-r border-[var(--border)] bg-white ${className || ''}`}>
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="p-6 border-b border-[var(--border)] bg-white/80 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-semibold text-[var(--foreground)]">Conversas</h1>
                <p className="text-sm text-[var(--muted-foreground)] mt-1">
                  {conversations.length} conversas ativas
                </p>
              </div>
              <div className="flex items-center space-x-2">
                {onFilter && (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" size="sm" className="h-9 w-9 p-0" onClick={onFilter}>
                        <Filter className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Filtrar conversas</TooltipContent>
                  </Tooltip>
                )}
                {onNewConversation && (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" size="sm" className="h-9 w-9 p-0" onClick={onNewConversation}>
                        <Plus className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Nova conversa</TooltipContent>
                  </Tooltip>
                )}
              </div>
            </div>
            
            {/* Search */}
            {onSearchChange && (
              <CajaSearchBar
                placeholder="Buscar conversas..."
                value={searchValue}
                onChange={onSearchChange}
                loading={loading}
              />
            )}
          </div>
          
          {/* Conversations */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-2">
              {loading ? (
                // Loading skeleton
                <div className="space-y-2">
                  {[...Array(5)].map((_, index) => (
                    <div key={index} className="animate-pulse p-4 rounded-xl">
                      <div className="flex items-start space-x-3">
                        <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                        <div className="flex-1 space-y-2">
                          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                          <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <AnimatePresence>
                  {conversations.map((conversation, index) => (
                    <motion.div
                      key={conversation.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <CajaListItem
                        title={conversation.name}
                        description={conversation.lastMessage}
                        timestamp={conversation.time}
                        avatar={<span className="text-xl">{conversation.avatar}</span>}
                        status={conversation.status}
                        priority={conversation.priority}
                        unread={conversation.unread}
                        selected={selectedId === conversation.id}
                        hoverable={true}
                        animated={true}
                        badges={conversation.tags?.map(tag => ({ text: tag, variant: 'default' as const })) || []}
                        onClick={() => onSelect(conversation.id)}
                        className="mb-2"
                      />
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}
              
              {!loading && conversations.length === 0 && (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-[var(--muted)] rounded-full flex items-center justify-center mx-auto mb-4">
                    <Plus className="h-8 w-8 text-[var(--muted-foreground)]" />
                  </div>
                  <h3 className="font-medium text-[var(--foreground)] mb-2">Nenhuma conversa encontrada</h3>
                  <p className="text-sm text-[var(--muted-foreground)] mb-4">
                    {searchValue ? 'Tente ajustar sua busca' : 'Comece uma nova conversa'}
                  </p>
                  {onNewConversation && (
                    <Button variant="outline" size="sm" onClick={onNewConversation}>
                      <Plus className="h-4 w-4 mr-2" />
                      Nova Conversa
                    </Button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}

export default ConversationList;