# Guia de Uso da Logo - Cajá Talks

## Componentes Disponíveis

### CajaLogo
Componente básico da logo com opções de tamanho e estilo.

```tsx
import { CajaLogo } from './components/ui/caja-logo';

<CajaLogo 
  size="md"           // 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  variant="default"   // 'default' | 'elevated' | 'minimal'
  animated={true}     // hover animations
  onClick={handleClick}
/>
```

### CajaLogoWithText
Logo acompanhada do texto "Cajá Talks".

```tsx
import { CajaLogoWithText } from './components/ui/caja-logo';

<CajaLogoWithText 
  logoSize="md"
  textSize="md"       // 'sm' | 'md' | 'lg'
  orientation="horizontal" // 'horizontal' | 'vertical'
  variant="default"
  animated={true}
/>
```

## Tamanhos Disponíveis

- **xs**: 24x24px - Para ícones pequenos
- **sm**: 32x32px - Headers mobile, badges
- **md**: 40x40px - Sidebar, navegação
- **lg**: 64x64px - Headers principais
- **xl**: 96x96px - Splash screens, onboarding

## Variantes de Estilo

### Default
- Fundo branco com borda sutil amarela
- Sombra leve
- Ideal para uso geral

### Elevated
- Fundo branco com borda amarela
- Sombra mais pronunciada
- Para destaque em telas importantes

### Minimal
- Fundo branco com borda neutra
- Sombra mínima
- Para contextos discretos

## Principais Características

✅ **Fundo Preservado**: A logo mantém seu fundo branco original
✅ **Bordas Inteligentes**: Bordas sutis com a cor amarela do Cajá Talks
✅ **Sombras Elegantes**: Sombras que destacam sem poluir
✅ **Animações Suaves**: Hover effects com scale e rotate
✅ **Responsivo**: Tamanhos que se adaptam ao contexto
✅ **Consistência**: Mesmo padrão visual em todo o sistema

## Onde Usar

- **Login**: `size="xl"` + `variant="elevated"`
- **Sidebar**: `size="md"` + `variant="default"`
- **Mobile Header**: `size="sm"` + `variant="default"`
- **Onboarding**: `size="xl"` + `variant="elevated"`
- **Modals**: `size="sm"` + `variant="minimal"`

## Cores do Sistema

A logo funciona harmoniosamente com:
- Fundo branco (recomendado)
- Fundos muito claros
- Evitar fundos escuros ou coloridos

As bordas usam:
- `border-[var(--caja-yellow)]/20` - Estado normal
- `border-[var(--caja-yellow)]/40` - Estado hover