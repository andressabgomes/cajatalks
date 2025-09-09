import { Suspense, lazy, memo } from 'react';
import { motion } from 'motion/react';
import { Loading } from '../loading';
import type { PageType } from '../../hooks/useAppState';

// Lazy load page components for better performance with error handling
const Dashboard = lazy(() => 
  import('../dashboard').then(module => {
    if (module.Dashboard) return { default: module.Dashboard };
    if (module.default) return { default: module.default };
    throw new Error('Dashboard component not found');
  }).catch(() => ({ default: () => <div>Erro ao carregar Dashboard</div> }))
);

const Inbox = lazy(() => 
  import('../inbox').then(module => {
    if (module.Inbox) return { default: module.Inbox };
    if (module.default) return { default: module.default };
    throw new Error('Inbox component not found');
  }).catch(() => ({ default: () => <div>Erro ao carregar Inbox</div> }))
);

const Tickets = lazy(() => 
  import('../tickets').then(module => {
    if (module.Tickets) return { default: module.Tickets };
    if (module.default) return { default: module.default };
    throw new Error('Tickets component not found');
  }).catch(() => ({ default: () => <div>Erro ao carregar Tickets</div> }))
);

const Clients = lazy(() => 
  import('../clients').then(module => {
    if (module.Clients) return { default: module.Clients };
    if (module.default) return { default: module.default };
    throw new Error('Clients component not found');
  }).catch(() => ({ default: () => <div>Erro ao carregar Clientes</div> }))
);

const Settings = lazy(() => 
  import('../settings').then(module => {
    if (module.Settings) return { default: module.Settings };
    if (module.default) return { default: module.default };
    throw new Error('Settings component not found');
  }).catch(() => ({ default: () => <div>Erro ao carregar Configurações</div> }))
);

interface PageRendererProps {
  currentPage: PageType;
}

const pageComponents: Record<PageType, React.LazyExoticComponent<() => JSX.Element>> = {
  dashboard: Dashboard,
  inbox: Inbox,
  tickets: Tickets,
  clients: Clients,
  settings: Settings,
};

export const PageRenderer = memo(function PageRenderer({ currentPage }: PageRendererProps) {
  const PageComponent = pageComponents[currentPage];

  if (!PageComponent) {
    return <div>Página não encontrada</div>;
  }

  return (
    <div className="flex-1 overflow-auto">
      <motion.div
        key={currentPage}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ 
          duration: 0.3,
          ease: [0.4, 0, 0.2, 1]
        }}
      >
        <Suspense fallback={<Loading />}>
          <PageComponent />
        </Suspense>
      </motion.div>
    </div>
  );
});