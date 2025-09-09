import { useState } from 'react';
import { Card, CardContent, CardHeader } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Separator } from './ui/separator';
import { ViewControls } from './view-controls';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';
import { motion, AnimatePresence } from 'motion/react';
import { CajaListItem, CajaSearchBar, CajaButton, CajaCard } from './ui/design-system';
import { useViewState, getStatusColor } from '../hooks/useDesignSystem';
import { 
  Search, 
  Filter, 
  MoreVertical, 
  Send, 
  Paperclip, 
  Smile,
  Phone,
  Video,
  Archive,
  Star,
  Clock,
  CheckCheck,
  MessageSquare,
  ArrowLeft,
  User,
  Calendar,
  Mail,
  PhoneIcon,
  Hash,
  Tag,
  Plus,
  AlertCircle,
  Ticket
} from 'lucide-react';

interface Conversation {
  id: number;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unread: number;
  status: 'online' | 'offline' | 'away';
  priority: 'high' | 'medium' | 'low';
  email: string;
  phone: string;
  joinDate: string;
  tags: string[];
}

interface Message {
  id: number;
  sender: 'user' | 'client';
  content: string;
  time: string;
  status: 'sent' | 'delivered' | 'read';
}

interface Ticket {
  id: string;
  title: string;
  status: 'open' | 'resolved' | 'pending';
  priority: 'high' | 'medium' | 'low';
  createdAt: string;
}

export function Inbox() {
  const [selectedConversation, setSelectedConversation] = useState<number>(1);
  const [newMessage, setNewMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [showMobileChat, setShowMobileChat] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [sortBy, setSortBy] = useState('time');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [isTyping, setIsTyping] = useState(true);

  const conversations: Conversation[] = [
    {
      id: 1,
      name: 'Maria Santos',
      avatar: '👩‍💼',
      lastMessage: 'Preciso de ajuda com o pedido #12345',
      time: '2 min',
      unread: 3,
      status: 'online',
      priority: 'high',
      email: 'maria.santos@empresa.com',
      phone: '(11) 99999-9999',
      joinDate: 'Jan 2024',
      tags: ['VIP', 'E-commerce', 'Recorrente']
    },
    {
      id: 2,
      name: 'João Silva',
      avatar: '👨‍💼',
      lastMessage: 'Obrigado pela ajuda!',
      time: '15 min',
      unread: 0,
      status: 'offline',
      priority: 'low',
      email: 'joao.silva@tech.com',
      phone: '(11) 88888-8888',
      joinDate: 'Fev 2024',
      tags: ['Novo']
    },
    {
      id: 3,
      name: 'Tech Solutions',
      avatar: '🏢',
      lastMessage: 'Quando podemos agendar a reunião?',
      time: '1h',
      unread: 1,
      status: 'away',
      priority: 'medium',
      email: 'contato@techsolutions.com',
      phone: '(11) 77777-7777',
      joinDate: 'Dez 2023',
      tags: ['Corporativo', 'B2B']
    },
    {
      id: 4,
      name: 'Ana Costa',
      avatar: '👩‍💻',
      lastMessage: 'Perfeito! Vou implementar essa solução.',
      time: '2h',
      unread: 0,
      status: 'online',
      priority: 'low',
      email: 'ana.costa@startup.com',
      phone: '(11) 66666-6666',
      joinDate: 'Mar 2024',
      tags: ['Startup', 'Desenvolvimento']
    },
    {
      id: 5,
      name: 'Carlos Oliveira',
      avatar: '👨‍🔧',
      lastMessage: 'O problema foi resolvido, obrigado!',
      time: '1d',
      unread: 0,
      status: 'offline',
      priority: 'low',
      email: 'carlos@manutencao.com',
      phone: '(11) 55555-5555',
      joinDate: 'Nov 2023',
      tags: ['Manutenção']
    }
  ];

  const messages: Message[] = [
    {
      id: 1,
      sender: 'client',
      content: 'Olá! Estou com um problema no meu pedido #12345',
      time: '14:30',
      status: 'read'
    },
    {
      id: 2,
      sender: 'user',
      content: 'Olá Maria! Vou verificar seu pedido agora mesmo. Pode me dar mais detalhes sobre o problema?',
      time: '14:32',
      status: 'read'
    },
    {
      id: 3,
      sender: 'client',
      content: 'O produto chegou danificado e gostaria de trocar',
      time: '14:35',
      status: 'read'
    },
    {
      id: 4,
      sender: 'client',
      content: 'Preciso de ajuda com o pedido #12345',
      time: '14:40',
      status: 'delivered'
    }
  ];

  const tickets: Ticket[] = [
    {
      id: '#12345',
      title: 'Produto danificado',
      status: 'open',
      priority: 'high',
      createdAt: 'Hoje'
    },
    {
      id: '#12344',
      title: 'Dúvida sobre entrega',
      status: 'resolved',
      priority: 'medium',
      createdAt: 'Ontem'
    },
    {
      id: '#12343',
      title: 'Solicitação de reembolso',
      status: 'pending',
      priority: 'high',
      createdAt: '2 dias'
    }
  ];

  const filteredConversations = conversations.filter(conv =>
    conv.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedConv = conversations.find(c => c.id === selectedConversation);
  const relatedTickets = selectedConv ? tickets : [];

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setNewMessage('');
    }
  };

  const handleConversationClick = (id: number) => {
    setSelectedConversation(id);
    setShowMobileChat(true);
  };

  const handleBackToList = () => {
    setShowMobileChat(false);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-700 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      default: return 'bg-green-100 text-green-700 border-green-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'resolved': return 'bg-green-100 text-green-700 border-green-200';
      case 'pending': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <TooltipProvider>
      <div className="h-full flex bg-white">
        {/* Conversations List */}
        <div className={`w-full lg:w-96 border-r border-[var(--border)] ${showMobileChat ? 'hidden lg:block' : 'block'}`}>
          <div className="h-full flex flex-col">
            {/* Header */}
            <div className="p-6 border-b border-[var(--border)] bg-white/80 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h1 className="text-2xl font-semibold text-[var(--foreground)]">Conversas</h1>
                  <p className="text-sm text-[var(--muted-foreground)] mt-1">
                    {filteredConversations.length} conversas ativas
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" size="sm" className="h-9 w-9 p-0">
                        <Filter className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Filtrar conversas</TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" size="sm" className="h-9 w-9 p-0">
                        <Plus className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Nova conversa</TooltipContent>
                  </Tooltip>
                </div>
              </div>
              
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[var(--muted-foreground)]" />
                <Input
                  placeholder="Buscar conversas..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 h-11 border-[var(--border)] focus:border-[var(--caja-yellow)] transition-colors"
                />
              </div>
            </div>
            
            {/* Conversations */}
            <div className="flex-1 overflow-y-auto">
              <div className="p-2">
                <AnimatePresence>
                  {filteredConversations.map((conversation, index) => (
                    <motion.button
                      key={conversation.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => handleConversationClick(conversation.id)}
                      className={`w-full p-4 text-left rounded-xl mb-2 transition-all duration-200 group ${
                        selectedConversation === conversation.id
                          ? 'bg-[var(--caja-yellow)]/10 border-2 border-[var(--caja-yellow)]/30 shadow-sm'
                          : 'hover:bg-[var(--muted)]/50 border-2 border-transparent'
                      }`}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                    >
                      <div className="flex items-start space-x-3">
                        {/* Avatar */}
                        <div className="relative shrink-0">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[var(--caja-yellow)]/20 to-[var(--caja-green)]/20 flex items-center justify-center text-xl border-2 border-white shadow-sm">
                            {conversation.avatar}
                          </div>
                          <motion.div 
                            className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white shadow-sm ${
                              conversation.status === 'online' ? 'bg-[var(--caja-green)]' :
                              conversation.status === 'away' ? 'bg-[var(--caja-yellow)]' :
                              'bg-gray-400'
                            }`}
                            animate={{ 
                              scale: conversation.status === 'online' ? [1, 1.2, 1] : 1
                            }}
                            transition={{ 
                              duration: 2, 
                              repeat: conversation.status === 'online' ? Infinity : 0 
                            }}
                          />
                        </div>
                        
                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between mb-1">
                            <h3 className="font-medium text-[var(--foreground)] truncate">
                              {conversation.name}
                            </h3>
                            <div className="flex items-center space-x-2 shrink-0">
                              <span className="text-xs text-[var(--muted-foreground)]">
                                {conversation.time}
                              </span>
                              {conversation.priority === 'high' && (
                                <div className="w-2 h-2 bg-red-500 rounded-full" />
                              )}
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <p className="text-sm text-[var(--muted-foreground)] truncate pr-2">
                              {conversation.lastMessage}
                            </p>
                            {conversation.unread > 0 && (
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="shrink-0"
                              >
                                <Badge className="bg-[var(--caja-yellow)] text-[var(--caja-black)] text-xs min-w-[20px] h-5 rounded-full flex items-center justify-center">
                                  {conversation.unread}
                                </Badge>
                              </motion.div>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.button>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>

        {/* Chat Area */}
        <div className={`flex-1 flex flex-col ${showMobileChat ? 'block' : 'hidden lg:flex'} bg-gray-50/30`}>
          {selectedConv ? (
            <>
              {/* Chat Header */}
              <div className="p-6 border-b border-[var(--border)] bg-white/90 backdrop-blur-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleBackToList}
                      className="lg:hidden h-9 w-9 p-0"
                    >
                      <ArrowLeft className="h-4 w-4" />
                    </Button>
                    
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--caja-yellow)]/20 to-[var(--caja-green)]/20 flex items-center justify-center text-lg border-2 border-white shadow-sm">
                          {selectedConv.avatar}
                        </div>
                        <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${
                          selectedConv.status === 'online' ? 'bg-[var(--caja-green)]' :
                          selectedConv.status === 'away' ? 'bg-[var(--caja-yellow)]' :
                          'bg-gray-400'
                        }`} />
                      </div>
                      <div>
                        <h2 className="font-semibold text-[var(--foreground)]">{selectedConv.name}</h2>
                        <p className="text-sm text-[var(--muted-foreground)]">
                          {selectedConv.status === 'online' ? 'Online agora' :
                           selectedConv.status === 'away' ? 'Ausente' : 'Visto por último há 2h'}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-1">
                    {[
                      { icon: Phone, tooltip: 'Ligar' },
                      { icon: Video, tooltip: 'Videochamada' },
                      { icon: Star, tooltip: 'Favoritar' },
                      { icon: Archive, tooltip: 'Arquivar' },
                      { icon: MoreVertical, tooltip: 'Mais opções' }
                    ].map(({ icon: Icon, tooltip }, index) => (
                      <Tooltip key={index}>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-9 w-9 p-0">
                            <Icon className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>{tooltip}</TooltipContent>
                      </Tooltip>
                    ))}
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                <AnimatePresence>
                  {messages.map((message, index) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <motion.div 
                        className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl shadow-sm ${
                          message.sender === 'user'
                            ? 'bg-[var(--caja-yellow)] text-[var(--caja-black)]'
                            : 'bg-white text-[var(--foreground)] border border-[var(--border)]'
                        }`}
                        whileHover={{ scale: 1.01 }}
                      >
                        <p className="text-sm leading-relaxed">{message.content}</p>
                        <div className={`flex items-center justify-end space-x-1 mt-2 ${
                          message.sender === 'user' ? 'text-[var(--caja-black)]/70' : 'text-[var(--muted-foreground)]'
                        }`}>
                          <span className="text-xs">{message.time}</span>
                          {message.sender === 'user' && (
                            <div className="flex">
                              {message.status === 'read' && <CheckCheck className="h-3 w-3 text-[var(--caja-green)]" />}
                              {message.status === 'delivered' && <CheckCheck className="h-3 w-3 opacity-50" />}
                              {message.status === 'sent' && <Clock className="h-3 w-3 opacity-50" />}
                            </div>
                          )}
                        </div>
                      </motion.div>
                    </motion.div>
                  ))}
                </AnimatePresence>
                
                {/* Typing Indicator */}
                <AnimatePresence>
                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="flex justify-start"
                    >
                      <div className="bg-white border border-[var(--border)] px-4 py-3 rounded-2xl shadow-sm">
                        <div className="flex space-x-1">
                          {[0, 1, 2].map((i) => (
                            <motion.div
                              key={i}
                              className="w-2 h-2 bg-[var(--muted-foreground)] rounded-full"
                              animate={{ scale: [1, 1.2, 1] }}
                              transition={{ 
                                duration: 0.6, 
                                repeat: Infinity, 
                                delay: i * 0.2 
                              }}
                            />
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Message Input */}
              <div className="p-6 border-t border-[var(--border)] bg-white/90 backdrop-blur-sm">
                <div className="flex items-end space-x-3">
                  <div className="flex-1">
                    <Textarea
                      placeholder="Digite sua mensagem..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      className="min-h-[44px] max-h-32 resize-none border-[var(--border)] focus:border-[var(--caja-yellow)] transition-colors"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          handleSendMessage();
                        }
                      }}
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-11 w-11 p-0">
                          <Paperclip className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Anexar arquivo</TooltipContent>
                    </Tooltip>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-11 w-11 p-0">
                          <Smile className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Emoji</TooltipContent>
                    </Tooltip>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button 
                        onClick={handleSendMessage}
                        disabled={!newMessage.trim()}
                        className="bg-[var(--caja-yellow)] hover:bg-[var(--caja-yellow)]/90 text-[var(--caja-black)] h-11 px-6 disabled:opacity-50"
                      >
                        <Send className="h-4 w-4" />
                      </Button>
                    </motion.div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center max-w-md">
                <div className="w-20 h-20 bg-[var(--caja-yellow)]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <MessageSquare className="h-10 w-10 text-[var(--caja-yellow)]" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-[var(--foreground)]">Selecione uma conversa</h3>
                <p className="text-[var(--muted-foreground)]">
                  Escolha uma conversa na lista ao lado para começar a interagir com seus clientes.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Client Info Panel */}
        <div className="hidden xl:block w-80 border-l border-[var(--border)] bg-white">
          {selectedConv ? (
            <div className="h-full flex flex-col">
              {/* Client Header */}
              <div className="p-6 border-b border-[var(--border)]">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[var(--caja-yellow)]/20 to-[var(--caja-green)]/20 flex items-center justify-center text-2xl mx-auto mb-4 border-4 border-white shadow-lg">
                    {selectedConv.avatar}
                  </div>
                  <h3 className="font-semibold text-lg text-[var(--foreground)] mb-1">{selectedConv.name}</h3>
                  <div className="flex items-center justify-center space-x-2 text-sm text-[var(--muted-foreground)]">
                    <div className={`w-2 h-2 rounded-full ${
                      selectedConv.status === 'online' ? 'bg-[var(--caja-green)]' :
                      selectedConv.status === 'away' ? 'bg-[var(--caja-yellow)]' :
                      'bg-gray-400'
                    }`} />
                    <span>
                      {selectedConv.status === 'online' ? 'Online agora' :
                       selectedConv.status === 'away' ? 'Ausente' : 'Visto por último há 2h'}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {/* Contact Info */}
                <div>
                  <h4 className="font-medium text-[var(--foreground)] mb-4 flex items-center">
                    <User className="h-4 w-4 mr-2 text-[var(--caja-yellow)]" />
                    Informações de Contato
                  </h4>
                  <div className="space-y-3">
                    {[
                      { icon: Mail, label: 'Email', value: selectedConv.email },
                      { icon: PhoneIcon, label: 'Telefone', value: selectedConv.phone },
                      { icon: Calendar, label: 'Cliente desde', value: selectedConv.joinDate }
                    ].map(({ icon: Icon, label, value }, index) => (
                      <div key={index} className="flex items-center space-x-3 p-3 rounded-lg bg-[var(--muted)]/30">
                        <Icon className="h-4 w-4 text-[var(--muted-foreground)]" />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs text-[var(--muted-foreground)] uppercase tracking-wide">{label}</p>
                          <p className="text-sm font-medium text-[var(--foreground)] truncate">{value}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Related Tickets */}
                <div>
                  <h4 className="font-medium text-[var(--foreground)] mb-4 flex items-center justify-between">
                    <div className="flex items-center">
                      <Ticket className="h-4 w-4 mr-2 text-[var(--caja-yellow)]" />
                      Tickets Relacionados
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {relatedTickets.length}
                    </Badge>
                  </h4>
                  <div className="space-y-3">
                    {relatedTickets.map((ticket, index) => (
                      <motion.div
                        key={ticket.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="p-4 rounded-lg border border-[var(--border)] bg-white hover:shadow-sm transition-shadow cursor-pointer"
                        whileHover={{ scale: 1.02 }}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <Hash className="h-3 w-3 text-[var(--muted-foreground)]" />
                            <span className="font-medium text-sm">{ticket.id}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge className={`text-xs px-2 py-1 ${getStatusColor(ticket.status)}`}>
                              {ticket.status === 'open' ? 'Aberto' : 
                               ticket.status === 'resolved' ? 'Resolvido' : 'Pendente'}
                            </Badge>
                            <Badge className={`text-xs px-2 py-1 ${getPriorityColor(ticket.priority)}`}>
                              {ticket.priority === 'high' ? 'Alta' : 
                               ticket.priority === 'medium' ? 'Média' : 'Baixa'}
                            </Badge>
                          </div>
                        </div>
                        <p className="text-sm text-[var(--foreground)] mb-2">{ticket.title}</p>
                        <p className="text-xs text-[var(--muted-foreground)]">{ticket.createdAt}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Tags */}
                <div>
                  <h4 className="font-medium text-[var(--foreground)] mb-4 flex items-center">
                    <Tag className="h-4 w-4 mr-2 text-[var(--caja-yellow)]" />
                    Tags
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedConv.tags.map((tag, index) => (
                      <motion.div
                        key={tag}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Badge 
                          variant="outline" 
                          className="text-xs px-3 py-1 bg-[var(--caja-yellow)]/10 border-[var(--caja-yellow)]/30 text-[var(--caja-black)] hover:bg-[var(--caja-yellow)]/20 transition-colors"
                        >
                          {tag}
                        </Badge>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center p-6">
              <div className="text-center text-[var(--muted-foreground)]">
                <User className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Selecione uma conversa para ver as informações do cliente</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </TooltipProvider>
  );
}