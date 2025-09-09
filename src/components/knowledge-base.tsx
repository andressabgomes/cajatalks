import { useState } from 'react';
import { motion } from 'motion/react';
import { Search, Plus, BookOpen, Tag, User, Calendar, Eye, ThumbsUp, ThumbsDown, Edit, Trash2, FolderPlus, Filter } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from './ui/dialog';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';

export function KnowledgeBase() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isAddArticleOpen, setIsAddArticleOpen] = useState(false);

  const [newArticle, setNewArticle] = useState({
    title: '',
    category: '',
    content: '',
    tags: ''
  });

  const categories = [
    { id: 'technical', name: 'Técnico', count: 45, color: 'bg-blue-500' },
    { id: 'billing', name: 'Faturamento', count: 23, color: 'bg-green-500' },
    { id: 'account', name: 'Conta', count: 34, color: 'bg-purple-500' },
    { id: 'integration', name: 'Integrações', count: 18, color: 'bg-orange-500' },
    { id: 'general', name: 'Geral', count: 56, color: 'bg-gray-500' }
  ];

  const articles = [
    {
      id: 1,
      title: 'Como configurar autenticação de dois fatores',
      category: 'account',
      author: 'Ana Silva',
      createdAt: '2024-01-10',
      updatedAt: '2024-01-15',
      views: 1247,
      likes: 23,
      dislikes: 2,
      tags: ['segurança', '2FA', 'conta'],
      excerpt: 'Guia passo a passo para ativar a autenticação de dois fatores e aumentar a segurança da sua conta.',
      status: 'published'
    },
    {
      id: 2,
      title: 'Integrando com WhatsApp Business API',
      category: 'integration',
      author: 'Carlos Santos',
      createdAt: '2024-01-08',
      updatedAt: '2024-01-12',
      views: 892,
      likes: 34,
      dislikes: 1,
      tags: ['whatsapp', 'api', 'integração'],
      excerpt: 'Tutorial completo para conectar sua conta do WhatsApp Business com o Cajá Talks.',
      status: 'published'
    },
    {
      id: 3,
      title: 'Resolvendo problemas de cobrança',
      category: 'billing',
      author: 'Mariana Costa',
      createdAt: '2024-01-05',
      updatedAt: '2024-01-14',
      views: 634,
      likes: 18,
      dislikes: 0,
      tags: ['faturamento', 'pagamento', 'problemas'],
      excerpt: 'Soluções para os problemas mais comuns relacionados a cobrança e pagamentos.',
      status: 'published'
    },
    {
      id: 4,
      title: 'APIs de webhook para desenvolvedores',
      category: 'technical',
      author: 'Pedro Oliveira',
      createdAt: '2024-01-03',
      updatedAt: '2024-01-11',
      views: 445,
      likes: 15,
      dislikes: 3,
      tags: ['webhook', 'api', 'desenvolvimento'],
      excerpt: 'Documentação completa sobre como utilizar webhooks para integrar com sistemas externos.',
      status: 'draft'
    },
    {
      id: 5,
      title: 'Configurando notificações personalizadas',
      category: 'general',
      author: 'Julia Ferreira',
      createdAt: '2024-01-01',
      updatedAt: '2024-01-09',
      views: 756,
      likes: 28,
      dislikes: 1,
      tags: ['notificações', 'configuração', 'personalização'],
      excerpt: 'Como personalizar suas notificações para receber apenas as informações mais importantes.',
      status: 'published'
    }
  ];

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const getCategoryName = (categoryId: string) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.name : categoryId;
  };

  const getCategoryColor = (categoryId: string) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.color : 'bg-gray-500';
  };

  const handleAddArticle = () => {
    console.log('Adding article:', newArticle);
    setIsAddArticleOpen(false);
    setNewArticle({ title: '', category: '', content: '', tags: '' });
  };

  const popularArticles = articles
    .sort((a, b) => b.views - a.views)
    .slice(0, 5);

  const recentArticles = articles
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, 5);

  const totalViews = articles.reduce((sum, article) => sum + article.views, 0);
  const totalLikes = articles.reduce((sum, article) => sum + article.likes, 0);

  return (
    <div className="min-h-screen bg-[var(--background)] p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-between"
        >
          <div>
            <h1 className="text-3xl font-bold text-[var(--foreground)]">Base de Conhecimento</h1>
            <p className="text-[var(--muted-foreground)] mt-1">
              Gerencie artigos, tutoriais e documentação
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline" className="flex items-center space-x-2">
              <FolderPlus className="w-4 h-4" />
              <span>Nova Categoria</span>
            </Button>
            <Dialog open={isAddArticleOpen} onOpenChange={setIsAddArticleOpen}>
              <DialogTrigger asChild>
                <Button className="flex items-center space-x-2">
                  <Plus className="w-4 h-4" />
                  <span>Novo Artigo</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Criar Novo Artigo</DialogTitle>
                  <DialogDescription>
                    Crie um novo artigo para a base de conhecimento preenchendo as informações abaixo.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Título</Label>
                    <Input
                      id="title"
                      value={newArticle.title}
                      onChange={(e) => setNewArticle({...newArticle, title: e.target.value})}
                      placeholder="Digite o título do artigo"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">Categoria</Label>
                    <Select value={newArticle.category} onValueChange={(value) => setNewArticle({...newArticle, category: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione uma categoria" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map(category => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="tags">Tags (separadas por vírgula)</Label>
                    <Input
                      id="tags"
                      value={newArticle.tags}
                      onChange={(e) => setNewArticle({...newArticle, tags: e.target.value})}
                      placeholder="tag1, tag2, tag3"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="content">Conteúdo</Label>
                    <Textarea
                      id="content"
                      value={newArticle.content}
                      onChange={(e) => setNewArticle({...newArticle, content: e.target.value})}
                      placeholder="Escreva o conteúdo do artigo aqui..."
                      rows={8}
                    />
                  </div>
                  <div className="flex space-x-2 pt-4">
                    <Button onClick={handleAddArticle} className="flex-1">Publicar</Button>
                    <Button variant="outline" onClick={() => handleAddArticle()} className="flex-1">
                      Salvar como Rascunho
                    </Button>
                    <Button variant="outline" onClick={() => setIsAddArticleOpen(false)}>
                      Cancelar
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6"
        >
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[var(--muted-foreground)]">Total de Artigos</p>
                  <p className="text-2xl font-bold">{articles.length}</p>
                  <p className="text-xs text-[var(--caja-green)] mt-1">+3 este mês</p>
                </div>
                <BookOpen className="w-8 h-8 text-[var(--caja-yellow)]" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[var(--muted-foreground)]">Total de Visualizações</p>
                  <p className="text-2xl font-bold">{totalViews.toLocaleString()}</p>
                  <p className="text-xs text-[var(--caja-green)] mt-1">+15% este mês</p>
                </div>
                <Eye className="w-8 h-8 text-[var(--caja-green)]" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[var(--muted-foreground)]">Avaliações Positivas</p>
                  <p className="text-2xl font-bold">{totalLikes}</p>
                  <p className="text-xs text-[var(--caja-green)] mt-1">94% positivas</p>
                </div>
                <ThumbsUp className="w-8 h-8 text-[var(--caja-brown)]" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[var(--muted-foreground)]">Categorias</p>
                  <p className="text-2xl font-bold">{categories.length}</p>
                  <p className="text-xs text-[var(--muted-foreground)] mt-1">Organizadas</p>
                </div>
                <Tag className="w-8 h-8 text-gray-500" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Search and Categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-4"
        >
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[var(--muted-foreground)] w-4 h-4" />
              <Input
                placeholder="Buscar artigos, tags ou conteúdo..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full sm:w-48">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Filtrar por categoria" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas as categorias</SelectItem>
                {categories.map(category => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name} ({category.count})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-3">
            {categories.map(category => (
              <Card key={category.id} className="cursor-pointer hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${category.color}`}></div>
                    <div>
                      <p className="font-medium">{category.name}</p>
                      <p className="text-sm text-[var(--muted-foreground)]">{category.count} artigos</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Tabs defaultValue="all" className="space-y-6">
            <TabsList>
              <TabsTrigger value="all">Todos os Artigos</TabsTrigger>
              <TabsTrigger value="popular">Mais Populares</TabsTrigger>
              <TabsTrigger value="recent">Recentes</TabsTrigger>
            </TabsList>

            <TabsContent value="all">
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredArticles.map(article => (
                  <Card key={article.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-lg leading-tight">{article.title}</CardTitle>
                          <div className="flex items-center space-x-2 mt-2">
                            <Badge className={`${getCategoryColor(article.category)} text-white`}>
                              {getCategoryName(article.category)}
                            </Badge>
                            {article.status === 'draft' && (
                              <Badge variant="outline">Rascunho</Badge>
                            )}
                          </div>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <Edit className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Edit className="w-4 h-4 mr-2" />
                              Editar
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">
                              <Trash2 className="w-4 h-4 mr-2" />
                              Excluir
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-[var(--muted-foreground)] text-sm mb-4">{article.excerpt}</p>
                      
                      <div className="flex flex-wrap gap-1 mb-4">
                        {article.tags.map((tag, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex items-center justify-between text-sm text-[var(--muted-foreground)]">
                        <div className="flex items-center space-x-2">
                          <Avatar className="w-6 h-6">
                            <AvatarFallback className="bg-[var(--caja-yellow)] text-[var(--caja-black)] text-xs">
                              {article.author.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <span>{article.author}</span>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-1">
                            <Eye className="w-4 h-4" />
                            <span>{article.views}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <ThumbsUp className="w-4 h-4" />
                            <span>{article.likes}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2 mt-3 text-xs text-[var(--muted-foreground)]">
                        <Calendar className="w-3 h-3" />
                        <span>Atualizado em {new Date(article.updatedAt).toLocaleDateString('pt-BR')}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="popular">
              <div className="space-y-4">
                {popularArticles.map((article, index) => (
                  <Card key={article.id}>
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="w-8 h-8 bg-[var(--caja-yellow)] rounded-full flex items-center justify-center font-bold">
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold mb-2">{article.title}</h3>
                          <p className="text-[var(--muted-foreground)] text-sm mb-3">{article.excerpt}</p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4 text-sm text-[var(--muted-foreground)]">
                              <div className="flex items-center space-x-1">
                                <Eye className="w-4 h-4" />
                                <span>{article.views} visualizações</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <ThumbsUp className="w-4 h-4" />
                                <span>{article.likes} likes</span>
                              </div>
                            </div>
                            <Badge className={`${getCategoryColor(article.category)} text-white`}>
                              {getCategoryName(article.category)}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="recent">
              <div className="space-y-4">
                {recentArticles.map(article => (
                  <Card key={article.id}>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-semibold mb-2">{article.title}</h3>
                          <p className="text-[var(--muted-foreground)] text-sm mb-3">{article.excerpt}</p>
                          <div className="flex items-center space-x-4 text-sm text-[var(--muted-foreground)]">
                            <div className="flex items-center space-x-2">
                              <Avatar className="w-5 h-5">
                                <AvatarFallback className="bg-[var(--caja-yellow)] text-[var(--caja-black)] text-xs">
                                  {article.author.split(' ').map(n => n[0]).join('')}
                                </AvatarFallback>
                              </Avatar>
                              <span>{article.author}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Calendar className="w-4 h-4" />
                              <span>Atualizado em {new Date(article.updatedAt).toLocaleDateString('pt-BR')}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge className={`${getCategoryColor(article.category)} text-white`}>
                            {getCategoryName(article.category)}
                          </Badge>
                          {article.status === 'draft' && (
                            <Badge variant="outline">Rascunho</Badge>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
}