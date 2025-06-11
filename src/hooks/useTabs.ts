import { useRouterState } from '@tanstack/react-router';

export const RouteTabs = {
  BUILDER: 'builder',
  SAVED: 'saved',
} as const;

const useTab = () => {
  const tab = useRouterState({
    select: (state) =>
      state.matches
        .map((match) => {
          switch (match.routeId) {
            case '/builder':
              return RouteTabs.BUILDER;
            case '/saved':
              return RouteTabs.SAVED;
            default:
              return;
          }
        })
        .filter(Boolean)
        .at(0) ?? RouteTabs.BUILDER,
  });

  return tab;
};

export default useTab;
