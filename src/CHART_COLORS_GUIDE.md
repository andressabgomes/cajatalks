# Guia de Cores dos Gráficos - Cajá Talks

## Paleta de Cores para Gráficos

As cores dos gráficos foram cuidadosamente selecionadas para evitar vermelho e amarelo, mantendo boa legibilidade e contraste.

### Cores Principais

**--chart-1: Azul** (`#2563EB` / `#3B82F6`)
- Cor primária para dados principais
- Boa visibilidade em fundos claros e escuros
- Associada a confiabilidade e profissionalismo

**--chart-2: Verde** (`var(--caja-green)` / `#10B981`)
- Usa o verde oficial do Cajá Talks
- Ideal para dados positivos, crescimento
- Mantém a identidade visual da marca

**--chart-3: Marrom** (`var(--caja-brown)` / `#A16207`)
- Usa o marrom oficial do Cajá Talks
- Neutro e elegante
- Complementa bem outras cores

**--chart-4: Roxo** (`#7C3AED` / `#8B5CF6`)
- Cor secundária distintiva
- Bom contraste com outras cores
- Moderna e profissional

**--chart-5: Verde Escuro** (`#059669`)
- Variação do verde para diferenciação
- Mantém harmonia com a paleta
- Ideal para dados complementares

## Uso Recomendado

### Gráficos de Linha
- Use chart-1 (azul) para linha principal
- chart-2 (verde) para tendências positivas
- chart-3 (marrom) para dados neutros
- chart-4 (roxo) para comparações
- chart-5 (verde escuro) para dados secundários

### Gráficos de Barras
- Alternar entre as 5 cores para categorias distintas
- Manter consistência em gráficos relacionados

### Gráficos de Pizza
- Usar todas as 5 cores para segmentos
- Ordem: azul → verde → marrom → roxo → verde escuro

## Cores Evitadas

❌ **Vermelho**: Removido para evitar associação negativa
❌ **Amarelo**: Removido por baixo contraste e legibilidade
❌ **Laranja**: Pode ser confundido com amarelo
❌ **Rosa**: Baixo contraste em alguns contextos

## Acessibilidade

✅ Todas as cores atendem aos padrões WCAG AA
✅ Bom contraste em modo claro e escuro
✅ Diferenciáveis para usuários com daltonismo
✅ Mantém legibilidade em impressão monocromática

## Implementação

As cores são automaticamente aplicadas via CSS custom properties:

```css
/* Tema claro */
--chart-1: #2563EB;
--chart-2: var(--caja-green);
--chart-3: var(--caja-brown);
--chart-4: #7C3AED;
--chart-5: #059669;

/* Tema escuro */
--chart-1: #3B82F6;
--chart-2: #10B981;
--chart-3: #A16207;
--chart-4: #8B5CF6;
--chart-5: #059669;
```

## Bibliotecas de Gráficos

### Recharts
```tsx
<LineChart data={data}>
  <Line dataKey="value1" stroke="var(--chart-1)" />
  <Line dataKey="value2" stroke="var(--chart-2)" />
  <Line dataKey="value3" stroke="var(--chart-3)" />
</LineChart>
```

### Chart.js
```javascript
{
  borderColor: 'var(--chart-1)',
  backgroundColor: 'var(--chart-1)',
}
```

As cores se adaptam automaticamente ao tema (claro/escuro) e mantêm a consistência visual em todo o sistema.