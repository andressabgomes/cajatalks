import React, { useState, useEffect } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { Label } from './ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from './ui/dialog'
import { Badge } from './ui/badge'
import { Alert, AlertDescription } from './ui/alert'
import { Loader2, Plus, AlertCircle, CheckCircle } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { TicketService } from '@/services/tickets'
import { ClientService } from '@/services/clients'
import type { ClientWithStats } from '@/services/clients'

interface CreateTicketModalProps {
  isOpen: boolean
  onClose: () => void
  onTicketCreated?: (ticket: any) => void
}

interface TicketFormData {
  title: string
  description: string
  priority: 'low' | 'medium' | 'high' | 'urgent'
  client_id: string
  category?: string
  tags: string[]
}

export function CreateTicketModal({ isOpen, onClose, onTicketCreated }: CreateTicketModalProps) {
  const { user, isAuthenticated } = useAuth()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [clients, setClients] = useState<ClientWithStats[]>([])
  const [loadingClients, setLoadingClients] = useState(false)
  const [newTag, setNewTag] = useState('')

  const [formData, setFormData] = useState<TicketFormData>({
    title: '',
    description: '',
    priority: 'medium',
    client_id: '',
    category: '',
    tags: []
  })

  // Carregar clientes quando o modal abrir
  useEffect(() => {
    if (isOpen && isAuthenticated) {
      loadClients()
    }
  }, [isOpen, isAuthenticated])

  const loadClients = async () => {
    try {
      setLoadingClients(true)
      const { data } = await ClientService.getClients(1, 100) // Carregar até 100 clientes
      setClients(data)
    } catch (err) {
      console.error('Erro ao carregar clientes:', err)
    } finally {
      setLoadingClients(false)
    }
  }

  const handleInputChange = (field: keyof TicketFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
    setError(null)
  }

  const handleAddTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }))
      setNewTag('')
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!isAuthenticated || !user) {
      setError('Você precisa estar logado para criar um ticket')
      return
    }

    if (!formData.title.trim() || !formData.description.trim() || !formData.client_id) {
      setError('Preencha todos os campos obrigatórios')
      return
    }

    try {
      setLoading(true)
      setError(null)

      const ticketData = {
        title: formData.title.trim(),
        description: formData.description.trim(),
        priority: formData.priority,
        client_id: formData.client_id,
        created_by: user.id,
        status: 'open' as const
      }

      const newTicket = await TicketService.createTicket(ticketData)
      
      setSuccess(true)
      
      // Callback para atualizar a lista de tickets
      if (onTicketCreated) {
        onTicketCreated(newTicket)
      }

      // Reset form
      setFormData({
        title: '',
        description: '',
        priority: 'medium',
        client_id: '',
        category: '',
        tags: []
      })

      // Fechar modal após 2 segundos
      setTimeout(() => {
        setSuccess(false)
        onClose()
      }, 2000)

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao criar ticket')
    } finally {
      setLoading(false)
    }
  }

  const handleClose = () => {
    if (!loading) {
      setError(null)
      setSuccess(false)
      setFormData({
        title: '',
        description: '',
        priority: 'medium',
        client_id: '',
        category: '',
        tags: []
      })
      onClose()
    }
  }

  const priorityOptions = [
    { value: 'low', label: 'Baixa', color: 'bg-gray-100 text-gray-800' },
    { value: 'medium', label: 'Média', color: 'bg-blue-100 text-blue-800' },
    { value: 'high', label: 'Alta', color: 'bg-orange-100 text-orange-800' },
    { value: 'urgent', label: 'Urgente', color: 'bg-red-100 text-red-800' }
  ]

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            Criar Novo Ticket
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Status de Sucesso */}
          {success && (
            <Alert className="border-green-200 bg-green-50">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-800">
                Ticket criado com sucesso! Redirecionando...
              </AlertDescription>
            </Alert>
          )}

          {/* Erro */}
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Título */}
          <div className="space-y-2">
            <Label htmlFor="title">Título *</Label>
            <Input
              id="title"
              placeholder="Descreva brevemente o problema ou solicitação"
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              disabled={loading}
              required
            />
          </div>

          {/* Descrição */}
          <div className="space-y-2">
            <Label htmlFor="description">Descrição *</Label>
            <Textarea
              id="description"
              placeholder="Forneça detalhes sobre o problema ou solicitação..."
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              disabled={loading}
              rows={4}
              required
            />
          </div>

          {/* Cliente e Prioridade */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="client">Cliente *</Label>
              <Select
                value={formData.client_id}
                onValueChange={(value) => handleInputChange('client_id', value)}
                disabled={loading || loadingClients}
              >
                <SelectTrigger>
                  <SelectValue placeholder={loadingClients ? "Carregando clientes..." : "Selecione um cliente"} />
                </SelectTrigger>
                <SelectContent>
                  {clients.map((client) => (
                    <SelectItem key={client.id} value={client.id}>
                      <div className="flex items-center justify-between w-full">
                        <span>{client.name}</span>
                        <span className="text-xs text-gray-500 ml-2">
                          {client.company && `(${client.company})`}
                        </span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="priority">Prioridade *</Label>
              <Select
                value={formData.priority}
                onValueChange={(value: any) => handleInputChange('priority', value)}
                disabled={loading}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {priorityOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${option.color.split(' ')[0]}`} />
                        {option.label}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Categoria */}
          <div className="space-y-2">
            <Label htmlFor="category">Categoria</Label>
            <Input
              id="category"
              placeholder="Ex: Bug, Feature Request, Suporte, etc."
              value={formData.category}
              onChange={(e) => handleInputChange('category', e.target.value)}
              disabled={loading}
            />
          </div>

          {/* Tags */}
          <div className="space-y-2">
            <Label>Tags</Label>
            <div className="flex gap-2">
              <Input
                placeholder="Adicionar tag..."
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                disabled={loading}
              />
              <Button
                type="button"
                variant="outline"
                onClick={handleAddTag}
                disabled={loading || !newTag.trim()}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            
            {formData.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.tags.map((tag, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="flex items-center gap-1"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(tag)}
                      className="ml-1 hover:text-red-500"
                      disabled={loading}
                    >
                      ×
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </div>

          <DialogFooter className="gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={loading}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={loading || !formData.title.trim() || !formData.description.trim() || !formData.client_id}
              className="bg-[var(--caja-yellow)] hover:bg-[var(--caja-yellow)]/90 text-[var(--caja-black)]"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Criando...
                </>
              ) : (
                <>
                  <Plus className="h-4 w-4 mr-2" />
                  Criar Ticket
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
